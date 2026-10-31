/**
 * Data access layer. The ONLY place that reads collections, sorts them and
 * resolves relations. Pages and components receive the plain, typed objects
 * defined here and never touch `astro:content` directly.
 */
import { getCollection, getEntry } from 'astro:content';
import type {
  BookData,
  EducationData,
  EmployerData,
  PersonalProjectData,
  ProfileData,
  WorkProjectData,
} from '../schemas';

export type Profile = ProfileData;
export type WorkProject = Omit<WorkProjectData, 'employer'> & { id: string; body: string };
export type Education = EducationData & { id: string };
export type Employer = EmployerData & { id: string; projects: WorkProject[] };
export type PersonalProject = PersonalProjectData & { id: string; body: string };
export type Book = BookData & { id: string; body: string };

const time = (date?: Date | null) => date?.getTime() ?? Number.NEGATIVE_INFINITY;

export async function getProfile(): Promise<Profile> {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('Missing src/content/profile/profile.yaml');
  return entry.data;
}

/** Degrees newest first. */
export async function getEducation(): Promise<Education[]> {
  const entries = await getCollection('education');
  return entries
    .map(({ id, data }) => ({ ...data, id }))
    .sort((a, b) => time(b.startDate) - time(a.startDate));
}

/** Employers newest first, each with its projects (newest first, undated last). */
export async function getEmployers(): Promise<Employer[]> {
  const [employers, projects] = await Promise.all([getCollection('employers'), getCollection('workProjects')]);
  const employerIds = new Set(employers.map((e) => e.id));

  const projectsByEmployer = new Map<string, WorkProject[]>();
  for (const { id, body, data } of projects) {
    const { employer, ...rest } = data;
    if (!employerIds.has(employer.id)) {
      throw new Error(`work-projects/${id}: unknown employer "${employer.id}"`);
    }
    const list = projectsByEmployer.get(employer.id) ?? [];
    list.push({ ...rest, id, body: body ?? '' });
    projectsByEmployer.set(employer.id, list);
  }

  return employers
    .map(({ id, data }): Employer => {
      const list = (projectsByEmployer.get(id) ?? []).sort(
        (a, b) => time(b.startDate) - time(a.startDate) || a.name.localeCompare(b.name),
      );
      for (const project of list) warnIfOutsideEmployment(data, project);
      return { ...data, id, projects: list };
    })
    .sort((a, b) => time(b.startDate) - time(a.startDate));
}

export async function getPersonalProjects(): Promise<PersonalProject[]> {
  const entries = await getCollection('projects');
  return entries
    .map(({ id, body, data }) => ({ ...data, id, body: body ?? '' }))
    .sort((a, b) => time(b.startDate) - time(a.startDate) || a.name.localeCompare(b.name));
}

/** Books newest first (by finish date). */
export async function getBooks(): Promise<Book[]> {
  const entries = await getCollection('books');
  return entries
    .map(({ id, body, data }) => ({ ...data, id, body: body ?? '' }))
    .sort((a, b) => time(b.finishedAt) - time(a.finishedAt) || a.title.localeCompare(b.title));
}

const endOfMonth = (date: Date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));

function warnIfOutsideEmployment(employer: EmployerData, project: WorkProject) {
  const outsideStart = project.startDate && project.startDate < employer.startDate;
  const employmentEnd = employer.endDate && endOfMonth(employer.endDate);
  const outsideEnd = employmentEnd && project.endDate && project.endDate > employmentEnd;
  if (outsideStart || outsideEnd) {
    console.warn(
      `[content] "${project.name}" (${project.id}) has dates outside its employer "${employer.name}" employment period.`,
    );
  }
}

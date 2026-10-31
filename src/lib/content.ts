/**
 * Data access layer. The ONLY place that reads collections, sorts them and
 * resolves relations. Pages and components receive the plain, typed objects
 * defined here and never touch `astro:content` directly.
 *
 * Every getter takes the language to return. Content files are paired by
 * name (`small-systems.pl.md`, `small-systems.en.md`), and the returned ids
 * are the shared slugs without the language suffix.
 */
import { getCollection, getEntry } from 'astro:content';
import { locales, splitId, type Locale } from '../i18n';
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

/**
 * Keeps the entries of one language and strips the suffix from their ids.
 * Fails the build if a slug exists in only some languages.
 */
function inLocale<E extends { id: string }>(name: string, entries: E[], locale: Locale): (E & { id: string })[] {
  const languagesBySlug = new Map<string, Set<Locale>>();
  const parsed = entries.map((entry) => {
    const { slug, locale: entryLocale } = splitId(entry.id);
    const languages = languagesBySlug.get(slug) ?? new Set<Locale>();
    languages.add(entryLocale);
    languagesBySlug.set(slug, languages);
    return { entry, slug, entryLocale };
  });

  for (const [slug, languages] of languagesBySlug) {
    const missing = locales.filter((l) => !languages.has(l));
    if (missing.length > 0) {
      throw new Error(
        `${name}/${slug}: missing translation for ${missing.map((l) => `.${l}`).join(', ')} (add the file with the same name).`,
      );
    }
  }

  return parsed
    .filter(({ entryLocale }) => entryLocale === locale)
    .map(({ entry, slug }) => ({ ...entry, id: slug }));
}

export async function getProfile(locale: Locale): Promise<Profile> {
  const entry = await getEntry('profile', `profile.${locale}`);
  if (!entry) throw new Error(`Missing src/content/profile/profile.${locale}.yaml`);
  return entry.data;
}

/** Degrees newest first. */
export async function getEducation(locale: Locale): Promise<Education[]> {
  const entries = inLocale('education', await getCollection('education'), locale);
  return entries
    .map(({ id, data }) => ({ ...data, id }))
    .sort((a, b) => time(b.startDate) - time(a.startDate));
}

/** Employers newest first, each with its projects (newest first, undated last). */
export async function getEmployers(locale: Locale): Promise<Employer[]> {
  const [employers, projects] = await Promise.all([getCollection('employers'), getCollection('workProjects')]);
  const employerEntries = inLocale('employers', employers, locale);
  const projectEntries = inLocale('work-projects', projects, locale);
  const employerIds = new Set(employerEntries.map((e) => e.id));

  const projectsByEmployer = new Map<string, WorkProject[]>();
  for (const { id, body, data } of projectEntries) {
    const { employer, ...rest } = data;
    if (!employerIds.has(employer)) {
      throw new Error(`work-projects/${id}: unknown employer "${employer}"`);
    }
    const list = projectsByEmployer.get(employer) ?? [];
    list.push({ ...rest, id, body: body ?? '' });
    projectsByEmployer.set(employer, list);
  }

  return employerEntries
    .map(({ id, data }): Employer => {
      const list = (projectsByEmployer.get(id) ?? []).sort(
        (a, b) => time(b.startDate) - time(a.startDate) || a.name.localeCompare(b.name),
      );
      for (const project of list) warnIfOutsideEmployment(data, project);
      return { ...data, id, projects: list };
    })
    .sort((a, b) => time(b.startDate) - time(a.startDate));
}

export async function getPersonalProjects(locale: Locale): Promise<PersonalProject[]> {
  const entries = inLocale('projects', await getCollection('projects'), locale);
  return entries
    .map(({ id, body, data }) => ({ ...data, id, body: body ?? '' }))
    .sort((a, b) => time(b.startDate) - time(a.startDate) || a.name.localeCompare(b.name));
}

/** Books newest first (by finish date). */
export async function getBooks(locale: Locale): Promise<Book[]> {
  const entries = inLocale('books', await getCollection('books'), locale);
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

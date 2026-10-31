import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  bookSchema,
  educationSchema,
  employerSchema,
  personalProjectSchema,
  profileSchema,
  workProjectSchema,
} from './schemas';

/**
 * Keeps the language suffix in the id: `wust-bach.pl.yaml` -> `wust-bach.pl`.
 * The default id generator would turn the dot into a dash-less `wust-bachpl`.
 * See src/lib/content.ts for how ids are split into slug and language.
 */
const withLanguageSuffix = ({ entry }: { entry: string }) => entry.replace(/\.(yaml|md)$/, '');

const profile = defineCollection({
  loader: glob({ pattern: 'profile.{pl,en}.yaml', base: './src/content/profile', generateId: withLanguageSuffix }),
  schema: profileSchema,
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.{pl,en}.yaml', base: './src/content/education', generateId: withLanguageSuffix }),
  schema: educationSchema,
});

const employers = defineCollection({
  loader: glob({ pattern: '**/*.{pl,en}.yaml', base: './src/content/employers', generateId: withLanguageSuffix }),
  schema: employerSchema,
});

const workProjects = defineCollection({
  loader: glob({ pattern: '**/*.{pl,en}.md', base: './src/content/work-projects', generateId: withLanguageSuffix }),
  schema: workProjectSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{pl,en}.md', base: './src/content/projects', generateId: withLanguageSuffix }),
  schema: personalProjectSchema,
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.{pl,en}.md', base: './src/content/books', generateId: withLanguageSuffix }),
  schema: bookSchema,
});

export const collections = { profile, education, employers, workProjects, projects, books };

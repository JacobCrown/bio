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

const profile = defineCollection({
  loader: glob({ pattern: 'profile.yaml', base: './src/content/profile' }),
  schema: profileSchema,
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/education' }),
  schema: educationSchema,
});

const employers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/employers' }),
  schema: employerSchema,
});

const workProjects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work-projects' }),
  schema: workProjectSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: personalProjectSchema,
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: bookSchema,
});

export const collections = { profile, education, employers, workProjects, projects, books };

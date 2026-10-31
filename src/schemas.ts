/**
 * Content schemas — the single source of truth for every content type.
 *
 * - Zod validates your content at build/dev time. A wrong rating, a malformed
 *   date or a missing required field fails the build with a readable message
 *   that names the offending file.
 * - TypeScript types are inferred from the schemas (see the exports at the
 *   bottom), so components are always typed against the real data shape.
 *
 * Schemas are wired to collections in `src/content.config.ts`.
 * Field-by-field documentation lives in README.md.
 */
import { z } from 'astro/zod';
import type { SchemaContext } from 'astro/content/config';

// ---------------------------------------------------------------------------
// Shared building blocks
// ---------------------------------------------------------------------------

/**
 * Accepts `2024-03` (month precision) or `2024-03-15` (day precision).
 * Always resolved to a UTC Date, so the same date renders everywhere.
 */
const dateField = z
  .union([z.date(), z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/)], {
    error: 'Dates must be written as YYYY-MM or YYYY-MM-DD (e.g. 2024-03 or 2024-03-15).',
  })
  .transform((value) => {
    if (value instanceof Date) return value;
    return new Date(value.length === 7 ? `${value}-01` : value);
  })
  .refine((date) => !Number.isNaN(date.getTime()), { error: 'This is not a real calendar date.' });

const text = z.string().trim().min(1);
const stack = z.array(text).min(1, 'List at least one technology.');
const link = z.object({ label: text, url: z.url() });

/** Marks sample content. Remove the line from a file once the content is real. */
const dummy = z.boolean().default(false);

const startBeforeEnd = <T extends { startDate?: Date | null; endDate?: Date | null }>(data: T) =>
  !data.startDate || !data.endDate || data.endDate >= data.startDate;
const startBeforeEndMessage = { error: 'endDate must not be earlier than startDate.', path: ['endDate'] };

// ---------------------------------------------------------------------------
// Profile  ·  src/content/profile/profile.yaml  (exactly one entry)
// ---------------------------------------------------------------------------

export const profileSchema = ({ image }: SchemaContext) =>
  z.object({
    firstName: text,
    lastName: text,
    title: text,
    location: z.object({ city: text, country: text }),
    /** Short biography. Markdown allowed. */
    bio: text,
    photo: image(),
    photoAlt: text.optional(),
    links: z.object({
      github: z.url(),
      linkedin: z.url(),
      email: z.email(),
    }),
    /** Path of a file in /public, e.g. "/cv.pdf". Omit to hide the CV link. */
    cv: z.string().startsWith('/', 'Use a path starting with "/", e.g. "/cv.pdf" (file lives in /public).').optional(),
    dummy,
  });

// ---------------------------------------------------------------------------
// Education  ·  src/content/education/<slug>.yaml  (one file per degree)
// ---------------------------------------------------------------------------

export const educationSchema = ({ image }: SchemaContext) =>
  z
    .object({
      institution: text,
      /** University logo / emblem. */
      logo: image().optional(),
      website: z.url().optional(),
      location: text.optional(),
      /** e.g. "Master of Science", "Bachelor of Engineering". */
      degree: text,
      /** e.g. "Computer Science". */
      field: text.optional(),
      startDate: dateField,
      /** Leave out (or `null`) if still studying. */
      endDate: dateField.nullable().default(null),
      /** Thesis title, specialisation, honours… Markdown allowed. */
      description: text.optional(),
      dummy,
    })
    .refine(startBeforeEnd, startBeforeEndMessage);

// ---------------------------------------------------------------------------
// Employer  ·  src/content/employers/<slug>.yaml
// ---------------------------------------------------------------------------

export const employerSchema = ({ image }: SchemaContext) =>
  z
    .object({
      name: text,
      website: z.url().optional(),
      logo: image().optional(),
      location: text.optional(),
      /** Your job title at the company (optional; project roles are separate). */
      position: text.optional(),
      startDate: dateField,
      /** Leave out (or write `null`) for current employment. */
      endDate: dateField.nullable().default(null),
      /** One or two sentences about the company or the engagement. */
      description: text.optional(),
      dummy,
    })
    .refine(startBeforeEnd, startBeforeEndMessage);

// ---------------------------------------------------------------------------
// Work project (belongs to an employer)  ·  src/content/work-projects/**/*.md
// Markdown body = long, detailed write-up (optional).
// ---------------------------------------------------------------------------

export const workProjectSchema = () =>
  z
    .object({
      /** Slug of the employer file, e.g. "northwind-analytics" (without the .pl/.en suffix). Validated in lib/content.ts. */
      employer: text,
      name: text,
      role: text,
      /** 1–3 sentences. Always visible in the timeline. */
      summary: text,
      startDate: dateField.optional(),
      /** Leave out while the project is still ongoing. */
      endDate: dateField.optional(),
      responsibilities: z.array(text).default([]),
      achievements: z.array(text).default([]),
      stack,
      links: z.array(link).default([]),
      dummy,
    })
    .refine(startBeforeEnd, startBeforeEndMessage);

// ---------------------------------------------------------------------------
// Personal project  ·  src/content/projects/<slug>.md
// Markdown body = detailed description (optional).
// ---------------------------------------------------------------------------

export const projectStatus = ['completed', 'ongoing', 'archived'] as const;

export const personalProjectSchema = ({ image }: SchemaContext) =>
  z
    .object({
      name: text,
      summary: text,
      repo: z.url(),
      demo: z.url().optional(),
      image: image().optional(),
      imageAlt: text.optional(),
      stack,
      startDate: dateField.optional(),
      endDate: dateField.optional(),
      status: z.enum(projectStatus),
      /** Featured projects are also shown on the home page. */
      featured: z.boolean().default(false),
      dummy,
    })
    .refine(startBeforeEnd, startBeforeEndMessage);

// ---------------------------------------------------------------------------
// Book  ·  src/content/books/<slug>.md
// Markdown body = your personal review (optional).
// ---------------------------------------------------------------------------

export const bookSchema = ({ image }: SchemaContext) =>
  z
    .object({
      title: text,
      author: text,
      /** Falls back to a typographic cover when omitted. */
      cover: image().optional(),
      startedAt: dateField.optional(),
      finishedAt: dateField,
      /** Whole number, 1 (poor) to 10 (outstanding). */
      rating: z.number().int().min(1).max(10),
      /** What the book is about. Markdown allowed. Kept separate from the review. */
      summary: text.optional(),
      tags: z.array(text).default([]),
      dummy,
    })
    .refine((b) => !b.startedAt || b.finishedAt >= b.startedAt, {
      error: 'finishedAt must not be earlier than startedAt.',
      path: ['finishedAt'],
    });

// ---------------------------------------------------------------------------
// Inferred types — import these in components instead of redefining shapes.
// ---------------------------------------------------------------------------

type Infer<F extends (ctx: SchemaContext) => z.ZodType> = z.infer<ReturnType<F>>;

export type ProfileData = Infer<typeof profileSchema>;
export type EducationData = Infer<typeof educationSchema>;
export type EmployerData = Infer<typeof employerSchema>;
export type WorkProjectData = z.infer<ReturnType<typeof workProjectSchema>>;
export type PersonalProjectData = Infer<typeof personalProjectSchema>;
export type BookData = Infer<typeof bookSchema>;
export type ProjectStatus = (typeof projectStatus)[number];
export type ExternalLink = z.infer<typeof link>;

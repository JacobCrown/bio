/**
 * Language helpers. Content files carry the language in their name
 * (`wust-bach.pl.yaml`), pages live under `/pl/…` and `/en/…`, and UI strings
 * come from `ui.ts`. Nothing here depends on astro:content.
 */

export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

/** `og:locale` values for social-share tags. */
export const ogLocales: Record<Locale, string> = { pl: 'pl_PL', en: 'en_US' };

/** Splits a content id such as `books/small-systems.pl` into slug and language. */
export function splitId(id: string): { slug: string; locale: Locale } {
  const match = /^(.+)\.(pl|en)$/.exec(id);
  if (!match) throw new Error(`Content id "${id}" must end with a language suffix (.pl or .en).`);
  return { slug: match[1]!, locale: match[2] as Locale };
}

/** Public URL of a page in a given language, e.g. localePath('en', '/books/') -> '/en/books/'. */
export const localePath = (locale: Locale, path: string) => `/${locale}${path}`;

/** Language of the current page. Pages outside /pl/ or /en/ (such as 404) fall back to the default. */
export const localeOf = (astro: { currentLocale?: string }): Locale =>
  (astro.currentLocale as Locale | undefined) ?? defaultLocale;

export type PluralForms = { other: string } & Partial<Record<'zero' | 'one' | 'two' | 'few' | 'many', string>>;

/** Picks the right plural form for `n` in the given language (Polish has four). */
export function plural(locale: Locale, n: number, forms: PluralForms): string {
  const rule = new Intl.PluralRules(locale).select(n) as keyof PluralForms;
  return forms[rule] ?? forms.other;
}

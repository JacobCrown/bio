import type { Locale } from '../i18n';
import { ui } from '../i18n/ui';

const utc = { timeZone: 'UTC' } as const;

/** "Mar 2022" (or "mar 2022" in Polish) */
export const formatMonth = (date: Date, locale: Locale) =>
  new Intl.DateTimeFormat(locale, { ...utc, month: 'short', year: 'numeric' }).format(date);
/** "15 Mar 2022" */
export const formatDay = (date: Date, locale: Locale) =>
  new Intl.DateTimeFormat(locale, { ...utc, day: 'numeric', month: 'short', year: 'numeric' }).format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** "Mar 2022 – Jun 2023", "Mar 2022 – present", or just "Mar 2022". */
export function formatRange(
  start: Date | null | undefined,
  end: Date | null | undefined,
  locale: Locale,
  { ongoing = false } = {},
): string {
  if (!start && !end) return '';
  if (!start) return formatMonth(end!, locale);
  const from = formatMonth(start, locale);
  if (end) return from === formatMonth(end, locale) ? from : `${from} – ${formatMonth(end, locale)}`;
  return ongoing ? `${from} – ${ui[locale].present}` : from;
}

/** "1 yr 7 mos" (or "1 rok 7 mies." in Polish) between two dates (end defaults to today). */
export function formatDuration(start: Date, end: Date | null, locale: Locale): string {
  const to = end ?? new Date();
  const total = Math.max(
    1,
    (to.getUTCFullYear() - start.getUTCFullYear()) * 12 + (to.getUTCMonth() - start.getUTCMonth()) + 1,
  );
  const years = Math.floor(total / 12);
  const months = total % 12;
  const t = ui[locale];
  return [years && t.years(years), months && t.months(months)].filter(Boolean).join(' ');
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Mar 2022" */
export const formatMonth = (date: Date) => `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
/** "15 Mar 2022" */
export const formatDay = (date: Date) => `${date.getUTCDate()} ${formatMonth(date)}`;
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** "Mar 2022 – Jun 2023", "Mar 2022 – present", or just "Mar 2022". */
export function formatRange(start?: Date | null, end?: Date | null, { ongoing = false } = {}): string {
  if (!start && !end) return '';
  if (!start) return formatMonth(end!);
  const from = formatMonth(start);
  if (end) return from === formatMonth(end) ? from : `${from} – ${formatMonth(end)}`;
  return ongoing ? `${from} – present` : from;
}

/** "1 yr 7 mos" between two dates (end defaults to today). */
export function formatDuration(start: Date, end: Date | null = null): string {
  const to = end ?? new Date();
  const total = Math.max(
    1,
    (to.getUTCFullYear() - start.getUTCFullYear()) * 12 + (to.getUTCMonth() - start.getUTCMonth()) + 1,
  );
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years && `${years} yr${years > 1 ? 's' : ''}`, months && `${months} mo${months > 1 ? 's' : ''}`]
    .filter(Boolean)
    .join(' ');
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

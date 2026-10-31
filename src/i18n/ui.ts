/**
 * Interface strings. Every key exists in both languages: `pl` is typed as
 * `typeof en`, so a missing translation is a type error.
 * Content (names, descriptions, reviews) is NOT here; it lives in the
 * `*.pl.*` / `*.en.*` content files.
 */
import { plural, type Locale } from './index';

const en = {
  skipToContent: 'Skip to content',
  sampleBanner: 'Sample content — this site is currently showing placeholder data.',
  languageSwitch: 'Language',
  nav: {
    home: 'Home',
    education: 'Education',
    experience: 'Experience',
    projects: 'Projects',
    reading: 'Reading',
  },
  contact: { github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
  downloadCv: 'Download CV',
  defaultDescription: (name: string, title: string, city: string, country: string) =>
    `${name}, ${title.toLowerCase()} based in ${city}, ${country}.`,
  present: 'present',
  years: (n: number) => `${n} ${plural('en', n, { one: 'yr', other: 'yrs' })}`,
  months: (n: number) => `${n} ${plural('en', n, { one: 'mo', other: 'mos' })}`,
  sample: 'Sample',
  sampleTitle: 'Sample content — replace or delete this entry',
  technologies: 'Technologies',
  ratedOutOf: (value: number, max: number) => `Rated ${value} out of ${max}`,
  portraitOf: (name: string) => `Portrait of ${name}`,
  coverOf: (title: string) => `Cover of ${title}`,
  screenshotOf: (name: string) => `Screenshot of ${name}`,
  projectsAt: (name: string) => `Projects at ${name}`,
  sections: {
    education: 'Education',
    experience: 'Experience',
    projects: 'Projects',
    reading: 'Recently read',
  },
  allProjects: 'All projects',
  readingJournal: 'Reading journal',
  readMore: 'Read more',
  showLess: 'Show less',
  responsibilities: 'Responsibilities',
  results: 'Results',
  details: 'Details',
  liveDemo: 'Live demo',
  status: { completed: 'Completed', ongoing: 'Ongoing', archived: 'Archived' },
  projectsPage: {
    description: 'Personal and open-source projects.',
    intro: 'Personal and open-source projects, newest first.',
  },
  bookCount: (n: number) => `${n} ${plural('en', n, { one: 'book', other: 'books' })}`,
  booksPage: {
    description: 'Books I have read, with ratings, summaries and personal reviews.',
    intro: (n: number) =>
      `A personal reading journal — ${n} ${plural('en', n, { one: 'book', other: 'books' })}, newest first, with my ratings and notes.`,
  },
  finished: 'Finished',
  started: 'Started',
  took: 'Took',
  days: (n: number) => `${n} ${plural('en', n, { one: 'day', other: 'days' })}`,
  readMyReview: 'Read my review',
  readSummary: 'Read the summary',
  tags: 'Tags',
  summary: 'Summary',
  myReview: 'My review',
  noNotes: 'No notes on this one yet.',
  readBefore: 'Read before',
  readAfter: 'Read after',
  otherBooks: 'Other books',
  notFound: {
    title: 'Page not found',
    intro: "That page doesn't exist — it may have moved.",
  },
};

export type UiStrings = typeof en;

const pl: UiStrings = {
  skipToContent: 'Przejdź do treści',
  sampleBanner: 'Przykładowa treść — ta strona pokazuje obecnie dane zastępcze.',
  languageSwitch: 'Język',
  nav: {
    home: 'Start',
    education: 'Wykształcenie',
    experience: 'Doświadczenie',
    projects: 'Projekty',
    reading: 'Książki',
  },
  contact: { github: 'GitHub', linkedin: 'LinkedIn', email: 'E-mail' },
  downloadCv: 'Pobierz CV',
  defaultDescription: (name, title, city, country) => `${name} — ${title.toLowerCase()}, ${city}, ${country}.`,
  present: 'obecnie',
  years: (n) => `${n} ${plural('pl', n, { one: 'rok', few: 'lata', many: 'lat', other: 'lat' })}`,
  months: (n) => `${n} ${plural('pl', n, { one: 'mies.', other: 'mies.' })}`,
  sample: 'Przykład',
  sampleTitle: 'Przykładowa treść — zastąp ją lub usuń ten wpis',
  technologies: 'Technologie',
  ratedOutOf: (value, max) => `Ocena: ${value} z ${max}`,
  portraitOf: (name) => `Portret: ${name}`,
  coverOf: (title) => `Okładka: ${title}`,
  screenshotOf: (name) => `Zrzut ekranu: ${name}`,
  projectsAt: (name) => `Projekty w: ${name}`,
  sections: {
    education: 'Wykształcenie',
    experience: 'Doświadczenie',
    projects: 'Projekty',
    reading: 'Ostatnio przeczytane',
  },
  allProjects: 'Wszystkie projekty',
  readingJournal: 'Dziennik czytelniczy',
  readMore: 'Czytaj więcej',
  showLess: 'Pokaż mniej',
  responsibilities: 'Zakres obowiązków',
  results: 'Rezultaty',
  details: 'Szczegóły',
  liveDemo: 'Wersja demo',
  status: { completed: 'Zakończony', ongoing: 'W toku', archived: 'Zarchiwizowany' },
  projectsPage: {
    description: 'Projekty osobiste i open source.',
    intro: 'Projekty osobiste i open source, od najnowszych.',
  },
  bookCount: (n) => `${n} ${plural('pl', n, { one: 'książka', few: 'książki', many: 'książek', other: 'książek' })}`,
  booksPage: {
    description: 'Książki, które przeczytałem, z ocenami, streszczeniami i recenzjami.',
    intro: (n) =>
      `Osobisty dziennik czytelniczy — ${n} ${plural('pl', n, { one: 'książka', few: 'książki', many: 'książek', other: 'książek' })}, od najnowszych, z moimi ocenami i notatkami.`,
  },
  finished: 'Przeczytano',
  started: 'Rozpoczęto',
  took: 'Zajęło',
  days: (n) => `${n} ${plural('pl', n, { one: 'dzień', other: 'dni' })}`,
  readMyReview: 'Czytaj moją recenzję',
  readSummary: 'Czytaj streszczenie',
  tags: 'Tagi',
  summary: 'Streszczenie',
  myReview: 'Moja recenzja',
  noNotes: 'Na razie brak notatek.',
  readBefore: 'Wcześniej',
  readAfter: 'Później',
  otherBooks: 'Inne książki',
  notFound: {
    title: 'Nie znaleziono strony',
    intro: 'Ta strona nie istnieje — może została przeniesiona.',
  },
};

export const ui: Record<Locale, UiStrings> = { pl, en };

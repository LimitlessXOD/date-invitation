export type ScreenStage =
  | 'intro'
  | 'question'
  | 'genre-select'
  | 'agreement'
  | 'number-joke'
  | 'availability'
  | 'cinema-flow'
  | 'summary'
  | 'confirmation';

export type MovieGenre =
  | 'horror'
  | 'comedy'
  | 'romance'
  | 'action'
  | 'thriller'
  | 'animation'
  | 'drama'
  | 'fantasy';

export type TimePreference = 'Afternoon' | 'Evening' | "I'm flexible";

export interface GenreOption {
  id: MovieGenre;
  label: string;
  name: string;
  icon: string;
  tagline: string;
  isHorror?: boolean;
  selectedMessage: string;
  subMessage?: string;
  agreementText: string;
}

export interface SelectedDateInfo {
  dateStr: string; // ISO format YYYY-MM-DD
  dayOfWeek: string; // e.g. "Sat"
  dayNumber: number; // e.g. 29
  monthName: string; // e.g. "Aug"
  formattedDisplay: string; // e.g. "Saturday, Aug 29"
}

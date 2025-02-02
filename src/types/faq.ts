export interface FAQ {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
  translations: Record<string, FAQTranslation>;
}

export interface FAQTranslation {
  question: string;
  answer: string;
}

export type Language = 'en' | 'hi' | 'bn';

export const SUPPORTED_LANGUAGES: Record<Language, string> = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
};
export interface Project {
  id: string;
  project_name: string;
  city: string;
  slug: string;
  short_description_en: string;
  long_description_en: string;
  images: string[];
  map_embed_url: string;
  pdf_url: string;
  units: Unit[];
  created_at: string;
}

export interface Unit {
  id: string;
  unit_number: string;
  floor: number;
  surface: number;
  status: 'available' | 'reserved' | 'sold';
  price?: number;
}

export interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  language: 'en' | 'fr' | 'he' | 'ru';
  project_selected?: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'sold' | 'not_interested';
  created_at: string;
}

export interface Comment {
  id: string;
  client_id: string;
  author: string;
  comment_text: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  date: string;
  time: string;
  type: 'phone' | 'in_person' | 'zoom';
  location?: string;
  notes?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'collaborator' | 'read_only';
  created_at: string;
}

export type Language = 'en' | 'fr' | 'he' | 'ru';

export interface Translations {
  [key: string]: string;
}
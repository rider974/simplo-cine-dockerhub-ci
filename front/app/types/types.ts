// types.ts

// Interface générale pour les attributs d'une entité
export interface BaseAttributes {
  id: number;
  created_at?: Date;
  updated_at?: Date;
}

// Interface pour les salles (Halls)
export interface HallAttributes extends BaseAttributes {
  name: string;
  capacity: number;
}

// Interface pour les films (Movies)
export interface MovieAttributes extends BaseAttributes {
  title: string;
  description?: string;
  release_date?: Date;
  duration?: number;
  poster?: File | null;
  hall?: HallAttributes;
}

// Interface pour les séances (Screenings)
export interface ScreeningAttributes extends BaseAttributes {
  movieId: number;
  hallId: number;
  date: Date;
  startTime: string;
  duration: number;
}

export interface MovieEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  desc: string;
}

export interface Movie {
  id: number;
  title: string;
  description?: string;
  release_date?: string;
  duration?: number;
  created_at: string;
  updated_at: string;
}

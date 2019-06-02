export type GenreType = 'action' | 'adventure' | 'biography' | 'comedy' | 'crime'
  | 'drama' | 'history' | 'mystery' | 'scifi' | 'sport' | 'thriller';

export const genreType = {
  action: 'action' as GenreType,
  adventure: 'adventure' as GenreType,
  biography: 'biography' as GenreType,
  comedy: 'comedy' as GenreType,
  crime: 'crime' as GenreType,
  drama: 'drama' as GenreType,
  history: 'history' as GenreType,
  mystery: 'mystery' as GenreType,
  scifi: 'scifi' as GenreType,
  sport: 'sport' as GenreType,
  thriller: 'thriller' as GenreType
};


export class Movie {
  id: number;
  key: string;
  name: string;
  description: string;
  genres: string[];
  rate: string;
  length: string;
  img: string;
}

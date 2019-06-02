import {Injectable} from '@angular/core';
import {Observable, of as observableOf, throwError as observableThrowError} from 'rxjs';
import {Movie} from './movie.model';
import {movies} from './movie.mock-data';

@Injectable()
export class MovieHttpService {
  menuToggled = false;
  selectedGenres: string[] = [];

  getMovieDetails(movieId: string): Observable<Movie> {
    // mock data instead of http call
    const filteredMovies = movies.filter(movie => movie.id.toString() === movieId);
    if (filteredMovies.length > 0) {
      return observableOf(filteredMovies[0]);
    }
    return observableThrowError('Not found');
  }

  getMovieGenres(): Observable<string[]> {
    return observableOf(['action', 'adventure', 'biography', 'comedy', 'crime'
      , 'drama', 'history', 'mystery', 'scifi', 'sport', 'thriller']);
  }

  getAllMovies(): Observable<Movie[]> {
    return observableOf(movies);
  }
}

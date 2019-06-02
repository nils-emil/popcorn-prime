import {Component, OnInit} from '@angular/core';
import {NavigationContext} from './navigation-context';
import {Router} from '@angular/router';
import {MovieHttpService} from './movie.http-service';
import {Movie} from './movie.model';

@Component({
  selector: 'app-movie-row',
  template: `
    <div class="container">
      <div *ngIf="navigationContext.movieNameKeyword.length > 0">
        <h1 class="heading-primary">Search results for '{{navigationContext.movieNameKeyword}}'</h1>
        <div class="row single-line-row align-middle px-4">
           <span class="scroll__left align-middle pr-5 fa fa-arrow-left"
                 (mouseover)="scrollLeft('keyWordSearch')"
                 (mouseout)="cancelScroll()"></span>
          <div [attr.id]="'keyWordSearch'" class="row single-line-row mb-5">
            <div class="py-4" *ngFor="let movie of movies">
              <div class="col-md-6" *ngIf="matchesKeyword(movie)" (click)="goToMovieDetails(movie)">
                <div class="film-card">
                  <img [src]="'assets/images/movie-covers/' + movie?.img">
                </div>
              </div>
            </div>
          </div>
          <span class="scroll__right pl-5 fa fa-arrow-right align-content-center"
                (mouseover)="scrollRight('keyWordSearch')"
                (mouseout)="cancelScroll()"></span>
        </div>
      </div>
      <ng-container *ngIf="navigationContext.movieNameKeyword.length == 0">
        <div *ngFor="let genre of genres">
          <ng-container *ngIf="isGenreAllowed(genre)">
            <h1 class="heading-primary pl-5">{{genre.toUpperCase()}}</h1>
            <div class="mozilla-scrollbar-hack">
              <div class="row single-line-row align-middle px-4">
                 <span class="scroll__left align-middle pr-5 fa fa-arrow-left"
                       (mouseover)="scrollLeft(genre)"
                       (mouseout)="cancelScroll()"></span>
                <div class="mozilla-scrollbar-hack">
                  <div [attr.id]="genre" class="row single-line-row mb-5">
                    <div class="py-4" *ngFor="let movie of movies">
                      <div class="col-md-6" *ngIf="isInCorrectGenre(movie, genre)" (click)="goToMovieDetails(movie)">
                        <div class="film-card">
                          <img [src]="'assets/images/movie-covers/' + movie?.img">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="scroll__right pl-5 fa fa-arrow-right align-content-center"
                      (mouseover)="scrollRight(genre)"
                      (mouseout)="cancelScroll()"></span>
              </div>
            </div>

          </ng-container>
        </div>
      </ng-container>
    </div>
  `,
})
export class MovieRowComponent implements OnInit {
  movies: Movie[];
  genres: any[];
  scrollerInterval: any;

  constructor(private movieHttpService: MovieHttpService,
              private navigationContext: NavigationContext,
              private router: Router) {
  }

  ngOnInit(): void {
    this.movieHttpService.getMovieGenres().subscribe(
      response => this.genres = response
    );
    this.movieHttpService.getAllMovies().subscribe(
      response => this.movies = response
    );
  }

  matchesKeyword(movie: Movie): boolean {
    return movie.name.toUpperCase().indexOf(this.navigationContext.movieNameKeyword.toUpperCase()) > -1;
  }

  isInCorrectGenre(movie: Movie, genre: string): boolean {
    return movie.genres.indexOf(genre) > -1;
  }

  isGenreAllowed(genre: string): boolean {
    return this.navigationContext.selectedGenres.length === 0
      || this.navigationContext.selectedGenres.indexOf(genre) > -1;
  }

  goToMovieDetails(movie: Movie) {
    this.router.navigate(['/movie-details', movie.id]);
  }

  public scrollRight(id: string): void {
    this.sideScroll(id, 10);
  }

  public scrollLeft(id: string): void {
    this.sideScroll(id, -10);
  }

  public sideScroll(id: string, increment: number): void {
    const elementById = document.getElementById(id);
    if (elementById) {
      this.scrollerInterval = setInterval(() => {
        elementById.scrollLeft += increment;
      }, 10);
    }
  }

  cancelScroll(): void {
    clearInterval(this.scrollerInterval);
  }
}

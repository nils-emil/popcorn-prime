import {Component, OnInit} from '@angular/core';
import {NavigationContext} from './navigation-context';
import {MovieHttpService} from './movie.http-service';

@Component({
  selector: 'search-block',
  template: `
    <button type="button" class="nav-bar__button rounded-circle" (click)="toggleMenu()">
      <span class="fa fa-search"></span>
    </button>
    <div class="nav-bar p-3" *ngIf="navigationContext.menuToggled">
      <!--MOVIE-SEARCH-->
      <label class="pt-5" for="exampleFormControlInput1">Keyword search</label>
      <input type="text"
             class="form-control"
             [(ngModel)]="navigationContext.movieNameKeyword"
             placeholder="Type keyword">
      <!--GENRE-->
      <ng-container *ngIf="!navigationContext.movieNameKeyword 
      || navigationContext.movieNameKeyword.length === 0">
        <p class="pt-3">Select genre</p>
        <ul>
          <div class="form-check py-1" *ngFor="let genre of genres">
            <input class="form-check-input "
                   [checked]="isChecked(genre)"
                   type="checkbox"
                   (click)="toggleGenre(genre)"
                   value=""
                   [attr.id]="genre + '-input'">
            <label class="form-check-label" for="{{genre}} + '-input'">
              {{genre.charAt(0).toUpperCase() + genre.slice(1)}}
            </label>
          </div>
        </ul>
      </ng-container>
      <button class="btn btn-dark mt-4" (click)="resetFilter()">Clear filter</button>
    </div>
  `,
})
export class SearchBlockComponent implements OnInit {
  genres: string[] = [];
  movieNameKeyword = '';

  constructor(private movieHttpService: MovieHttpService,
              private navigationContext: NavigationContext) {
  }

  ngOnInit(): void {
    this.movieHttpService.getMovieGenres().subscribe(
      response => this.genres = response
    );
  }

  isChecked(genre: string): boolean {
    return this.navigationContext.selectedGenres.indexOf(genre) > -1;
  }

  resetFilter(): void {
    this.navigationContext.selectedGenres = [];
    this.navigationContext.movieNameKeyword = '';
  }

  toggleGenre(genre: string): void {
    let index = this.navigationContext.selectedGenres.indexOf(genre);
    if (index > -1) {
      if (this.navigationContext.selectedGenres.length === 1) {
        this.navigationContext.selectedGenres = [];
      } else {
        delete this.navigationContext.selectedGenres[index];
      }
    } else {
      this.navigationContext.selectedGenres.push(genre);
    }
  }

  toggleMenu() {
    this.navigationContext.menuToggled = !this.navigationContext.menuToggled;
  }
}

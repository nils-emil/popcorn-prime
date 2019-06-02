import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieHttpService} from './movie.http-service';
import {Movie} from './movie.model';

@Component({
  selector: 'app-movie-detail',
  template: `
    <button type="button" class="nav-bar__button nav-bar__button-left rounded-circle" (click)="navigateToMainPage()">
      <span class="fa fa-arrow-left"></span>
    </button>
    <div class="container details-container pt-5">
      <div class="row">
        <div class="col-md-12 col-lg-3 pt-lg-5">
          <img class='detail-view-image' src="../assets/images/movie-covers/{{movie?.img}}">
        </div>
        <div class="col-md-12 col-lg-9 p-2 pt-5">
          <table class="table">
            <tbody>
            <tr>
              <td>Name</td>
              <td>{{movie?.name}}</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td>{{movie?.description}}</td>
            </tr>
            <tr>
              <th scope="row">Genres</th>
              <td>{{movie?.genres}}</td>
            </tr>
            <tr>
              <th scope="row">Length</th>
              <td>{{movie?.length}}</td>
            </tr>
            <tr>
              <th scope="row">Ratings</th>
              <td>{{movie?.rate}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private movieHttpService: MovieHttpService) {
  }

  navigateToMainPage() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.movieHttpService.getMovieDetails(this.route.snapshot.paramMap.get('id'))
      .subscribe(response => this.movie = response,
        () => this.router.navigate(['/movie-details/error/404']));
  }

}

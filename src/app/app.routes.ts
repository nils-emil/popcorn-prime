import {Routes} from '@angular/router';
import {MovieOverViewComponent} from './movie-over-view.component';
import {MovieDetailComponent} from './movie-detail.component';
import {NotFoundComponent} from './not-found.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: MovieOverViewComponent
  },
  {
    path: 'movie-details/:id',
    component: MovieDetailComponent
  },
  {
    path: 'movie-details/error/404',
    component: NotFoundComponent
  }
];

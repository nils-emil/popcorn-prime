import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {MovieRowComponent} from './movie-row.component';
import {SearchBlockComponent} from './search-block.component';
import {NotFoundComponent} from './not-found.component';
import {MovieOverViewComponent} from './movie-over-view.component';
import {NavigationContext} from './navigation-context';
import {MovieHttpService} from './movie.http-service';
import {MovieDetailComponent} from './movie-detail.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  imports: [BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  // tslint:disable-next-line:whitespace
  declarations: [AppComponent,
    MovieRowComponent,
    SearchBlockComponent,
    NotFoundComponent,
    MovieDetailComponent,
    MovieOverViewComponent],
  providers: [NavigationContext,
    MovieHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

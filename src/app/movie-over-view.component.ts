import {Component} from '@angular/core';
import {NavigationContext} from './navigation-context';

@Component({
  selector: 'app-movie-overview',
  template: `
    <div class="row m-0">
      <movie-row class="movie-content__nav-bar-active p-0 pt-5 col-sm-10 col-7" *ngIf="isMenuToggled()"></movie-row>
      <movie-row class="movie-content__nav-bar-inactive p-0 pt-5 col-12" *ngIf="!isMenuToggled()"></movie-row>
      <search-block class="p-0" [ngClass]="{'col-sm-2 col-5' : isMenuToggled()}"></search-block>
    </div>
  `,
})
export class MovieOverViewComponent {
  menuToggled = false;

  constructor(private navigationContext: NavigationContext) {
  }

  isMenuToggled(): boolean {
    return this.navigationContext.menuToggled;
  }

}

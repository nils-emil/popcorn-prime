import {Injectable} from '@angular/core';

@Injectable()
export class NavigationContext {
  movieNameKeyword = '';
  menuToggled = false;
  selectedGenres: string[] = [];
}

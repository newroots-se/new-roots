import { Component } from '@angular/core';
import { HeaderSearch } from './header-search/header-search';
import { HeaderLinks } from './header-links/header-links';

@Component({
  selector: 'nr-header',
  imports: [HeaderSearch, HeaderLinks],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showSearchInput = false;
  showMenuLinks = false;
}

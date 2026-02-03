import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Links } from '../../links/links';

@Component({
  selector: 'nr-header-links',
  imports: [Links],
  templateUrl: './header-links.html',
  styleUrl: './header-links.scss',
})
export class HeaderLinks {
  @Input() showMenuLinks = false;
  @Output() showMenuLinksChange = new EventEmitter<boolean>();

  toggleMenu(): void {
    this.showMenuLinks = !this.showMenuLinks;
    this.showMenuLinksChange.emit(this.showMenuLinks);
  }
}

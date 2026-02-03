import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'nr-header-search',
  imports: [],
  templateUrl: './header-search.html',
  styleUrl: './header-search.scss',
})
export class HeaderSearch {
  @Input() showSearchInput = false;
  @Output() showSearchInputChange = new EventEmitter<boolean>();
  @Input() showMenuLinks = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  private eRef = inject(ElementRef);

  toggleSearch(): void {
    this.showSearchInput = !this.showSearchInput;
    this.showSearchInputChange.emit(this.showSearchInput);
    if (this.showSearchInput) {
      // Wait a tick for the DOM to render the input, then focus
      setTimeout(() => this.searchInput?.nativeElement.focus());
    }
  }

  // Listens for the Escape key globally
  @HostListener('document:keydown.escape')
  onEscapeKeydown() {
    if (this.showSearchInput) {
      this.toggleSearch();
    }
  }

  // This listens to every click on the document
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.showSearchInput) {
      // If the click target is NOT inside this component's element
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.toggleSearch();
      }
    }
  }

  onSearch(): void {
    // search logic
  }
}

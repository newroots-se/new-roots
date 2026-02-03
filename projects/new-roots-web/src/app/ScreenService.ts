import { Injectable, signal, inject, afterNextRender } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenService {
  private document = inject(DOCUMENT);

  // Initialize with 0 or a sensible default for the server
  readonly screenWidth = signal(0);

  constructor() {
    // This logic will ONLY run in the browser after the first render
    afterNextRender(() => {
      // Set initial value now that we know we are in the browser
      this.screenWidth.set(this.document.documentElement.clientWidth);

      fromEvent(window, 'resize').subscribe(() => {
        this.screenWidth.set(this.document.documentElement.clientWidth);
      });
    });
  }
}

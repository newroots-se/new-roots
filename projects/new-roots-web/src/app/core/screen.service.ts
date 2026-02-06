import { Injectable, signal, inject, afterNextRender, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenService {
  private document = inject(DOCUMENT);

  readonly screenWidth = signal(0);

  readonly isSmallScreen = computed(() => this.screenWidth() <= 450);
  readonly isLargeScreen = computed(() => this.screenWidth() >= 1280);
  readonly isBreakPoint = computed(() => this.screenWidth() >= 800);

  constructor() {
    afterNextRender(() => {
      this.screenWidth.set(this.document.documentElement.clientWidth);

      fromEvent(window, 'resize').subscribe(() => {
        this.screenWidth.set(this.document.documentElement.clientWidth);
      });
    });
  }
}

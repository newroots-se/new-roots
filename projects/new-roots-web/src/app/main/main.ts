import { Component, computed, inject } from '@angular/core';
import { LinksService } from '../LinksService';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../ScreenService';
import { NgTemplateOutlet } from '@angular/common';
import { HEX_SVGs, ICON_SVGs } from './main.constants';

@Component({
  selector: 'nr-main',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private sanitizer = inject(DomSanitizer);
  private links = inject(LinksService).links;
  private screenWidth = inject(ScreenService).screenWidth;
  private isSmallScreen = computed(() => this.screenWidth() <= 450);
  private isLargeScreen = computed(() => this.screenWidth() >= 1280);
  private isBreakPoint = computed(() => this.screenWidth() >= 800);

  rows = computed(() => {
    const data = this.links();
    if (this.isLargeScreen()) {
      return {
        row1: data.slice(0, 4),
        row2: data.slice(4, 8),
        row3: [],
        row4: [],
      };
    }
    if (this.isSmallScreen()) {
      return {
        row1: data.slice(0, 2),
        row2: data.slice(2, 4),
        row3: data.slice(4, 6),
        row4: data.slice(6, 8),
      };
    }
    return {
      row1: data.slice(0, 2),
      row2: data.slice(2, 6),
      row3: data.slice(6, 8),
      row4: [],
    };
  });

  emptyHexagon = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(HEX_SVGs.empty(this.isBreakPoint())),
  );

  scopeHexagon = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(HEX_SVGs.scope(this.isBreakPoint())),
  );

  emptyHexColors = computed(() => {
    const r3 = this.rows().row3.length;
    const r4 = this.rows().row4.length;

    return {
      row1Start: 'var(--categories-positive-culture, #CCF1B1)',
      row1End: 'var(--categories-positive-health, #F1B1BC)',
      row2Start:
        r3 === 0 && r4 === 0
          ? 'var(--categories-positive-school, #ECB1F1)'
          : r4 === 0
            ? 'var(--categories-positive-legal, #F6EAAC)'
            : 'var(--categories-positive-culture, #CCF1B1)',
      row2End: 'var(--categories-positive-housing, #B1F1D1)',
      row3Start:
        r4 === 0
          ? 'var(--categories-positive-school, #ECB1F1)'
          : 'var(--categories-positive-legal, #F6EAAC)',
      row4Start: 'var(--categories-positive-school, #ECB1F1)',
    };
  });

  wizard = {
    name: 'wizard',
    text: 'use our wizard to find your next step in settling in',
    route: '/wizard',
    colors: {
      positive: 'var(--icon-web-page-default, #FFF)',
      negative: 'var(--fixed-dark-accent2, #BF092F)',
      reactive: 'var(--categories-80-accent2, #450613)',
      inactive: 'var(--categories-10-accent2, #FFEAF0)',
    },
    hexagon: computed(() =>
      this.sanitizer.bypassSecurityTrustHtml(HEX_SVGs.wizard(this.isBreakPoint())),
    ),
    icon: computed(() =>
      this.sanitizer.bypassSecurityTrustHtml(ICON_SVGs.wizard(this.isBreakPoint())),
    ),
  };

  sponsor = {
    name: 'sponsor',
    sponsor: 'Volvo Cars',
    route: '/sponsor',
    text: 'this content is brought to you by:',
    colors: {
      positive: 'var(--icon-web-page-default, #FFF)',
      negative: 'var(--icon-secondary-default, #456BA1)',
      reactive: 'var(--categories-80-secondary, #1B365A)',
      inactive: 'var(--categories-10-secondary, #E5F8FF)',
    },
    hexagon: computed(() =>
      this.sanitizer.bypassSecurityTrustHtml(HEX_SVGs.sponsor(this.isBreakPoint())),
    ),
    icon: computed(() =>
      this.sanitizer.bypassSecurityTrustHtml(ICON_SVGs.sponsor(this.isBreakPoint())),
    ),
  };
}

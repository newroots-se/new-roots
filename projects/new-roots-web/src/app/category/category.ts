import { Component, computed, inject, input } from '@angular/core';
import { LinksService } from '../shared/links.service';
import { ScreenService } from '../core/screen.service';
import { HexData, HexRow } from '../shared/links.constants';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '../shared/safe-html.pipe';
import { GET_SPONSOR_DATA, HEX_SVGs } from '../main/main.constants';

@Component({
  selector: 'nr-category',
  imports: [RouterLink, SafeHtmlPipe],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  protected readonly category = input<string>();
  protected readonly links = inject(LinksService).links;
  protected readonly screen = inject(ScreenService);

  readonly allRows = computed<HexRow[]>(() => {
    const data: HexData[] = [
      { name: 'meet our expert' },
      { name: 'podcasts' },
      { name: 'become a member' },
      { name: 'wizard' },
      { name: 'news' },
      { name: 'events' },
      { name: 'contribute' },
      { name: 'forums' },
    ];
    const empty: HexData = {
      colors: {
        positive: `var(--background-transparent-negative-10)`,
        negative: `var(--background-transparent-negative-10)`,
        reactive: `var(--background-transparent-negative-10)`,
        inactive: `var(--background-transparent-negative-10)`,
      },
    };
    const link: HexData = this.links().find((link) => link.name === this.category()) ?? empty;
    if (this.screen.isLargeScreen()) {
      return [
        [empty, link, ...data.slice(0, 4), empty],
        [empty, this.sponsor(), ...data.slice(4, 8), empty],
      ];
    }
    if (this.screen.isSmallScreen()) {
      return [
        [link, ...data.slice(0, 2), empty],
        [empty, ...data.slice(2, 4), empty],
        [empty, ...data.slice(4, 6), empty],
        [empty, this.sponsor(), ...data.slice(6, 8)],
      ];
    }
    return [
      [empty, link, ...data.slice(0, 2), empty],
      [empty, ...data.slice(2, 6), empty],
      [empty, this.sponsor(), ...data.slice(6, 8), empty],
    ];
  });

  readonly scopedHexagon = () => HEX_SVGs.scoped(this.screen.isBreakPoint());

  readonly sponsor = computed(() => GET_SPONSOR_DATA(this.screen.isBreakPoint()));
}

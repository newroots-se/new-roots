import { Component, computed, inject } from '@angular/core';
import { LinksService } from '../shared/links.service';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../core/screen.service';
import { EMPTY_HEX_COLORS, GET_SPONSOR_DATA, GET_WIZARD_DATA, HEX_SVGs } from './main.constants';
import { SafeHtmlPipe } from '../shared/safe-html.pipe';
import { HexData, HexRow } from '../shared/links.constants';

@Component({
  selector: 'nr-main',
  imports: [RouterLink, SafeHtmlPipe],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private readonly links = inject(LinksService).links;
  protected readonly screen = inject(ScreenService);

  readonly allRows = computed<HexRow[]>(() => {
    const data: HexData[] = this.links();
    const empty = this.emptyHexColors();
    if (this.screen.isLargeScreen()) {
      return [
        [empty.row1Start, this.wizard(), ...data.slice(0, 4), empty.row1End],
        [empty.row2Start, ...data.slice(4, 8), this.sponsor(), empty.row2End],
      ];
    }
    if (this.screen.isSmallScreen()) {
      return [
        [this.wizard(), ...data.slice(0, 2), empty.row1End],
        [empty.row2Start, ...data.slice(2, 4), empty.row2End],
        [empty.row3Start, ...data.slice(4, 6), empty.row3End],
        [empty.row4Start, ...data.slice(6, 8), this.sponsor()],
      ];
    }
    return [
      [empty.row1Start, this.wizard(), ...data.slice(0, 2), empty.row1End],
      [empty.row2Start, ...data.slice(2, 6), empty.row2End],
      [empty.row3Start, ...data.slice(6, 8), this.sponsor(), empty.row3End],
    ];
  });

  readonly scopedHexagon = () => HEX_SVGs.scoped(this.screen.isBreakPoint());

  readonly emptyHexColors = computed(() => {
    return {
      row1Start: { colors: EMPTY_HEX_COLORS('culture') },
      row1End: { colors: EMPTY_HEX_COLORS('health') },
      row2Start: this.screen.isLargeScreen()
        ? { colors: EMPTY_HEX_COLORS('school') }
        : this.screen.isSmallScreen()
          ? { colors: EMPTY_HEX_COLORS('culture') }
          : { colors: EMPTY_HEX_COLORS('legal') },
      row2End: this.screen.isLargeScreen()
        ? { colors: EMPTY_HEX_COLORS('housing') }
        : { colors: EMPTY_HEX_COLORS('culture') },
      row3Start: this.screen.isSmallScreen()
        ? { colors: EMPTY_HEX_COLORS('legal') }
        : { colors: EMPTY_HEX_COLORS('school') },
      row3End: { colors: EMPTY_HEX_COLORS('housing') },
      row4Start: { colors: EMPTY_HEX_COLORS('school') },
    };
  });

  readonly wizard = computed(() => GET_WIZARD_DATA(this.screen.isBreakPoint()));
  readonly sponsor = computed(() => GET_SPONSOR_DATA(this.screen.isBreakPoint()));
}

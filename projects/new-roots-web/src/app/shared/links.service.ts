import { computed, inject, Injectable, signal } from '@angular/core';
import { ScreenService } from '../core/screen.service';
import { HexData, ICON_SVGs } from './links.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LinksService {
  private screen = inject(ScreenService);
  private http = inject(HttpClient);

  private readonly linksData = signal<HexData[]>([]);
  private readonly url = '/api/v1/categories';

  constructor() {
    this.fetchLinks();
  }

  private fetchLinks() {
    this.http.get<HexData[]>(this.url).subscribe({
      next: (data) => this.linksData.set(data),
      error: (err) => console.error('Failed to load links', err),
    });
  }

  readonly links = computed(() => {
    const isBreak = this.screen.isBreakPoint();
    return this.linksData().map((linkData) => ({
      ...linkData,
      icon: () => this.getSafeIcon(linkData.name ?? '', isBreak),
      isExpanded: false,
    }));
  });

  private getSafeIcon(name: string, isBreak: boolean): string {
    const svgIconKey = name as keyof typeof ICON_SVGs;
    return ICON_SVGs[svgIconKey]?.(isBreak) ?? '';
  }
}

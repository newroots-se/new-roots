import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinksService } from '../shared/links.service';
import { HexData } from '../shared/links.constants';

@Component({
  selector: 'nr-links',
  imports: [RouterLink],
  templateUrl: './links.html',
  styleUrl: './links.scss',
})
export class Links {
  readonly showSubLinks = input(false);
  private readonly linksService = inject(LinksService);
  readonly links = this.linksService.links;

  chunkedLinks = computed(() => {
    const allLinks = this.links();
    const size = 2;
    const chunks = [];

    for (let i = 0; i < allLinks.length; i += size) {
      chunks.push(allLinks.slice(i, i + size));
    }
    return chunks;
  });

  toggleSubLinks(link: HexData): void {
    link.isExpanded = !link.isExpanded;
  }
}

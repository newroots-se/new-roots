import { Component, computed, inject, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LinksService } from '../LinksService';

interface SubLink {
  name: string;
  route: string;
}

interface NavLink {
  name: string;
  route: string;
  text: string;
  icon: SafeHtml;
  subLinks: SubLink[];
  isExpanded: boolean;
}

@Component({
  selector: 'nr-links',
  imports: [RouterLink],
  templateUrl: './links.html',
  styleUrl: './links.scss',
})
export class Links {
  @Input() showSubLinks = false;

  links = inject(LinksService).links;

  chunkedLinks = computed(() => {
    const links = this.links();
    const size = 2;
    const chunks = [];

    for (let i = 0; i < links.length; i += size) {
      chunks.push(links.slice(i, i + size));
    }
    return chunks;
  });

  toggleSubLinks(link: NavLink): void {
    link.isExpanded = !link.isExpanded;
  }
}

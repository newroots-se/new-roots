import { computed, inject, Injectable, signal } from '@angular/core';
import { ScreenService } from '../core/screen.service';
import { HexData, ICON_SVGs } from './links.constants';

@Injectable({ providedIn: 'root' })
export class LinksService {
  private screen = inject(ScreenService);

  private readonly linksData = signal<HexData[]>([
    {
      name: 'migration',
      route: '/migration',
      text: 'starting, running and closing a business and more',
      subLinks: [
        { name: 'e.u./e.e.a. citizens', route: '/migration/e.u.-e.e.a.-citizens' },
        { name: 'non e.u./e.e.a. citizens', route: '/migration/non-e.u.-e.e.a.-citizens' },
        { name: 'study', route: '/migration/study' },
        { name: 'love', route: '/migration/love' },
        { name: 'ukraine/t.p.d.', route: '/migration/ukraine-t.p.d.' },
        { name: 'asylum', route: '/migration/asylum' },
        { name: 'deportation', route: '/migration/deportation' },
        { name: 'repatriation', route: '/migration/repatriation' },
      ],
    },
    {
      name: 'housing',
      route: '/housing',
      text: 'renting, buying, mortgages, and more',
      subLinks: [
        { name: 'first-hand rental', route: '/housing/first-hand-rental' },
        { name: 'second-hand rental', route: '/housing/second-hand-rental' },
        { name: 'buying living rights', route: '/housing/buying-living-rights' },
        { name: 'buying house/villa', route: '/housing/buying-house-villa' },
      ],
    },
    {
      name: 'money',
      route: '/money',
      text: 'bank accounts , bank i.d. , investing and more',
      subLinks: [
        { name: 'open bank account', route: '/money/open-bank-account' },
        { name: 'setup bank id', route: '/money/setup-bank-id' },
        { name: 'setup swish', route: '/money/setup-swish' },
        { name: 'income tax', route: '/money/income-tax' },
        { name: 'business tax', route: '/money/business-tax' },
        { name: 'v.a.t.', route: '/money/value-added-tax' },
      ],
    },
    {
      name: 'work',
      route: '/work',
      text: 'job searching, contracts, unions, and more',
      subLinks: [
        { name: 'find a job', route: '/work/find-a-job' },
        { name: 'recruit', route: '/work/recruit' },
        { name: 'start business', route: '/work/start-business' },
        { name: 'promote business', route: '/work/promote-business' },
        { name: 'find businesses', route: '/work/find-businesses' },
        { name: 'open restaurant', route: '/work/open-restaurant' },
      ],
    },
    {
      name: 'school',
      route: '/school',
      text: 'the education system, how to apply, student loans and more',
      subLinks: [
        { name: 'daycare', route: '/school/daycare' },
        { name: 'school', route: '/school/school' },
        { name: 'college', route: '/school/college' },
        { name: 'university', route: '/school/university' },
      ],
    },
    {
      name: 'health',
      route: '/health',
      text: 'the healthcare system, insurance, health center and more',
      subLinks: [
        { name: 'registration', route: '/health/registration' },
        { name: 'insurance', route: '/health/insurance' },
        { name: 'hospitals', route: '/health/hospitals' },
        { name: 'local clinics', route: '/health/local-clinics' },
        { name: 'e.u. blue card', route: '/health/e-u-blue-card' },
      ],
    },
    {
      name: 'legal',
      route: '/legal',
      text: 'laws, rights, asylum, immigration and more',
      subLinks: [
        { name: 'immigration', route: '/legal/immigration' },
        { name: 'asylum', route: '/legal/asylum' },
        { name: 'deportation', route: '/legal/deportation' },
        { name: 'find lawyer', route: '/legal/find-lawyer' },
      ],
    },
    {
      name: 'culture',
      route: '/culture',
      text: 'traditions, values, customs, art and more',
      subLinks: [
        { name: 'swedish culture', route: '/culture/swedish-culture' },
        { name: 'swedish food', route: '/culture/swedish-food' },
        { name: 'authentic food', route: '/culture/authentic-food' },
        { name: 'entertainment', route: '/culture/entertainment' },
      ],
    },
    {
      name: 'about us',
      route: '/about-us',
      text: '',
      subLinks: [
        { name: 'privacy policy', route: '/about-us/privacy-policy' },
        { name: 'terms of service', route: '/about-us/terms-of-service' },
        { name: 'contact us', route: '/about-us/contact-us' },
        { name: 'f.a.q.', route: '/about-us/frequently-asked-questions' },
      ],
      isExpanded: false,
    },
  ]);

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

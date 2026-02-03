import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';
import { HeaderSearch } from './header-search/header-search';
import { HeaderLinks } from './header-links/header-links';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, HeaderSearch, HeaderLinks],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with banner role', () => {
    const header = fixture.nativeElement.querySelector('header');
    expect(header).toBeTruthy();
    expect(header.getAttribute('role')).toBe('banner');
    expect(header.getAttribute('aria-live')).toBe('polite');
    expect(header.getAttribute('aria-atomic')).toBe('true');
  });

  it('should have logo with correct alt text', () => {
    const img = fixture.nativeElement.querySelector('img#logo');
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('new roots logo');
    expect(img.src).toContain('assets/logo.png');
  });

  it('should show header-links when search input is hidden', () => {
    const links = fixture.nativeElement.querySelector('nr-header-links');
    expect(links).toBeTruthy();
    const search = fixture.nativeElement.querySelector('nr-header-search');
    expect(search).toBeTruthy();
  });

  it('should hide header-links when search input is visible', () => {
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelector('nr-header-links');
    expect(links).toBeNull();
  });
});

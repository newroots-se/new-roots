import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSearch } from './header-search';

describe('Search', () => {
  let component: HeaderSearch;
  let fixture: ComponentFixture<HeaderSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show search button when showSearchInput is false', () => {
    const searchButton = fixture.nativeElement.querySelector('button[aria-label="Open search"]');
    expect(searchButton).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.search-container')).toBeNull();
  });

  it('should show search container when showSearchInput is true', () => {
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const searchContainer = fixture.nativeElement.querySelector('.search-container');
    expect(searchContainer).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button[aria-label="Open search"]')).toBeNull();
  });

  it('should have correct aria-labels on buttons', () => {
    const openButton = fixture.nativeElement.querySelector('button[aria-label="Open search"]');
    expect(openButton).toBeTruthy();

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('button[aria-label="Close search"]');
    expect(closeButton).toBeTruthy();

    const searchButton = fixture.nativeElement.querySelector('button[aria-label="Submit search"]');
    expect(searchButton).toBeTruthy();
  });

  it('should have search input with correct attributes', () => {
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="search"]');
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('search...');
    expect(input.id).toBe('search-input');
  });

  it('should have SVGs with correct attributes', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('fill')).toBe('currentColor');
  });
});

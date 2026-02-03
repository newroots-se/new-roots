import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderLinks } from './header-links';

describe('Links', () => {
  let component: HeaderLinks;
  let fixture: ComponentFixture<HeaderLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLinks],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderLinks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('App', () => {
  let app: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture.nativeElement.outerHTML).toMatchSnapshot();
  });

  it('should have correct vertical stacking order', async () => {
    const compiled1 = fixture.debugElement as DebugElement;
    expect(compiled1.query(By.css('nr-header'))).toBeTruthy();
    expect(compiled1.query(By.css('main'))).toBeTruthy();
    expect(compiled1.query(By.css('nr-footer'))).toBeTruthy();

    const compiled2 = fixture.nativeElement as HTMLElement;
    expect(compiled2.children.length).toBe(3);
    const children = Array.from(compiled2.children).map((e) => e.tagName);
    expect(children).toEqual(['NR-HEADER', 'MAIN', 'NR-FOOTER']);
  });

  it('should render router outlet content', async () => {
    const compiled = fixture.debugElement as DebugElement;
    const routerOutlet = compiled.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
    const mainContent = compiled.query(By.css('main'));
    expect(mainContent.children.length).toBeGreaterThan(0);
  });

  it('should have correct semantic attributes on main', async () => {
    const compiled = fixture.debugElement as DebugElement;
    const main = compiled.query(By.css('main')).nativeElement;
    expect(main.getAttribute('id')).toBe('main-content');
    expect(main.getAttribute('role')).toBe('main');
  });
});

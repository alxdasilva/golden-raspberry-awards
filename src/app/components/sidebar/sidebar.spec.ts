import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidebar } from './sidebar';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('Sidebar Component', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([
          { path: 'dashboard', component: Sidebar },
          { path: 'list', component: Sidebar }
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a sidebar navigation', () => {
    const navElement = fixture.nativeElement.querySelector('.sidebar');
    expect(navElement).toBeTruthy();
  });

  it('should contain two navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('nav.sidebar ul li a');
    expect(links.length).toBe(2);
  });

  it('should have a Dashboard link with correct routerLink', () => {
    const dashboardLink = fixture.nativeElement.querySelector('a[routerLink="/dashboard"]');
    expect(dashboardLink).toBeTruthy();
    expect(dashboardLink.textContent.trim()).toBe('Dashboard');
  });

  it('should have a List link with correct routerLink', () => {
    const listLink = fixture.nativeElement.querySelector('a[routerLink="/list"]');
    expect(listLink).toBeTruthy();
    expect(listLink.textContent.trim()).toBe('List');
  });
});

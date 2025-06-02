import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

describe('App Component', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          { path: 'dashboard', component: App },
          { path: 'list', component: App },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a RouterOutlet', () => {
    const outlet = debugElement.query((el) => el.name === 'router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('should include Topbar component', () => {
    const topbarElement = fixture.nativeElement.querySelector('app-topbar');
    expect(topbarElement).toBeTruthy();
  });

  it('should include Sidebar component', () => {
    const sidebarElement = fixture.nativeElement.querySelector('app-sidebar');
    expect(sidebarElement).toBeTruthy();
  });
});

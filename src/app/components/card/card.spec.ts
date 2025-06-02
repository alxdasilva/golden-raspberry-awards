import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Card Component', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    component.title = 'Title';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('#card-title');
    expect(titleElement.textContent).toContain('Title');
  });

  it('should project content inside the card', () => {
    const testFixture = TestBed.createComponent(TestCardComponent);
    testFixture.detectChanges();

    const projectedContent = testFixture.nativeElement.querySelector('.card p');
    expect(projectedContent.textContent).toBe('Conteúdo Projetado');
  });
});

@Component({
  template: `<app-card title="Test Card"><p>Conteúdo Projetado</p></app-card>`,
  imports: [Card]
})
class TestCardComponent { }

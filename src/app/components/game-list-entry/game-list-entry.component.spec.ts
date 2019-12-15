import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListEntryComponent } from './game-list-entry.component';

describe('GameListEntryComponent', () => {
  let component: GameListEntryComponent;
  let fixture: ComponentFixture<GameListEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

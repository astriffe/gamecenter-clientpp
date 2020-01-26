import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultEntryComponent } from './game-list-entry.component';

describe('GameListEntryComponent', () => {
  let component: GameResultEntryComponent;
  let fixture: ComponentFixture<GameResultEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameResultEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesRegionComponent } from './games-app.component';

describe('GamesAppComponent', () => {
  let component: GamesRegionComponent;
  let fixture: ComponentFixture<GamesRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

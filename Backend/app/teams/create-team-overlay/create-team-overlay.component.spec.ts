import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamOverlayComponent } from './create-team-overlay.component';

describe('CreateTeamOverlayComponent', () => {
  let component: CreateTeamOverlayComponent;
  let fixture: ComponentFixture<CreateTeamOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeamOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearTimelineDialog } from './gear-timeline-dialog.component';

describe('GearTimelineDialogComponent', () => {
  let component: GearTimelineDialog;
  let fixture: ComponentFixture<GearTimelineDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearTimelineDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearTimelineDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditDialog } from './event-edit-dialog.component';

describe('EventEditDialogComponent', () => {
  let component: EventEditDialog;
  let fixture: ComponentFixture<EventEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventEditDialog]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

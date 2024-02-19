import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxEditDialog } from './box-edit-dialog.component';

describe('BoxEditDialogComponent', () => {
  let component: BoxEditDialog;
  let fixture: ComponentFixture<BoxEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

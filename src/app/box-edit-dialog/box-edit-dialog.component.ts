import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxColorsModule } from 'ngx-colors';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppService } from '../app.service';
import { Box, BoxEditForm } from '../models';
import { ValuesOf } from '../types';

@Component({
    selector: 'app-box-edit-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,

        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogClose,
        MatDialogContent,
        MatDialogActions,

        NgxColorsModule
    ],
    templateUrl: './box-edit-dialog.component.html',
    styleUrl: './box-edit-dialog.component.sass'
})
export class BoxEditDialog {

    form: FormGroup<BoxEditForm>;
    get formData(): ValuesOf<BoxEditForm> {
        return this.form.value;
    };

    constructor(
        private readonly _appService: AppService,
        private readonly _deviceDetectorService: DeviceDetectorService,
        private readonly _breakpointObserver: BreakpointObserver,
        public dialogRef: MatDialogRef<BoxEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Box
    ) {
        this.form = new FormGroup({
            newBox: new FormControl<boolean>(true),
            name: new FormControl<string>('', { nonNullable: true }),
            description: new FormControl<string>('', { nonNullable: true }),
            color: new FormControl<string>('', { nonNullable: true })
        });

        if (data) {
            this.form.patchValue(this.getBoxEditFormValue(data));
        }
    }

    onCancelClicked() {
        this.dialogRef.close();
    }

    get isMobileDevice(): boolean {
        return this._deviceDetectorService.isMobile();
    }

    private getBoxEditFormValue(box: Box): ValuesOf<BoxEditForm> {
        let value: ValuesOf<BoxEditForm> = {
            newBox: false,
            name: box.id,
            description: box.description,
            color: box.color
        };

        return value;
    }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Event } from '../models';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-event-details-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogClose,
        MatDialogContent,
        MatDialogActions,
        LuxonDateFormatPipe,
        RouterModule
    ],
    templateUrl: './event-details-dialog.component.html',
    styleUrl: './event-details-dialog.component.sass'
})
export class EventDetailsDialog {

    constructor(
        private readonly _router: Router,
        public dialogRef: MatDialogRef<EventDetailsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Event
    ) { }

    onBoxClicked(box: string) {
        this.dialogRef.close();
        this._router.navigate(['/gears', box]);
    }
}

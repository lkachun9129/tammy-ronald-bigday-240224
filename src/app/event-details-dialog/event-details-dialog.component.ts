import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Event } from '../schedules/schedules';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';

@Component({
    selector: 'app-event-details-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogClose,
        MatDialogContent,
        MatDialogActions,
        LuxonDateFormatPipe
    ],
    templateUrl: './event-details-dialog.component.html',
    styleUrl: './event-details-dialog.component.sass'
})
export class EventDetailsDialog {

    constructor(
        public dialogRef: MatDialogRef<EventDetailsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Event
    ) { }

}

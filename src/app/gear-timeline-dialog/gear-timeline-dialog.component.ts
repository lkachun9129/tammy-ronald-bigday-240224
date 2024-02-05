import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../app.service';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { Box, Event } from '../models';

@Component({
    selector: 'app-gear-timeline-dialog',
    standalone: true,
    imports: [
        CommonModule,

        MatIconModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogClose,
        MatDialogContent,
        MatDialogActions,

        LuxonDateFormatPipe
    ],
    templateUrl: './gear-timeline-dialog.component.html',
    styleUrl: './gear-timeline-dialog.component.sass'
})
export class GearTimelineDialog {

    get gear(): string {
        return this.data.gear;
    }

    box: Box;

    events: Event[] = [];

    constructor(
        private readonly _appService: AppService,
        public dialogRef: MatDialogRef<GearTimelineDialog>,
        @Inject(MAT_DIALOG_DATA) public data: { gear: string }
    ) {
        this.box = this._appService.boxes.find(b => b.items.includes(this.gear));

        this._appService.sessions.forEach(s => {
            s.events.forEach(e => {
                if (e.gears.includes(this.gear)) {
                    this.events.push(e);
                }
            });
        });
    }

    onCancelClicked() {
        this.dialogRef.close();
    }
}

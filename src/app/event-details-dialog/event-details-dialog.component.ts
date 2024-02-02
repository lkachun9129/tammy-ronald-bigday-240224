import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { AppService } from '../app.service';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { Event, UserRight } from '../models';

@Component({
    selector: 'app-event-details-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogClose,
        MatDialogContent,
        MatDialogActions,
        MarkdownModule,
        LuxonDateFormatPipe,
        RouterModule
    ],
    templateUrl: './event-details-dialog.component.html',
    styleUrl: './event-details-dialog.component.sass'
})
export class EventDetailsDialog {

    constructor(
        private readonly _appService: AppService,
        private readonly _router: Router,
        public dialogRef: MatDialogRef<EventDetailsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Event
    ) { }

    onBoxClicked(box: string) {
        if (this._appService.hasAccessRight(UserRight.Supplies)) {
            this.dialogRef.close();
            this._router.navigate([`/supplies/${this._appService.dbSchema}`, box]);
        }
    }

    locateGear(item: string): { id: string, color: string } {
        return this._appService.locateGear(item) || {
            id: '--',
            color: '#dddddd'
        };
    }
}

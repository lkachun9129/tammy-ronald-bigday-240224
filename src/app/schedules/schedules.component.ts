import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Event, schedules } from './schedules';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { EventDetailsDialog } from '../event-details-dialog/event-details-dialog.component';

export interface Session {
    dateTime: DateTime;
    events: Event[];
    parallelEventCount: number;
}

@Component({
    selector: 'app-schedules',
    standalone: true,
    imports: [CommonModule, LuxonDateFormatPipe, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatSelectModule],
    templateUrl: './schedules.component.html',
    styleUrl: './schedules.component.sass'
})
export class SchedulesComponent {

    private _scheduleStartDateTime: DateTime = DateTime.fromFormat('2024-02-23 13:00', 'yyyy-LL-dd HH:mm');
    private _scheduleEndDateTime: DateTime = DateTime.fromFormat('2024-02-25 00:15', 'yyyy-LL-dd HH:mm');

    private _maxParallelEventCount: number = 0;

    ready: boolean = false;

    get maxParallelEventCount(): number {
        return this._maxParallelEventCount;
    }

    sessions: Session[] = [];

    names: string[] = ['Ronald', 'Tammy', 'Sam', 'Ngai', 'Curtis', 'May', 'Norman'];
    selectedNames: string[] = [];

    constructor(
        public dialog: MatDialog
    ) {
        this.loadSchedules();

        this.ready = true;
    }

    private loadSchedules(): void {
        let sessionCount: number = this._scheduleEndDateTime.diff(this._scheduleStartDateTime).as('minutes') / 15;

        for (let i = 0; i < sessionCount; ++i) {
            let session = {
                dateTime: this._scheduleStartDateTime.plus({ minute: i * 15 }),
                events: [],
                parallelEventCount: 0
            };
            this.sessions.push(session);
        }

        schedules.forEach(eventInput => {
            let startDateTime = DateTime.fromFormat(eventInput.startDateTime, 'dd/L HH:mm');
            let endDateTime = startDateTime.plus({ minute: eventInput.duration });
            let event: Event = {
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                duration: eventInput.duration,
                sessionCount: eventInput.duration / 15,
                description: eventInput.description,
                venue: eventInput.venue == '0'? '--' : eventInput.venue,
                participants: eventInput.participants,
                gears: eventInput.gears,
                remarks: eventInput.remarks,
                color: '#EEEEEE'
            };
            let idx = this.sessions.findIndex((session) => session.dateTime.equals(event.startDateTime));
            this.sessions[idx].events.push(event);
            this.sessions[idx].parallelEventCount++;

            for (let c = 1; c < event.sessionCount; ++c) {
                this.sessions[idx + c].parallelEventCount++;
            }

            this._maxParallelEventCount = Math.max(this.sessions[idx].parallelEventCount, this._maxParallelEventCount);
        });


    }

    getEventColor(event: Event): string {
        for (let name of this.selectedNames) {
            if (event.participants.includes(name)) {
                return '#ffc688';
            }
        }
        return '#eeeeee';
    }

    showEventDetails(event: Event) {
        this.dialog.open(EventDetailsDialog, {
            data: event,
            height: '65vh',
            width: 'calc(100% - 50px)',
        });
    }
}

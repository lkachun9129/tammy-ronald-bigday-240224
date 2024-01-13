import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Event, EventInput, schedules } from './schedules';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { EventDetailsDialog } from '../event-details-dialog/event-details-dialog.component';

export enum SessionType {
    Date = 0,
    DateTime = 1
}

export interface Session {
    type: SessionType;
    dateTime: DateTime;
    events: Event[];
    parallelEventCount: number;
    avalibilityMap: number[];   // 0=free, 1=current, 2=previous
}

@Component({
    selector: 'app-schedules',
    standalone: true,
    imports: [CommonModule, LuxonDateFormatPipe, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatMenuModule, MatSelectModule],
    templateUrl: './schedules.component.html',
    styleUrl: './schedules.component.sass'
})
export class SchedulesComponent {

    readonly SessionType = SessionType;

    private _scheduleStartDateTime: DateTime = DateTime.fromFormat('2024-02-23 13:00', 'yyyy-LL-dd HH:mm');
    private _scheduleEndDateTime: DateTime = DateTime.fromFormat('2024-02-25 00:15', 'yyyy-LL-dd HH:mm');

    private _maxParallelEventCount: number = 0;
    private _showRelatedFirst: boolean = false;

    ready: boolean = false;

    get maxParallelEventCount(): number {
        return this._maxParallelEventCount;
    }

    sessions: Session[] = [];

    names: string[] = ['姊妹Christy','姊妹Janet','姊妹Kapo','姊妹Nicole','姊妹Winglam','兄弟Curtis', '兄弟May', '兄弟Ngai', '兄弟Norman', '兄弟Sam', 'Ronald', 'Tammy'];
    selectedNames: string[] = [];

    constructor(
        public dialog: MatDialog
    ) {
        this.loadSchedules();

        this.ready = true;
    }

    private loadSchedules(): void {
        this.sessions.length = 0;

        let sessionCount: number = this._scheduleEndDateTime.diff(this._scheduleStartDateTime).as('minutes') / 15;

        let previousDate: DateTime = DateTime.fromFormat('1970-01-01', 'yyyy-LL-dd');
        for (let i = 0; i < sessionCount; ++i) {
            let session = {
                type: SessionType.DateTime,
                dateTime: this._scheduleStartDateTime.plus({ minute: i * 15 }),
                events: [],
                parallelEventCount: 0,
                avalibilityMap: []
            };
            if (!session.dateTime.hasSame(previousDate, 'day')) {
                let session = {
                    type: SessionType.Date,
                    dateTime: this._scheduleStartDateTime.plus({ minute: i * 15 }),
                    events: [],
                    parallelEventCount: 0,
                    avalibilityMap: []
                };
                previousDate = session.dateTime;
                this.sessions.push(session);
            }
            this.sessions.push(session);
        }

        let eventProcessor = (eventInput: EventInput) => {
            let startDateTime = DateTime.fromFormat(eventInput.startDateTime, 'dd/L HH:mm');
            let endDateTime = startDateTime.plus({ minute: eventInput.duration });
            let event: Event = {
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                duration: eventInput.duration,
                sessionCount: eventInput.duration / 15,
                description: eventInput.description,
                venue: eventInput.venue == '0' ? '--' : eventInput.venue,
                participants: eventInput.participants,
                gears: eventInput.gears,
                remarks: eventInput.remarks,
                color: '#EEEEEE'
            };
            let idx = this.sessions.findIndex((session) => session.dateTime.equals(event.startDateTime) && session.type == SessionType.DateTime);
            let currentSession = this.sessions[idx];
            currentSession.events.push(event);
            currentSession.parallelEventCount++;

            // for events span across two sessions, increase event count for the next session
            for (let c = 1; c < event.sessionCount; ++c) {
                this.sessions[idx + c].parallelEventCount++;
            }

            this._maxParallelEventCount = Math.max(currentSession.parallelEventCount, this._maxParallelEventCount);
        };

        if (this._showRelatedFirst) {
            // process related events first
            schedules.filter(x => {
                for (let name of this.selectedNames) {
                    if (x.participants.includes(name)) {
                        return true;
                    }
                }
                return false;
            }).forEach(eventProcessor);

            // process unrelated events later

            schedules.filter(x => {
                for (let name of this.selectedNames) {
                    if (x.participants.includes(name)) {
                        return false;
                    }
                }
                return true;
            }).forEach(eventProcessor);
        } else {
            schedules.forEach(eventProcessor);
        }

    }

    onShowRelatedOnlyChanged(checked: boolean) {
        this.ready = false;
        this._showRelatedFirst = checked;
        this.loadSchedules();
        this.ready = true;
    }

    getEventColor(event: Event): string {
        for (let name of this.selectedNames) {
            let isBro = name.startsWith('兄弟');
            let isSis = name.startsWith('姊妹');
            if (event.participants.includes(name)
                || (isBro && (event.participants.includes('所有兄弟') || event.participants.includes('所有兄弟姊妹')))
                || (isSis && (event.participants.includes('所有姊妹') || event.participants.includes('所有兄弟姊妹')))) {
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

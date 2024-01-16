import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { filter, mergeAll, windowTime } from 'rxjs';
import { AppData } from '../data';
import { EventDetailsDialog } from '../event-details-dialog/event-details-dialog.component';
import { EventEditDialog } from '../event-edit-dialog/event-edit-dialog.component';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { Event, EventEditForm, EventInput, Gear, Session, SessionType } from '../models';
import { ValuesOf } from '../types';

@Component({
    selector: 'app-schedules',
    standalone: true,
    imports: [CommonModule, LuxonDateFormatPipe, MatButtonModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatMenuModule, MatSelectModule],
    templateUrl: './schedules.component.html',
    styleUrl: './schedules.component.sass'
})
export class SchedulesComponent {

    readonly SessionType = SessionType;

    private _scheduleStartDateTime: DateTime = DateTime.fromFormat('2024-02-23 13:00', 'yyyy-LL-dd HH:mm');
    private _scheduleEndDateTime: DateTime = DateTime.fromFormat('2024-02-25 00:15', 'yyyy-LL-dd HH:mm');

    private _maxParallelEventCount: number = 0;
    private _showRelatedFirst: boolean = false;
    private _gearMap: { [key: string]: Gear } = {};

    private _editModeEvent: EventEmitter<never> = new EventEmitter<never>();

    editMode: boolean = false;
    ready: boolean = false;
    scrolledToEvent: boolean = false;
    previousHighlightedEvent: Event = null;

    get maxParallelEventCount(): number {
        return this._maxParallelEventCount;
    }

    sessions: Session[] = [];

    names: string[] = ['姊妹Christy','姊妹Janet','姊妹Kapo','姊妹Nicole','姊妹Winglam','兄弟Curtis', '兄弟May', '兄弟Ngai', '兄弟Norman', '兄弟Sam', 'Ronald', 'Tammy'];
    selectedNames: string[] = [];

    get gridWidth(): string {
        return this._breakpointObserver.isMatched(`(min-width: ${this.maxParallelEventCount * 220}px)`) ? 'calc(100% - 50px)' : (this.maxParallelEventCount * 220) + 'px';
    }

    constructor(
        private readonly _router: Router,
        private readonly _dialog: MatDialog,
        private readonly _viewerportScroller: ViewportScroller,
        private readonly _breakpointObserver: BreakpointObserver
    ) {
        this.loadGearMap();
        this.loadSchedules();

        this.ready = true;

        // setup event to enable edit mode
        this._editModeEvent.pipe(
            windowTime(2000),
            mergeAll(),
            filter((value, index) => index + 1 >= 10)
        ).subscribe(() => {
            this.editMode = true;
        });
    }

    private loadGearMap(): void {
        AppData.gears.forEach(g => {
            g.items.forEach(i => {
                this._gearMap[i] = {
                    description: i,
                    box: g.box,
                    color: g.color
                };
            });
        });
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
                gears: eventInput.gears.map(x => {
                    return this._gearMap[x] || {
                        description: x,
                        color: '#dddddd',
                        box: '--'
                    };
                }),
                remarks: eventInput.remarks,
                color: '#EEEEEE',
                showActions: false
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
            AppData.schedules.filter(x => {
                for (let name of this.selectedNames) {
                    if (x.participants.includes(name)) {
                        return true;
                    }
                }
                return false;
            }).forEach(eventProcessor);

            // process unrelated events later

            AppData.schedules.filter(x => {
                for (let name of this.selectedNames) {
                    if (x.participants.includes(name)) {
                        return false;
                    }
                }
                return true;
            }).forEach(eventProcessor);
        } else {
            AppData.schedules.forEach(eventProcessor);
        }

    }

    onMenuButtonClicked(route: string) {
        this._router.navigate([`/${route}`]);
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
        this._dialog.open(EventDetailsDialog, {
            data: event,
            height: '65vh',
            width: 'calc(100% - 50px)',
        });
    }

    addEvent() {
        const dialogRef = this._dialog.open(EventEditDialog, {
            data: {
                event: null,
                sessions: this.sessions,
                gearMap: this._gearMap
            },
            height: '65vh',
            width: 'calc(100% - 50px)',
        });

        dialogRef.afterClosed().subscribe((formValue: ValuesOf<EventEditForm>) => {
            if (!formValue) {
                return;
            }

            let updatedEvent: Event = this.getEvent(formValue);

            let updatedSessionIdx = this.sessions.findIndex(x => x.dateTime.equals(updatedEvent.startDateTime));
            let updatedSession = this.sessions[updatedSessionIdx];

            // update event session count of updated session
            for (let s = updatedSessionIdx; s < updatedSessionIdx + updatedEvent.sessionCount; ++s) {
                this.sessions[s].parallelEventCount++;
            }

            if (formValue.highPriority) {
                updatedSession.events.splice(0, 0, updatedEvent);
            } else {
                updatedSession.events.push(updatedEvent);
            }

            // update max paraellel event count
            this._maxParallelEventCount = 0;
            this.sessions.forEach(x => {
                this._maxParallelEventCount = Math.max(this._maxParallelEventCount, x.parallelEventCount);
            });
        });
    }

    private getEvent(formValue: ValuesOf<EventEditForm>): Event {
        let updatedEvent: Event = {
            description: formValue.description ? formValue.description : '',
            venue: formValue.venue ? formValue.venue : '',
            startDateTime: formValue.startSession ? formValue.startSession?.dateTime.plus({ minute: 0 }) : DateTime.now(),
            endDateTime: formValue.startSession ? formValue.startSession?.dateTime.plus({ minute: formValue.duration }) : DateTime.now(),
            duration: formValue.duration ? formValue.duration : 0,
            participants: formValue.participants ? formValue.participants : [],
            gears: formValue.gears ? formValue.gears.map(x => {
                return this._gearMap[x] || {
                    description: x,
                    color: '#dddddd',
                    box: '--'
                }
            }) : [],
            remarks: formValue.remarks ? formValue.remarks : '',

            sessionCount: formValue.duration / 15,
            color: '',
            showActions: false
        }

        updatedEvent.color = this.getEventColor(updatedEvent);

        return updatedEvent;
    }

    editEvent(event: Event) {
        const dialogRef = this._dialog.open(EventEditDialog, {
            data: {
                event: event,
                sessions: this.sessions,
                gearMap: this._gearMap
            },
            height: '65vh',
            width: 'calc(100% - 50px)',
        });

        dialogRef.afterClosed().subscribe((formValue: ValuesOf<EventEditForm>) => {
            if (!formValue) {
                return;
            }

            let updatedEvent: Event = this.getEvent(formValue);

            let previousSessionIdx = this.sessions.findIndex(x => x.dateTime.equals(event.startDateTime));
            let previousSession = this.sessions[previousSessionIdx];

            let updatedSessionIdx = this.sessions.findIndex(x => x.dateTime.equals(updatedEvent.startDateTime));
            let updatedSession = this.sessions[updatedSessionIdx];

            // remove event session count from previous session
            for (let s = previousSessionIdx; s < previousSessionIdx + event.sessionCount; ++s) {
                this.sessions[s].parallelEventCount--;
            }

            // update event session count of updated session
            for (let s = updatedSessionIdx; s < updatedSessionIdx + updatedEvent.sessionCount; ++s) {
                this.sessions[s].parallelEventCount++;
            }

            let previousEventIdx = previousSession.events.indexOf(event);

            // remove the previous event
            previousSession.events.splice(previousEventIdx, 1);

            if (updatedEvent.startDateTime.equals(event.startDateTime)) {
                if (formValue.highPriority) {
                    // insert the updated event at the beginning
                    previousSession.events.splice(0, 0, updatedEvent);
                } else {
                    // insert the updated event at the same position
                    previousSession.events.splice(previousEventIdx, 0, updatedEvent);
                }
            // event updated to a new session
            } else if (formValue.highPriority) {
                updatedSession.events.splice(0, 0, updatedEvent);
            } else {
                updatedSession.events.push(updatedEvent);
            }

            // update max paraellel event count
            this._maxParallelEventCount = 0;
            this.sessions.forEach(x => {
                this._maxParallelEventCount = Math.max(this._maxParallelEventCount, x.parallelEventCount);
            });
        });
    }

    scrollToCurrentEvent() {
        let currentDateTime = DateTime.now();
        for (let session of this.sessions) {
            if (session.dateTime >= currentDateTime.plus({ minute: -45 })) {
                this._viewerportScroller.scrollToAnchor(session.dateTime.toFormat('LLddHHmm'));
                break;
            }
        }
    }

    triggerEditMode() {
        this._editModeEvent.emit();
    }

    exitEditMode() {
        this.editMode = false;
        this.previousHighlightedEvent && (this.previousHighlightedEvent.showActions = false);
    }
}

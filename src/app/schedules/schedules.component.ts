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
import { AppService } from '../app.service';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { EventDetailsDialog } from '../event-details-dialog/event-details-dialog.component';
import { EventEditDialog } from '../event-edit-dialog/event-edit-dialog.component';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { Event, EventEditForm, Session, SessionType } from '../models';
import { GearMap, ValuesOf } from '../types';

@Component({
    selector: 'app-schedules',
    standalone: true,
    imports: [CommonModule, LuxonDateFormatPipe, MatButtonModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatMenuModule, MatSelectModule],
    templateUrl: './schedules.component.html',
    styleUrl: './schedules.component.sass'
})
export class SchedulesComponent {

    readonly SessionType = SessionType;

    private _showRelatedFirst: boolean = false;

    private get _gearMap(): GearMap {
        return this._appService.gearMap;
    }

    private _editModeEvent: EventEmitter<never> = new EventEmitter<never>();

    editMode: boolean = false;
    ready: boolean = false;
    scrolledToEvent: boolean = false;
    previousHighlightedEvent: Event = null;

    get maxParallelEventCount(): number {
        return this._appService.maxParallelEventCount;
    }

    set maxParallelEventCount(count: number) {
        this._appService.maxParallelEventCount = count;
    }

    get sessions(): Session[] {
        return this._appService.sessions;
    }

    get names(): string[] {
        return this._appService.names;
    }

    selectedNames: string[] = [];

    get gridWidth(): string {
        return this._breakpointObserver.isMatched(`(min-width: ${this.maxParallelEventCount * 220}px)`) ? 'calc(100% - 50px)' : (this.maxParallelEventCount * 220) + 'px';
    }

    constructor(
        private readonly _appService: AppService,
        private readonly _router: Router,
        private readonly _dialog: MatDialog,
        private readonly _viewerportScroller: ViewportScroller,
        private readonly _breakpointObserver: BreakpointObserver
    ) {
        this.ready = true;

        // setup event to enable edit mode
        this._editModeEvent.pipe(
            windowTime(2000),
            mergeAll(),
            filter((_, index) => index + 1 >= 10)
        ).subscribe(() => {
            this.editMode = true;
        });
    }

    onMenuButtonClicked(route: string) {
        this._router.navigate([`/${route}`]);
    }

    onShowRelatedOnlyChanged(checked: boolean) {
        // need to hide and show the grid to refresh the color
        this.ready = false;
        this._showRelatedFirst = checked;
        this.rearrangeEvents();
        this.ready = true;
    }

    private rearrangeEvents() {
        this.sessions.forEach(session => {
            session.events.sort((a, b) => {
                if (this._showRelatedFirst) {
                    let aRelated = this.isRelatedEvent(a);
                    let bRelated = this.isRelatedEvent(b);

                    return aRelated && bRelated ? 1 :
                            (aRelated && !bRelated ? -1 : 1);
                } else {
                    return a.order - b.order;
                }
            });
        });
    }

    private isRelatedEvent(event: Event): boolean {
        for (let name of this.selectedNames) {
            let isBro = name.startsWith('兄弟');
            let isSis = name.startsWith('姊妹');
            if (event.participants.includes(name)
                || (isBro && (event.participants.includes('所有兄弟') || event.participants.includes('所有兄弟姊妹')))
                || (isSis && (event.participants.includes('所有姊妹') || event.participants.includes('所有兄弟姊妹')))) {
                return true;
            }
        }

        return false;
    }

    getEventColor(event: Event): string {
        return this.isRelatedEvent(event) ? '#ffc688' : '#eeeeee';
    }

    showEventDetails(event: Event) {
        this._dialog.open(EventDetailsDialog, {
            data: event,
            height: this.useMobileLayout() ? '100%' : '65vh',
            width: this.useMobileLayout() ? '100%' : 'calc(100% - 50px)',
            maxWidth: this.useMobileLayout() ? '100%' : '85vw'
        });
    }

    private useMobileLayout(): boolean {
        return !this._breakpointObserver.isMatched(`(min-width: 550px)`);
    }

    private getEvent(formValue: ValuesOf<EventEditForm>): Event {
        let updatedEvent: Event = {
            order: -1,
            description: formValue.description ? formValue.description : '',
            venue: formValue.venue ? formValue.venue : '',
            startDateTime: formValue.startSession ? formValue.startSession?.dateTime.plus({ minute: 0 }) : DateTime.now(),
            endDateTime: formValue.startSession ? formValue.startSession?.dateTime.plus({ minute: formValue.duration }) : DateTime.now(),
            duration: formValue.duration ? formValue.duration : 0,
            participants: formValue.participants ? formValue.participants : [],
            gears: formValue.gears ? formValue.gears : [],
            remarks: formValue.remarks ? formValue.remarks : '',

            sessionCount: formValue.duration / 15,
            color: '',
            showActions: false
        }

        updatedEvent.color = this.getEventColor(updatedEvent);

        return updatedEvent;
    }

    addEvent() {
        const dialogRef = this._dialog.open(EventEditDialog, {
            data: {
                event: null,
                sessions: this.sessions,
                gearMap: this._gearMap
            },
            height: this.useMobileLayout() ? '100%' : '65vh',
            width: this.useMobileLayout() ? '100%' : 'calc(100% - 50px)',
            maxWidth: this.useMobileLayout() ? '100%' : '85vw'
        });

        dialogRef.afterClosed().subscribe((formValue: ValuesOf<EventEditForm>) => {
            if (!formValue) {
                return;
            }

            let updatedEvent: Event = this.getEvent(formValue);

            let updatedSessionIdx = this.sessions.findIndex(x => x.dateTime.equals(updatedEvent.startDateTime));
            let updatedSession = this.sessions[updatedSessionIdx];

            updatedEvent.order = updatedSession.events.length;

            // update event session count of updated session
            for (let s = updatedSessionIdx; s < updatedSessionIdx + updatedEvent.sessionCount; ++s) {
                this.sessions[s].parallelEventCount++;
            }

            if (formValue.highPriority) {
                updatedSession.events.splice(0, 0, updatedEvent);
            } else {
                updatedSession.events.push(updatedEvent);
            }

            this._appService.updateMaxParallelEventCount();
            this._appService.updateDeletedGear();
        });
    }

    editEvent(event: Event) {
        const dialogRef = this._dialog.open(EventEditDialog, {
            data: {
                event: event,
                sessions: this.sessions,
                gearMap: this._gearMap
            },
            height: this.useMobileLayout() ? '100%' : '65vh',
            width: this.useMobileLayout() ? '100%' : 'calc(100% - 50px)',
            maxWidth: this.useMobileLayout() ? '100%' : '85vw'
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
                previousSession.events.forEach((e, idx) => {
                    e.order = idx;
                });
            } else {
                // event updated to a new session
                if (formValue.highPriority) {
                    updatedSession.events.splice(0, 0, updatedEvent);
                } else {
                    updatedSession.events.push(updatedEvent);
                }
                updatedSession.events.forEach((e, idx) => {
                    e.order = idx;
                });
            }

            this._appService.updateMaxParallelEventCount();
            this._appService.updateDeletedGear();
        });
    }

    removeEvent(event: Event, session: Session) {
        this._dialog.open(ConfirmationDialog).afterClosed().subscribe((confirmDelete: boolean) => {
            if (confirmDelete) {
                let idx = session.events.indexOf(event);
                if (idx >= 0) {
                    session.events.splice(idx, 1);

                    let sessionIdx = this.sessions.indexOf(session);
                    for (let s = 0; s < event.sessionCount; ++s) {
                        this.sessions[sessionIdx + s].parallelEventCount--;
                    }

                    this._appService.updateMaxParallelEventCount();
                    this._appService.updateDeletedGear();
                }
            }
        })
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

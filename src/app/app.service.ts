import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { DateTime } from 'luxon';
import { AppData as AppDataOld } from './data';
import { Box, Data, DataSnapshot, Event, EventInput, EventSnapshot, Session, SessionSnapshot, SessionType } from './models';
import { GearMap } from './types';
import { Utility } from './utility';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private _appData: Data = {
        sessions: [],
        boxes: [],
        notPackedItems: [],
        deletedItems: []
    };

    maxParallelEventCount: number = 0;

    get sessions(): Session[] {
        return this._appData.sessions;
    }

    get boxes(): Box[] {
        return this._appData.boxes;
    }

    get notPackedItems(): string[] {
        return this._appData.notPackedItems;
    }

    get deletedItems(): string[] {
        return this._appData.deletedItems;
    }

    gearMap: GearMap = {};

    names: string[] = [
        '姊妹Christy',
        '姊妹Janet',
        '姊妹Kapo',
        '姊妹Nicole',
        '姊妹Winglam',
        '兄弟Curtis',
        '兄弟May',
        '兄弟Ngai',
        '兄弟Norman',
        '兄弟Sam',
        'Ronald',
        'Tammy'
    ];

    private _scheduleStartDateTime: DateTime = DateTime.fromFormat('2024-02-23 13:00', 'yyyy-LL-dd HH:mm');
    private _scheduleEndDateTime: DateTime = DateTime.fromFormat('2024-02-25 00:15', 'yyyy-LL-dd HH:mm');

    constructor(
        private readonly _db: AngularFireDatabase
    ) {
        this._db.object('/appData/main')
            .snapshotChanges()
            .subscribe((snapshot: SnapshotAction<DataSnapshot>) => {
                let dataSnapshot = snapshot.payload.val();
                this._appData.sessions = dataSnapshot.sessions.map(s => {
                    let session: Session = {
                        type: s.type,
                        dateTime: Utility.toDateTime(s.dateTime),
                        events: s.events ? s.events.map(e => {
                            let event: Event = {
                                order: e.order,
                                startDateTime: Utility.toDateTime(e.startDateTime),
                                endDateTime: Utility.toDateTime(e.endDateTime),
                                duration: e.duration,
                                sessionCount: e.sessionCount,
                                description: e.description,
                                venue: e.venue,
                                participants: e.participants ? e.participants : [],
                                gears: e.gears ? e.gears : [],
                                remarks: e.remarks,
                                color: '#EEEEEE',
                                showActions: false
                            }
                            return event;
                        }): [],
                        parallelEventCount: s.parallelEventCount
                    };

                    return session;
                });

                this.updateMaxParallelEventCount();
            });


        //this.loadBoxes();
        this.loadGearMap();
        //this.loadSchedules();
    }

    save() {
        let data: DataSnapshot = {
            sessions: this.sessions.map(s => {
                let session: SessionSnapshot = {
                    type: s.type,
                    dateTime: Utility.toLocalDateTime(s.dateTime),
                    events: s.events.map(e => {
                        let event: EventSnapshot = {
                            order: e.order,
                            startDateTime: Utility.toLocalDateTime(e.startDateTime),
                            endDateTime: Utility.toLocalDateTime(e.endDateTime),
                            duration: e.duration,
                            sessionCount: e.sessionCount,
                            description: e.description,
                            venue: e.venue,
                            participants: e.participants,
                            gears: e.gears,
                            remarks: e.remarks
                        }
                        return event;
                    }),
                    parallelEventCount: s.parallelEventCount
                }

                return session;
            }),
            boxes: this.boxes,
            notPackedItems: this.notPackedItems,
            deletedItems: this.deletedItems
        }

        this._db.object('/appData/main').set(data).then((value) => {
            console.log(value);
        }, (reason) => {
            console.error(reason);
        })
    }

    loadBoxes(): void {
        this.boxes.push(...AppDataOld.boxes);
    }

    loadGearMap(): void {
        AppDataOld.boxes.forEach(b => {
            b.items.forEach(i => {
                this.gearMap[i] = {
                    description: i,
                    box: b.id,
                    color: b.color
                };
            });
        });
    }

    loadSchedules(): void {
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
                order: -1, // to be set in the next step
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                duration: eventInput.duration,
                sessionCount: eventInput.duration / 15,
                description: eventInput.description,
                venue: eventInput.venue == '0' ? '--' : eventInput.venue,
                participants: eventInput.participants,
                gears: eventInput.gears,
                remarks: eventInput.remarks,
                color: '#EEEEEE',
                showActions: false
            };


            let idx = this.sessions.findIndex((session) => session.dateTime.equals(event.startDateTime) && session.type == SessionType.DateTime);
            let currentSession = this.sessions[idx];
            event.order = currentSession.events.length;
            currentSession.events.push(event);
            currentSession.parallelEventCount++;

            // for events span across two sessions, increase event count for the next session
            for (let c = 1; c < event.sessionCount; ++c) {
                this.sessions[idx + c].parallelEventCount++;
            }

            this.maxParallelEventCount = Math.max(currentSession.parallelEventCount, this.maxParallelEventCount);
        };

        AppDataOld.schedules.forEach(eventProcessor);

    }

    locateGear(item: string): Box {
        let locatedBoxes = this.boxes.find(b => b.items.indexOf(item) >= 0);

        if (locatedBoxes) {
            return locatedBoxes;
        } else {
            if (!this.notPackedItems.includes(item)) {
                this.notPackedItems.push(item);
            }
            return null;
        }
    }

    updateDeletedGear(): void {
        let gears = this.sessions.flatMap(s => s.events.flatMap(e => e.gears));

        let deletedItems: string[] = [];

        this.boxes.forEach(b => {
            let missingIdx: number[] = [];
            b.items.forEach((i, idx) => {
                if (!gears.includes(i)) {
                    missingIdx.push(idx);
                }
            });

            missingIdx.reverse().forEach(idx => {
                deletedItems.push(...b.items.splice(idx, 1));
            });
        });

        let stillDeletedItems = this.deletedItems.filter(i => !gears.includes(i));

        this.deletedItems.length = 0;
        this.deletedItems.push(...stillDeletedItems, ...deletedItems);
    }

    updateMaxParallelEventCount(): void {
        this.maxParallelEventCount = 0;
        this.sessions.forEach(x => {
            this.maxParallelEventCount = Math.max(this.maxParallelEventCount, x.parallelEventCount);
        });
    }
}

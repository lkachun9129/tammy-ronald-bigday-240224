import { FormControl } from "@angular/forms";
import { DateTime } from "luxon";

export enum Schema {
    Final = 'final',
    Photography = 'photography',
    MakeUp = 'makeup',
    Draft = 'draft'
}

export enum UserRight {
    Schedule = 'schedule',
    Supplies = 'supplies',
    Packing = 'packing'
}

export interface SchemaDefinition {
    name: string;
    editable: boolean;
    scheduleStartDateTime: LocalDateTime;
    scheduleEndDateTime: LocalDateTime;
    rights: UserRight[];
}

export type SnapshotMap = { [key: string]: DataSnapshot };

export interface AppData {
    snapshot: SnapshotMap
}

export interface DataSnapshot {
    sessions: SessionSnapshot[];
    boxes: Box[];
    notPackedItems: string[];
    deletedItems: string[];
    packingStatus?: { [key: string]: PackingStatus }
}

export interface SessionSnapshot {
    type: SessionType;
    dateTime: LocalDateTime;
    events: EventSnapshot[];
    parallelEventCount: number;   // 0=free, 1=current, 2=previous
}

export interface EventSnapshot {
    order: number;
    startDateTime: LocalDateTime;
    endDateTime: LocalDateTime;
    duration: number;
    sessionCount: number;
    description: string;
    venue: string;
    participants: string[];
    gears: string[];
    remarks: string;
}

export interface Data {
    sessions: Session[];
    boxes: Box[];
    notPackedItems: string[];
    deletedItems: string[];
    packingStatus: { [key: string]: PackingStatus };
}

export enum SessionType {
    Date = 0,
    DateTime = 1
}

export interface Session {
    type: SessionType;
    dateTime: DateTime;
    events: Event[];
    parallelEventCount: number;
}

export interface EventInput {
    startDateTime: string;
    duration: number;
    description: string;
    venue: string;
    participants: string[];
    gears: string[];
    remarks: string;
}

export interface Event {
    order: number;
    startDateTime: DateTime;
    endDateTime: DateTime;
    duration: number;
    sessionCount: number;
    description: string;
    venue: string;
    participants: string[];
    gears: string[];
    remarks: string;

    color: string;
    showActions: boolean;
}

export interface Box {
    id: string;
    description: string;
    color: string;
    items: string[];
}

export interface PackingStatus {
    packed: boolean;
    owner: string;
}

export interface Gear {
    description: string;
    box: string;
    color: string;
}

export interface EventEditForm {
    newEvent: FormControl<boolean>;
    description: FormControl<string>;
    startSession: FormControl<Session>;
    duration: FormControl<number>;
    venue: FormControl<string>;
    participants: FormControl<string[]>;
    gears: FormControl<string[]>;
    remarks: FormControl<string>;
    highPriority: FormControl<boolean>;
}

export type LocalDateTime = number[];

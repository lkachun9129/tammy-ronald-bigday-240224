import { FormControl } from "@angular/forms";
import { DateTime } from "luxon";

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
    gears: Gear[];
    remarks: string;

    color: string;
    showActions: boolean;
}

export interface Package {
    box: string;
    description: string;
    color: string;
    items: string[];
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

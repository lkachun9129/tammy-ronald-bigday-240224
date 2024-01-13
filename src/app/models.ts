import { DateTime } from "luxon";

export interface EventInput {
    startDateTime: string;
    duration: number;
    description: string;
    venue: string;
    participants: string[];
    gears: string[];
    remarks: string[];
}

export interface Event {
    startDateTime: DateTime;
    endDateTime: DateTime;
    duration: number;
    sessionCount: number;
    description: string;
    venue: string;
    participants: string[];
    gears: Gear[];
    remarks: string[];

    color: string;
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
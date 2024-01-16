import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { Event, EventEditForm, Gear, Session } from '../models';
import { ValuesOf } from '../types';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-event-edit-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatChipsModule,
        MatAutocompleteModule,

        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogClose,
        MatDialogContent,
        MatDialogActions,

        AsyncPipe,
        LuxonDateFormatPipe
    ],
    templateUrl: './event-edit-dialog.component.html',
    styleUrl: './event-edit-dialog.component.sass'
})
export class EventEditDialog {

    separatorKeysCodes: number[] = [ENTER, COMMA];

    form: FormGroup<EventEditForm>;
    get formData(): ValuesOf<EventEditForm> {
        return this.form.value;
    };

    durations: number[] = [15,30,45,60,75,90,105,120,135,150,165,180];

    filteredParticipants: Observable<string[]>;

    participantCtrl = new FormControl('');
    gearCtrl = new FormControl('');

    allParticipants = ['姊妹Christy', '姊妹Janet', '姊妹Kapo', '姊妹Nicole', '姊妹Winglam', '兄弟Curtis', '兄弟May', '兄弟Ngai', '兄弟Norman', '兄弟Sam', 'Ronald', 'Tammy'];

    @ViewChild('participantInput') participantInput: ElementRef<HTMLInputElement>;

    private getEventEditFormValue(event: Event): ValuesOf<EventEditForm> {
        let value: ValuesOf<EventEditForm> = {
            newEvent: false,
            description: event.description,
            startSession: this.data.sessions.filter(x => x.dateTime.equals(event.startDateTime))[0],
            duration: event.duration,
            venue: event.venue,
            participants: [],
            gears: [],
            remarks: event.remarks,
            highPriority: false
        };

        value.participants.push(...event.participants);
        value.gears.push(...event.gears);

        return value;
    }

    constructor(
        public dialogRef: MatDialogRef<EventEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: { event: Event, sessions: Session[], gearMap: { [key: string]: Gear }}
    ) {
        this.filteredParticipants = this.participantCtrl.valueChanges.pipe(
            startWith(null),
            map((participant: string | null) => (participant ? this.filterParticipants(participant) : this.allParticipants.slice()))
        )

        this.form = new FormGroup({
            newEvent: new FormControl<boolean>(true),
            description: new FormControl<string>('', { nonNullable: true }),
            startSession: new FormControl<Session>(null, { nonNullable: true }),
            duration: new FormControl<number>(15, { nonNullable: true }),
            venue: new FormControl<string>('', { nonNullable: true }),
            participants: new FormControl<string[]>([], { nonNullable: true }),
            gears: new FormControl<string[]>([], { nonNullable: true }),
            remarks: new FormControl<string>('', { nonNullable: true }),
            highPriority: new FormControl<boolean>(false, { nonNullable: true })
        });

        if (data.event) {
            this.form.patchValue(this.getEventEditFormValue(data.event));
        }
    }

    onCancelClicked() {
        this.dialogRef.close();
    }

    addParticipant(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.form.controls.participants.value?.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.participantCtrl.setValue(null);
    }

    removeParticipant(participant: string): void {
        const index = this.form.controls.participants.value?.indexOf(participant);

        if (index !== undefined && index >= 0) {
            this.form.controls.participants.value?.splice(index, 1);
        }
    }

    onParticipantSelected(event: MatAutocompleteSelectedEvent): void {
        this.form.controls.participants.value?.push(event.option.viewValue);
        this.participantInput.nativeElement.value = '';
        this.participantCtrl.setValue(null);
    }

    private filterParticipants(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allParticipants.filter(participant => participant.toLowerCase().includes(filterValue));
    }

    addGear(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.form.controls.gears.value?.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.gearCtrl.setValue(null);
    }

    removeGear(gear: string): void {
        const index = this.form.controls.gears.value?.indexOf(gear);

        if (index !== undefined && index >= 0) {
            this.form.controls.gears.value?.splice(index, 1);
        }
    }
}

import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { Utility } from '../utility';
import { tap, timer } from 'rxjs';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.sass'
})
export class LandingComponent {

    private readonly _bigDay: DateTime = Utility.toDateTime([2024, 2, 24, 14, 30, 0]);

    days: string = '';
    hours: string = '';
    minutes: string = '';
    seconds: string = '';

    constructor() {
        timer(0, 1000)
            .pipe(
                tap(() => {
                    let components = `${this._bigDay.diffNow().toFormat('d h m s')}`.split(' ');
                    this.days = components[0];
                    this.hours = components[1];
                    this.minutes = components[2];
                    this.seconds = components[3];
                })
            ).subscribe();
    }
}

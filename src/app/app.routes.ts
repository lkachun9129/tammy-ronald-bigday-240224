import { Routes } from '@angular/router';
import { SchedulesComponent } from './schedules/schedules.component';
import { GearsComponent } from './gears/gears.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {
        path: 'schedule',
        component: SchedulesComponent
    },
    {
        path: 'gears/:box',
        component: GearsComponent
    },
    {
        path: 'gears',
        component: GearsComponent
    },
    {
        path: '**',
        component: LandingComponent
    }
];

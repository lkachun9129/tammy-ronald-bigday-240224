import { Routes } from '@angular/router';
import { SchedulesComponent } from './schedules/schedules.component';
import { GearsComponent } from './gears/gears.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {
        path: 'schedule/:schema',
        component: SchedulesComponent
    },
    {
        path: 'supplies/:schema/:box',
        component: GearsComponent
    },
    {
        path: 'supplies/:schema',
        component: GearsComponent
    },
    {
        path: '**',
        component: LandingComponent
    }
];

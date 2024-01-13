import { Routes } from '@angular/router';
import { SchedulesComponent } from './schedules/schedules.component';
import { GearsComponent } from './gears/gears.component';

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
        path: '**',
        component: SchedulesComponent
    }
];

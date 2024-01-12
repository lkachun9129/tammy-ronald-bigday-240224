import { Routes } from '@angular/router';
import { SchedulesComponent } from './schedules/schedules.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {
        path: '**',
        component: SchedulesComponent
    },
    {
        path: '**',
        component: LandingComponent
    }
];

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AppData } from '../data';
import { Box } from '../models';

@Component({
    selector: 'app-gears',
    standalone: true,
    imports: [CommonModule, LuxonDateFormatPipe, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatMenuModule, MatSelectModule],
    templateUrl: './gears.component.html',
    styleUrl: './gears.component.sass'
})
export class GearsComponent {

    get boxes(): Box[] {
        return AppData.boxes;
    }

    constructor(
        private readonly _router: Router,
        private readonly _activatedroute: ActivatedRoute
    ) { }

    isExpanded(box: string): boolean {
        return this._activatedroute.snapshot.paramMap.get('box') == box;
    }

    onMenuButtonClicked(route: string) {
        this._router.navigate([`/${route}`]);
    }

}

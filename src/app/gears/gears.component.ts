import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from '../models';
import { AppService } from '../app.service';
import { filter, mergeAll, windowTime } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-gears',
    standalone: true,
    imports: [CommonModule, LuxonDateFormatPipe, MatButtonModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatMenuModule, MatSelectModule],
    templateUrl: './gears.component.html',
    styleUrl: './gears.component.sass'
})
export class GearsComponent {

    editMode: boolean = false;

    get boxes(): Box[] {
        return this._appService.boxes;
    }

    get notPackedItems(): string[] {
        return this._appService.notPackedItems;
    }

    get deletedItems(): string[] {
        return this._appService.deletedItems;
    }

    private _editModeEvent: EventEmitter<never> = new EventEmitter<never>();

    constructor(
        private readonly _appService: AppService,
        private readonly _router: Router,
        private readonly _activatedroute: ActivatedRoute
    ) {
        // setup event to enable edit mode
        this._editModeEvent.pipe(
            windowTime(2000),
            mergeAll(),
            filter((_, index) => index + 1 >= 10)
        ).subscribe(() => {
            this.editMode = true;
        });
    }

    isExpanded(box: string): boolean {
        return this._activatedroute.snapshot.paramMap.get('box') == box;
    }

    onMenuButtonClicked(route: string) {
        this._router.navigate([`/${route}`]);
    }

    editItem(item: string, box: Box) {

    }

    triggerEditMode() {
        this._editModeEvent.emit();
    }

    exitEditMode() {
        this.editMode = false;
    }
}

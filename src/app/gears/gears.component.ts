import {
    CdkDrag,
    CdkDragDrop,
    CdkDropList,
    moveItemInArray,
    transferArrayItem
} from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { FireDatabaseModule } from '../fire-database-module/fire-database.module';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { Box } from '../models';

@Component({
    selector: 'app-gears',
    standalone: true,
    imports: [
        CommonModule,
        LuxonDateFormatPipe,

        CdkDropList,
        CdkDrag,

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatMenuModule,
        MatSelectModule,

        FireDatabaseModule,
        ConfirmationDialog],
    templateUrl: './gears.component.html',
    styleUrl: './gears.component.sass'
})
export class GearsComponent {

    get allowEdit(): boolean {
        return this._appService.allowEdit;
    }

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

    constructor(
        private readonly _breakpointObserver: BreakpointObserver,
        private readonly _appService: AppService,
        private readonly _matDialog: MatDialog,
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute
    ) {
        this._appService
            .loadData(this._activatedRoute.snapshot.paramMap.get('schema'))
            .subscribe({
                error: (_) => {
                    // undefined schema
                    this._router.navigate(['/']);
                }
            });
    }

    gearLists: CdkDropList[] = [];

    get dropListIds(): string[] {
        let idList = this.boxes.map(b => b.id);
        idList.push('uncategorized');
        return idList;
    }

    onGearListLoaded(dropList: CdkDropList) {
        this.gearLists.push(dropList);

        this.gearLists.forEach(list => {
            list.connectedTo = this.gearLists.filter(x => x != list);
        });
    }

    isExpanded(box: string): boolean {
        return this._activatedRoute.snapshot.paramMap.get('box') == box;
    }

    onMenuButtonClicked(route: string) {
        this._router.navigate([`/${route}/${this._appService.dbSchema}`]);
    }

    purgeItem(item: string) {
        this._matDialog.open(ConfirmationDialog).afterClosed().subscribe((confirmDelete: boolean) => {
            if (confirmDelete) {
                let idx = this.deletedItems.indexOf(item);
                if (idx >= 0) {
                    this.deletedItems.splice(idx, 1);
                }
                this._appService.saveGearsToDatabase();
            }
        });
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
        this._appService.saveGearsToDatabase();
    }

    useMobileLayout(): boolean {
        return !this._breakpointObserver.isMatched(`(min-width: 550px)`);
    }

}

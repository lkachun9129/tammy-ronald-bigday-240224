import {
    CdkDrag,
    CdkDragDrop,
    CdkDragHandle,
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { FireDatabaseModule } from '../fire-database-module/fire-database.module';
import { GearTimelineDialog } from '../gear-timeline-dialog/gear-timeline-dialog.component';
import { LuxonDateFormatPipe } from '../luxon-date-format-pipe.pipe';
import { Box, BoxEditForm, UserRight } from '../models';
import { BoxEditDialog } from '../box-edit-dialog/box-edit-dialog.component';
import { ValuesOf } from '../types';

@Component({
    selector: 'app-gears',
    standalone: true,
    imports: [
        CommonModule,
        LuxonDateFormatPipe,

        CdkDropList,
        CdkDrag,
        CdkDragHandle,

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

    readonly UserRight = UserRight;

    get hasMultipleRights(): boolean {
        return this._appService.hasMultipleRights;
    }

    hasAccessRight(userRight: UserRight): boolean {
        return this._appService.hasAccessRight(userRight);
    }

    get allowEdit(): boolean {
        return this._appService.allowEdit;
    }

    get allowPacking(): boolean {
        return this._appService.hasAccessRight(UserRight.Packing);
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

    gearLists: CdkDropList[] = [];

    get dropListIds(): string[] {
        let idList = this.boxes.map(b => b.id);
        idList.push('uncategorized');
        return idList;
    }

    names: string[] = [
        'Ronald',
        'Tammy'
    ];

    private _expandedBoxes: string[] = [];

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

    viewTimeline(gear: string) {
        this._matDialog.open(GearTimelineDialog, {
            data: {
                gear: gear
            },
            width: '85vh'
        });
    }

    onGearListLoaded(dropList: CdkDropList) {
        this.gearLists.push(dropList);

        this.gearLists.forEach(list => {
            list.connectedTo = this.gearLists.filter(x => x != list);
        });
    }

    isExpanded(box: string): boolean {
        return this._activatedRoute.snapshot.paramMap.get('box') == box || this._expandedBoxes.includes(box);
    }

    onExpanded(box: string) {
        let idx = this._expandedBoxes.indexOf(box);
        if (idx >= 0) {
            this._expandedBoxes.splice(idx, 1);
        }
    }

    onCollapsed(box: string) {
        let idx = this._expandedBoxes.indexOf(box);
        if (idx >= 0) {
            this._expandedBoxes.splice(idx, 1);
        }
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

    private findAffectedBox(data: string[]): string {
        let box = this.boxes.find(b => b.items === data);
        return box?.id || 'notPacked';
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            this._expandedBoxes.push(this.findAffectedBox(event.container.data));
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            this._expandedBoxes.push(this.findAffectedBox(event.previousContainer.data));
            this._expandedBoxes.push(this.findAffectedBox(event.container.data));

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

    togglePacked(box: string, item: string) {
        this._expandedBoxes.push(box);
        this._appService.togglePackingStatus(item);
    }

    updateOwner(event: MatSelectChange, box: string, item: string) {
        this._expandedBoxes.push(box);
        this._appService.togglePackingStatus(item, event.value);
    }

    getItemPacked(item: string): boolean {
        return this._appService.packingStatus[item]?.packed;
    }

    getItemOwner(item: string): string {
        return this._appService.packingStatus[item]?.owner;
    }

    addBox() {
        const dialogRef = this._matDialog.open(BoxEditDialog, {
            data: null,
            height: '100%',
            width: '100%',
            maxWidth: '100%'
        });

        dialogRef.afterClosed().subscribe((formValue: ValuesOf<BoxEditForm>) => {
            if (!formValue) {
                return;
            }

            this.boxes.push({
                id: formValue.name,
                description: formValue.description,
                color: formValue.color,
                items: []
            });

            this._expandedBoxes.push(formValue.name);
            this._appService.saveGearsToDatabase();
        });
    }

    editBox(box: Box) {
        const dialogRef = this._matDialog.open(BoxEditDialog, {
            data: box,
            height: '100%',
            width: '100%',
            maxWidth: '100%'
        });

        dialogRef.afterClosed().subscribe((formValue: ValuesOf<BoxEditForm>) => {
            if (!formValue) {
                return;
            }

            box.id = formValue.name;
            box.description = formValue.description;
            box.color = formValue.color;

            this._expandedBoxes.push(formValue.name);
            this._appService.saveGearsToDatabase();
        });
    }

    removeBox(box: Box) {
        this._matDialog.open(ConfirmationDialog).afterClosed().subscribe((confirmDelete: boolean) => {
            if (confirmDelete) {
                this.notPackedItems.push(...box.items);
                this.boxes.splice(this.boxes.indexOf(box), 1);
                this._appService.saveGearsToDatabase();
            }
        });
    }

    sortBoxes() {
        this._appService.boxes.sort((a: Box, b: Box) => {
            if (a.id === 'X' || b.id === 'X') {
                return a.id === 'X'? 1 : -1;
            } else if (a.id.startsWith('GIP') && !b.id.startsWith('GIP')) {
                return 1;
            } else if (!a.id.startsWith('GIP') && b.id.startsWith('GIP')) {
                return -1;
            } else {
                return a.id.localeCompare(b.id);
            }
        });
        this._appService.saveGearsToDatabase();
    }
}

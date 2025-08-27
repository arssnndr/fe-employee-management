import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DialogOptions, DialogService } from '../../../services/dialog.service';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnDestroy {
    visible = false;
    current: DialogOptions | null = null;
    private sub: Subscription;

    constructor(private dialogService: DialogService) {
        this.sub = this.dialogService.dialog$.subscribe((opts) => {
            if (opts) {
                this.current = opts;
                this.visible = true;
            } else {
                this.visible = false;
                this.current = null;
            }
        });
    }

    get titleByType(): string {
        const type = this.current?.type || 'info';
        switch (type) {
            case 'error': return 'Terjadi Kesalahan';
            case 'warning': return 'Peringatan';
            case 'success': return 'Berhasil';
            default: return 'Informasi';
        }
    }

    get btnClass(): string {
        const type = this.current?.type || 'info';
        switch (type) {
            case 'error': return 'bg-red-600 hover:bg-red-700';
            case 'warning': return 'bg-yellow-600 hover:bg-yellow-700';
            case 'success': return 'bg-green-600 hover:bg-green-700';
            default: return 'bg-blue-600 hover:bg-blue-700';
        }
    }

    get titleClass(): string {
        const type = this.current?.type || 'info';
        switch (type) {
            case 'error': return 'text-red-700';
            case 'warning': return 'text-yellow-700';
            case 'success': return 'text-green-700';
            default: return 'text-blue-700';
        }
    }

    close() {
        this.dialogService.close();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}

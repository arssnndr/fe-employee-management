import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-status-badge',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './status-badge.component.html'
})
export class StatusBadgeComponent {
    @Input() status: string = '';
    @Input() size: 'sm' | 'md' = 'sm';

    get classes(): string {
        const base = this.size === 'md'
            ? 'inline-flex px-3 py-1 text-sm font-semibold rounded-full '
            : 'inline-flex px-2 py-1 text-xs font-semibold rounded-full ';
        return base + this.getStatusClass(this.status);
    }

    private getStatusClass(status: string): string {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-red-100 text-red-800';
            case 'On Leave':
                return 'bg-yellow-100 text-yellow-800';
            case 'Probation':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }
}

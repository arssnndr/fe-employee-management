import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'Memuat...';
  @Input() containerClass: string = 'bg-white rounded-lg shadow p-8 text-center';
}

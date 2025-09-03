import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'Memuat...';
  @Input() containerClass: string = 'bg-white rounded-lg shadow p-8 text-center';
}

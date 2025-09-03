import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/employees']);
  }

  goBack(): void {
    window.history.back();
  }
}

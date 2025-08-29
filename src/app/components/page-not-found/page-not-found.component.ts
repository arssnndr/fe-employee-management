import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
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

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [class]="classes" [attr.fill]="fill" [attr.stroke]="stroke" [attr.viewBox]="viewBox">
      <ng-container [ngSwitch]="name">
        <!-- Info Circle -->
        <path *ngSwitchCase="'info-circle'"
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd" />

        <!-- User -->
        <path *ngSwitchCase="'user'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />

        <!-- Briefcase -->
        <path *ngSwitchCase="'briefcase'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />

        <!-- Document -->
        <path *ngSwitchCase="'document'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />

        <!-- Plus -->
        <path *ngSwitchCase="'plus'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4" />

        <!-- Close -->
        <path *ngSwitchCase="'close'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />

        <!-- Home -->
        <path *ngSwitchCase="'home'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />

        <!-- Arrow Left -->
        <path *ngSwitchCase="'arrow-left'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18" />

        <!-- Warning -->
        <path *ngSwitchCase="'warning'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />

        <!-- Users Empty -->
        <path *ngSwitchCase="'users-empty'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />

        <!-- Chevron Left -->
        <path *ngSwitchCase="'chevron-left'"
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd" />

        <!-- Chevron Right -->
        <path *ngSwitchCase="'chevron-right'"
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />

        <!-- Error 404 -->
        <path *ngSwitchCase="'error-404'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.657-2.343m0 0L3.515 9.829C2.555 8.869 2 7.581 2 6.182A2.182 2.182 0 014.182 4h15.636A2.182 2.182 0 0122 6.182c0 1.399-.555 2.687-1.515 3.647l-2.828 2.828z" />

        <!-- Spinner -->
        <g *ngSwitchCase="'spinner'">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </g>

        <!-- Loader (same as spinner) -->
        <g *ngSwitchCase="'loader'">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </g>
      </ng-container>
    </svg>
  `
})
export class IconComponent {
  @Input() name: string = '';
  @Input() classes: string = '';
  @Input() fill: string = 'currentColor';
  @Input() stroke: string = 'currentColor';
  @Input() viewBox: string = '0 0 24 24';

  constructor() {
    // Set default values based on icon type
  }

  ngOnInit() {
    // Set defaults based on icon name
    if (this.name === 'info-circle' || this.name === 'chevron-left' || this.name === 'chevron-right') {
      this.viewBox = '0 0 20 20';
      this.stroke = 'none';
    } else if (this.name === 'spinner') {
      this.viewBox = '0 0 24 24';
      this.fill = 'none';
    } else {
      this.fill = 'none';
    }
  }
}

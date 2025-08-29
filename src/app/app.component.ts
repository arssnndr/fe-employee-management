import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './components/shared/notification/notification.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, DialogComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'fe-employee-management';
}

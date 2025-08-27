import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, DialogComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'employee-management';
}

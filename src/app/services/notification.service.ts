import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();
  private notificationId = 1;

  constructor() { }

  showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
    const notification: Notification = {
      id: this.notificationId++,
      message,
      type,
      timestamp: new Date()
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([notification, ...currentNotifications]);

    // Auto remove notification after 5 seconds
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 5000);
  }

  removeNotification(id: number): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  success(message: string): void {
    this.showNotification(message, 'success');
  }

  error(message: string): void {
    this.showNotification(message, 'error');
  }

  warning(message: string): void {
    this.showNotification(message, 'warning');
  }

  info(message: string): void {
    this.showNotification(message, 'info');
  }
}

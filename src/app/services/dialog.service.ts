import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type DialogType = 'info' | 'warning' | 'error' | 'success';

export interface DialogOptions {
  title?: string;
  message: string;
  type?: DialogType;
  okText?: string;
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialogSubject = new Subject<DialogOptions | null>();
  dialog$ = this.dialogSubject.asObservable();
  private pendingClose$: Subject<void> | null = null;

  open(options: DialogOptions): Observable<void> {
    // Buat subject baru untuk sesi dialog ini
    this.pendingClose$ = new Subject<void>();
    this.dialogSubject.next({
      okText: 'OK',
      type: 'info',
      ...options,
    });
    return this.pendingClose$.asObservable();
  }

  close() {
    this.dialogSubject.next(null);
    if (this.pendingClose$) {
      this.pendingClose$.next();
      this.pendingClose$.complete();
      this.pendingClose$ = null;
    }
  }
}

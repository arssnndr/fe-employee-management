import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type DialogType = 'info' | 'warning' | 'error' | 'success';

export interface DialogOptions {
  title?: string;
  message: string;
  type?: DialogType;
  okText?: string;
  // If true, the dialog will show a Cancel button and the confirm() method
  // will return an Observable<boolean> that emits true when OK pressed,
  // false when Cancel pressed.
  confirm?: boolean;
  cancelText?: string;
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialogSubject = new Subject<DialogOptions | null>();
  dialog$ = this.dialogSubject.asObservable();
  private pendingClose$: Subject<void> | null = null;
  private pendingConfirm$: Subject<boolean> | null = null;

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

  /**
   * Open a confirmation dialog and return an Observable<boolean> that emits
   * true when user confirms (OK) or false when user cancels.
   */
  confirm(options: DialogOptions): Observable<boolean> {
    this.pendingConfirm$ = new Subject<boolean>();
    this.dialogSubject.next({
      okText: options.okText || 'OK',
      cancelText: options.cancelText || 'Cancel',
      type: options.type || 'warning',
      confirm: true,
      ...options,
    });
    return this.pendingConfirm$.asObservable();
  }

  close() {
    this.dialogSubject.next(null);
    if (this.pendingClose$) {
      this.pendingClose$.next();
      this.pendingClose$.complete();
      this.pendingClose$ = null;
    }
    // If there is a pending confirm, treat close as cancel
    if (this.pendingConfirm$) {
      this.pendingConfirm$.next(false);
      this.pendingConfirm$.complete();
      this.pendingConfirm$ = null;
    }
  }

  /** Resolve the active confirmation dialog with the given boolean. */
  confirmResolve(result: boolean) {
    this.dialogSubject.next(null);
    if (this.pendingConfirm$) {
      this.pendingConfirm$.next(result);
      this.pendingConfirm$.complete();
      this.pendingConfirm$ = null;
    }
  }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('auth_token');
    const router = inject(Router);
    const authService = inject(AuthService);

    const requestToSend = token
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
            // withCredentials: true, // aktifkan jika Anda memilih pakai cookie lintas-origin
        })
        : req;

    return next(requestToSend).pipe(
        catchError((error: any) => {
            const message = error?.error?.message || '';
            const isExpired = /invalid or expired token/i.test(message);
            if (error?.status === 401 || isExpired) {
                // Tindakan global saat token invalid/expired
                alert('Sesi Anda telah berakhir atau token tidak valid. Silakan login kembali.');
                try { authService.logout(); } catch {}
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};

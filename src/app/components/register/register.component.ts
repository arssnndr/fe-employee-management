import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, IconComponent],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    form = {
        username: '',
        password: ''
    };

    isLoading = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private notification: NotificationService
    ) { }

    onSubmit(): void {
        if (!this.form.username || !this.form.password) {
            this.notification.error('Username dan password wajib diisi');
            return;
        }
        this.isLoading = true;
        this.authService.register(this.form.username, this.form.password).subscribe({
            next: (ok) => {
                if (ok) {
                    this.notification.success('Registrasi berhasil. Anda telah login.');
                    this.router.navigate(['/employees']);
                } else {
                    this.notification.error('Registrasi gagal. Coba username lain.');
                }
                this.isLoading = false;
            },
            error: () => {
                this.notification.error('Terjadi kesalahan saat registrasi');
                this.isLoading = false;
            }
        });
    }

    goLogin(): void {
        this.router.navigate(['/login']);
    }
}

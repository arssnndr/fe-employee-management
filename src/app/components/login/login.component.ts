import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  };
  
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  onSubmit(): void {
    if (!this.loginData.username || !this.loginData.password) {
      this.notificationService.error('Username dan password harus diisi!');
      return;
    }

    this.isLoading = true;
    
    // Simulate loading delay
    setTimeout(() => {
      const success = this.authService.login(this.loginData.username, this.loginData.password);
      
      if (success) {
        this.notificationService.success('Login berhasil!');
        this.router.navigate(['/employees']);
      } else {
        this.notificationService.error('Username atau password salah!');
      }
      
      this.isLoading = false;
    }, 1000);
  }
}

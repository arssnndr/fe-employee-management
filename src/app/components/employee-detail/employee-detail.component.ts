import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NotificationService } from '../../services/notification.service';
import { ButtonConfig, Employee } from '../../models/employee.interface';
import { HeaderComponent } from '../shared/header/header.component';
import { StatusBadgeComponent } from '../shared/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, HeaderComponent, StatusBadgeComponent, LoadingSpinnerComponent],
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  isLoading = true;

  buttonConfig: ButtonConfig = {
    classStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
    label: 'Kembali'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(+id);
    } else {
      this.notificationService.error('ID karyawan tidak valid');
      this.goBack();
    }
  }

  loadEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (emp) => {
        this.employee = emp;
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.error('Karyawan tidak ditemukan');
        this.isLoading = false;
        this.goBack();
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  getAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  getInitials(firstName: string, lastName: string): string {
    return firstName.charAt(0) + lastName.charAt(0);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NotificationService } from '../../services/notification.service';
import { ButtonConfig, Employee } from '../../models/employee.interface';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, HeaderComponent],
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
    
    // Simulate loading delay
    setTimeout(() => {
this.employee = this.employeeService.getEmployeeById(id) || null;
      
      if (!this.employee) {
        this.notificationService.error('Karyawan tidak ditemukan');
        this.goBack();
      }
      
      this.isLoading = false;
    }, 500);
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Probation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getInitials(firstName: string, lastName: string): string {
    return firstName.charAt(0) + lastName.charAt(0);
  }
}

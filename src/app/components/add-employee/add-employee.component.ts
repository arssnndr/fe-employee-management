import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NotificationService } from '../../services/notification.service';
import { ButtonConfig, Employee, EmployeeGroup } from '../../models/employee.interface';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: new Date(),
    basicSalary: 0,
    status: 'Active',
    group: '',
    description: ''
  };

  groups: EmployeeGroup[] = [];
  filteredGroups: EmployeeGroup[] = [];
  groupSearchTerm = '';
  showGroupDropdown = false;
  isLoading = false;
  maxDate: string = '';

  // Form validation flags
  formErrors = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: '',
    group: '',
    description: ''
  };

  buttonConfig: ButtonConfig = {
    classStyle: 'bg-gray-600 hover:bg-gray-700 text-white',
    label: 'Kembali'
  }

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.groups = this.employeeService.getGroups();
    this.filteredGroups = [...this.groups];
    
    // Set max date to today
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      basicSalary: '',
      group: '',
      description: ''
    };

    // Username validation
    if (!this.employee.username.trim()) {
      this.formErrors.username = 'Username harus diisi';
      isValid = false;
    }

    // First name validation
    if (!this.employee.firstName.trim()) {
      this.formErrors.firstName = 'Nama depan harus diisi';
      isValid = false;
    }

    // Last name validation
    if (!this.employee.lastName.trim()) {
      this.formErrors.lastName = 'Nama belakang harus diisi';
      isValid = false;
    }

    // Email validation
    if (!this.employee.email.trim()) {
      this.formErrors.email = 'Email harus diisi';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.employee.email)) {
        this.formErrors.email = 'Format email tidak valid';
        isValid = false;
      }
    }

    // Birth date validation
    if (!this.employee.birthDate) {
      this.formErrors.birthDate = 'Tanggal lahir harus diisi';
      isValid = false;
    } else {
      const today = new Date();
      const birthDate = new Date(this.employee.birthDate);
      if (birthDate > today) {
        this.formErrors.birthDate = 'Tanggal lahir tidak boleh melebihi hari ini';
        isValid = false;
      }
    }

    // Basic salary validation
    if (!this.employee.basicSalary || this.employee.basicSalary <= 0) {
      this.formErrors.basicSalary = 'Gaji pokok harus diisi dan lebih dari 0';
      isValid = false;
    }

    // Group validation
    if (!this.employee.group.trim()) {
      this.formErrors.group = 'Grup harus dipilih';
      isValid = false;
    }

    // Description validation
    if (!this.employee.description.trim()) {
      this.formErrors.description = 'Deskripsi harus diisi';
      isValid = false;
    }

    return isValid;
  }

  filterGroups(): void {
    const term = this.groupSearchTerm.toLowerCase();
    this.filteredGroups = this.groups.filter(group => 
      group.name.toLowerCase().includes(term)
    );
  }

  selectGroup(group: EmployeeGroup): void {
    this.employee.group = group.name;
    this.groupSearchTerm = group.name;
    this.showGroupDropdown = false;
    this.formErrors.group = ''; // Clear error when group is selected
  }

  clearGroupFilter(): void {
    this.employee.group = '';
    this.groupSearchTerm = '';
    this.showGroupDropdown = false;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      this.notificationService.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    this.isLoading = true;

    // Simulate loading delay
    setTimeout(() => {
      try {
        this.employeeService.addEmployee(this.employee);
        this.notificationService.success(`Karyawan ${this.employee.firstName} ${this.employee.lastName} berhasil ditambahkan`);
        this.router.navigate(['/employees']);
      } catch (error) {
        this.notificationService.error('Gagal menambahkan karyawan');
      } finally {
        this.isLoading = false;
      }
    }, 1000);
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }

  onDateChange(event: any): void {
    this.employee.birthDate = new Date(event.target.value);
    this.formErrors.birthDate = ''; // Clear error when date is changed
  }

  onSalaryChange(): void {
    // Ensure salary is a number
    this.employee.basicSalary = Number(this.employee.basicSalary);
    this.formErrors.basicSalary = ''; // Clear error when salary is changed
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  onInputBlur() {
    setTimeout(() => {
      this.showGroupDropdown = false;
    }, 150);
  }
}

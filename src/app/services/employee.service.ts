import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee, EmployeeGroup, PaginationData, EmployeeSearchParams } from '../models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  private groups: EmployeeGroup[] = [
    { id: 1, name: 'IT Development' },
    { id: 2, name: 'Human Resources' },
    { id: 3, name: 'Finance & Accounting' },
    { id: 4, name: 'Marketing & Sales' },
    { id: 5, name: 'Operations' },
    { id: 6, name: 'Customer Service' },
    { id: 7, name: 'Quality Assurance' },
    { id: 8, name: 'Research & Development' },
    { id: 9, name: 'Business Analytics' },
    { id: 10, name: 'Project Management' }
  ];

  constructor() {
    this.generateDummyData();
  }

  private generateDummyData(): void {
    const existingData = localStorage.getItem('employeeData');

    if (existingData) {
      try {
        this.employees = JSON.parse(existingData);
        this.employees.forEach(emp => {
          emp.birthDate = new Date(emp.birthDate);
        });
        this.employeesSubject.next(this.employees);
        return;
      } catch (error) {
        console.warn('Error parsing employee data from localStorage:', error);
      }
    }

    const firstNames = ['Ahmad', 'Siti', 'Budi', 'Andi', 'Dewi', 'Rizki', 'Lina', 'Joko', 'Maya', 'Rudi', 'Indira', 'Fajar', 'Ratna', 'Dian', 'Eko', 'Wulan', 'Agus', 'Putri', 'Hendra', 'Sari'];
    const lastNames = ['Pratama', 'Sari', 'Wijaya', 'Kusuma', 'Lestari', 'Santoso', 'Anggraini', 'Hidayat', 'Permata', 'Setiawan', 'Maharani', 'Nugroho', 'Indah', 'Gunawan', 'Safitri', 'Wahyudi', 'Rahayu', 'Putra', 'Handayani', 'Wibowo'];
    const statuses = ['Active', 'Inactive', 'On Leave', 'Probation'];
    const domains = ['gmail.com', 'yahoo.com', 'company.com', 'outlook.com'];

    for (let i = 1; i <= 125; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const group = this.groups[Math.floor(Math.random() * this.groups.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const domain = domains[Math.floor(Math.random() * domains.length)];

      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - (20 + Math.floor(Math.random() * 40)));
      birthDate.setMonth(Math.floor(Math.random() * 12));
      birthDate.setDate(Math.floor(Math.random() * 28) + 1);

      const employee: Employee = {
        id: i,
        username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`,
        firstName: firstName,
        lastName: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
        birthDate: birthDate,
        basicSalary: Math.floor(Math.random() * 15000000) + 5000000, // 5-20 juta
        status: status,
        group: group.name,
        description: `Employee ${firstName} ${lastName} working in ${group.name} department with ${status} status.`
      };

      this.employees.push(employee);
    }

    try {
      localStorage.setItem('employeeData', JSON.stringify(this.employees));
    } catch (error) {
      console.warn('Error saving employee data to localStorage:', error);
    }

    this.employeesSubject.next(this.employees);
  }

  getEmployees(page: number = 1, pageSize: number = 10, searchParams: EmployeeSearchParams = {}): Observable<{ employees: Employee[], pagination: PaginationData }> {
    let filteredEmployees = [...this.employees];

    // Apply search filters
    if (searchParams.searchTerm) {
      const term = searchParams.searchTerm.toLowerCase();
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.username.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term)
      );
    }

    if (searchParams.status) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.status.toLowerCase() === searchParams.status!.toLowerCase()
      );
    }

    if (searchParams.group) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.group.toLowerCase().includes(searchParams.group!.toLowerCase())
      );
    }

    // Apply sorting
    if (searchParams.sortBy) {
      filteredEmployees.sort((a, b) => {
        const aValue = (a as any)[searchParams.sortBy!];
        const bValue = (b as any)[searchParams.sortBy!];

        let comparison = 0;
        if (aValue > bValue) comparison = 1;
        if (aValue < bValue) comparison = -1;

        return searchParams.sortDirection === 'desc' ? -comparison : comparison;
      });
    }

    // Apply pagination
    const totalItems = filteredEmployees.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

    const pagination: PaginationData = {
      currentPage: page,
      pageSize: pageSize,
      totalItems: totalItems,
      totalPages: totalPages
    };

    return new BehaviorSubject({ employees: paginatedEmployees, pagination }).asObservable();
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee): void {
    const newId = Math.max(...this.employees.map(e => e.id || 0)) + 1;
    employee.id = newId;
    this.employees.push(employee);
    this.updateLocalStorage();
    this.employeesSubject.next(this.employees);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.updateLocalStorage();
      this.employeesSubject.next(this.employees);
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.updateLocalStorage();
    this.employeesSubject.next(this.employees);
  }

  getGroups(): EmployeeGroup[] {
    return this.groups;
  }

  private updateLocalStorage(): void {
    try {
      localStorage.setItem('employeeData', JSON.stringify(this.employees));
    } catch (error) {
      console.warn('Error updating employee data in localStorage:', error);
    }
  }
}

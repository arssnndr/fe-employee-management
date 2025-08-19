import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Employee, EmployeeGroup, PaginationData, EmployeeSearchParams } from '../models/employee.interface';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) {}

  // Map field sorting from UI (camelCase) to DB columns (snake_case)
  private mapSortField(field?: string): string | undefined {
    if (!field) return undefined;
    const mapping: Record<string, string> = {
      firstName: 'first_name',
      lastName: 'last_name',
      basicSalary: 'basic_salary',
      birthDate: 'birth_date',
      group: 'group_name',
      username: 'username',
      email: 'email',
      status: 'status'
    };
    return mapping[field] || field;
  }

  getEmployees(page: number = 1, pageSize: number = 10, searchParams: EmployeeSearchParams = {}): Observable<{ employees: Employee[], pagination: PaginationData }> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (searchParams.searchTerm) params = params.set('searchTerm', searchParams.searchTerm);
    if (searchParams.status) params = params.set('status', searchParams.status);
    if (searchParams.group) params = params.set('group', searchParams.group);
    if (searchParams.sortBy) params = params.set('sortBy', this.mapSortField(searchParams.sortBy)!);
    if (searchParams.sortDirection) params = params.set('sortDirection', searchParams.sortDirection);

    return this.http.get<any>(`${environment.API_BASE_URL}/employees`, { params }).pipe(
      map((res) => ({
        employees: (res.employees || []).map((e: any): Employee => ({
          id: e.id,
          username: e.username,
          firstName: e.first_name,
          lastName: e.last_name,
          email: e.email,
          birthDate: new Date(e.birth_date),
          basicSalary: e.basic_salary,
          status: e.status,
          group: e.group_name,
          description: e.description,
        })),
        pagination: res.pagination as PaginationData
      }))
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<any>(`${environment.API_BASE_URL}/employees/${id}`).pipe(
      map((e: any): Employee => ({
        id: e.id,
        username: e.username,
        firstName: e.first_name,
        lastName: e.last_name,
        email: e.email,
        birthDate: new Date(e.birth_date),
        basicSalary: e.basic_salary,
        status: e.status,
        group: e.group_name,
        description: e.description,
      }))
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    // Backend expects camelCase payload and will map to DB columns
    const payload = {
      username: employee.username,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      birthDate: employee.birthDate,
      basicSalary: employee.basicSalary,
      status: employee.status,
      group: employee.group,
      description: employee.description
    };
    return this.http.post<any>(`${environment.API_BASE_URL}/employees`, payload).pipe(
      map((e: any): Employee => ({
        id: e.id,
        username: e.username,
        firstName: e.first_name,
        lastName: e.last_name,
        email: e.email,
        birthDate: new Date(e.birth_date),
        basicSalary: e.basic_salary,
        status: e.status,
        group: e.group_name,
        description: e.description,
      }))
    );
  }

  updateEmployee(employee: Employee): void {
    // Not implemented in backend sample; implement when API available (PUT/PATCH)
    console.warn('updateEmployee not implemented on API');
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.API_BASE_URL}/employees/${id}`);
  }

  getGroups(): EmployeeGroup[] {
    return this.groups;
  }

  private updateLocalStorage(): void {
    // No-op: local storage no longer used when integrated with API
  }
}

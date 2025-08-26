import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Employee, EmployeeGroup, PaginationData, EmployeeSearchParams, ButtonConfig } from '../../models/employee.interface';
import { HeaderComponent } from "../../shared/header/header.component";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  groups: EmployeeGroup[] = [];
  pagination: PaginationData = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  };

  searchParams: EmployeeSearchParams = {
    searchTerm: '',
    status: '',
    group: '',
    sortBy: 'firstName',
    sortDirection: 'asc'
  };

  pageSizeOptions = [10, 25, 50, 100];
  isLoading = false;
  filteredGroups: EmployeeGroup[] = [];
  groupSearchTerm = '';
  showGroupDropdown = false;

  // Debounce input search
  private searchInput$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  buttonConfig: ButtonConfig = {
    classStyle: 'bg-red-600 hover:bg-red-700 text-white',
    label: 'Logout',
  }

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.groups = this.employeeService.getGroups();
    this.filteredGroups = [...this.groups];
    this.loadEmployees();

    // Ambil keyword dari URL saat komponen diinisialisasi
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.searchParams.searchTerm = params['search'] || '';
        this.searchParams.status = params['status'] || '';
        this.searchParams.group = params['group'] || '';
        const qpPageSize = params['pageSize'];
        const qpPage = params['page'];
        if (qpPageSize) {
          this.pagination.pageSize = Number(qpPageSize);
        }
        if (qpPage) {
          this.pagination.currentPage = Number(qpPage);
        }
        if (this.searchParams.group) {
          this.groupSearchTerm = this.searchParams.group;
        }
        if (this.searchParams.searchTerm || this.searchParams.status || this.searchParams.group) {
          this.loadEmployees();
        }
      });

    // Subscribe input pencarian dengan debounce
    this.searchInput$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((term: string) => {
        this.searchParams.searchTerm = term;
        this.onSearch();
      });
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees(
      this.pagination.currentPage,
      Number(this.pagination.pageSize),
      this.searchParams
    ).subscribe({
      next: (result) => {
        this.employees = result.employees;
        this.pagination = result.pagination;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.error('Gagal memuat data karyawan');
        this.isLoading = false;
      }
    });
  }

  // Handler input ketikan untuk pencarian dengan debounce
  onSearchInput(value: string): void {
    this.searchInput$.next(value ?? '');
  }

  onSearch(): void {
    this.updateUrlWithFilters(this.searchParams);
    this.pagination.currentPage = 1;
    this.loadEmployees();
  }

  updateUrlWithFilters(params: EmployeeSearchParams): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        search: params.searchTerm || null,
        status: params.status || null,
        group: params.group || null
      },
      queryParamsHandling: 'merge'
    });
  }

  onSort(column: string): void {
    if (this.searchParams.sortBy === column) {
      this.searchParams.sortDirection = this.searchParams.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.searchParams.sortBy = column;
      this.searchParams.sortDirection = 'asc';
    }
    this.loadEmployees();
  }

  onPageChange(page: number): void {
    this.pagination.currentPage = page;
    this.updateUrlWithPage(page);
    this.loadEmployees();
  }

  onPageSizeChange(): void {
    this.pagination.currentPage = 1;
    this.updateUrlWithPageSize(Number(this.pagination.pageSize));
    this.loadEmployees();
  }

  updateUrlWithPageSize(size: number): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { pageSize: size || null },
      queryParamsHandling: 'merge'
    });
  }

  updateUrlWithPage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: page || 1 },
      queryParamsHandling: 'merge'
    });
  }

  filterGroups(): void {
    const term = this.groupSearchTerm.toLowerCase();
    this.filteredGroups = this.groups.filter(group =>
      group.name.toLowerCase().includes(term)
    );
  }

  selectGroup(group: EmployeeGroup): void {
    this.searchParams.group = group.name;
    this.groupSearchTerm = group.name;
    this.showGroupDropdown = false;
    this.onSearch();
  }

  clearGroupFilter(): void {
    this.searchParams.group = '';
    this.groupSearchTerm = '';
    this.showGroupDropdown = false;
    this.onSearch();
  }

  getPaginationPages(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    const totalPages = this.pagination.totalPages;
    const currentPage = this.pagination.currentPage;

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  getSortIcon(column: string): string {
    if (this.searchParams.sortBy !== column) {
      return '↕️';
    }
    return this.searchParams.sortDirection === 'asc' ? '↑' : '↓';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  onEdit(employee: Employee): void {
    this.notificationService.warning(`Edit karyawan: ${employee.firstName} ${employee.lastName}`);
  }

  onDelete(employee: Employee): void {
    this.notificationService.error(`Delete karyawan: ${employee.firstName} ${employee.lastName}`);
  }

  viewEmployeeDetail(employeeId: number): void {
    // this.router.navigate(['/employees', employeeId]);
    window.location.assign(`employees/${employeeId}`);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.notificationService.success('Logout berhasil!');
  }

  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id || index;
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

  onInputBlur() {
    setTimeout(() => {
      this.showGroupDropdown = false;
    }, 150);
  }


  // Make Math available in template
  Math = Math;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

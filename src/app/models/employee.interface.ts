export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export interface EmployeeGroup {
  id: number;
  name: string;
}

export interface PaginationData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface EmployeeSearchParams {
  searchTerm?: string;
  status?: string;
  group?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

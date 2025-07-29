# Employee Management System

Sistem manajemen karyawan yang dibangun menggunakan Angular 19, SCSS, dan Tailwind CSS.

## Demo Apps

- [Live Demo](https://www.port-aris.my.id/login)

## Preview:

<p align="center">Login Page:</p>
<img src="https://www.port-aris.my.id/assets/images/login-page.png" alt="Login Page">
<p align="center">List Employee:</p>
<img src="https://www.port-aris.my.id/assets/images/list-page.png" alt="List Page">
<p align="center">Add Employee:</p>
<img src="https://www.port-aris.my.id/assets/images/add-page.png" alt="Add Page">
<p align="center">Detail Employee:</p>
<img src="https://www.port-aris.my.id/assets/images/detail-page.png" alt="Detail Page">

## 🚀 Fitur

### 1. **Login Page**
- Input username dan password dengan validasi
- Navigasi yang fungsional dengan autentikasi
- Demo credentials tersedia di halaman login
- Responsif untuk semua ukuran device

### 2. **Employee List Page**
- Menampilkan 100 dummy data karyawan Indonesia
- **Pagination** dengan pilihan jumlah data per halaman (10, 25, 50, 100)
- **Sorting** untuk semua kolom dengan indikator arah sorting
- **Searching** dengan 2 parameter (AND rule):
  - Search term: nama, username, atau email
  - Filter status: Active, Inactive, On Leave, Probation
  - Filter grup/departemen dengan dropdown yang bisa dicari
- Button "Add Employee" untuk navigasi ke halaman tambah karyawan
- Button aksi: Detail (biru), Edit (kuning), Delete (merah) dengan notifikasi berwarna
- Format gaji dalam Rupiah Indonesia

### 3. **Add Employee Page**
- Form lengkap dengan semua atribut employee
- **Validasi mandatory** untuk semua field:
  - Username, firstName, lastName: tidak boleh kosong
  - Email: format email yang valid
  - BirthDate: menggunakan date picker, tidak boleh melebihi hari ini
  - BasicSalary: harus berupa angka dan lebih dari 0
  - Group: dropdown dengan search textbox dan 10 dummy group
  - Description: tidak boleh kosong
- Button Save dan Cancel dengan loading state
- Real-time currency formatting untuk salary
- Error message yang jelas untuk setiap field

### 4. **Employee Detail Page**
- Menampilkan informasi lengkap karyawan
- **Format data yang rapi**:
  - Gaji ditampilkan dalam format Rupiah (Rp. xx.xxx.xxx)
  - Tanggal lahir dalam format Indonesia
  - Kalkulasi umur otomatis
  - Status dengan warna badge
- Avatar dengan inisial nama
- Layout responsive dengan grid system
- Button "OK" untuk kembali ke Employee List dengan mempertahankan pencarian sebelumnya

## 🛠️ Teknologi yang Digunakan

- **Angular 19** - Framework utama
- **TypeScript** - Language
- **SCSS** - CSS Preprocessor
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive programming
- **Angular Router** - Navigation
- **Angular Forms** - Form handling

## 📦 Struktur Proyek

```
src/
├── app/
│   ├── components/           # Komponen utama
│   │   ├── login/           # Halaman login
│   │   ├── employee-list/   # Daftar karyawan
│   │   ├── add-employee/    # Tambah karyawan
│   │   ├── employee-detail/ # Detail karyawan
│   │   └── notification/    # Sistem notifikasi
│   ├── services/            # Services
│   │   ├── auth.service.ts          # Autentikasi
│   │   ├── employee.service.ts      # Manajemen karyawan
│   │   └── notification.service.ts  # Notifikasi
│   ├── models/              # Interfaces dan Models
│   │   └── employee.interface.ts
│   ├── guards/              # Route guards
│   │   └── auth.guard.ts
│   └── app.routes.ts        # Routing configuration
```

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites
- Node.js (v18 atau lebih baru) dan npm
- Angular CLI v19

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/arssnndr/employee-management.git
   cd employee-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   npm start
   # atau
   ng serve
   ```

4. **Buka browser**
   ```
   http://localhost:4200
   ```

### Login Credentials
- **Username**: `admin`
- **Password**: `password123`

## 🎨 Fitur UI/UX

- **Responsive Design** - Bekerja sempurna di desktop, tablet, dan mobile
- **Loading States** - Indikator loading untuk semua operasi async
- **Error Handling** - Pesan error yang jelas dan user-friendly
- **Consistent Design** - Menggunakan design system yang konsisten
- **Accessibility** - Mengikuti best practices accessibility
- **Animation** - Smooth transitions dan micro-interactions

## 📊 Data Management

- **100 Dummy Data** karyawan dengan nama Indonesia
- **10 Dummy Groups** departemen/divisi
- **In-memory Storage** dengan persistence di localStorage untuk autentikasi
- **Search & Filter** yang powerful dengan multiple criteria
- **CRUD Operations** yang lengkap (Create, Read, Update, Delete)

## 🔒 Security Features

- **Route Guards** untuk melindungi halaman yang memerlukan autentikasi
- **Input Validation** di frontend untuk semua form
- **XSS Protection** dengan Angular's built-in sanitization
- **CSRF Protection** dengan Angular's HttpClient

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 📝 Development Notes

- Menggunakan Angular Standalone Components
- Reactive Forms dengan validation
- Observable patterns untuk state management
- Modular architecture yang scalable
- Clean code principles
- Type-safe development dengan TypeScript

## 👨‍💻 Author

Dibuat sebagai demo Employee Management System menggunakan Angular 19.

---

**Note**: Aplikasi ini menggunakan dummy data dan hardcoded authentication untuk keperluan demo.

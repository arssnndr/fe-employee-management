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
- Autentikasi terintegrasi dengan backend API (`POST /api/auth/login`)
- Demo credentials tersedia di halaman login
- Link ke halaman Register untuk membuat akun baru
- Mendukung registrasi pengguna baru (`POST /api/auth/register`) dengan auto-login setelah berhasil
- Responsif untuk semua ukuran device

### 2. **Employee List Page**

- Data karyawan diambil dari backend API
- **Pagination** dengan pilihan jumlah data per halaman (10, 25, 50, 100)
- **Sorting** untuk semua kolom dengan indikator arah sorting
- **Searching & Filter** (AND rule):
  - Search term: nama, username, atau email
  - Filter status: Active, Inactive, On Leave, Probation
  - Filter grup/departemen dengan dropdown yang bisa dicari
- Sinkronisasi query params ke URL: `?search=...&status=...&group=...&pageSize=...&page=...`
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
- **SCSS (global only)** - Hanya untuk stylesheet global `src/styles.scss`
- **Tailwind CSS** - Utility-first CSS framework (styling utama komponen)
- **PostCSS** - Pipeline Tailwind (`postcss.config.js`)
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

### Build untuk produksi

```bash
npm run build
# hasil build ada di: dist/employee-management/
```

### Login Credentials

- **Username**: `admin1`
- **Password**: `P@ssw0rd`

Catatan: Kredensial di atas berasal dari seed database backend.

## 🔧 Konfigurasi Environment

- File konfigurasi: `src/environments/environment.ts`
- Nilai saat ini:

```ts
export const environment = {
  API_BASE_URL: "https://em-express-api.vercel.app/api",
};
```

- Ganti `API_BASE_URL` jika Anda menggunakan backend berbeda (mis. lokal vs produksi).

### Environment Development

- Saat mode development (`ng serve`), Angular melakukan file replacement sesuai `angular.json`:

```json
{
  "build": {
    "configurations": {
      "development": {
        "fileReplacements": [{ "replace": "src/environments/environment.ts", "with": "src/environments/environment.development.ts" }]
      }
    }
  }
}
```

- Isi `src/environments/environment.development.ts` (default):

```ts
export const environment = {
  API_BASE_URL: "http://localhost:3000/api",
};
```

- Jadi, gunakan base URL lokal saat development, dan base URL produksi saat build production.

## 🖧 Menjalankan Backend API (Lokal)

Backend yang digunakan: `em-express-api` (Express + Supabase). Ikuti langkah berikut untuk menjalankannya secara lokal:

1. **Clone repository backend**

   ```bash
   git clone https://github.com/arssnndr/em-express-api.git
   cd em-express-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Siapkan Environment Variables**

   - Salin contoh env dan sesuaikan nilainya
     ```bash
     cp .env.example .env
     ```
   - Wajib diisi di `.env`:

     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`
     - `JWT_SECRET` (secret kuat untuk signing JWT)
     - (Opsional) `JWT_EXPIRES_IN` (default `15m`)
     - (Opsional) `CORS_ORIGIN` (default `http://localhost:4200`)
     - (Opsional) `PORT` (default `3000`)

   - Contoh membuat `JWT_SECRET` kuat (pilih salah satu):

     ```bash
     # OpenSSL (hex, 64 chars)
     openssl rand -hex 32

     # Node.js (hex, 64 chars)
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

4. **Jalankan server**

   ```bash
   npm start
   ```

   - Server: `http://localhost:3000`
   - Semua endpoint berada di path `/api/*` (contoh: `http://localhost:3000/api/employees`)

5. **Hubungkan dengan Frontend**
   - Pastikan `employee-management/src/environments/environment.development.ts` berisi:
     ```ts
     export const environment = {
       API_BASE_URL: "http://localhost:3000/api",
     };
     ```
   - Jalankan frontend: `npm start` pada folder `employee-management`, lalu akses `http://localhost:4200`.

## 🎨 Fitur UI/UX

- **Responsive Design** - Bekerja sempurna di desktop, tablet, dan mobile
- **Loading States** - Indikator loading untuk semua operasi async
- **Error Handling** - Pesan error yang jelas dan user-friendly
- **Consistent Design** - Menggunakan design system yang konsisten
- **Accessibility** - Mengikuti best practices accessibility
- **Animation** - Smooth transitions dan micro-interactions

## 📊 Data Management

- **Employees dari API** (Postgres/Supabase melalui backend)
- **10 Dummy Groups** departemen/divisi (statis di frontend)
- **Autentikasi via API** dengan state login disimpan di localStorage
- **Search & Filter** yang powerful dengan multiple criteria
- **CRUD Operations** (Create, Read, Update, Delete) melalui API

## 🔗 API Endpoints yang Digunakan

Semua endpoint diawali dengan base URL dari `environment.API_BASE_URL`.

- `POST /auth/login` — Login pengguna, mengembalikan token
- `POST /auth/register` — Registrasi pengguna baru (frontend auto-login setelah sukses)
- `POST /auth/logout` — Logout pengguna
- `GET /employees` — List karyawan, mendukung query params: `page`, `pageSize`, `searchTerm`, `status`, `group`, `sortBy`, `sortDirection`
- `GET /employees/:id` — Detail karyawan
- `POST /employees` — Tambah karyawan
- `DELETE /employees/:id` — Hapus karyawan

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

## ❗ Troubleshooting

- **CORS error (blocked by CORS policy)**
  - Pastikan backend `.env` berisi `CORS_ORIGIN=http://localhost:4200` (atau origin yang Anda gunakan)
  - Protokol dan port harus cocok persis (http vs https, 4200 vs custom)

- **401 Unauthorized saat call API**
  - Pastikan login berhasil dan token tersimpan di `localStorage` sebagai `auth_token`
  - Interceptor menambahkan header Authorization otomatis (`src/app/interceptors/auth.interceptor.ts`)
  - `JWT_SECRET` backend harus valid dan konsisten; cek waktu sistem (clock skew)

- **API tidak merespons / 404**
  - Base URL harus menyertakan prefix `/api`, contoh: `http://localhost:3000/api`
  - Cek `environment.development.ts` dan `environment.ts`

- **Mixed content (HTTPS halaman → HTTP API)**
  - Jika frontend berjalan via HTTPS, gunakan API HTTPS juga, atau jalankan frontend HTTP saat dev

- **Port bentrok**
  - Backend: ubah `PORT` di `.env` (default 3000)
  - Frontend: jalankan `ng serve --port 4300` jika 4200 digunakan proses lain

- **Supabase key/URL belum diisi**
  - Set `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di backend `.env`

- **Versi Node tidak cocok**
  - Gunakan Node 18+ (lihat prasyarat). Jika perlu, gunakan nvm untuk switch versi

## 👨‍💻 Author

Dibuat sebagai demo Employee Management System menggunakan Angular 19.

---

**Note**: Aplikasi ini telah terintegrasi dengan backend untuk autentikasi dan data karyawan. Grup/departemen masih disediakan statis di frontend.

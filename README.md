# MaternityCare Frontend

MaternityCare Frontend adalah aplikasi web berbasis React untuk membantu tenaga kesehatan dalam mengelola data pasien ibu hamil, melakukan skrining awal persalinan, melihat riwayat skrining, serta menyediakan kuis publik untuk skrining awal tanpa login.

Project ini dibangun dengan pendekatan frontend modern, modular, role-based access control, mock/API switch, dan struktur yang siap diintegrasikan dengan backend Django REST API.

---

## Features

### Authentication

- Login user
- Role-based access
- Permission-based sidebar
- Protected route
- Auth session menggunakan localStorage
- `/api/me/` sync untuk data user terbaru dari backend

### Patient Management

- List pasien
- Search pasien
- Pagination
- Create patient
- Update patient
- Delete patient
- Patient detail page
- Riwayat skrining per pasien
- Form pasien menggunakan `dateOfBirth`
- Age dihitung otomatis dari tanggal lahir

### Screening

- Form skrining awal persalinan
- Input data klinis ibu
- Riwayat penyakit
- Checklist pemeriksaan
- Risk score preview
- Submit screening mock/API
- Payload mapper camelCase ke snake_case

### Screening History

- List riwayat skrining
- Search
- Filter kategori risiko
- Filter tanggal
- Mock/API integration ready

### Public Quiz

- Public quiz tanpa login
- Submit quiz
- Result page by token
- Mock/API integration ready

### Admin

- Admin stats cards
- Audit logs table
- Search audit logs
- Filter action
- Filter model
- Date range filter
- Admin-only route

### UI & Accessibility

- Responsive layout
- Mobile sidebar
- Accessible input error
- Accessible modal
- Loading skeleton
- Empty state
- Error state
- Skip link
- Table horizontal scroll on mobile

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack React Query
- clsx
- tailwind-merge

---

## Project Structure

```txt
src/
├── api/
│   ├── admin.api.ts
│   ├── auth.api.ts
│   ├── client.ts
│   ├── patients.api.ts
│   ├── quiz.api.ts
│   └── screenings.api.ts
│
├── app/
│   ├── app.tsx
│   ├── providers/
│   │   ├── auth-sync-provider.tsx
│   │   └── query-provider.tsx
│   └── router/
│       └── app-router.tsx
│
├── components/
│   ├── layout/
│   └── ui/
│
├── config/
│   └── env.ts
│
├── constants/
│   └── navigation.ts
│
├── features/
│   ├── admin/
│   ├── auth/
│   ├── patients/
│   ├── quiz/
│   └── screenings/
│
├── layouts/
│   ├── dashboard-layout.tsx
│   └── public-layout.tsx
│
├── lib/
│   ├── api-response.ts
│   ├── date.ts
│   ├── error.ts
│   └── utils.ts
│
├── pages/
│
├── styles/
│   └── globals.css
│
├── types/
│   └── api.ts
│
├── main.tsx
└── vite-env.d.ts
```

---

## Roles & Permissions

Aplikasi mendukung dua role utama:

```txt
admin
nurse
```

Contoh permissions:

```txt
view_dashboard
view_patients
create_patient
update_patient
delete_patient
view_screenings
create_screening
view_screening_history
view_audit_logs
view_admin_stats
```

Permission digunakan untuk:

- Menampilkan atau menyembunyikan menu sidebar
- Membatasi akses route tertentu
- Membatasi action seperti create, update, delete

---

## Environment Variables

Buat file `.env.local` untuk development.

```env
VITE_API_BASE_URL=http://localhost:8000

VITE_MOCK_AUTH=true
VITE_MOCK_PATIENTS=true
VITE_MOCK_SCREENINGS=true
VITE_MOCK_QUIZ=true
VITE_MOCK_ADMIN=true
```

Untuk production:

```env
VITE_API_BASE_URL=https://your-backend-url.com

VITE_MOCK_AUTH=false
VITE_MOCK_PATIENTS=false
VITE_MOCK_SCREENINGS=false
VITE_MOCK_QUIZ=false
VITE_MOCK_ADMIN=false
```

---

## Mock API Strategy

Project ini mendukung mock/API switch per module.

```txt
VITE_MOCK_AUTH
VITE_MOCK_PATIENTS
VITE_MOCK_SCREENINGS
VITE_MOCK_QUIZ
VITE_MOCK_ADMIN
```

Dengan strategi ini, integrasi backend bisa dilakukan bertahap.

Contoh:

```env
VITE_MOCK_AUTH=false
VITE_MOCK_PATIENTS=true
VITE_MOCK_SCREENINGS=true
VITE_MOCK_QUIZ=true
VITE_MOCK_ADMIN=true
```

Artinya auth sudah memakai backend real, tetapi module lain masih memakai mock.

---

## Installation

Clone repository:

```bash
git clone https://github.com/dikasaputra-dev/your-repository.git
cd your-repository
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open browser:

```txt
http://localhost:5173
```

---

## Available Scripts

```bash
npm run dev
```

Menjalankan development server.

```bash
npm run typecheck
```

Menjalankan TypeScript type checking.

```bash
npm run build
```

Build project untuk production.

```bash
npm run preview
```

Preview hasil build production secara lokal.

---

## Mock Login Account

Jika `VITE_MOCK_AUTH=true`, gunakan akun berikut:

### Admin

```txt
Email    : admin@mail.com
Password : bebas
```

### Nurse

```txt
Email    : nurse@mail.com
Password : bebas
```

---

## Main Routes

```txt
/login
/dashboard
/patients
/patients/:patientId
/screenings
/screenings/history
/quiz
/quiz/results/:token
/admin/audit-logs
```

---

## Backend API Compatibility

Frontend ini disiapkan untuk backend Django REST API dengan endpoint berikut.

### Auth

```txt
POST /api/auth/login/
POST /api/auth/logout/
GET  /api/me/
```

### Patients

```txt
GET    /api/patients/
POST   /api/patients/
GET    /api/patients/{id}/
PUT    /api/patients/{id}/
DELETE /api/patients/{id}/
GET    /api/patients/{id}/screenings/
```

### Screenings

```txt
POST /api/screenings/
GET  /api/screenings/history/
```

### Quiz

```txt
POST /api/quiz/submit/
GET  /api/quiz/results/{token}/
```

### Admin

```txt
GET /api/admin/stats/
GET /api/admin/audit-logs/
```

---

## Data Mapping Strategy

Frontend menggunakan format camelCase.

Contoh:

```ts
fullName;
dateOfBirth;
riskCategory;
lastScreeningDate;
```

Backend biasanya menggunakan snake_case.

Contoh:

```ts
full_name;
date_of_birth;
risk_category;
last_screening_date;
```

Oleh karena itu project ini menggunakan DTO dan mapper.

Contoh:

```txt
PatientDto        → Patient
ScreeningDto      → ScreeningResult
QuizResultDto     → QuizResult
AdminStatsDto     → AdminStats
AuditLogDto       → AuditLog
```

Tujuannya agar UI tetap bersih dan tidak bergantung langsung pada format response backend.

---

## Deployment to Vercel

Tambahkan file `vercel.json` di root project:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Ini dibutuhkan agar React Router tidak 404 ketika refresh route seperti:

```txt
/patients/1
/admin/audit-logs
/quiz/results/token
```

### Vercel Settings

```txt
Framework Preset : Vite
Build Command    : npm run build
Output Directory : dist
Install Command  : npm install
```

### Production Environment Variables

```env
VITE_API_BASE_URL=https://your-backend-url.com

VITE_MOCK_AUTH=false
VITE_MOCK_PATIENTS=false
VITE_MOCK_SCREENINGS=false
VITE_MOCK_QUIZ=false
VITE_MOCK_ADMIN=false
```

---

## Backend CORS Checklist

Pastikan backend mengizinkan origin frontend.

Contoh Django settings:

```py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://your-frontend.vercel.app",
]
```

Jika memakai CSRF/session auth:

```py
CSRF_TRUSTED_ORIGINS = [
    "https://your-frontend.vercel.app",
]
```

Untuk JWT Bearer token, pastikan request frontend mengirim:

```txt
Authorization: Bearer <access_token>
```

---

## Production Checklist

Sebelum deploy production, pastikan:

```txt
ENV
✓ VITE_API_BASE_URL sudah memakai backend production
✓ Semua VITE_MOCK_* false
✓ Tidak ada secret di VITE_ env

BUILD
✓ npm run typecheck berhasil
✓ npm run build berhasil
✓ npm run preview berhasil

ROUTING
✓ vercel.json sudah ada
✓ Refresh dynamic route tidak 404

AUTH
✓ Login real backend berhasil
✓ access token tersimpan
✓ /api/me/ berhasil
✓ Sidebar sesuai role
✓ Protected route berjalan

PATIENTS
✓ List patients muncul
✓ Search berjalan
✓ Pagination berjalan
✓ Detail pasien berjalan
✓ Create patient berjalan
✓ Update patient berjalan
✓ Delete patient berjalan

SCREENINGS
✓ Submit screening berjalan
✓ Payload snake_case benar
✓ Screening history muncul

QUIZ
✓ Submit public quiz berjalan
✓ Redirect ke result page
✓ Result token bisa dibuka ulang

ADMIN
✓ Admin stats muncul
✓ Audit logs muncul
✓ Filter audit logs berjalan

UI
✓ Mobile sidebar berjalan
✓ Table responsive
✓ Modal bisa ditutup dengan Escape
✓ Loading, empty, dan error state tampil baik
```

---

## Development Notes

Project ini menggunakan beberapa prinsip frontend architecture:

- Feature-based folder structure
- Separation of UI, API, hooks, mapper, DTO, dan types
- Role-based access control
- Permission-based rendering
- React Query untuk server state
- Axios interceptor untuk Authorization header
- Environment-based mock/API switching
- DTO mapper untuk menjaga UI tetap camelCase
- Responsive and accessible component system

---

## Author

Developed as part of a frontend project for a maternal screening web application.

```txt
Frontend: React + TypeScript + Vite
Backend Target: Laravel 13
Deployment Target: Vercel
```

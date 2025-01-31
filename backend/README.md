# Tentang Aplikasi

Aplikasi ini dirancang untuk memfasilitasi proses pendaftaran pasien rawat jalan di fasilitas kesehatan. Aplikasi ini mencakup alur kerja mulai dari login, verifikasi pasien, hingga pendaftaran pasien dan pengambilan nomor antrian. Aplikasi ini dibangun dengan teknologi modern untuk memastikan keandalan dan skalabilitas.

# Flowchart

![image.png](attachment:a64ac7ff-470b-444c-871f-91059d45a283:image.png)

# Database Structure

![hospital.png](attachment:631ff224-364a-498d-b2a1-c1ddc4ae7e88:hospital.png)

# Struktur Project

- `backend/` : server API menggunakan Node.js
- `frontend/` : Aplikasi menggunakan React.js

# Fitur

- Form pasien rawat jalan dengan pencarian berdasarkan **nomor KTP** atau **rekam medis**
- Daftar riwayat pendaftaran pasien rawat jalan dengan filter
    - Nama pasien
    - Nama dokter
    - Nama poliklinik
    - No. registrasi
    - No. booking
- Manajemen pasien (CRUD)

# Cara Penggunaan

## Prasyarat

### Backend

- Node.js v.22 or latest
- MySQL v.8.0.36 or latest
- Sequelize ORM v.6.37.5
- Express.js v4.21.2

### Frontend

- React.js v.19
- Next.js v.15.1.6
- Tailwind CSS v.3.4.1 or latest
- Axios v.1.7.9

## Instalasi

- Clone repository
`git clone https://github.com/Safiramdhn/hospital-project.git`

### Backend

- Instalasi awal project
    
    ```bash
    cd backend
    npm install
    ```
    
- Inisiasi sequelize
    
    ```bash
    npm install --save-dev sequelize-cli
    npx sequelize-cli init
    
    ```
    
- Buat file `.env`  seperti contoh pada file `.env.example`
- Jalankan migrate dan seeder sesuai dengan command dibawah. Pastikan database sudah dibuat di MySQL.
    
    ```bash
    // migrate
    npx sequelize db:migrate
    // seeder
    npx sequelize-cli db:seed:all
    ```
    
- Jalankan command dibawah ini
    
    ```bash
    npm start // production
    npm run dev // development
    ```
    

### Frontend

- Instalasi awal project
    
    ```bash
    cd frontend
    npm install
    ```
    
- Buat file `.env`  seperti contoh pada file `.env.example`
- Jalankan command dibawah ini
    
    ```bash
    npm start // production
    npm run dev // development
    ```
    
- Untuk menjalankan server backend dan frontend bersamaan
    
    ```bash
    npm install
    npm start
    ```
    
- Untuk menjalankan masing-masing server tanpa pindah direktori
    
    ```bash
    npm start:frontend
    npm start:backend
    ```
    

## API Endpoint

Dokumentasi terkait API endpoint dapat dilihat melalui `http://localhost:<port>/api-docs` . Pastikan server backend sudah nyala
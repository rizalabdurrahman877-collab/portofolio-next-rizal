# Struktur Database Portofolio

Database disimpan di Supabase, project `portofolio-rizal` (region Southeast Asia, Singapore). Alamat project dan publishable key disimpan di `.env.local`, yang tidak ikut di-commit karena tercantum di `.gitignore` (`.env*`).

## Tabel `projects`
Daftar proyek portofolio.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | `int8` | Primary key, nomor otomatis 1, 2, 3, ... |
| `created_at` | `timestamptz` | Waktu baris dibuat, terisi otomatis dengan `now()` |
| `slug` | `text` | Penanda unik di alamat (unik) |
| `judul` | `text` | Judul proyek |
| `deskripsi` | `text` | Kalimat singkat tentang proyek |
| `kategori` | `text` | Next.js, JavaScript, atau HTML |
| `minggu` | `text` | Minggu proyek dibuat |
| `fitur` | `text[]` | Daftar hal yang dipelajari (array teks) |
| `gambar_url` | `text` | Alamat gambar di Supabase Storage |

RLS aktif. Policy `Pengunjung boleh membaca proyek`: peran `anon` boleh `select` semua baris.

## Tabel `messages`
Pesan dari form kontak.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | `int8` | Primary key, nomor otomatis 1, 2, 3, ... |
| `created_at` | `timestamptz` | Waktu baris dibuat, terisi otomatis dengan `now()` |
| `nama` | `text` | Nama pengirim |
| `email` | `text` | Email pengirim |
| `pesan` | `text` | Isi pesan |

RLS aktif tanpa policy, sehingga pengunjung tidak bisa membaca pesan. Policy `insert` dibuat di Minggu 15.

## Tabel `skills`
Daftar keahlian.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | `int8` | Primary key, nomor otomatis 1, 2, 3, ... |
| `created_at` | `timestamptz` | Waktu baris dibuat, terisi otomatis dengan `now()` |
| `nama` | `text` | Nama keahlian |
| `level` | `text` | Dasar, Menengah, atau Mahir |

RLS aktif. Policy `Pengunjung boleh membaca keahlian`: peran `anon` boleh `select` semua baris.
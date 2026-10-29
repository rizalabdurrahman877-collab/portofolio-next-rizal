"use client";

import { useState } from "react";

const kelasInput =
  "mt-1 w-full rounded-lg border border-garis bg-isian p-2 text-teks placeholder:text-muted";

const kelasLabel = "block font-semibold text-teks";

export default function FormKontak() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState({});
  const [berhasil, setBerhasil] = useState(false);

  function kirim(e) {
    e.preventDefault();

    const errorBaru = {};

    if (nama.trim() === "") {
      errorBaru.nama = "Nama wajib diisi.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errorBaru.email = "Email harus memuat tanda @, contoh nama@gmail.com";
    }

    if (hp.length < 10) {
      errorBaru.hp = "Nomor HP minimal 10 angka.";
    }

    if (keperluan === "") {
      errorBaru.keperluan = "Pilih salah satu keperluan.";
    }

    if (pesan.trim().length < 10) {
      errorBaru.pesan = "Pesan minimal 10 karakter.";
    }

    setError(errorBaru);
    setBerhasil(Object.keys(errorBaru).length === 0);
  }

  return (
    <section className="px-2 py-6 md:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-judul md:text-4xl">
          Hubungi Saya
        </h1>
        <p className="mt-2 text-muted">
          Punya pertanyaan atau ingin bekerja sama? Isi form berikut.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_260px]">
        <form
          onSubmit={kirim}
          noValidate
          className="space-y-5 rounded-xl bg-kartu p-8 shadow-sm"
        >
          <div>
            <label htmlFor="nama" className={kelasLabel}>
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              placeholder="Contoh: Rizal Abdurrakhman"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className={kelasInput}
            />
            {error.nama && (
              <p className="mt-1 text-sm text-aksen">{error.nama}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={kelasLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Contoh: rizalabdurrahman@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={kelasInput}
            />
            {error.email && (
              <p className="mt-1 text-sm text-aksen">{error.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="hp" className={kelasLabel}>
              Nomor HP
            </label>
            <input
              type="tel"
              id="hp"
              name="hp"
              placeholder="08123456789"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className={kelasInput}
            />
            {error.hp && <p className="mt-1 text-sm text-aksen">{error.hp}</p>}
          </div>

          <div>
            <label htmlFor="keperluan" className={kelasLabel}>
              Keperluan
            </label>
            <select
              id="keperluan"
              name="keperluan"
              value={keperluan}
              onChange={(e) => setKeperluan(e.target.value)}
              className={kelasInput}
            >
              <option value="">-- Pilih keperluan --</option>
              <option value="bertanya">Bertanya</option>
              <option value="kerja-sama">Kerja sama proyek</option>
              <option value="lainnya">Lainnya</option>
            </select>
            {error.keperluan && (
              <p className="mt-1 text-sm text-aksen">{error.keperluan}</p>
            )}
          </div>

          <div>
            <label htmlFor="pesan" className={kelasLabel}>
              Pesan
            </label>
            <textarea
              id="pesan"
              name="pesan"
              rows={5}
              maxLength={300}
              placeholder="Tulis Pesan Anda...."
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              className={kelasInput}
            />
            {error.pesan && (
              <p className="mt-1 text-sm text-aksen">{error.pesan}</p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-lg bg-aksen px-5 py-2 font-semibold text-white hover:opacity-90"
          >
            Kirim Pesan
          </button>

          <p className="text-sm text-muted">
            Form ini belum mengirim pesan. Pengiriman pesan diaktifkan di Minggu
            15.
          </p>

          {berhasil && (
            <p className="rounded-lg bg-green-100 p-3 text-green-800 dark:bg-green-900 dark:text-green-100">
              Terima kasih, {nama}! Pesanmu sudah lolos pemeriksaan.
            </p>
          )}
        </form>

        <aside className="w-full rounded-xl border border-garis bg-kartu p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-judul">Temukan Saya di</h2>

          <p className="mb-2">
            <a
              href="https://github.com/rizalabdurrahman877-collab/portofolio-next-rizal.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-aksen hover:underline"
            >
              GitHub
            </a>
          </p>

          <p className="mb-2">
            <a
              href="https://www.instagram.com/zallssss?obrf=MTN3emkwdHI3NDd5cA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-aksen hover:underline"
            >
              Instagram
            </a>
          </p>
        </aside>
      </div>
    </section>
  );
}
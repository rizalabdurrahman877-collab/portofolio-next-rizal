
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

    if (!nama.trim()) errorBaru.nama = "Nama wajib diisi.";

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errorBaru.email = "Masukkan alamat email yang valid.";
    }

    if (!/^[0-9+\-\s]{10,}$/.test(hp.trim())) {
      errorBaru.hp = "Nomor HP minimal 10 angka.";
    }

    if (!keperluan) {
      errorBaru.keperluan = "Pilih salah satu keperluan.";
    }

    if (pesan.trim().length < 10) {
      errorBaru.pesan = "Pesan minimal 10 karakter.";
    }

    setError(errorBaru);
    setBerhasil(Object.keys(errorBaru).length === 0);
  }

  return (
    <section className="py-2">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-utama dark:text-sky-300 md:text-3xl">
          Hubungi Saya
        </h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
          Punya pertanyaan atau ingin bekerja sama? Isi formulir berikut.
        </p>
      </header>

      <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_260px]">
        <Card className="border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg text-utama dark:text-sky-300">
              Formulir Kontak
            </CardTitle>

            <CardDescription>
              Lengkapi informasi berikut untuk menghubungi saya.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={kirim} noValidate className="space-y-4">
              <div>
                <label htmlFor="nama" className="mb-2 block text-sm font-semibold rounded-xl">
                  Nama Lengkap
                </label>

                <Input
                  id="nama"
                  name="nama"
                  placeholder="Contoh: Rizal Abdurrakhman"
                  value={nama}
                  onChange={(e) => {
                    setNama(e.target.value);
                    setBerhasil(false);
                  }}
                  aria-invalid={!!error.nama}
                  className="border border-gray-300 bg-white shadow-sm focus-visible:border-utama focus-visible:ring-2 focus-visible:ring-utama/20"
                />

                {error.nama && (
                  <p className="mt-1 text-sm text-aksen">{error.nama}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  Email
                </label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setBerhasil(false);
                  }}
                  aria-invalid={!!error.email}
                  className="border border-gray-300 bg-white shadow-sm focus-visible:border-utama focus-visible:ring-2 focus-visible:ring-utama/20"
                />

                {error.email && (
                  <p className="mt-1 text-sm text-aksen">{error.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="hp" className="mb-2 block text-sm font-semibold">
                  Nomor HP
                </label>

                <Input
                  id="hp"
                  name="hp"
                  type="tel"
                  placeholder="08123456789"
                  value={hp}
                  onChange={(e) => {
                    setHp(e.target.value);
                    setBerhasil(false);
                  }}
                  aria-invalid={!!error.hp}
                  className="border border-gray-300 bg-white shadow-sm focus-visible:border-utama focus-visible:ring-2 focus-visible:ring-utama/20"
                />

                {error.hp && (
                  <p className="mt-1 text-sm text-aksen">{error.hp}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="keperluan"
                  className="mb-2 block text-sm font-semibold"
                >
                  Keperluan
                </label>

                <select
                  id="keperluan"
                  name="keperluan"
                  value={keperluan}
                  onChange={(e) => {
                    setKeperluan(e.target.value);
                    setBerhasil(false);
                  }}
                  aria-invalid={!!error.keperluan}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-utama focus:ring-2 focus:ring-utama/20 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100"
                >
                  <option value="">-- Pilih keperluan --</option>
                  <option value="bertanya">Bertanya</option>
                  <option value="kerja-sama">Kerja sama proyek</option>
                  <option value="lainnya">Lainnya</option>
                </select>

                {error.keperluan && (
                  <p className="mt-1 text-sm text-aksen">
                    {error.keperluan}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="pesan" className="mb-2 block text-sm font-semibold">
                  Pesan
                </label>

                <Textarea
                  id="pesan"
                  name="pesan"
                  rows={5}
                  maxLength={300}
                  placeholder="Tulis pesan Anda..."
                  value={pesan}
                  onChange={(e) => {
                    setPesan(e.target.value);
                    setBerhasil(false);
                  }}
                  aria-invalid={!!error.pesan}
                  className="border border-gray-300 bg-white shadow-sm focus-visible:border-utama focus-visible:ring-2 focus-visible:ring-utama/20"
                />

                {error.pesan && (
                  <p className="mt-1 text-sm text-aksen">{error.pesan}</p>
                )}
              </div>

              <Button
                type="submit"
                className="bg-aksen text-white hover:bg-aksen/90"
              >
                Kirim Pesan
              </Button>

              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                Form ini belum mengirim pesan. Pengiriman pesan diaktifkan
                di Minggu 15.
              </p>

              {berhasil && (
                <p
                  role="status"
                  className="rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  Terima kasih, {nama}! Pesanmu sudah lolos pemeriksaan.
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg text-utama dark:text-sky-300">
              Temukan Saya
            </CardTitle>

            <CardDescription>
              Media sosial dan profil saya.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <a
              href="https://github.com/rizalabdurrahman877-collab/portofolio-next-rizal.git"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-gray-200 p-3 text-sm font-semibold text-utama transition hover:bg-gray-50 hover:text-aksen dark:border-slate-700 dark:text-sky-300 dark:hover:bg-slate-800"
            >
              GitHub
            </a>

            <a
              href="https://www.instagram.com/zallssss"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-gray-200 p-3 text-sm font-semibold text-utama transition hover:bg-gray-50 hover:text-aksen dark:border-slate-700 dark:text-sky-300 dark:hover:bg-slate-800"
            >
              Instagram
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import ProyekCard from "@/components/ProyekCard";

const tombolBiasa =
  "rounded-full border border-utama px-3 py-1 text-xs font-semibold text-utama dark:text-sky-200";

const tombolAktif =
  "rounded-full border border-aksen bg-aksen px-3 py-1 text-xs font-semibold text-white";

export default function FilterProyek({ proyek }) {
  const [kategori, setKategori] = useState("Semua");
  const [kata, setKata] = useState("");

  // Daftar kategori diambil dari data, tanpa duplikat
  const daftarKategori = ["Semua", ...new Set(proyek.map((p) => p.kategori))];

  const kataKecil = kata.trim().toLowerCase();

  
  const hasil = proyek.filter((p) => {
    const cocokKategori = kategori === "Semua" || p.kategori === kategori;
    const cocokJudul = p.judul.toLowerCase().includes(kataKecil);
    const cocokDeskripsi = p.deskripsi.toLowerCase().includes(kataKecil);
    const cocokKata = cocokJudul || cocokDeskripsi;
    return cocokKategori && cocokKata;
  });

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-1.5">
        {daftarKategori.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKategori(k)}
            className={kategori === k ? tombolAktif : tombolBiasa}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <label htmlFor="cari" className="block text-xs font-semibold text-teks">
          Cari Proyek
        </label>

        <input
          type="text"
          id="cari"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Contoh: myapp"
          className="mt-1 w-full rounded-md border border-garis bg-isian px-2 py-1.5 text-teks placeholder:text-muted md:w-64"
        />

      
        {kata !== "" && (
          <button
            type="button"
            onClick={() => setKata("")}
            className="mt-3 block text-sm font-semibold text-aksen hover:underline dark:text-red-300"
          >
            Hapus pencarian
          </button>
        )}
      </div>

      
      <p className="mt-4 text-sm text-muted">
        Menampilkan {hasil.length} dari {proyek.length} proyek
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {hasil.map((item) => (
          <ProyekCard key={item.slug} proyek={item} />
        ))}
      </div>

      {hasil.length === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-garis p-4 text-center text-sm text-muted">
          Belum ada proyek yang cocok.
        </p>
      )}
    </div>
  );
}
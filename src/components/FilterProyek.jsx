
"use client";

import { useState } from "react";
import ProyekCard from "@/components/ProyekCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function FilterProyek({ proyek = [] }) {
  const [kategori, setKategori] = useState("Semua");
  const [kata, setKata] = useState("");

  const daftarKategori = [
    "Semua",
    ...new Set(proyek.map((p) => p.kategori).filter(Boolean)),
  ];

  const kataKecil = kata.trim().toLowerCase();

  const hasil = proyek.filter((p) => {
    const cocokKategori =
      kategori === "Semua" || p.kategori === kategori;

    const cocokJudul = (p.judul || "")
      .toLowerCase()
      .includes(kataKecil);

    const cocokDeskripsi = (p.deskripsi || "")
      .toLowerCase()
      .includes(kataKecil);

    return cocokKategori && (cocokJudul || cocokDeskripsi);
  });

  return (
    <div className="mt-6">
      {/* Filter kategori */}
      <div className="flex flex-wrap gap-2">
        {daftarKategori.map((k) => (
          <Button
            key={k}
            type="button"
            size="sm"
            variant={kategori === k ? "default" : "outline"}
            onClick={() => setKategori(k)}
            className={
              kategori === k
                ? "bg-utama text-white hover:bg-utama/90"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
            }
          >
            {k}
          </Button>
        ))}
      </div>

      {/* Pencarian */}
      <div className="mt-5 max-w-md">
        <label
          htmlFor="cari"
          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          Cari Proyek
        </label>

        <Input
          id="cari"
          type="search"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari berdasarkan nama proyek..."
          className="bg-white dark:bg-slate-800"
        />

        {kata && (
          <Button
            type="button"
            variant="link"
            className="mt-1 px-0 text-aksen"
            onClick={() => setKata("")}
          >
            Hapus pencarian
          </Button>
        )}
      </div>

      {/* Jumlah proyek */}
      <div className="mt-5 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        Menampilkan
        <Badge variant="secondary">{hasil.length}</Badge>
        dari {proyek.length} proyek
      </div>

      {/* Daftar proyek */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {hasil.map((item) => (
          <ProyekCard key={item.slug} proyek={item} />
        ))}
      </div>

      {hasil.length === 0 && (
        <p className="mt-5 rounded-xl border border-dashed border-garis p-8 text-center text-sm text-muted dark:bg-slate-900">
          Belum ada proyek yang cocok.
        </p>
      )}
    </div>
  );
}

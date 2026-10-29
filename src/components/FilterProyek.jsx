"use client";

import ProyekCard from "@/components/ProyekCard";
import { useState } from "react";

const daftarKategori = ["Semua", "HTML", "CSS", "JavaScript", "Next.js"];
const tombolBiasa =
  "rounded-full border border-utama px-3 py-1 text-xs font-semibold text-utama";

const tombolAktif =
  "rounded-full border border-aksen bg-aksen px-3 py-1 text-sm font-semibold text-white";

export default function FilterProyek({ proyek }) {
  const [kategori, setKategori] = useState("Semua");
  const [kata, setKata] = useState("");
  const kataKecil = kata.toLowerCase();
  const hasil = proyek.filter((p) => {
    const cocokKategori = kategori === "Semua" || p.kategori === kategori;
    const cocokKata = p.judul.toLowerCase().includes(kataKecil);
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
        <label htmlFor="cari" className="block text-xs font-semibold">
          Cari Proyek
        </label>

        <input
          type="text"
          id="cari"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Contoh: myapp"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 md:w-64"
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {hasil.map((item) => (
          <ProyekCard key={item.slug} proyek={item} />
        ))}
      </div>
      {hasil.length === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-gray-300 p-4 text-center text-sm text-gray-600">
          Belum ada proyek yang cocok.
        </p>
      )}
    </div>
  );
}

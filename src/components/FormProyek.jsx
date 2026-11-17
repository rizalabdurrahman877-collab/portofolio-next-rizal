"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TombolKirim from "@/components/TombolKirim";

export default function FormProyek({ aksi, proyek, teksTombol }) {
  const [state, formAction] = useActionState(aksi, { proyek });

  const data = state.proyek || proyek;

  return (
    <form action={formAction} className="space-y-4">
      {data.id && (
        <input type="hidden" name="id" value={data.id} />
      )}

      <div className="space-y-2">
        <Label htmlFor="judul">Judul Proyek</Label>
        <Input
          id="judul"
          name="judul"
          defaultValue={data.judul || ""}
          placeholder="Contoh: Buku Tamu Digital"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={data.slug || ""}
          placeholder="Contoh: buku-tamu"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kategori">Kategori</Label>
        <Input
          id="kategori"
          name="kategori"
          defaultValue={data.kategori || ""}
          placeholder="HTML, CSS, JavaScript, atau Next.js"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="minggu">Minggu</Label>
        <Input
          id="minggu"
          name="minggu"
          defaultValue={data.minggu || ""}
          placeholder="Contoh: Minggu 15"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea
          id="deskripsi"
          name="deskripsi"
          rows={2}
          defaultValue={data.deskripsi || ""}
          placeholder="Deskripsi singkat proyek"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fitur">Fitur Proyek</Label>
        <Textarea
          id="fitur"
          name="fitur"
          rows={3}
          defaultValue={data.fitur?.join("\n") || ""}
          placeholder="Satu fitur per baris"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gambar_url">URL Gambar</Label>
        <Input
          id="gambar_url"
          name="gambar_url"
          defaultValue={data.gambar_url || ""}
          placeholder="/proyek/proyek-buku-tamu.png"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 dark:bg-red-950/40 dark:text-red-300">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <TombolKirim teks={teksTombol} />

        <Link
          href="/kelola"
          className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}

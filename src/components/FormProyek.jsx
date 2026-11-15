import Link from "next/link";
import { tambahProyek, ubahProyek } from "@/app/kelola/actions";

export default function FormProyek({ proyek }) {
  const sedangEdit = Boolean(proyek);

  return (
    <form
      action={sedangEdit ? ubahProyek : tambahProyek}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      {sedangEdit && <input type="hidden" name="id" value={proyek.id} />}

      <div>
        <label
          htmlFor="judul"
          className="mb-1 block text-sm font-semibold text-gray-800 dark:text-white"
        >
          Judul Proyek
        </label>
        <input
          id="judul"
          name="judul"
          defaultValue={proyek?.judul || ""}
          required
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="mb-1 block text-sm font-semibold text-gray-800 dark:text-white"
        >
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={proyek?.slug || ""}
          required
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="deskripsi"
          className="mb-1 block text-sm font-semibold text-gray-800 dark:text-white"
        >
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          defaultValue={proyek?.deskripsi || ""}
          rows={4}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="kategori"
          className="mb-1 block text-sm font-semibold text-gray-800 dark:text-white"
        >
          Kategori
        </label>
        <input
          id="kategori"
          name="kategori"
          defaultValue={proyek?.kategori || ""}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="minggu"
          className="mb-1 block text-sm font-semibold text-gray-800 dark:text-white"
        >
          Minggu
        </label>
        <input
          id="minggu"
          name="minggu"
          defaultValue={proyek?.minggu || ""}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="fitur"
          className="mb-1 block text-sm font-semibold text-gray-800 dark:text-white"
        >
          Fitur Proyek
        </label>
        <textarea
          id="fitur"
          name="fitur"
          defaultValue={proyek?.fitur?.join("\n") || ""}
          rows={4}
          placeholder="Satu fitur per baris"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="gambar_url"
          className="mb-1 block text-sm font-semibold text-gray-800 dark:text-white"
        >
          URL Gambar
        </label>
        <input
          id="gambar_url"
          name="gambar_url"
          defaultValue={proyek?.gambar_url || ""}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-[#1D3557] px-5 py-3 font-semibold text-white transition hover:bg-blue-900"
        >
          {sedangEdit ? "Simpan Proyek" : "Tambah Proyek"}
        </button>

        {sedangEdit && (
          <Link
            href="/kelola"
            className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
          >
            Batal
          </Link>
        )}
      </div>
    </form>
  );
}

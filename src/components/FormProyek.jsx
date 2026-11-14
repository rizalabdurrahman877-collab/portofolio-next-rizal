
import { tambahProyek, ubahProyek } from "@/app/kelola/action";

export default function FormProyek({ proyek }) {
  const sedangEdit = Boolean(proyek);

  return (
    <form
      action={sedangEdit ? ubahProyek : tambahProyek}
      className="space-y-4 rounded-xl border p-5"
    >
      {sedangEdit && (
        <input type="hidden" name="id" value={proyek.id} />
      )}

      <div>
        <label htmlFor="judul">Judul Proyek</label>
        <input
          id="judul"
          name="judul"
          defaultValue={proyek?.judul || ""}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          defaultValue={proyek?.slug || ""}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="deskripsi">Deskripsi</label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          defaultValue={proyek?.deskripsi || ""}
          rows={4}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="kategori">Kategori</label>
        <input
          id="kategori"
          name="kategori"
          defaultValue={proyek?.kategori || ""}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="minggu">Minggu</label>
        <input
          id="minggu"
          name="minggu"
          defaultValue={proyek?.minggu || ""}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="fitur">Fitur Proyek</label>
        <textarea
          id="fitur"
          name="fitur"
          defaultValue={proyek?.fitur?.join("\n") || ""}
          rows={4}
          placeholder="Satu fitur per baris"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="gambar_url">URL Gambar</label>
        <input
          id="gambar_url"
          name="gambar_url"
          defaultValue={proyek?.gambar_url || ""}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-[#1D3557] px-5 py-3 font-semibold text-white"
      >
        {sedangEdit ? "Simpan Perubahan" : "Tambah Proyek"}
      </button>
    </form>
  );
}

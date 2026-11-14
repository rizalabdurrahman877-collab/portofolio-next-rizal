import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";
import { loginAdmin, logoutAdmin } from "./login";
import { ubahSematanPesan } from "./action";

import FormProyek from "@/components/FormProyek";
import KonfirmasiHapus from "@/components/KonfirmasiHapus";
import TombolHapusPesan from "@/components/TombolHapusPesan";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kelola Portofolio | Admin",
};

export default async function KelolaPage({ searchParams }) {
  const masuk = await sudahMasuk();
  const params = await searchParams;

  // HALAMAN LOGIN
  if (!masuk) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Login Admin
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
            Masukkan PIN untuk mengelola portofolio.
          </p>

          {params?.error === "pin" && (
            <p className="mt-4 text-sm text-red-600">
              PIN yang kamu masukkan salah.
            </p>
          )}

          <form action={loginAdmin} className="mt-6 space-y-4">
            <input
              type="password"
              name="pin"
              placeholder="Masukkan PIN Admin"
              required
              className="w-full rounded-lg border border-gray-400 p-3 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-[#1D3557] p-3 font-semibold text-white hover:bg-blue-900"
            >
              Masuk
            </button>
          </form>
        </div>
      </main>
    );
  }

  // AMBIL DATA PROYEK
  const { data: daftarProyek, error: errorProyek } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("id", { ascending: false });

  // AMBIL DATA BUKU TAMU
  const { data: daftarPesan, error: errorPesan } = await supabaseAdmin
    .from("buku_tamu")
    .select("id, nama, pesan, created_at, disematkan")
    .order("disematkan", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HEADER ADMIN */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Admin
          </h1>

          <p className="mt-2 text-gray-600 dark:text-slate-300">
            Kelola proyek portofolio dan pesan pengunjung.
          </p>
        </div>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-lg border border-gray-400 px-4 py-2 font-semibold dark:border-slate-600 dark:text-white"
          >
            Keluar
          </button>
        </form>
      </div>

      {/* ========================= */}
      {/* KELOLA PROYEK */}
      {/* ========================= */}

      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kelola Proyek
          </h2>

          <p className="mt-2 text-gray-600 dark:text-slate-300">
            Tambahkan, ubah, dan hapus proyek portofolio.
          </p>
        </div>

        {/* FORM TAMBAH PROYEK */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Tambah Proyek Baru
          </h3>

          <FormProyek />
        </div>

        {/* DAFTAR PROYEK */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Daftar Proyek
          </h3>

          <span className="text-sm text-gray-500">
            {daftarProyek?.length || 0} proyek
          </span>
        </div>

        {errorProyek ? (
          <div className="rounded-xl border border-red-300 p-5 text-red-600">
            Gagal mengambil proyek: {errorProyek.message}
          </div>
        ) : !daftarProyek || daftarProyek.length === 0 ? (
          <div className="rounded-xl border p-6 text-center text-gray-500 dark:border-slate-700">
            Belum ada proyek.
          </div>
        ) : (
          <div className="space-y-6">
            {daftarProyek.map((proyek) => (
              <article
                key={proyek.id}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {proyek.judul}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Slug: {proyek.slug}
                    </p>
                  </div>

                  <KonfirmasiHapus id={proyek.id} judul={proyek.judul} />
                </div>

                <details>
                  <summary className="mb-4 w-fit cursor-pointer rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    Edit Proyek
                  </summary>

                  <FormProyek proyek={proyek} />
                </details>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ========================= */}
      {/* KELOLA BUKU TAMU */}
      {/* ========================= */}

      <section className="mt-16 border-t border-gray-200 pt-10 dark:border-slate-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kelola Buku Tamu
          </h2>

          <p className="mt-2 text-gray-600 dark:text-slate-300">
            Kelola pesan yang dikirim oleh pengunjung.
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Daftar Pesan
          </h3>

          <span className="text-sm text-gray-500">
            {daftarPesan?.length || 0} pesan
          </span>
        </div>

        {errorPesan ? (
          <div className="rounded-xl border border-red-300 p-5 text-red-600">
            Gagal mengambil pesan: {errorPesan.message}
          </div>
        ) : !daftarPesan || daftarPesan.length === 0 ? (
          <div className="rounded-xl border p-6 text-center text-gray-500 dark:border-slate-700">
            Belum ada pesan dari pengunjung.
          </div>
        ) : (
          <div className="space-y-4">
            {daftarPesan.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {item.nama}
                  </h3>

                  {item.disematkan && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                      Disematkan
                    </span>
                  )}
                </div>

                <p className="mt-3 whitespace-pre-wrap text-gray-700 dark:text-slate-300">
                  {item.pesan}
                </p>

                <p className="mt-3 text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleString("id-ID")}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <form action={ubahSematanPesan}>
                    <input type="hidden" name="id" value={item.id} />

                    <input
                      type="hidden"
                      name="disematkan"
                      value={String(!item.disematkan)}
                    />

                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      {item.disematkan ? "Lepas Sematan" : "Sematkan Pesan"}
                    </button>
                  </form>

                  <TombolHapusPesan id={item.id} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

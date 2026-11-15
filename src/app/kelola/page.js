import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";
import { loginAdmin, logoutAdmin } from "./login";
import { ubahSematanPesan } from "./actions";

import KonfirmasiHapus from "@/components/KonfirmasiHapus";
import TombolHapusPesan from "@/components/TombolHapusPesan";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kelola Data | Admin",
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
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
      {/* HEADER */}
      <div className="mb-7 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Kelola Data
        </h1>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
          >
            Keluar
          </button>
        </form>
      </div>

      {/* KELOLA PROYEK */}
      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Proyek
          </h2>

          {/* HALAMAN TAMBAH PROYEK */}
          <Link
            href="/kelola/proyek/baru"
            className="rounded-lg bg-[#1D3557] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-900"
          >
            + Tambah Proyek
          </Link>
        </div>

        {errorProyek ? (
          <div className="rounded-xl border border-red-300 p-4 text-sm text-red-600">
            Gagal mengambil proyek: {errorProyek.message}
          </div>
        ) : !daftarProyek || daftarProyek.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            Belum ada proyek.
          </div>
        ) : (
          <div className="space-y-3">
            {daftarProyek.map((proyek) => {
              const minggu = proyek.minggu
                ? String(proyek.minggu).startsWith("Minggu")
                  ? proyek.minggu
                  : `Minggu ${proyek.minggu}`
                : "";

              return (
                <article
                  key={proyek.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {proyek.judul}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                    {[proyek.kategori, minggu].filter(Boolean).join(" · ") ||
                      "Proyek Portofolio"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {/* HALAMAN UBAH PROYEK */}
                    <Link
                      href={`/kelola/proyek/${proyek.id}/ubah`}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Ubah
                    </Link>

                    {/* HAPUS PROYEK */}
                    <KonfirmasiHapus id={proyek.id} judul={proyek.judul} />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* KELOLA BUKU TAMU */}
      <section className="mt-12 border-t border-gray-200 pt-8 dark:border-slate-700">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Pesan Buku Tamu
          </h2>

          <span className="text-sm text-gray-500 dark:text-slate-400">
            {daftarPesan?.length || 0} pesan
          </span>
        </div>

        {errorPesan ? (
          <div className="rounded-xl border border-red-300 p-4 text-sm text-red-600">
            Gagal mengambil pesan: {errorPesan.message}
          </div>
        ) : !daftarPesan || daftarPesan.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            Belum ada pesan dari pengunjung.
          </div>
        ) : (
          <div className="space-y-3">
            {daftarPesan.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.nama}
                  </h3>

                  {item.disematkan && (
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      Disematkan
                    </span>
                  )}
                </div>

                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-600 dark:text-slate-300">
                  {item.pesan}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleString("id-ID")}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {/* SEMATKAN PESAN */}
                  <form action={ubahSematanPesan}>
                    <input type="hidden" name="id" value={item.id} />

                    <input
                      type="hidden"
                      name="disematkan"
                      value={String(!item.disematkan)}
                    />

                    <button
                      type="submit"
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {item.disematkan ? "Lepas Sematan" : "Sematkan"}
                    </button>
                  </form>

                  {/* HAPUS PESAN */}
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

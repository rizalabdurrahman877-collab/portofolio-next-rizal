import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";
import { loginAdmin, logoutAdmin } from "./login";
import { hapusProyek, ubahSematanPesan } from "./actions";

import KonfirmasiHapus from "@/components/KonfirmasiHapus";
import TombolHapusPesan from "@/components/TombolHapusPesan";

import { buttonVariants } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kelola Data | Admin",
};

export default async function KelolaPage({ searchParams }) {
  const masuk = await sudahMasuk();
  const params = await searchParams;

  if (!masuk) {
    return (
      <main className="min-h-screen bg-white px-4 py-16 dark:bg-black">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Login Admin</CardTitle>
              <CardDescription>
                Masukkan PIN untuk mengelola proyek dan buku tamu.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {params?.error === "pin" && (
                <p className="mb-4 text-sm text-red-600">
                  PIN yang kamu masukkan salah.
                </p>
              )}

              <form action={loginAdmin} className="space-y-4">
                <input
                  type="password"
                  name="pin"
                  placeholder="Masukkan PIN Admin"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#1D3557] p-3 font-semibold text-white hover:bg-blue-900"
                >
                  Masuk
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // DAFTAR PROYEK
  const { data: daftarProyek, error: errorProyek } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  // DAFTAR PESAN BUKU TAMU
  const { data: daftarPesan, error: errorPesan } = await supabaseAdmin
    .from("buku_tamu")
    .select("id, nama, pesan, created_at, disematkan")
    .order("disematkan", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-white px-4 py-8 dark:bg-black sm:py-10">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1D3557] dark:text-white">
              Kelola Data
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Kelola proyek dan pesan buku tamu.
            </p>
          </div>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
            >
              Keluar
            </button>
          </form>
        </div>

        {/* BAGIAN PROYEK */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#1D3557] dark:text-sky-300">
              Proyek
            </h2>

            <Link
              href="/kelola/proyek/baru"
              className={buttonVariants()}
            >
              + Tambah Proyek
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {errorProyek ? (
              <p className="rounded-lg border border-red-300 p-4 text-sm text-red-600">
                Gagal mengambil proyek: {errorProyek.message}
              </p>
            ) : daftarProyek && daftarProyek.length > 0 ? (
              daftarProyek.map((item) => (
                <Card key={item.id} size="sm">
                  <CardHeader>
                    <CardTitle>{item.judul}</CardTitle>

                    <CardDescription>
                      {item.kategori} · {item.minggu}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-wrap gap-2">
                    <Link
                      href={`/kelola/proyek/${item.id}/ubah`}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      Ubah
                    </Link>

                    <KonfirmasiHapus
                      id={item.id}
                      aksi={hapusProyek}
                      judul="Hapus proyek ini?"
                      keterangan={`Proyek ${item.judul} akan dihapus dari halaman Proyek dan Beranda.`}
                    />
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="rounded-lg border p-4 text-sm text-gray-500 dark:border-slate-700">
                Belum ada proyek.
              </p>
            )}
          </div>
        </section>

        {/* BAGIAN BUKU TAMU */}
        <section className="mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#1D3557] dark:text-sky-300">
              Pesan Buku Tamu
            </h2>

            <span className="text-sm text-gray-500 dark:text-slate-400">
              {daftarPesan?.length || 0} pesan
            </span>
          </div>

          {errorPesan ? (
            <p className="rounded-lg border border-red-300 p-4 text-sm text-red-600">
              Gagal mengambil pesan: {errorPesan.message}
            </p>
          ) : daftarPesan && daftarPesan.length > 0 ? (
            <div className="space-y-3">
              {daftarPesan.map((item) => (
                <Card key={item.id} size="sm">
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle>{item.nama}</CardTitle>

                      {item.disematkan && (
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          Disematkan
                        </span>
                      )}
                    </div>

                    <CardDescription>
                      {new Date(item.created_at).toLocaleString("id-ID")}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-slate-300">
                      {item.pesan}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <form action={ubahSematanPesan}>
                        <input
                          type="hidden"
                          name="id"
                          value={item.id}
                        />

                        <input
                          type="hidden"
                          name="disematkan"
                          value={String(!item.disematkan)}
                        />

                        <button
                          type="submit"
                          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
                        >
                          {item.disematkan ? "Lepas Sematan" : "Sematkan"}
                        </button>
                      </form>

                      <TombolHapusPesan id={item.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border p-4 text-sm text-gray-500 dark:border-slate-700">
              Belum ada pesan dari pengunjung.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

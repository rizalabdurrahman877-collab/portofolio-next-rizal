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

  // HALAMAN LOGIN ADMIN
  if (!masuk) {
    return (
      <main className="min-h-screen w-full bg-background px-4 py-16 text-foreground">
        <div className="mx-auto max-w-md">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Login Admin</CardTitle>
              <CardDescription>
                Masukkan PIN untuk mengelola proyek dan buku tamu.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {params?.error === "pin" && (
                <p className="mb-4 text-sm text-red-600 dark:text-red-400">
                  PIN yang kamu masukkan salah.
                </p>
              )}

              <form action={loginAdmin} className="space-y-4">
                <input
                  type="password"
                  name="pin"
                  placeholder="Masukkan PIN Admin"
                  required
                  className="w-full rounded-lg border border-input bg-background p-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#1D3557] p-3 font-semibold text-white transition hover:bg-blue-900"
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

  // MENGAMBIL DAFTAR PROYEK
  const { data: daftarProyek, error: errorProyek } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  // MENGAMBIL DAFTAR PESAN BUKU TAMU
  const { data: daftarPesan, error: errorPesan } = await supabaseAdmin
    .from("buku_tamu")
    .select("id, nama, pesan, created_at, disematkan")
    .order("disematkan", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen w-full bg-background px-4 py-8 text-foreground transition-colors duration-300 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">

        {/* HEADER KELOLA DATA */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Kelola Data
          </h1>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              Keluar
            </button>
          </form>
        </div>

        {/* DAFTAR PROYEK */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Daftar Proyek
            </h2>

            <Link
              href="/kelola/proyek/baru"
              className={buttonVariants({
                className: "bg-[#1D3557] text-white hover:bg-blue-900",
              })}
            >
              + Tambah Proyek
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {errorProyek ? (
              <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                Gagal mengambil proyek: {errorProyek.message}
              </p>
            ) : daftarProyek && daftarProyek.length > 0 ? (
              daftarProyek.map((item) => (
                <Card
                  key={item.id}
                  className="border-border bg-card shadow-sm transition-colors"
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                    <div className="min-w-0">
                      <CardTitle className="text-base font-semibold text-card-foreground sm:text-lg">
                        {item.judul}
                      </CardTitle>

                      <CardDescription className="mt-2 text-sm">
                        {item.minggu}
                      </CardDescription>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#1D3557] px-3 py-1 text-xs font-semibold text-white">
                      {item.kategori}
                    </span>
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
              <p className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
                Belum ada proyek.
              </p>
            )}
          </div>
        </section>

        {/* PESAN BUKU TAMU */}
        <section className="mt-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Pesan Buku Tamu
            </h2>

            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              {daftarPesan?.length || 0} pesan
            </span>
          </div>

          {errorPesan ? (
            <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
              Gagal mengambil pesan: {errorPesan.message}
            </p>
          ) : daftarPesan && daftarPesan.length > 0 ? (
            <div className="space-y-4">
              {daftarPesan.map((item) => (
                <Card
                  key={item.id}
                  className="border-border bg-card shadow-sm"
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-base text-card-foreground">
                        {item.nama}
                      </CardTitle>

                      {item.disematkan && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          Disematkan
                        </span>
                      )}
                    </div>

                    <CardDescription>
                      {new Date(item.created_at).toLocaleString("id-ID")}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="whitespace-pre-wrap break-words text-sm text-card-foreground">
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
                          className="rounded-md border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent"
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
            <p className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
              Belum ada pesan dari pengunjung.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}


import FormBukuTamu from "@/components/FormBukuTamu";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Buku Tamu | Portofolio Rizal",
  description: "Kirim pesan melalui buku tamu portofolio.",
};

export default async function BukuTamuPage() {
  const { data: daftarPesan, error } = await supabase
    .from("buku_tamu")
    .select("id, nama, pesan, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-utama dark:text-white">
          Buku Tamu Digital
        </h1>

        <p className="mt-2 text-gray-600 dark:text-slate-300">
          Silakan tinggalkan nama dan pesan untuk saya.
        </p>

        <div className="mt-6">
          <FormBukuTamu />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-utama dark:text-white">
          Pesan Pengunjung
        </h2>

        {error ? (
          <p className="mt-4 text-red-600">
            Gagal memuat pesan. Periksa konfigurasi Supabase dan policy RLS.
          </p>
        ) : !daftarPesan || daftarPesan.length === 0 ? (
          <p className="mt-4 text-gray-600 dark:text-slate-300">
            Belum ada pesan.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {daftarPesan.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.nama}
                </h3>

                <p className="mt-2 whitespace-pre-wrap text-gray-700 dark:text-slate-300">
                  {item.pesan}
                </p>

                <p className="mt-3 text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleString("id-ID")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

import FormBukuTamu from "@/components/FormBukuTamu";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Buku Tamu",
  description: "Tinggalkan kesan atau sapaan di buku tamu Rizal.",
};

export default async function BukuTamuPage() {
  const { data: daftarPesan, error } = await supabase
    .from("buku_tamu")
    .select("id, nama, pesan, created_at, disematkan")
    .order("disematkan", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main className="flex-1 w-full bg-white px-4 py-10 text-gray-900 dark:bg-[#0B1120] dark:text-white">
      <div className="mx-auto w-full max-w-3xl">
        {/* Judul */}
        <h1 className="text-3xl font-bold text-[#1D3557] md:text-4xl dark:text-sky-200">
          Buku Tamu
        </h1>

        <p className="mt-3 text-base text-gray-600 dark:text-slate-300">
          Tinggalkan kesan atau sapaan. Pesanmu langsung tampil di bawah.
        </p>

        {/* Form */}
        <Card className="mt-8 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <CardContent className="p-5">
            <FormBukuTamu />
          </CardContent>
        </Card>

        {/* Daftar Pesan */}
        {error ? (
          <p className="mt-6 text-sm text-red-600">
            Gagal memuat pesan pengunjung.
          </p>
        ) : daftarPesan?.length > 0 ? (
          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-[#1D3557] dark:text-sky-200">
              Pesan Terbaru
            </h2>

            {daftarPesan.map((item) => (
              <Card
                key={item.id}
                className="border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold">
                    {item.nama}
                    {item.disematkan && (
                      <span className="ml-2 text-xs text-[#1D3557] dark:text-sky-300">
                        • Disematkan
                      </span>
                    )}
                  </h3>

                  <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-slate-300">
                    {item.pesan}
                  </p>

                  <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">
                    {new Date(item.created_at).toLocaleString("id-ID")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}

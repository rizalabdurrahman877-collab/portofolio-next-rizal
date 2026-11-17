import { supabase } from "@/lib/supabase";
import FormBukuTamu from "@/components/FormBukuTamu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Buku Tamu",
  description: "Tinggalkan kesan atau sapaan melalui Buku Tamu Digital.",
};

export const dynamic = "force-dynamic";

export default async function BukuTamu() {
  const { data: daftarPesan, error } = await supabase
    .from("buku_tamu")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil pesan:", error.message);
  }

  return (
    <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-primary md:text-4xl dark:text-[#A8DDF5]">
          Buku Tamu
        </h1>

        <p className="mt-3 text-lg text-muted-foreground">
          Tinggalkan kesan atau sapaan. Pesanmu langsung tampil di bawah.
        </p>

        {/* Form Buku Tamu */}
        <Card className="mt-8 border-border bg-card">
          <CardContent className="p-6">
            <FormBukuTamu />
          </CardContent>
        </Card>

        {/* Daftar Pesan Terbaru */}
        <h2 className="mt-10 text-2xl font-bold text-primary dark:text-[#A8DDF5]">
          Pesan Terbaru
        </h2>

        <div className="mt-4 space-y-4">
          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
              Pesan gagal dimuat. Silakan coba beberapa saat lagi.
            </p>
          ) : daftarPesan && daftarPesan.length > 0 ? (
            daftarPesan.map((item) => (
              <Card
                key={item.id}
                className="border-border bg-card"
              >
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    {item.nama}
                  </CardTitle>

                  <CardDescription>
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>

                <CardContent className="whitespace-pre-wrap break-words text-card-foreground">
                  {item.pesan}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="rounded-lg border border-border p-4 text-muted-foreground">
              Belum ada pesan. Jadilah orang pertama yang mengisi buku tamu!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

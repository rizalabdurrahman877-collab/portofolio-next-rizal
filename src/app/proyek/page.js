
import FilterProyek from "@/components/FilterProyek";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Rizal Abdurrakhman Wakhid | Portofolio",
  description: "Daftar Proyek karya Rizal Abdurrakhman Wakhid",
};

export default async function Proyek() {
  const { data: proyek, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);

    return (
      <main className="min-h-screen bg-white px-4 py-8 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-red-500">
            Gagal Memuat data proyek
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-gray-800 transition-colors dark:bg-slate-950 dark:text-gray-100">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-utama dark:text-sky-300 md:text-3xl">
            Proyek Saya
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
            Kumpulan halaman belajar saya di kelas Industri UBIG.
          </p>
        </header>

        <FilterProyek proyek={proyek || []} />
      </div>
    </main>
  );
}

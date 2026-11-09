import FilterProyek from "@/components/FilterProyek";
import ProyekCard from "@/components/ProyekCard";
import { proyek } from "@/data/proyek";
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
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold text-red-500">
          Gagal Memuat data proyek
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-utama md:text-4xl">Proyek Saya</h1>

      <p className="mt-1 text-base text-gray-700">
        Kumpulan Halaman belajar saya di kelas Industri UBIG
      </p>

      <FilterProyek proyek={proyek} />
    </main>
  );
}

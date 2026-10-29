import FilterProyek from "@/components/FilterProyek";
import ProyekCard from "@/components/ProyekCard";
import { proyek } from "@/data/proyek";

export const metadata = {
  title: "Rizal Abdurrakhman Wakhid | Portofolio",
  description: "Daftar Proyek karya Rizal Abdurrakhman Wakhid",
};

export default function Proyek() {
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

import Hero from "@/components/Hero";
import Kartu from "@/components/Kartu";
import SkillCard from "@/components/SkillCard";
import ProyekCard from "@/components/ProyekCard";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan Github", level: "Dasar" },
  { nama: "Desain poster dengan Canva", level: "Mahir" },
  { nama: "JavaScript", level: "Dasar" },
];

export default async function Home() {
  const { data: proyekTerbaru, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen bg-white px-4 py-7 text-black transition-colors dark:bg-black dark:text-gray-100">
      <div className="mx-auto max-w-5xl">

        <Hero
          nama="Rizal Abdurrakhman Wakhid"
          tagline="Siswa Kelas X SMKN, calon Junior Web Developer di Kelas Industri UBIG."
        />

        <section className="mt-8">
          <Kartu judul="Keahlian">
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.nama}
                  nama={skill.nama}
                  level={skill.level}
                />
              ))}
            </section>
          </Kartu>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-utama dark:text-sky-300">
            Proyek Terbaru
          </h2>

          {error ? (
            <p className="text-sm text-red-500">
              Gagal memuat proyek terbaru.
            </p>
          ) : proyekTerbaru && proyekTerbaru.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {proyekTerbaru.map((item) => (
                <ProyekCard key={item.id} proyek={item} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Belum ada proyek.
            </p>
          )}

          <Link
            href="/proyek"
            className="mt-5 inline-block rounded-lg bg-utama px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Lihat Semua Proyek
          </Link>
        </section>
      </div>
    </main>
  );
}

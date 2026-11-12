
import Hero from "@/components/Hero";
import Kartu from "@/components/Kartu";
import SkillCard from "@/components/SkillCard";
import { proyek } from "@/data/proyek";
import ProyekCard from "@/components/ProyekCard";
import Link from "next/link";

const hobi = ["Mancing Ikan", "Coding", "Bermain Bulu Tangkis", "Jogging"];

const rencana = [
  "Menjadi Junior Web Developer",
  "Meningkatkan kemampuan Next.js",
  "Membuat Website yang bermanfaat",
];

const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan Github", level: "Dasar" },
  { nama: "Desain poster dengan Canva", level: "Mahir" },
  { nama: "JavaScript", level: "Dasar" },
];

const jadwal = [
  { hari: "Senin", waktu: "19.00 - 20.00", kegiatan: "Belajar HTML dan CSS" },
  { hari: "Selasa", waktu: "19.00 - 20.00", kegiatan: "Belajar JavaScript" },
  { hari: "Rabu", waktu: "19.00 - 21.00", kegiatan: "Latihan membuat website" },
  { hari: "Kamis", waktu: "19.00 - 20.00", kegiatan: "Belajar Next.js" },
  { hari: "Jumat", waktu: "19.00 - 20.30", kegiatan: "Evaluasi Proyek" },
];

export default function Home() {
  const proyekTerbaru = proyek.slice(-3);

  return (
    <main className="min-h-screen bg-white px-4 py-7 text-gray-800 transition-colors dark:bg-slate-950 dark:text-gray-100">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <Hero
          nama="Rizal Abdurrakhman Wakhid"
          tagline="Siswa Kelas X SMKN, calon Junior Web Developer di Kelas Industri UBIG."
        />

        {/* Keahlian */}
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

        {/* Proyek Terbaru */}
        <section className="mt-8">
          <div className="rounded-xl bg-white dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-utama dark:text-sky-300">
              Proyek Terbaru
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {proyekTerbaru.map((item) => (
                <ProyekCard key={item.slug} proyek={item} />
              ))}
            </div>

            <Link
              href="/proyek"
              className="mt-5 inline-block rounded-lg bg-utama px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Lihat Semua Proyek
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

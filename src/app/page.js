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
  { nama: "Desain Poster Dengan Canva", level: "Mahir" },
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
    <main className="min-h-screen bg-latar px-4 py-8 md:py-10">
      <section className="mx-auto max-w-3xl">
        <Hero
          nama="Rizal Abdurrakhman Wakhid"
          tagline="Siswa Kelas X SMKN, calon Junior Web Developer  di Kelas Industri UBIG."
        />

        <section className="mt-8 space-y-6">
          <Kartu judul="Keahlian">
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.nama}
                  nama={skill.nama}
                  level={skill.level}
                />
              ))}
            </section>
          </Kartu>

          <section className="mt-10">
            <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-utama">
                Proyek Terbaru
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                {proyekTerbaru.map((item) => (
                  <ProyekCard key={item.slug} proyek={item} />
                ))}
              </div>

              <Link
                href="/proyek"
                className="mt-6 inline-block rounded-lg bg-utama px-5 py-2 font-semibold text-white"
              >
                Lihat Semua Proyek
              </Link>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

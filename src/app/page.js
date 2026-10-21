import Hero from "@/components/Hero";
import Kartu from "@/components/Kartu";
import SkillCard from "@/components/SkillCard";

const hobi = [
  "Mancing Ikan",
  "Coding",
  "Bermain Bulu Tangkis",
  "Jogging",
];

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
  { hari: "Senin", kegiatan: "Belajar HTML dan CSS" },
  { hari: "Selasa", kegiatan: "Belajar JavaScript" },
  { hari: "Rabu", kegiatan: "Latihan membuat website" },
  { hari: "Kamis", kegiatan: "Belajar Next.js" },
  { hari: "Jumat", kegiatan: "Evaluasi Proyek" },
];

export default function Home() {

  const nama = "Rizal Abdurrakhman Wakhid";
  const tahunlahir = 2009;

  return (
    <main className="min-h-screen bg-[#eaf8ee] px-4 py-8 md:py-10">
      <section className="mx-auto max-w-3xl">
        <Hero
          nama="Rizal Abdurrakhman Wakhid"
          tagline="Siswa Kelas X SMKN, calon Junior Web Developer  di Kelas Industri UBIG."
        />

        <section className="mt-8 space-y-6">
          <Kartu judul="Tentang Saya">
            <p className="leading-7 text-gray-700">
              Halo, Saya Rizal Abdurrakhman Wakhid.Saya siswa Rekayasa Perangkat Lunak di SMKN 1 Pasuruan yang
              tertarik dengan pengembangann website dan teknologi. Saya terus belajar untuk meningkatkan kemampuan
              pemrograman dan membuat proyek yang bermanfaat.
            </p>
          </Kartu>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Kartu judul="Hobi">
              <ul className="list-disc space-y-2 pl-5 text-gray-700">
                {hobi.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Kartu>


            <Kartu judul="Cita-Cita">
              <ol className="list-decimal space-y-2 pl-5 text-gray-700">
                {rencana.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </Kartu>
          </section>

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
          <Kartu judul="Jadwal Belajar">
            <section className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-utama text-white">
                  <tr>
                    <th className="px-4 py-3">Hari</th>
                    <th className="px-4 py-3">Kegiatan</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwal.map((item) => (
                    <tr
                      key={item.hari}
                      className="border-b border-gray-200"
                    >
                      <td className="px-4 py-3">{item.hari}</td>
                      <td className="px-4 py-3">{item.kegiatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </Kartu>
        </section>
      </section>
    </main>
  );
}
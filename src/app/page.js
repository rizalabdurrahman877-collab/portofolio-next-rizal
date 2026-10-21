import Hero from "@/components/Hero";
import SkillCard from "@/components/SkillCard";

const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan Github", level: "Dasar" },
  { nama: "Desain Poster Dengan Canva", level: "Mahir" },
  { nama: "JavaScript", level: "Dasar" },

];



export default function Home() {

  const nama = "Rizal Abdurrakhman Wakhid";
  const tahunlahir = 2009;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Hero
        nama="Rizal Abdurrakhman Wakhid"
        tagline="Siswa Kelas X SMKN, calon Junior Web Developer  di Kelas Industri UBIG."
      />

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-utama">Keahlian</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.nama} nama={skill.nama} level={skill.level} />
          ))}
        </div>
      </section>
    </main>
  );
}
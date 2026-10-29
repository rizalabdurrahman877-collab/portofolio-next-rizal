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

const jadwal = [
    { hari: "Senin", waktu: "19.00 - 20.00", kegiatan: "Belajar HTML dan CSS" },
    { hari: "Selasa", waktu: "19.00 - 20.00", kegiatan: "Belajar JavaScript" },
    { hari: "Rabu", waktu: "19.00 - 21.00", kegiatan: "Latihan membuat website" },
    { hari: "Kamis", waktu: "19.00 - 20.00", kegiatan: "Belajar Next.js" },
    { hari: "Jumat", waktu: "19.00 - 20.30", kegiatan: "Evaluasi Proyek" },
];


export default function Tentang() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="text-3xl font-bold text-utama md:text-4xl">
                Tentang Saya
            </h1>

            <div className="mt-6 grid gap-5">
                <Kartu judul="Perkenalan">
                    <p>
                        Saya adalah siswa Rekayasa Perangkat Lunak yang tertarik
                        mempelajari pengembangan website dan teknologi web.
                        Saya ingin terus meningkatkan kemampuan agar dapat
                        membuat website yang bermanfaat.
                    </p>
                </Kartu>

                <div className="grid gap-4 md:grid-cols-2">
                    <Kartu judul="Hobi">
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                            {hobi.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </Kartu>


                    <Kartu judul="Cita-Cita">
                        <ul className="list-inside list-disc space-y-1">
                            {rencana.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </Kartu>
                </div>

                <Kartu judul="Jadwal Belajar">
                    <section className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-utama text-white">
                                <tr>
                                    <th className="px-4 py-3">Hari</th>
                                    <th className="px-4 py-3">Waktu</th>
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
                                        <td className="px-4 py-3">{item.waktu}</td>
                                        <td className="px-4 py-3">{item.kegiatan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </Kartu>
            </div>
        </main>
    );
}
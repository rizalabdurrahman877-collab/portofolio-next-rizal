
import Kartu from "@/components/Kartu";

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

export const metadata = {
    title: "Tentang Saya | Rizal Abdurrakhman Wakhid",
    description: "Profil, hobi, cita-cita, dan jadwal belajar Rizal.",
};

export default function Tentang() {
    return (
        <main className="min-h-screen bg-white px-4 py-8 text-gray-800 transition-colors dark:bg-slate-950 dark:text-gray-100">
            <div className="mx-auto max-w-5xl">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-utama dark:text-sky-300 md:text-3xl">
                        Tentang Saya
                    </h1>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Kenali lebih dekat tentang diri, minat, dan tujuan saya.
                    </p>
                </header>

                <div className="grid gap-5">
                    <Kartu judul="Perkenalan">
                        <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
                            Saya adalah siswa Rekayasa Perangkat Lunak yang tertarik
                            mempelajari pengembangan website dan teknologi web.
                            Saya ingin terus meningkatkan kemampuan agar dapat
                            membuat website yang bermanfaat.
                        </p>
                    </Kartu>

                    <div className="grid gap-5 md:grid-cols-2">
                        <Kartu judul="Hobi">
                            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                {hobi.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </Kartu>

                        <Kartu judul="Cita-Cita">
                            <ul className="list-inside list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                {rencana.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </Kartu>
                    </div>

                    <Kartu judul="Jadwal Belajar">
                        <section className="overflow-x-auto">
                            <table className="w-full min-w-[500px] text-left text-sm">
                                <thead className="bg-utama text-white">
                                    <tr>
                                        <th className="rounded-tl-lg px-4 py-3">Hari</th>
                                        <th className="px-4 py-3">Waktu</th>
                                        <th className="rounded-tr-lg px-4 py-3">Kegiatan</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {jadwal.map((item) => (
                                        <tr
                                            key={item.hari}
                                            className="border-b border-gray-200 dark:border-slate-700"
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
            </div>
        </main>
    );
}

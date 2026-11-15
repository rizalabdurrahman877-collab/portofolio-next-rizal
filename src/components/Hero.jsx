
import Image from "next/image";
import Link from "next/link";

export default function Hero({ nama, tagline }) {
  return (
    <section className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
      <Image
        src="/rizal.jpg"
        alt={`Foto Profil ${nama}`}
        width={120}
        height={120}
        priority
        className="h-28 w-28 shrink-0 rounded-full border-2 border-aksen object-cover sm:h-28 sm:w-28"
      />

      <div className="min-w-0">
        <h1 className="text-2xl font-bold leading-tight text-utama transition-colors duration-300 dark:text-sky-300 sm:text-3xl">
          Halo, Saya {nama}!
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-gray-600 transition-colors duration-300 dark:text-gray-300 sm:text-base">
          {tagline}
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
          {/* Tombol Lihat Proyek */}
          <Link
            href="/proyek"
            className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#294b75] dark:bg-sky-200 dark:text-slate-900 dark:hover:bg-sky-100"
          >
            Lihat Proyek
          </Link>

          {/* Tombol Hubungi Saya */}
          <Link
            href="/kontak"
            className="rounded-lg bg-transparent px-4 py-2 text-sm font-semibold text-[#1e3a5f] transition-all duration-300 hover:bg-zinc-100 dark:border dark:border-zinc-700 dark:bg-[#171717] dark:text-white dark:hover:bg-[#222222]"
          >
            Hubungi Saya
          </Link>
        </div>
      </div>
    </section>
  );
}

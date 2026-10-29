import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proyek } from "@/data/proyek";

export default async function DetailProyek({ params }) {
  const { slug } = await params;
  const item = proyek.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/proyek"
        className="text-sm font-semibold text-aksen hover:underline"
      >
        &larr; Kembali ke daftar proyek
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold text-blue-600">{item.kategori}</span>
        <span className="text-gray-500">· {item.minggu}</span>
      </div>

      <h1 className="mt-2 text-3xl font-bold text-utama md:text-4xl">
        {item.judul}
      </h1>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-300">
        <Image
          src={item.gambar}
          alt={item.judul}
          width={1200}
          height={675}
          sizes="(max-width: 768px) 100vw, 672px"
          priority
          className="h-auto w-full object-cover"
        />
      </div>

      <p className="mt-6 leading-relaxed text-gray-700">{item.deskripsi}</p>

      <h2 className="mt-8 text-xl font-bold text-utama">Yang Saya Pelajari</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
        {item.fitur.map((f, index) => (
          <li key={index}>{f}</li>
        ))}
      </ul>
    </main>
  );
}

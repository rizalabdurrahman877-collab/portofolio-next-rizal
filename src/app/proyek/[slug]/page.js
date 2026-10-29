import Image from "next/image";
import Link from "next/link";
import { proyek } from "@/data/proyek";
import { notFound } from "next/navigation";

export default async function DetailProyek({ params }) {
  const { slug } = await params;
  const item = proyek.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/proyek"
        className="text-sm font-semibold text-aksen hover:underline"
      >
        &larr; Kembali ke daftar proyek
      </Link>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
        <Image
          src={item.gambar}
          alt={item.judul}
          width={1200}
          height={675}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
            {item.kategori}
          </span>

          <span className="text-sm text=gray-500">Minggu: {item.minggu}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold text-utama md:text-4xl">
          {item.judul}
        </h1>
        <p className="mt-6 h-auto w-full rounded-xl border border-gray-200 font-semibold">
          Deskripsi: {item.deskripsi}
        </p>

        <h2 className="mt-8 text-2xl font-bold text-utama">
          Yang Saya Pelajari
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          {item.fitur.map((f) => (
            <li key={f}> {f}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

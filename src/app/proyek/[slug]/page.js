import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function DetailProyek({ params }) {
  const { slug } = await params;

  const { data: item, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error mengambil detail proyek:", error);

    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-xl font-bold text-red-500">
          Gagal memuat detail proyek.
        </h1>
      </main>
    );
  }

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
        <span className="text-gray-500">&bull; {item.minggu}</span>
      </div>

      <h1 className="mt-2 text-3xl font-bold text-utama md:text-4xl">
        {item.judul}
      </h1>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-300">
        {item.gambar_url ? (
          <Image
            src={item.gambar_url}
            alt={item.judul}
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 672px"
            unoptimized
            priority
            className="h-auto w-full object-cover"
          />
        ) : (
          <div className="flex h-48 items-center justify-center bg-gray-100 text-gray-500">
            Belum ada gambar proyek.
          </div>
        )}
      </div>

      <p className="mt-6 leading-relaxed text-gray-700">{item.deskripsi}</p>

      <h2 className="mt-8 text-xl font-bold text-utama">Yang Saya Pelajari</h2>

      <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
        {(item.fitur || []).map((fitur, index) => (
          <li key={index}>{fitur}</li>
        ))}
      </ul>
    </main>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { sudahMasuk } from "@/lib/pin";
import FormProyek from "@/components/FormProyek";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tambah Proyek | Admin",
};

export default async function TambahProyekPage() {
  const masuk = await sudahMasuk();

  if (!masuk) {
    redirect("/kelola");
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-10">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#1D3557] dark:text-sky-300">
          Tambah Proyek
        </h1>
      </div>

      <FormProyek />

      <div className="mt-4">
        <Link
          href="/kelola"
          className="text-sm font-medium text-[#1D3557] hover:underline dark:text-sky-300"
        >
          ← Kembali ke Kelola Data
        </Link>
      </div>
    </main>
  );
}

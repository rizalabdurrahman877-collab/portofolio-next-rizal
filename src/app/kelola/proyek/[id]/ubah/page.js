import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";
import FormProyek from "@/components/FormProyek";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ubah Proyek | Admin",
};

export default async function UbahProyekPage({ params }) {
  const masuk = await sudahMasuk();

  if (!masuk) {
    redirect("/kelola");
  }

  const { id } = await params;

  const { data: proyek, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !proyek) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-10">
      <h1 className="mb-5 text-2xl font-bold text-[#1D3557] dark:text-sky-300">
        Ubah Proyek
      </h1>

      <FormProyek proyek={proyek} />

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
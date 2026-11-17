import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { sudahMasuk } from "@/lib/pin";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { ubahProyek } from "@/app/kelola/actions";
import FormProyek from "@/components/FormProyek";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ubah Proyek | Admin",
};

export default async function UbahProyekPage({ params }) {
  if (!(await sudahMasuk())) {
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
    <main className="min-h-screen bg-white px-4 py-10 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-[#1D3557] dark:text-white">
          Ubah Proyek
        </h1>

        <Card className="mt-6">
          <CardContent>
            <FormProyek
              aksi={ubahProyek}
              proyek={proyek}
              teksTombol="Simpan Perubahan"
            />
          </CardContent>
        </Card>

        <Link
          href="/kelola"
          className="mt-5 inline-block text-sm font-medium text-[#1D3557] hover:underline dark:text-sky-300"
        >
          ← Kembali ke Kelola Data
        </Link>
      </div>
    </main>
  );
}

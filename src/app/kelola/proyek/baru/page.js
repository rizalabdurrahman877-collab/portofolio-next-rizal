import Link from "next/link";
import { redirect } from "next/navigation";

import { sudahMasuk } from "@/lib/pin";
import { tambahProyek } from "@/app/kelola/actions";
import FormProyek from "@/components/FormProyek";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tambah Proyek | Admin",
};

const proyekKosong = {
  id: "",
  judul: "",
  slug: "",
  kategori: "",
  minggu: "",
  deskripsi: "",
  fitur: [],
  gambar_url: "",
};

export default async function TambahProyekPage() {
  if (!(await sudahMasuk())) {
    redirect("/kelola");
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-[#1D3557] dark:text-white">
          Tambah Proyek
        </h1>

        <Card className="mt-6">
          <CardContent>
            <FormProyek
              aksi={tambahProyek}
              proyek={proyekKosong}
              teksTombol="Simpan Proyek"
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

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";

// Memeriksa login admin
async function periksaAdmin() {
  const login = await sudahMasuk();

  if (!login) {
    redirect("/kelola");
  }
}

// Mengubah fitur dari teks menjadi array
function ambilDataProyek(formData) {
  return {
    judul: String(formData.get("judul") || "").trim(),
    slug: String(formData.get("slug") || "").trim(),
    deskripsi: String(formData.get("deskripsi") || "").trim(),
    kategori: String(formData.get("kategori") || "").trim(),
    minggu: String(formData.get("minggu") || "").trim(),
    fitur: String(formData.get("fitur") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    gambar_url: String(formData.get("gambar_url") || "").trim(),
  };
}

// Menambahkan proyek
export async function tambahProyek(formData) {
  await periksaAdmin();

  const data = ambilDataProyek(formData);

  if (!data.judul || !data.slug) {
    throw new Error("Judul dan slug wajib diisi.");
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .insert(data);

  if (error) {
    console.error("Gagal menambahkan proyek:", error.message);
    throw new Error("Proyek gagal ditambahkan.");
  }

  revalidatePath("/kelola");
  revalidatePath("/proyek");
  revalidatePath("/");
}

// Mengubah proyek
export async function ubahProyek(formData) {
  await periksaAdmin();

  const id = String(formData.get("id") || "").trim();
  const data = ambilDataProyek(formData);

  if (!id || !data.judul || !data.slug) {
    throw new Error("Data proyek belum lengkap.");
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Gagal mengubah proyek:", error.message);
    throw new Error("Proyek gagal diperbarui.");
  }

  revalidatePath("/kelola");
  revalidatePath("/proyek");
  revalidatePath("/");
}

// Menghapus proyek
export async function hapusProyek(formData) {
  await periksaAdmin();

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    throw new Error("ID proyek tidak ditemukan.");
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Gagal menghapus proyek:", error.message);
    throw new Error("Proyek gagal dihapus.");
  }

  revalidatePath("/kelola");
  revalidatePath("/proyek");
  revalidatePath("/");
}

// Menyematkan atau melepas sematan pesan
export async function ubahSematanPesan(formData) {
  await periksaAdmin();

  const id = String(formData.get("id") || "").trim();
  const disematkan = formData.get("disematkan") === "true";

  if (!id) {
    throw new Error("ID pesan tidak ditemukan.");
  }

  const { error } = await supabaseAdmin
    .from("buku_tamu")
    .update({ disematkan })
    .eq("id", id);

  if (error) {
    console.error("Gagal mengubah sematan:", error.message);
    throw new Error("Status sematan gagal diperbarui.");
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
}

// Menghapus pesan buku tamu
export async function hapusPesan(formData) {
  await periksaAdmin();

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    throw new Error("ID pesan tidak ditemukan.");
  }

  const { error } = await supabaseAdmin
    .from("buku_tamu")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Gagal menghapus pesan:", error.message);
    throw new Error("Pesan gagal dihapus.");
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
}

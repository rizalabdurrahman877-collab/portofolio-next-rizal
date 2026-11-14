"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function periksaAdmin() {
  if (!(await sudahMasuk())) {
    redirect("/kelola");
  }
}

// ==============================
// CRUD PROYEK
// ==============================

function ambilDataProyek(formData) {
  return {
    slug: String(formData.get("slug") || "").trim(),
    judul: String(formData.get("judul") || "").trim(),
    deskripsi: String(formData.get("deskripsi") || "").trim(),
    kategori: String(formData.get("kategori") || "").trim(),
    minggu: String(formData.get("minggu") || "").trim(),
    fitur: String(formData.get("fitur") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    gambar_url: String(formData.get("gambar_url") || "").trim() || null,
  };
}

export async function tambahProyek(formData) {
  await periksaAdmin();

  const data = ambilDataProyek(formData);

  if (!data.slug || !data.judul) {
    throw new Error("Slug dan judul wajib diisi.");
  }

  const { error } = await supabaseAdmin.from("projects").insert(data);

  if (error) {
    throw new Error("Gagal menambahkan proyek: " + error.message);
  }

  revalidatePath("/kelola");
  revalidatePath("/proyek");
  revalidatePath("/");
}

export async function ubahProyek(formData) {
  await periksaAdmin();

  const id = String(formData.get("id") || "");
  const data = ambilDataProyek(formData);

  if (!id || !data.slug || !data.judul) {
    throw new Error("ID, slug, dan judul wajib diisi.");
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .update(data)
    .eq("id", id);

  if (error) {
    throw new Error("Gagal mengubah proyek: " + error.message);
  }

  revalidatePath("/kelola");
  revalidatePath("/proyek");
  revalidatePath("/");
}

export async function hapusProyek(formData) {
  await periksaAdmin();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("ID proyek tidak ditemukan.");
  }

  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error("Gagal menghapus proyek: " + error.message);
  }

  revalidatePath("/kelola");
  revalidatePath("/proyek");
  revalidatePath("/");
}

// ==============================
// KELOLA BUKU TAMU
// ==============================

export async function ubahSematanPesan(formData) {
  await periksaAdmin();

  const id = String(formData.get("id") || "");
  const disematkan = formData.get("disematkan") === "true";

  if (!id) {
    throw new Error("ID pesan tidak ditemukan.");
  }

  const { error } = await supabaseAdmin
    .from("buku_tamu")
    .update({ disematkan })
    .eq("id", id);

  if (error) {
    throw new Error("Gagal mengubah sematan: " + error.message);
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
}

export async function hapusPesan(formData) {
  await periksaAdmin();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("ID pesan tidak ditemukan.");
  }

  const { error } = await supabaseAdmin.from("buku_tamu").delete().eq("id", id);

  if (error) {
    throw new Error("Gagal menghapus pesan: " + error.message);
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
}

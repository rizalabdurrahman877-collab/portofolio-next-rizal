"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sudahMasuk } from "@/lib/pin";

const daftarKategori = ["HTML", "CSS", "JavaScript", "Next.js"];

function bacaProyek(formData) {
  return {
    judul: String(formData.get("judul") || "").trim(),
    slug: String(formData.get("slug") || "").trim(),
    kategori: String(formData.get("kategori") || "").trim(),
    minggu: String(formData.get("minggu") || "").trim(),
    deskripsi: String(formData.get("deskripsi") || "").trim(),
    fitur: String(formData.get("fitur") || "")
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f !== ""),
    gambar_url: String(formData.get("gambar_url") || "").trim(),
  };
}

function cekProyek(proyek) {
  if (
    proyek.judul === "" ||
    proyek.slug === "" ||
    proyek.deskripsi === ""
  ) {
    return "Judul, slug, dan deskripsi wajib diisi.";
  }

  if (proyek.slug.includes(" ")) {
    return "Slug tidak boleh memakai spasi. Gunakan tanda hubung, contoh: buku-tamu.";
  }

  if (!daftarKategori.includes(proyek.kategori)) {
    return "Kategori harus HTML, CSS, JavaScript, atau Next.js.";
  }

  if (!proyek.gambar_url.startsWith("/proyek/")) {
    return "Alamat gambar harus diawali /proyek/, contoh: /proyek/proyek-buku-tamu.png.";
  }

  return "";
}

function perbaruiHalaman(slug) {
  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath(`/proyek/${slug}`);
  revalidatePath("/kelola");
}

// ==========================================
// TAMBAH PROYEK
// ==========================================

export async function tambahProyek(stateSebelum, formData) {
  const proyek = bacaProyek(formData);

  if (!(await sudahMasuk())) {
    return {
      error: "Masukkan PIN dulu di halaman Kelola.",
      proyek,
    };
  }

  const errorValidasi = cekProyek(proyek);

  if (errorValidasi !== "") {
    return {
      error: errorValidasi,
      proyek,
    };
  }

  const hasil = await supabaseAdmin
    .from("projects")
    .insert(proyek);

  if (hasil.error) {
    if (hasil.error.code === "23505") {
      return {
        error: "Slug sudah dipakai proyek lain.",
        proyek,
      };
    }

    return {
      error: `Proyek gagal disimpan: ${hasil.error.message}`,
      proyek,
    };
  }

  perbaruiHalaman(proyek.slug);
  redirect("/kelola");
}

// ==========================================
// UBAH PROYEK
// ==========================================

export async function ubahProyek(stateSebelum, formData) {
  const id = String(formData.get("id") || "");
  const proyek = {
    ...bacaProyek(formData),
    id,
  };

  if (!(await sudahMasuk())) {
    return {
      error: "Masukkan PIN dulu di halaman Kelola.",
      proyek,
    };
  }

  if (!id) {
    return {
      error: "ID proyek tidak valid.",
      proyek,
    };
  }

  const errorValidasi = cekProyek(proyek);

  if (errorValidasi !== "") {
    return {
      error: errorValidasi,
      proyek,
    };
  }

  const { data: proyekLama } = await supabaseAdmin
    .from("projects")
    .select("slug")
    .eq("id", id)
    .single();

  const hasil = await supabaseAdmin
    .from("projects")
    .update({
      judul: proyek.judul,
      slug: proyek.slug,
      kategori: proyek.kategori,
      minggu: proyek.minggu,
      deskripsi: proyek.deskripsi,
      fitur: proyek.fitur,
      gambar_url: proyek.gambar_url,
    })
    .eq("id", id);

  if (hasil.error) {
    if (hasil.error.code === "23505") {
      return {
        error: "Slug sudah dipakai proyek lain.",
        proyek,
      };
    }

    return {
      error: `Proyek gagal diubah: ${hasil.error.message}`,
      proyek,
    };
  }

  perbaruiHalaman(proyek.slug);

  if (proyekLama?.slug && proyekLama.slug !== proyek.slug) {
    revalidatePath(`/proyek/${proyekLama.slug}`);
  }

  redirect("/kelola");
}

// ==========================================
// HAPUS PROYEK
// ==========================================

export async function hapusProyek(formData) {
  if (!(await sudahMasuk())) {
    redirect("/kelola");
  }

  const id = formData.get("id");

  if (!id) {
    throw new Error("ID proyek tidak valid.");
  }

  const { data: proyek } = await supabaseAdmin
    .from("projects")
    .select("slug")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Proyek gagal dihapus: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/kelola");

  if (proyek?.slug) {
    revalidatePath(`/proyek/${proyek.slug}`);
  }
}

// ==========================================
// SEMATKAN / LEPAS SEMATAN PESAN
// ==========================================

export async function ubahSematanPesan(formData) {
  if (!(await sudahMasuk())) {
    redirect("/kelola");
  }

  const id = formData.get("id");
  const disematkan = formData.get("disematkan") === "true";

  if (!id) {
    throw new Error("ID pesan tidak valid.");
  }

  const { error } = await supabaseAdmin
    .from("buku_tamu")
    .update({ disematkan })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal mengubah sematan pesan: ${error.message}`);
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
  revalidatePath("/");
}

// ==========================================
// HAPUS PESAN BUKU TAMU
// ==========================================

export async function hapusPesan(formData) {
  if (!(await sudahMasuk())) {
    redirect("/kelola");
  }

  const id = formData.get("id");

  if (!id) {
    throw new Error("ID pesan tidak valid.");
  }

  const { error } = await supabaseAdmin
    .from("buku_tamu")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus pesan: ${error.message}`);
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
  revalidatePath("/");
}

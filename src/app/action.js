"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function kirimPesan(stateSebelum, formData) {
  const nama = String(formData.get("nama") || "").trim();
  const pesan = String(formData.get("pesan") || "").trim();

  if (!nama || !pesan) {
    return {
      error: "Nama dan pesan wajib diisi.",
      nama,
      pesan,
    };
  }

  if (nama.length > 80 || pesan.length > 1000) {
    return {
      error: "Nama maksimal 80 karakter dan pesan maksimal 1000 karakter.",
      nama,
      pesan,
    };
  }

  const { error } = await supabase.from("buku_tamu").insert({ nama, pesan });

  if (error) {
    console.error("Gagal menyimpan pesan:", error.message);

    return {
      error: "Pesan gagal disimpan. Silakan coba lagi.",
      nama,
      pesan,
    };
  }

  revalidatePath("/buku-tamu");

  return {
    berhasil: `Terima kasih, ${nama}! Pesan berhasil dikirim.`,
    nama: "",
    pesan: "",
  };
}

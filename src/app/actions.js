"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

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

  const { error } = await supabase
    .from("buku_tamu")
    .insert({ nama, pesan });

  if (error) {
    return {
      error: "Pesan gagal disimpan. Silakan coba lagi.",
      nama,
      pesan,
    };
  }

  revalidatePath("/buku-tamu");

  return {
    berhasil: `Terima kasih, ${nama}! Pesanmu sudah tersimpan.`,
    nama: "",
    pesan: "",
  };
}

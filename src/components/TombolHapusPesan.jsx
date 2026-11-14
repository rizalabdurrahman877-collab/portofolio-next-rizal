
"use client";

import { hapusPesan } from "@/app/kelola/action";

export default function TombolHapusPesan({ id }) {
  function konfirmasi(event) {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin menghapus pesan ini?"
    );

    if (!yakin) {
      event.preventDefault();
    }
  }

  return (
    <form action={hapusPesan} onSubmit={konfirmasi}>
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        Hapus Pesan
      </button>
    </form>
  );
}

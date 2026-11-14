
"use client";

import { useActionState } from "react";
import { kirimPesan } from "@/app/action";
import TombolKirim from "@/components/TombolKirim";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {};

export default function FormBukuTamu() {
  const [state, formAction] = useActionState(
    kirimPesan,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="nama" className="text-sm font-medium">
          Nama
        </label>
        <Input
          id="nama"
          name="nama"
          placeholder="Masukkan nama kamu"
          defaultValue={state.nama || ""}
          maxLength={80}
          required
          className="border border-gray-400 dark:border-slate-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="pesan" className="text-sm font-medium">
          Pesan
        </label>
        <Textarea
          id="pesan"
          name="pesan"
          rows={4}
          placeholder="Tuliskan pesan..."
          defaultValue={state.pesan || ""}
          maxLength={1000}
          required
          className="min-h-28 border border-gray-400 dark:border-slate-600"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      {state.berhasil && (
        <p role="status" className="text-sm text-green-600">
          {state.berhasil}
        </p>
      )}

      <TombolKirim teks="Kirim Pesan" />
    </form>
  );
}

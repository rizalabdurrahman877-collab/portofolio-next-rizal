"use client";

import { useActionState, useEffect, useState } from "react";
import { kirimPesan } from "@/app/actions";
import TombolKirim from "@/components/TombolKirim";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {};

export default function FormBukuTamu() {
  const [state, formAction] = useActionState(kirimPesan, initialState);

  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    if (state.error) {
      setNama(state.nama ?? "");
      setPesan(state.pesan ?? "");
    }

    if (state.berhasil) {
      setNama("");
      setPesan("");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="nama" className="block text-sm font-medium">
          Nama
        </label>

        <Input
          id="nama"
          name="nama"
          placeholder="Masukkan nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="pesan" className="block text-sm font-medium">
          Pesan
        </label>

        <Textarea
          id="pesan"
          name="pesan"
          placeholder="Tulis pesanmu"
          rows={4}
          maxLength={300}
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          required
        />
      </div>

      <TombolKirim teks="Kirim Pesan" />

      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}

      {state.berhasil && (
        <p className="text-sm font-medium text-green-600">{state.berhasil}</p>
      )}
    </form>
  );
}

"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function TombolKirim() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-[#1D3557] text-white hover:bg-[#27476f] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Mengirim..." : "Kirim Pesan"}
    </Button>
  );
}

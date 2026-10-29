"use client";

import { useEffect, useState } from "react";

export default function TombolTema() {
  const [gelap, setGelap] = useState(false);

  useEffect(() => {
    setGelap(document.documentElement.classList.contains("dark"));
  }, []);

  function gantiTema() {
    const siapGelap = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", siapGelap);
    localStorage.setItem("tema", siapGelap ? "gelap" : "terang");
    setGelap(siapGelap);
  }

  return (
    <button
      type="button"
      onClick={gantiTema}
      className="rounded-lg border border-white px-3 py-1 text-sm font-semibold text-white hover:bg-aksen"
    >
      {gelap ? "Mode Terang" : "Mode Gelap"}
    </button>
  );
}
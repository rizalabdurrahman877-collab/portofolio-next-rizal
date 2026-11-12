"use client";

import { useEffect, useState } from "react";

export default function TombolTema() {
  const [gelap, setGelap] = useState(false);

  useEffect(() => {
    const tema = localStorage.getItem("tema");
    const modeGelap = tema === "gelap";

    setGelap(modeGelap);
    document.documentElement.classList.toggle("dark", modeGelap);
  }, []);

  function ubahTema() {
    const modeBaru = !gelap;

    setGelap(modeBaru);
    document.documentElement.classList.toggle("dark", modeBaru);
    localStorage.setItem("tema", modeBaru ? "gelap" : "terang");
  }

  return (
    <button
      type="button"
      onClick={ubahTema}
      className="rounded-lg border border-white px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#1D3557]"
    >
      {gelap ? "Mode Terang" : "Mode Gelap"}
    </button>
  );
}
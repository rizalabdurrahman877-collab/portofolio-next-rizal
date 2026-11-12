"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TombolTema from "@/components/TombolTema";

const menu = [
    { nama: "Beranda", href: "/" },
    { nama: "Tentang", href: "/tentang" },
    { nama: "Proyek", href: "/proyek" },
    { nama: "Kontak", href: "/kontak" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="w-full bg-[#1D3557] text-white shadow-sm">
            <nav className="mx-auto flex min-h-16 max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-white"
                >
                    Rizal Abdurrakhman Wakhid
                </Link>

                {/* Menu navigasi */}
                <div className="flex flex-wrap items-center justify-center gap-5">
                    {menu.map((item) => {
                        const aktif =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`border-b-2 pb-1 text-sm font-medium transition-colors ${aktif
                                        ? "border-white text-white"
                                        : "border-transparent text-white/90 hover:border-white hover:text-white"
                                    }`}
                            >
                                {item.nama}
                            </Link>
                        );
                    })}
                </div>

                {/* Tombol tema */}
                <TombolTema />
            </nav>
        </header>
    );
}
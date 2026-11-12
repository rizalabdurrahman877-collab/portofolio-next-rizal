
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProyekCard({ proyek }) {
  // Mendukung data lokal (gambar) dan Supabase (gambar_url)
  const gambar = proyek.gambar_url || proyek.gambar;

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl border border-garis bg-kartu shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/proyek/${proyek.slug}`}
        className="relative block aspect-video w-full overflow-hidden bg-latar"
      >
        {gambar ? (
          <Image
            src={gambar}
            alt={`Tangkapan layar ${proyek.judul}`}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted">
            Gambar belum tersedia
          </div>
        )}
      </Link>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-3">
          {proyek.kategori && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-slate-700 dark:text-sky-300"
            >
              {proyek.kategori}
            </Badge>
          )}

          <div>
            <h3 className="line-clamp-1 text-lg font-bold text-judul">
              {proyek.judul}
            </h3>

            <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-muted">
              {proyek.deskripsi}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Link
            href={`/proyek/${proyek.slug}`}
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "bg-utama text-white hover:bg-utama/90",
            })}
          >
            Lihat Detail
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

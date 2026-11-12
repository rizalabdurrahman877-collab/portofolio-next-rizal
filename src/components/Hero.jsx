
import Image from "next/image";

export default function Hero({ nama, tagline }) {
    return (
        <section className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
            <Image
                src="/rizal.jpg"
                alt={`Foto Profil ${nama}`}
                width={120}
                height={120}
                priority
                className="h-28 w-28 shrink-0 rounded-full border-2 border-aksen object-cover sm:h-28 sm:w-28"
            />

            <div className="min-w-0">
                <h1 className="text-2xl font-bold leading-tight text-utama dark:text-sky-300 sm:text-3xl">
                    Halo, Saya {nama}!
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                    {tagline}
                </p>
            </div>
        </section>
    );
}

import Image from "next/image";

export default function Hero({ nama, tagline }) {
    return (
        <section className="flex flex-col  items-center gap-6 text-center md:flex-row md:text-left">
            <Image
                src="/rizal.jpg"
                alt={`Foto Profil ${nama}`}
                width={180}
                height={180}
                loading="eager"
                className="rounded-full border-4 border-aksen"
            />
            <div>
                <h1 className="text-3xl font-bold text-utama md:text-5xl">Halo, Saya {nama}!</h1>
                <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">{tagline}</p>
            </div>
        </section>
    );
}
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg=[#edf9f0]">
            <header className="bg-[#123653]">
            </header>
            <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
                <h1 className="text-5xl font-bold text-red-600">
                    404
                </h1>

                <h2 className="mt-3 text-2xl font-bold text-[#123653]">
                    Halaman Tidak Ditemukan
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    Alamat yang kamu buka tidak ada atau sudah dipindahkan.
                </p>

                <Link
                href="/"
                className="mt-6 rounded-md bg-[#123653] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1c4a70]"
                >
                    Kembali Ke Beranda
                </Link>
            </main>
        </div>
    );
}
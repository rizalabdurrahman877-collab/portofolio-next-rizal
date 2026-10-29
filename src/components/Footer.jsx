export default function Footer() {
    const tahun = new Date().getFullYear();

    return (
        <footer className="mt-auto bg-utama p-6 text-center text-latar">
            <p className="text-sm text-gray-600">
                &copy; {tahun} Rizal Abdurrakhman Wakhid. Dibuat Next.js di Kelas Industri UBIG
            </p>
        </footer>
    );
}
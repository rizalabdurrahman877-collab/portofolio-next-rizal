export default function Footer() {
    const tahun = new Date().getFullYear();

    return (
        <footer className="mt-auto bg-utama p-6 text-center text-latar">
            <p className="text-sm text-latar font-bold">
                &copy; {tahun} Rizal Abdurrakhman Wakhid. All rights reserved.
            </p>
        </footer>
    );
}
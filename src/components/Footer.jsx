export default function Footer() {
    const tahun = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-gray-200 px-4 py-5 text-center">
            <p className="text-sm text-gray-600">
                &copy; {tahun} Rizal Abdurrakhman Wakhid. All rights reserved.
            </p>

        </footer>
    );
}
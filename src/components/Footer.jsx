export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-[#1e3a5f] p-6 text-center text-white">
      <p className="text-sm font-bold text-white">
        &copy; {tahun} Rizal Abdurrakhman Wakhid. All rights reserved.
      </p>
    </footer>
  );
}

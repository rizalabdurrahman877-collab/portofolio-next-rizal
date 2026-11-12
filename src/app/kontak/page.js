
import FormKontak from "@/components/FormKontak";

export const metadata = {
  title: "Kontak | Rizal Abdurrakhman Wakhid",
  description: "Hubungi saya untuk pertanyaan atau kerja sama.",
};

export default function Kontak() {
  return (
    <main className="min-h-screen bg-white px-4 py-8 text-gray-800 transition-colors dark:bg-slate-950 dark:text-gray-100">
      <div className="mx-auto max-w-5xl">
        <FormKontak />
      </div>
    </main>
  );
}

import FormKontak from "@/components/FormKontak";

export const metadata = {
  title: "Rizal Abdurrakhman Wakhid | Portofolio",
  description: "Hubungi saya untuk pertanyaan atau kerja sama.",
};

export default function Kontak() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <FormKontak />
    </main>
  );
}
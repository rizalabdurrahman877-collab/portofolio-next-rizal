import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rizal Abdurrakhman Wakhid | Portofolio",
  description:
    "Portofolio Rizal Abdurrakhman Wakhid, Siswa SMKN calon Junior Web Developer di Kelas Industri UBIG",
};

const scriptTema = `
(function () {
  try {
    if (localStorage.getItem("tema") === "gelap") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
    <body className="flex min-h-full flex-col bg-latar text-teks">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
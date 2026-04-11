import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ticoblockchain.cr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TicoBlockchain 2026 — En Vivo",
    template: "%s · TicoBlockchain 2026",
  },
  description:
    "Evento blockchain en vivo desde Costa Rica. 24 de mayo, Hotel Barceló San José. Main Stage + Escenario 2.",
  applicationName: "TicoBlockchain 2026",
  keywords: [
    "TicoBlockchain",
    "blockchain",
    "Costa Rica",
    "Web3",
    "cripto",
    "fintech",
    "LATAM",
  ],
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: "TicoBlockchain 2026",
    title: "TicoBlockchain 2026 — En Vivo",
    description:
      "Main Stage + Escenario 2 · 24 de mayo 2026 · Hotel Barceló San José.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicoBlockchain 2026 — En Vivo",
    description:
      "Main Stage + Escenario 2 · 24 de mayo 2026 · Hotel Barceló San José.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ touchAction: "manipulation" }}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans">
        <a href="#main" className="skip-link">
          Ir al contenido principal
        </a>
        <NavBar />
        <div className="flex-1 flex flex-col pt-[64px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    "Tracker en vivo del TicoBlockchain 2026 — 14 de mayo en Hotel Barceló San José, Costa Rica. Sigue Main Stage y Escenario 2 en tiempo real.",
  applicationName: "TicoBlockchain 2026",
  alternates: {
    canonical: "/",
  },
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
      "Main Stage + Escenario 2 · 14 de mayo 2026 · Hotel Barceló San José.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicoBlockchain 2026 — En Vivo",
    description:
      "Main Stage + Escenario 2 · 14 de mayo 2026 · Hotel Barceló San José.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f5",
  // Let the app paint into the iOS notch / Dynamic Island area so safe-area
  // insets actually resolve to a non-zero value. Without this, env(safe-area-*)
  // always returns 0 on iPhones and fixed elements would still clip.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ touchAction: "manipulation" }}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans">
        <a href="#main" className="skip-link">
          Ir al contenido principal
        </a>
        <NavBar />
        {/* Offset matches NavBar's fixed height contract (see NavBar.tsx),
            plus the top safe-area so content isn't covered on notched devices. */}
        <div className="flex-1 flex flex-col pt-[calc(72px+env(safe-area-inset-top))]">
          {children}
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

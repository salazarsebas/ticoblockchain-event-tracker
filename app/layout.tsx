import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "TicoBlockchain En Vivo",
  description: "Evento blockchain en vivo — Costa Rica",
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
        {children}
      </body>
    </html>
  );
}

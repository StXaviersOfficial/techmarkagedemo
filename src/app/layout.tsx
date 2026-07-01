import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voyaline Express | Premium Intercity Bus Travel",
  description:
    "Voyaline Express operates 240+ premium coaches across 86 cities. Sleeper, semi-sleeper, AC seater, and Volvo multi-axle buses with live tracking, on-time guarantee, and fares starting at ₹299.",
  keywords: [
    "bus booking",
    "intercity bus",
    "sleeper bus",
    "Volvo bus",
    "AC bus",
    "bus tickets online",
    "live bus tracking",
    "Voyaline Express",
  ],
  authors: [{ name: "Voyaline Travels Pvt. Ltd." }],
  metadataBase: new URL("https://voyaline.express"),
  openGraph: {
    title: "Voyaline Express | Premium Intercity Bus Travel",
    description:
      "240+ premium coaches. 86 cities. Live tracking. On-time guarantee. Travel further, travel smarter with Voyaline Express.",
    url: "https://voyaline.express",
    siteName: "Voyaline Express",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyaline Express | Premium Intercity Bus Travel",
    description:
      "240+ premium coaches. 86 cities. Live tracking. On-time guarantee.",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

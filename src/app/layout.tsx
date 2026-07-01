import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { ThemeProvider } from "@/components/site/theme-provider";

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
  title: "TechMarkage Express | Premium Intercity Bus Travel — Demo",
  description:
    "TechMarkage Express is a premium intercity coach service concept. This is a portfolio demo built by Amrit Raj featuring sleeper, semi-sleeper, AC seater, and Volvo multi-axle buses with live tracking and on-time guarantee.",
  keywords: [
    "bus booking",
    "intercity bus",
    "sleeper bus",
    "Volvo bus",
    "AC bus",
    "bus tickets online",
    "live bus tracking",
    "TechMarkage Express",
    "demo",
  ],
  authors: [{ name: "Amrit Raj" }],
  metadataBase: new URL("https://techmarkage.express"),
  openGraph: {
    title: "TechMarkage Express | Premium Intercity Bus Travel — Demo",
    description:
      "A portfolio demo by Amrit Raj. Premium intercity coach service concept with live tracking, on-time guarantee, and animated UI.",
    url: "https://techmarkage.express",
    siteName: "TechMarkage Express",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechMarkage Express | Premium Intercity Bus Travel — Demo",
    description:
      "A portfolio demo by Amrit Raj. Premium intercity coach service concept.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Sonner
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              },
              classNames: {
                toast: "font-sans",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

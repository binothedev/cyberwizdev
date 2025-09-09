import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { Toaster } from "react-hot-toast";
import Wrapper from "@/components/ui/wrapper";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "CyberWizDev | Custom Software Development",
    template: `%s | CyberWizDev`,
  },
  description:
    "CyberWizDev is a leading provider of custom software development, web design, and mobile app solutions. We help businesses transform their digital presence and achieve their goals.",
  keywords: [
    "custom software development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "digital strategy",
    "software development company",
  ],
  authors: [{ name: "Hallel Ojowuro", url: "https://hallelojowuro.com" }],
  creator: "Hallel Ojowuro",
  publisher: "CyberWizDev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${openSans.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Header />
          <main className="min-h-screen">
            <Suspense fallback={<Loader />}>{children}
            </Suspense>
          </main>
          <Footer />
          <ScrollToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

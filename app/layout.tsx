import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { Analytics } from '@/components/analytics';
import { Toaster } from 'react-hot-toast';
import Wrapper from '@/components/ui/wrapper';
import ScrollToTop from '@/components/ui/scroll-to-top';
import { Suspense } from 'react';
import Loader from '@/components/ui/loader';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: "CyberWizDev | Custom Software Development",
    template: `%s | CyberWizDev`,
  },
  description: "CyberWizDev is a leading provider of custom software development, web design, and mobile app solutions. We help businesses transform their digital presence and achieve their goals.",
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
  themeColor: "#3498db",
  // openGraph: {
  //   title: "CyberWizDev | Custom Software Development",
  //   description: "CyberWizDev is a leading provider of custom software development, web design, and mobile app solutions. We help businesses transform their digital presence and achieve their goals.",
  //   url: "https://cyberwizdev.com.ng",
  //   siteName: "CyberWizDev",
  //   images: [
  //     {
  //       url: "https://cyberwizdev.com.ng/og-image.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "CyberWizDev - Custom Software Development",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "CyberWizDev | Custom Software Development",
  //   description: "CyberWizDev is a leading provider of custom software development, web design, and mobile app solutions. We help businesses transform their digital presence and achieve their goals.",
  //   creator: "@hallelojo",
  //   images: ["https://cyberwizdev.com.ng/twitter-og-image.png"],
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <Suspense fallback={<Loader />}>
              <Wrapper>{children}</Wrapper>
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

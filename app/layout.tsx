import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "@/components/LoadingContext";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

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
          <LoadingProvider>
          <Toaster />
          {children}   
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="CyberwizDev Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold">Cyberwizdev</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 hover:text-[#3498db] transition-colors ${
                pathname === item.href ? "text-[#3498db]" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          className="hidden lg:flex lg:flex-1 lg:justify-end"
        >
          <Button size="lg" variant="outline" className="bg-white/10">
            Get Started
          </Button>
        </Link>
      </nav>
      <nav
        className={`md:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <ul className="flex items-center flex-col space-y-2 p-4  shadow-md">
          {navigation.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={`text-sm font-semibold leading-6 hover:text-[#3498db] transition-colors ${
                  pathname === link.href ? "text-[#3498db]" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="py-6">
          <Link href="/contact" className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
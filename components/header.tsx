"use client";

import { useState } from "react";
import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Top navigation. Labels match the landing spec exactly; link targets are
 * hybrid: on the landing page section anchors are used, everywhere else the
 * real routes so sub-pages stay reachable.
 */
const navigation = [
  { name: "Home", route: "/", section: "/" },
  { name: "Services", route: "/services", section: "#services" },
  { name: "Portfolio", route: "/portfolio", section: "#work" },
  { name: "Process", route: "/#process", section: "#process" },
  { name: "Contact", route: "/contact", section: "#contact" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  const items = navigation.map((item) => ({
    name: item.name,
    href: onHome ? item.section : item.route,
    active: onHome ? item.section === "/" : item.route === pathname,
  }));

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-[10px]">
      <nav
        className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5"
        aria-label="Global"
      >
        <Link
          href="/"
          className="text-[1.15rem] font-bold tracking-[-0.02em] text-foreground"
          onClick={closeMenu}
        >
          Cyber<span className="text-primary">Wiz</span>Dev
        </Link>

        <div className="hidden items-center gap-[26px] text-[0.95rem] text-muted-foreground md:flex">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground",
                item.active && "text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button className="hidden md:inline-flex" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      <nav
        id="mobile-nav"
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col gap-1 border-t border-line bg-background px-5 py-4">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "block rounded-md px-2 py-2.5 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  item.active && "text-foreground"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button className="w-full" asChild>
              <Link href="/contact" onClick={closeMenu}>
                Get Started
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

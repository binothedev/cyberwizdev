"use client";

import Link from "@/components/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/lib/actions";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Spinner from "./reusable/spinner";

const navigation = {
  solutions: [
    { name: "Web Development", href: "/services#web-development" },
    { name: "Mobile Apps", href: "/services#mobile-apps" },
    { name: "Cloud Solutions", href: "/services#cloud-solutions" },
    { name: "Consulting", href: "/services#consulting" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Support", href: "/support" },
    { name: "Status", href: "/status" },
    { name: "Changelog", href: "/changelog" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  social: [
    { name: "Facebook", href: "https://facebook.com/cyberwizdev", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/cyberwizdev", icon: Twitter },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/cyberwizdev",
      icon: Linkedin,
    },
    { name: "GitHub", href: "https://github.com/cyberwizdev", icon: Github },
  ],
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@cyberwizdev.com.ng",
    href: "mailto:info@cyberwizdev.com.ng",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+234 (703) 312-8149",
    href: "tel:+2347033128149",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Lagos, Nigeria",
    href: "https://maps.google.com/?q=Lagos,Nigeria",
  },
];

const linkClass =
  "block py-0.5 text-sm text-muted-foreground transition-colors hover:text-primary";

export function Footer() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await subscribeToNewsletter(email);
      toast.success("Welcome aboard! Check your email for confirmation.");
      setEmail("");
      setSubscribed(true);

      setTimeout(() => setSubscribed(false), 5000);
    } catch (ex: any) {
      toast.error(ex.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="border-t border-line bg-background text-muted-foreground"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-[1120px] px-5 pb-[30px] pt-[50px]">
        <div className="grid grid-cols-2 gap-7 xl:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div className="col-span-2 xl:col-span-1">
            <Link
              href="/"
              className="text-[1.15rem] font-bold tracking-[-0.02em] text-foreground"
            >
              Cyber<span className="text-primary">Wiz</span>Dev
            </Link>
            <p className="my-3 max-w-md text-sm leading-6">
              Transforming businesses through innovative software solutions. We
              craft digital experiences that drive growth and success.
            </p>

            <div className="mt-5 space-y-2">
              {contactInfo.map((contact) => (
                <Link
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-primary"
                  target={contact.href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    contact.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <contact.icon
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{contact.value}</span>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-2.5 text-[0.95rem] font-semibold text-foreground">
              Solutions
            </h4>
            <nav aria-label="Solutions">
              {navigation.solutions.map((item) => (
                <Link key={item.name} href={item.href} className={linkClass}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company + Resources */}
          <div>
            <h4 className="mb-2.5 text-[0.95rem] font-semibold text-foreground">
              Company
            </h4>
            <nav aria-label="Company">
              {navigation.company.map((item) => (
                <Link key={item.name} href={item.href} className={linkClass}>
                  {item.name}
                </Link>
              ))}
            </nav>

            <h4 className="mb-2.5 mt-6 text-[0.95rem] font-semibold text-foreground">
              Resources
            </h4>
            <nav aria-label="Resources">
              {navigation.resources.map((item) => (
                <Link key={item.name} href={item.href} className={linkClass}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal + Newsletter */}
          <div>
            <h4 className="mb-2.5 text-[0.95rem] font-semibold text-foreground">
              Legal
            </h4>
            <nav aria-label="Legal">
              {navigation.legal.map((item) => (
                <Link key={item.name} href={item.href} className={linkClass}>
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <h4 className="mb-1 text-[0.95rem] font-semibold text-foreground">
                Stay Updated
              </h4>
              <p className="mb-3 text-xs leading-5">
                Get insights, tips, and updates delivered to your inbox.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3">
                  <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-primary">
                    Successfully subscribed!
                  </span>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <Input
                      type="email"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      disabled={loading}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="w-full"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        <span>Subscribing...</span>
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-[34px] flex flex-wrap justify-between gap-2 border-t border-line pt-5 text-[0.82rem]">
          <span>
            © {new Date().getFullYear()} Cyberwizdev Software Solutions. All
            rights reserved.
          </span>
          <span className="flex items-center gap-3">
            <span>Made with ❤️ by cyberwizdev</span>
            <Link href="/sitemap" className="transition-colors hover:text-primary">
              Sitemap
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

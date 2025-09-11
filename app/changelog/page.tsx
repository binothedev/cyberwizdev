import Link from "@/components/link";
import Image from "next/image";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, ArrowRight, ArrowUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog | CyberWizDev",
  description:
    "Stay updated with the latest changes, features, and improvements to Cyberwizdev Software Solutions. View our version history and updates.",
  keywords: [
    "changelog",
    "version history",
    "software updates",
    "web development updates",
    "release notes",
    "cyberwizdev changelog",
  ],
};

const changelogEntries = [
  {
    version: "2.1.0",
    date: "2025-08-15",
    summary: "Enhanced user experience and new integrations.",
    changes: [
      {
        type: "Feature",
        description:
          "Added support for real-time collaboration in web applications.",
      },
      {
        type: "Improvement",
        description: "Optimized performance of cloud solutions by 20%.",
      },
      {
        type: "Bug Fix",
        description: "Fixed newsletter subscription form validation errors.",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2025-06-10",
    summary: "Major UI overhaul and new mobile app features.",
    changes: [
      {
        type: "Feature",
        description: "Introduced dark mode across all platforms.",
      },
      {
        type: "Feature",
        description: "Launched mobile app push notifications.",
      },
      {
        type: "Improvement",
        description: "Revamped footer with interactive social links.",
      },
      {
        type: "Bug Fix",
        description: "Resolved issues with contact form submissions.",
      },
    ],
  },
  {
    version: "1.5.2",
    date: "2025-03-20",
    summary: "Minor updates and bug fixes.",
    changes: [
      {
        type: "Improvement",
        description: "Improved accessibility for navigation links.",
      },
      {
        type: "Bug Fix",
        description: "Fixed broken links in the footer social media section.",
      },
    ],
  },
  {
    version: "1.5.1",
    date: "2025-01-15",
    summary: "Initial release of the new website.",
    changes: [
      {
        type: "Feature",
        description:
          "Launched new website with modern UI and responsive design.",
      },
      {
        type: "Feature",
        description: "Added newsletter subscription functionality.",
      },
      {
        type: "Improvement",
        description: "Integrated Tailwind CSS for consistent styling.",
      },
    ],
  },
];

export default function Changelog() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: "Changelog | CyberWizDev",
    description:
      "Stay updated with the latest changes, features, and improvements to Cyberwizdev Software Solutions.",
    url: "https://cyberwizdev.com.ng/changelog",
    author: {
      "@type": "Organization",
      name: "CyberWizDev",
    },
    datePublished: "2025-01-15",
    dateModified: "2025-08-15",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
            alt="Code editor showing changelog updates"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/85 to-slate-900/95"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Code2 className="h-5 w-5 text-[#3498db] mr-2" />
              <span className="text-white/90 font-medium">Changelog</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Version
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3498db] to-cyan-400">
                History
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mb-12 leading-relaxed">
              Stay informed about the latest updates, new features, and
              improvements to Cyberwizdev Software Solutions. Built for
              developers, by developers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button
                className="group bg-gradient-to-r from-[#3498db] to-cyan-400 hover:shadow-xl hover:shadow-[#3498db]/25 transition-all duration-300 px-8 py-4 text-lg"
                asChild
              >
                <Link href="#changelog">
                  Explore Updates
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
                asChild
              >
                <Link href="/docs">View Technical Docs</Link>
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 right-10 w-20 h-20 bg-[#3498db]/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Changelog Timeline */}
      <section id="changelog" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3498db]/10 text-[#3498db] font-medium text-sm mb-4">
              Version Updates
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              What's New
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Track the evolution of our platform with detailed release notes
              and version history.
            </p>
          </div>

          <div className="space-y-12">
            {changelogEntries.map((entry) => (
              <Card
                key={entry.version}
                className="group border-0 shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-r from-[#3498db] to-cyan-400 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold">
                          Version {entry.version}
                        </h3>
                        <span className="text-sm text-white/80">
                          {entry.date}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-white/90">{entry.summary}</p>
                  </div>

                  {/* Changes */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {entry.changes.map((change, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3498db]/10 text-[#3498db]">
                            {change.type}
                          </span>
                          <span className="text-sm text-slate-600">
                            {change.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want to Stay Updated?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter for the latest updates, or explore our
            technical documentation for more details.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#3498db] to-cyan-400 hover:shadow-xl hover:shadow-[#3498db]/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/contact">Subscribe to Updates</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
              asChild
            >
              <Link href="/docs" className="flex items-center">
                <Code2 className="mr-2 h-5 w-5" />
                View Technical Docs
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3498db]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}

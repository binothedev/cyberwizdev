import { Metadata } from "next";
import { HeroSection } from "@/components/hero";
import { TechnologyStack } from "@/components/stack";
import { ServicesSection } from "@/components/services";
import CaseStudiesSection from "@/components/case-studies";
import { ProcessSection } from "@/components/process";
import { TestimonialSection } from "@/components/testimonial";
import { CTASection } from "@/components/cta";
import { Project } from "@/lib/db/models/Project";
import {
  landingProjects,
  projectRowToCaseStudy,
  seedToCaseStudy,
} from "@/lib/landing-projects";

/**
 * Case studies are read from the database on every request (the relay fetch is
 * uncached), so admin edits and seeds show up immediately.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CyberWizDev — Systems built to outlast the roadmap",
  description:
    "We design and engineer custom software — from web platforms to enterprise systems — built to hold up as your business scales.",
  keywords: [
    "custom software development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "digital transformation",
    "enterprise software",
    "startup solutions",
    "tech consulting",
  ],
};

const technologies = [
  { name: "React" },
  { name: "Next.js" },
  { name: "Node.js" },
  { name: "Python" },
  { name: "AWS" },
  { name: "Docker" },
  { name: "MongoDB" },
  { name: "TypeScript" },
];

/**
 * Case studies are stored as `Project` rows (seeded from the admin dashboard).
 * Falls back to the seed object only when the DB relay is unreachable, so an
 * outage never blanks the #work section.
 */
async function getCaseStudies() {
  try {
    const projects = await Project.findActive();
    return projects.map(projectRowToCaseStudy);
  } catch (error) {
    console.error(
      "[landing] Could not load case studies from the database:",
      error instanceof Error ? error.message : error
    );
    return landingProjects.map(seedToCaseStudy);
  }
}

export default async function Home() {
  const caseStudies = await getCaseStudies();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CyberWizDev",
    url: "https://cyberwizdev.com.ng",
    logo: "https://cyberwizdev.com.ng/logo.png",
    description:
      "Leading software development company specializing in web development, mobile apps, cloud solutions, and digital transformation.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-703-312-8149",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.facebook.com/cyberwizdev",
      "https://www.twitter.com/cyberwizdev",
      "https://www.linkedin.com/company/cyberwizdev",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
    },
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />

      <TechnologyStack technologies={technologies} />

      <ServicesSection />

      <CaseStudiesSection caseStudies={caseStudies} />

      <ProcessSection />

      <TestimonialSection />

      <CTASection />
    </div>
  );
}

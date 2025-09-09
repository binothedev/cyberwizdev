import { Metadata } from 'next'
import AboutPageClient from './_client'

export const metadata: Metadata = {
  title: "About Us | CyberWizDev",
  description:
    "Learn about CyberWizDev, a leading provider of custom software development, web design, and mobile app solutions. Our mission is to help businesses transform their digital presence.",
  keywords: [
    "about us",
    "custom software development",
    "web design",
    "mobile app development",
    "software solutions",
  ],
};

export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CyberWizDev",
    url: "https://cyberwizdev.com.ng/about",
    logo: "https://cyberwizdev.com.ng/logo.png",
    description:
      "CyberWizDev is a leading provider of custom software development, web design, and mobile app solutions. Our mission is to help businesses transform their digital presence.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-81-2345-6789",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.facebook.com/cyberwizdev",
      "https://www.twitter.com/cyberwizdev",
      "https://www.linkedin.com/company/cyberwizdev",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageClient />
    </>
  );
}
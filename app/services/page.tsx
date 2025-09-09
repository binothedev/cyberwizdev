import { Metadata } from 'next'
import ServicesPageClient from './_client'

export const metadata: Metadata = {
  title: "Custom Software Development Services | CyberWizDev",
  description:
    "CyberWizDev offers a wide range of custom software development services, including web development, mobile app development, cloud solutions, and digital strategy consulting.",
  keywords: [
    "custom software development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "digital strategy",
  ],
};

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Create stunning, responsive websites and web applications that drive results.',
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps',
      'API Development',
      'Performance Optimization',
      'SEO Integration',
    ],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    alt: 'A computer screen with code on it, representing web development services',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Build native and cross-platform mobile applications for iOS and Android.',
    features: [
      'iOS Development',
      'Android Development',
      'Cross-platform Solutions',
      'App Store Optimization',
      'Mobile UI/UX Design',
      'App Maintenance',
    ],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80',
    alt: 'A smartphone displaying a mobile application, representing mobile app development services',
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scale your business with modern cloud infrastructure and DevOps practices.',
    features: [
      'Cloud Migration',
      'AWS/Azure/GCP',
      'Serverless Architecture',
      'Container Orchestration',
      'CI/CD Implementation',
      'Infrastructure as Code',
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    alt: 'A network of servers in a data center, representing cloud solutions',
  },
  {
    id: 'consulting',
    title: 'Digital Strategy',
    description: 'Transform your business with comprehensive digital transformation strategies.',
    features: [
      'Technology Assessment',
      'Digital Transformation',
      'Process Optimization',
      'Security Audits',
      'Performance Analysis',
      'Technology Roadmap',
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
    alt: 'A group of people discussing a business strategy, representing digital strategy consulting',
  },
]

export default function Services() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Software Development Services | CyberWizDev",
    description:
      "CyberWizDev offers a wide range of custom software development services, including web development, mobile app development, cloud solutions, and digital strategy consulting.",
    url: "https://cyberwizdev.com.ng/services",
    provider: {
      "@type": "Organization",
      name: "CyberWizDev",
      url: "https://cyberwizdev.com.ng",
      logo: "https://cyberwizdev.com.ng/logo.png",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `https://cyberwizdev.com.ng/services#${service.id}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageClient services={services} />
    </>
  );
}
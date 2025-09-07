import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Target, Lightbulb, Shield } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

const values = [
  {
    title: 'Client-Focused',
    description: 'We put our clients first, ensuring their success through dedicated support and tailored solutions.',
    icon: Users,
  },
  {
    title: 'Innovation',
    description: 'We stay ahead of technology trends to deliver cutting-edge solutions that drive growth.',
    icon: Lightbulb,
  },
  {
    title: 'Excellence',
    description: 'We maintain the highest standards of quality in every project we undertake.',
    icon: Target,
  },
  {
    title: 'Security',
    description: 'We prioritize data security and privacy in all our solutions and operations.',
    icon: Shield,
  },
]

const team = [
  {
    name: 'Hallel Ojowuro',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    alt: 'A portrait of Hallel Ojowuro, CEO and Founder of CyberWizDev',
    bio: 'With over 5 years of experience in software development and technology leadership.',
  },
  {
    name: 'Maria Garcia',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    alt: 'A portrait of Maria Garcia, CTO of CyberWizDev',
    bio: 'Expert in cloud architecture and emerging technologies with a passion for innovation.',
  },
  {
    name: 'David Chen',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80',
    alt: 'A portrait of David Chen, Lead Developer at CyberWizDev',
    bio: 'Full-stack developer specializing in scalable web applications and mobile development.',
  },
]

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
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
            alt="A diverse team of professionals collaborating in a modern office"
            width={300}
            height={300}
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-white mb-6">About CyberWizDev</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a team of passionate developers, designers, and strategists
            dedicated to transforming businesses through innovative software
            solutions.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Our Journey</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, CyberWizDev has grown from a small team of
                developers into a full-service software solutions company. Our
                commitment to excellence and innovation has helped us build
                lasting partnerships with clients across various industries.
              </p>
              <p className="text-gray-600">
                Today, we continue to push the boundaries of what's
                possible in software development, helping businesses transform
                their digital presence and achieve their goals.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
                alt="A timeline graphic showing the growth of CyberWizDev over the years"
                width={300}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and help us deliver
              exceptional results for our clients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <value.icon className="h-12 w-12 text-[#3498db] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the talented individuals who make our success possible.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="border-none shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-[#3498db] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Let's discuss how we can help you achieve your business goals with a
            custom web application.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Code2,
  Smartphone,
  Cloud,
  LineChart,
  ArrowRight,
  Star,
  Users,
  Target,
  Lightbulb,
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Custom Software Development | CyberWizDev",
  description:
    "CyberWizDev is a leading provider of custom software development, web design, and mobile app solutions. We help businesses transform their digital presence and achieve their goals.",
  keywords: [
    "custom software development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "digital strategy",
    "software development company",
  ],
};

const services = [
  {
    name: 'Web Development',
    description: 'Create stunning, responsive websites that drive results.',
    icon: Code2,
  },
  {
    name: 'Mobile Apps',
    description: 'Build native mobile applications for iOS and Android.',
    icon: Smartphone,
  },
  {
    name: 'Cloud Solutions',
    description: 'Scale your business with modern cloud infrastructure.',
    icon: Cloud,
  },
  {
    name: 'Digital Strategy',
    description: 'Develop comprehensive digital transformation strategies.',
    icon: LineChart,
  },
]

const testimonials = [
  {
    content:
      "Working with CyberWizDev was a game-changer for our business. Their expertise and dedication to quality are unmatched.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    stars: 5,
  },
  {
    content:
      "The team's technical knowledge and attention to detail helped us launch our product ahead of schedule.",
    author: "Michael Chen",
    role: "CTO, InnovateCo",
    stars: 5,
  },
  {
    content:
      "Exceptional service and outstanding results. They truly understand modern software development.",
    author: "Emily Rodriguez",
    role: "Product Manager, FutureScale",
    stars: 5,
  },
]

const whyChooseUs = [
  {
    title: "Experienced Team",
    description:
      "Our team of experienced developers, designers, and strategists are dedicated to delivering high-quality solutions.",
    icon: Users,
  },
  {
    title: "Commitment to Quality",
    description:
      "We are committed to delivering high-quality software solutions that meet the highest standards of excellence.",
    icon: Target,
  },
  {
    title: "Customer-Centric Approach",
    description:
      "We work closely with our clients to understand their needs and deliver solutions that exceed their expectations.",
    icon: Lightbulb,
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CyberWizDev",
    url: "https://cyberwizdev.com.ng",
    logo: "https://cyberwizdev.com.ng/logo.png",
    description:
      "CyberWizDev is a leading provider of custom software development, web design, and mobile app solutions. We help businesses transform their digital presence and achieve their goals.",
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
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Build the Future of Your Business with Custom Software Solutions
          </h1>
          <p className="text-xl text-gray-200 mb-8 animate-fade-in-up">
            We are a team of passionate developers and designers who help
            businesses like yours achieve their goals through innovative and
            user-centric software solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <Link href="/portfolio" className="text-white">
                View Our Work
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive software solutions to help your business
              thrive in the digital age
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card
                key={service.name}
                className="border-none shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="pt-6">
                  <service.icon className="h-12 w-12 text-[#3498db] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are more than just a software development company. We are your
              partners in innovation and growth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <Card key={item.title} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <item.icon className="h-12 w-12 text-[#3498db] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from some of our
              satisfied clients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#3498db]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Digital Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s work together to bring your vision to life
          </p>
          <Button size="lg" variant="secondary" className="group" asChild>
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

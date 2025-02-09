import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Code2,
  Smartphone,
  Cloud,
  LineChart,
  Palette,
  Shield,
  Headphones,
  ArrowRight,
} from 'lucide-react'

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Create stunning, responsive websites and web applications that drive results.',
    icon: Code2,
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps',
      'API Development',
      'Performance Optimization',
      'SEO Integration',
    ],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Build native and cross-platform mobile applications for iOS and Android.',
    icon: Smartphone,
    features: [
      'iOS Development',
      'Android Development',
      'Cross-platform Solutions',
      'App Store Optimization',
      'Mobile UI/UX Design',
      'App Maintenance',
    ],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80',
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scale your business with modern cloud infrastructure and DevOps practices.',
    icon: Cloud,
    features: [
      'Cloud Migration',
      'AWS/Azure/GCP',
      'Serverless Architecture',
      'Container Orchestration',
      'CI/CD Implementation',
      'Infrastructure as Code',
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
  },
  {
    id: 'consulting',
    title: 'Digital Strategy',
    description: 'Transform your business with comprehensive digital transformation strategies.',
    icon: LineChart,
    features: [
      'Technology Assessment',
      'Digital Transformation',
      'Process Optimization',
      'Security Audits',
      'Performance Analysis',
      'Technology Roadmap',
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
  },
]

const additionalServices = [
  {
    title: 'UI/UX Design',
    description: 'Create intuitive and engaging user experiences.',
    icon: Palette,
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your digital assets with robust security solutions.',
    icon: Shield,
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock technical support and maintenance.',
    icon: Headphones,
  },
]

export default function Services() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Services background"
            width={300}
            height={300}
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive software solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <service.icon className="h-12 w-12 text-[#3498db]" />
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-8">{service.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-[#3498db]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
                <div className="relative h-[400px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={300}
                    height={300}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Additional Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complementary services to enhance your digital solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service) => (
              <Card key={service.title} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <service.icon className="h-12 w-12 text-[#3498db] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our services can help you achieve your goals
          </p>
          <Button size="lg" variant="secondary" className="group" asChild>
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Smartphone, Cloud, LineChart, ArrowRight } from 'lucide-react'

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
    content: "Working with Cyberwizdev was a game-changer for our business. Their expertise and dedication to quality are unmatched.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc."
  },
  {
    content: "The team's technical knowledge and attention to detail helped us launch our product ahead of schedule.",
    author: "Michael Chen",
    role: "CTO, InnovateCo"
  },
  {
    content: "Exceptional service and outstanding results. They truly understand modern software development.",
    author: "Emily Rodriguez",
    role: "Product Manager, FutureScale"
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Digital Presence
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            We build cutting-edge software solutions that drive innovation and growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <Link href="/portfolio" className='text-white'>View Our Work</Link>
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
              We offer comprehensive software solutions to help your business thrive in the digital age
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.name} className="border-none shadow-lg">
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

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from some of our satisfied clients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border-none">
                <CardContent className="pt-6">
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
  )
}
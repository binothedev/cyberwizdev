import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | CyberWizDev',
  description:
    'Get in touch with CyberWizDev for a free consultation on your next web development project. We offer custom software solutions, web design, and mobile app development.',
  keywords:
    [
      'contact us',
      'free consultation',
      'custom software development',
      'web design',
      'mobile app development',
    ],
};

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '123 Innovation Street, Tech City, TC 12345',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+234 703 312-8149',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'contact@cyberwizdev.com.ng',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon - Fri: 9:00 AM - 6:00 PM',
  },
];

export default function Contact() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us | CyberWizDev',
    description:
      'Get in touch with CyberWizDev for a free consultation on your next web development project. We offer custom software solutions, web design, and mobile app development.',
    url: 'https://cyberwizdev.com.ng/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'CyberWizDev',
      url: 'https://cyberwizdev.com.ng',
      logo: 'https://cyberwizdev.com.ng/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+234-703-312-8149',
        contactType: 'Customer Service',
      },
    },
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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="An office building with a modern design, representing CyberWizDev\&#39;s headquarters"
            width={300}
            height={300}
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with us to discuss your project or ask any questions.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item) => (
              <Card key={item.title} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <item.icon className="h-12 w-12 text-[#3498db] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6">Send Us a Message</h2>
              {/* Contact Form */}
              <ContactForm />
            </div>

            {/* Map */}
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.870125914548!2d3.322193714506417!3d6.662270995046824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9173e61df681%3A0x8a503f3a85dda06e!2sAgege%2C%20Lagos%20102212%2C%20Lagos!5e0!3m2!1sen!2sng!4v1675957082177!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, ArrowRight, Send } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
import Link from '@/components/link';

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
    content: '0, Alaba Layout, FUTA, Akure 201101',
    description: 'Drop by our modern office space'
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+234 703 312-8149',
    description: 'Mon - Fri, 9:00 AM - 6:00 PM'
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'contact@cyberwizdev.com.ng',
    description: 'We respond within 24 hours'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon - Fri: 9:00 AM - 6:00 PM',
    description: 'Weekend emergency support available'
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
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="Modern office building representing CyberWizDev's headquarters"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-surface/70 backdrop-blur-sm border border-border mb-6">
              <Send className="h-4 w-4 text-primary mr-2" />
              <span className="text-foreground text-sm font-medium">Let's Start a Conversation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Get In
              <span className="block text-gradient">
                Touch
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Ready to transform your ideas into digital reality? Let's discuss your project 
              and explore how we can bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#form" className="group inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-glow">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link href="/portfolio" className="inline-flex items-center px-8 py-4 bg-surface/70 backdrop-blur-sm text-foreground rounded-full font-semibold border border-border hover:bg-surface transition-all duration-300">
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

      {/* Contact Information Cards */}
      <section className="relative -mt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card key={item.title} className="group relative overflow-hidden border-0 shadow-xl bg-surface/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-medium mb-2">
                    {item.content}
                  </p>
                  
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-background to-surface"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, var(--a) 2px, transparent 0), radial-gradient(circle at 75px 75px, var(--a) 2px, transparent 0)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6" id="form">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  Send Message
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Let's Discuss Your Project
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Share your ideas with us and let's create something amazing together. 
                  We're here to help bring your vision to life.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-surface to-muted rounded-3xl shadow-2xl"></div>
                <div className="relative p-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Enhanced Map Section */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  Our Location
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Visit Our Office
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Located in the heart of the tech district, our modern workspace 
                  is designed for collaboration and innovation.
                </p>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.870125914548!2d3.322193714506417!3d6.662270995046824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9173e61df681%3A0x8a503f3a85dda06e!2sAgege%2C%20Lagos%20102212%2C%20Lagos!5e0!3m2!1sen!2sng!4v1675957082177!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(20%) contrast(120%)' }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                  
                  {/* Map Overlay */}
                  <div className="absolute top-6 left-6 bg-surface/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-semibold text-foreground">CyberWizDev HQ</p>
                        <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-surface"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who've transformed their businesses with our expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-xl hover:shadow-glow transition-all duration-300 hover:scale-105">
              Start Your Project Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="inline-flex items-center px-8 py-4 bg-surface/70 backdrop-blur-sm text-foreground rounded-full font-semibold border border-border hover:bg-accent transition-all duration-300">
              Download Portfolio
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}
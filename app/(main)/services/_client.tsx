'use client';

import Image from 'next/image'
import Link from '@/components/link'
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
  CheckCircle,
  Star,
  Zap,
  Users,
  Award,
  Clock,
} from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

const serviceIcons = {
  'web-development': Code2,
  'mobile-apps': Smartphone,
  'cloud-solutions': Cloud,
  'consulting': LineChart,
};

const serviceColors = {
  'web-development': 'from-blue-500 to-cyan-500',
  'mobile-apps': 'from-green-500 to-teal-500',
  'cloud-solutions': 'from-purple-500 to-pink-500',
  'consulting': 'from-orange-500 to-red-500',
};

const additionalServices = [
  {
    title: 'UI/UX Design',
    description: 'Create intuitive and engaging user experiences that delight your users.',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your digital assets with enterprise-grade security solutions.',
    icon: Shield,
    color: 'from-emerald-500 to-green-500',
    features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Monitoring'],
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock technical support and proactive maintenance.',
    icon: Headphones,
    color: 'from-violet-500 to-purple-500',
    features: ['Live Chat', 'Phone Support', 'Monitoring', 'Maintenance'],
  },
]

const stats = [
  { number: '200+', label: 'Projects Delivered', icon: Award },
  { number: '98%', label: 'Client Satisfaction', icon: Star },
  { number: '24/7', label: 'Support Available', icon: Clock },
  { number: '10+', label: 'Happy Clients', icon: Users },
]

const processSteps = [
  { step: '01', title: 'Discovery', description: 'Understanding your needs and requirements' },
  { step: '02', title: 'Planning', description: 'Creating a detailed roadmap and timeline' },
  { step: '03', title: 'Development', description: 'Building your solution with precision' },
  { step: '04', title: 'Testing', description: 'Rigorous testing for quality assurance' },
  { step: '05', title: 'Deployment', description: 'Launching your solution successfully' },
  { step: '06', title: 'Support', description: 'Ongoing maintenance and optimization' },
]

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
}

interface ServicesPageClientProps {
  services: Service[];
}

export default function ServicesPageClient({ services }: ServicesPageClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [inViewSections, setInViewSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate services
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);

    // Intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-observe]');
    sections.forEach(section => {
      if (observerRef.current) observerRef.current.observe(section);
    });

    return () => {
      clearInterval(interval);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [services.length]);

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="A network of servers in a data center, representing our comprehensive software solutions"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse" />
          <div className="absolute bottom-32 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-bounce" />
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-cyan-500/20 rounded-full animate-ping" />
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-pink-500/20 rounded-full animate-pulse" />
        </div>

        <div className={`relative z-30 max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
            Comprehensive Software Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12">
            Transform your business with cutting-edge software solutions tailored to your unique needs and goals.
          </p>
          
          {/* Service Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons];
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeService === index
                      ? 'bg-white text-gray-900 shadow-lg scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{service.title}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Link href="#services" className="flex items-center">
                Explore Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 hover:text-white text-black hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-20 z-40" data-observe id="stats">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className={`transition-all duration-700 delay-${index * 200} ${
                    inViewSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24" data-observe id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-600">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver comprehensive solutions that drive digital transformation and business growth.
            </p>
          </div>

          <div className="space-y-32">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons];
              const colorClass = serviceColors[service.id as keyof typeof serviceColors];
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.id}
                  id={service.id}
                  data-observe
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={`${!isEven ? 'lg:col-start-2' : ''} transition-all duration-1000 ${
                    inViewSections.has(service.id) ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? '-translate-x-10' : 'translate-x-10'}`
                  }`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClass}`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                        <div className={`w-16 h-1 bg-gradient-to-r ${colorClass} rounded-full mt-2`} />
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div 
                          key={feature} 
                          className={`flex items-center gap-3 transition-all duration-500 delay-${featureIndex * 100} ${
                            inViewSections.has(service.id) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
                          }`}
                        >
                          <div className={`p-1 rounded-full bg-gradient-to-r ${colorClass}`}>
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className={`bg-gradient-to-r ${colorClass} text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl`} asChild>
                        <Link href="/contact">Get Started</Link>
                      </Button>
                      <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50" asChild>
                        <Link href="/portfolio">View Examples</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''} transition-all duration-1000 delay-300 ${
                    inViewSections.has(service.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}>
                    <div className="relative group">
                      <div className={`absolute -inset-4 bg-gradient-to-r ${colorClass} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl`} />
                      <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={service.image}
                          alt={service.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50" data-observe id="process">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card 
                key={step.step}
                className={`group border-none shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden delay-${index * 100} ${
                  inViewSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <CardContent className="p-6 relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-white" data-observe id="additional">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions to enhance your digital ecosystem and ensure long-term success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card 
                key={service.title} 
                className={`group border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden delay-${index * 200} ${
                  inViewSections.has('additional') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <CardContent className="p-8 relative">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${service.color}`} />
                  
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-full bg-gradient-to-br ${service.color} transform group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed mb-6">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 justify-center">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <div className={`inline-block w-12 h-1 bg-gradient-to-r ${service.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-200 mb-12 leading-relaxed">
              Let's collaborate to bring your vision to life with cutting-edge technology solutions 
              that drive growth, innovation, and lasting success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 hover:text-white text-black hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div className="text-white/80">
                <div className="text-2xl font-bold mb-2">Free Consultation</div>
                <div className="text-sm">Discuss your project needs</div>
              </div>
              <div className="text-white/80">
                <div className="text-2xl font-bold mb-2">Custom Solutions</div>
                <div className="text-sm">Tailored to your business</div>
              </div>
              <div className="text-white/80">
                <div className="text-2xl font-bold mb-2">Ongoing Support</div>
                <div className="text-sm">24/7 technical assistance</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  stars: number;
  image: string;
  results: string;
}

interface TestimonialSectionProps {
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const testimonials: Testimonial[] = [
  {
    content:
      "CyberWizDev transformed our entire digital infrastructure. The team's expertise in modern technologies helped us increase our revenue by 300% within 6 months.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    company: "Fortune 500 Company",
    stars: 5,
    image: "/api/placeholder/64/64",
    results: "300% Revenue Growth",
  },
  {
    content:
      "Outstanding technical execution and project management. They delivered our complex fintech platform 2 weeks ahead of schedule with zero bugs.",
    author: "Michael Chen",
    role: "CTO, InnovateCo",
    company: "Fintech Startup",
    stars: 5,
    image: "/api/placeholder/64/64",
    results: "Zero-bug Launch",
  },
  {
    content:
      "The AI-powered solution they built for us automated 80% of our manual processes. Best investment we've made in years.",
    author: "Emily Rodriguez",
    role: "Product Manager, FutureScale",
    company: "AI Solutions Provider",
    stars: 5,
    image: "/api/placeholder/64/64",
    results: "80% Automation",
  },
];

export function TestimonialSection({
  autoPlay = true, 
  interval = 5000,
  className = ""
}: TestimonialSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    const intervalId = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [autoPlay, interval]);

  const handleDotClick = (index: number) => {
    setCurrentTestimonial(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDotClick(index);
    }
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTest = testimonials[currentTestimonial];

  return (
    <section className={`py-24 bg-gray-900 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white border-white/20">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders
            say about partnering with CyberWizDev.
          </p>
        </div>

        <div className="relative">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500">
            <CardContent className="pt-8">
              {/* Stars Rating */}
              <div className="flex items-center justify-center mb-6">
                {[...Array(currentTest.stars)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-6 w-6 text-yellow-400 fill-current animate-pulse" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-medium text-center mb-8 leading-relaxed">
                <span className="text-4xl text-blue-400 opacity-50 leading-none">"</span>
                {currentTest.content}
                <span className="text-4xl text-blue-400 opacity-50 leading-none">"</span>
              </blockquote>
              
              {/* Author Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {currentTest.author.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                
                <div className="text-left">
                  <p className="font-semibold text-lg">{currentTest.author}</p>
                  <p className="text-gray-300">{currentTest.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs border-white/30 text-white hover:bg-white/10 transition-colors duration-300">
                      {currentTest.company}
                    </Badge>
                    <Badge className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                      {currentTest.results}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                role="tab"
                tabIndex={0}
                aria-selected={index === currentTestimonial}
                aria-label={`View testimonial ${index + 1} from ${testimonials[index].author}`}
                onClick={() => handleDotClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === currentTestimonial 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          {autoPlay && (
            <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentTestimonial + 1) / testimonials.length) * 100}%`
                }}
              />
            </div>
          )}

          {/* Testimonial Counter */}
          <div className="text-center mt-6">
            <span className="text-white/60 text-sm">
              {currentTestimonial + 1} of {testimonials.length}
            </span>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-300 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">110+</div>
            <div className="text-gray-300 text-sm">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-300 text-sm">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
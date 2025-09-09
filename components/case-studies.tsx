"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Timer, ExternalLink } from "lucide-react";

interface CaseStudy {
  title: string;
  description: string;
  results: string;
  image?: string;
  category: string;
  duration: string;
  href?: string;
  icon?: string;
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function CaseStudiesSection({
  caseStudies,
  title = "Real Results, Real Impact",
  subtitle = "See how we've helped businesses transform their operations and achieve unprecedented growth through innovative software solutions.",
  badge = "Success Stories",
  className = ""
}: CaseStudiesSectionProps) {
  return (
    <section id="case-studies" className={`py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800">
            {badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`grid gap-8 ${caseStudies.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {caseStudies.map((study, index) => (
            <Card
              key={`${study.title}-${index}`}
              className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                {study.image ? (
                  <div className="w-full h-48 bg-gray-100">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-500">
                    <div className="text-6xl opacity-20">
                      {study.icon || "📊"}
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-800 shadow-sm">
                    {study.category}
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
                  <Timer className="w-4 h-4 text-gray-600" />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <CardContent className="pt-6">
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {study.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {study.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {study.results}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      {study.duration}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group/btn hover:bg-blue-50"
                    asChild={!!study.href}
                  >
                    {study.href ? (
                      <a href={study.href} target="_blank" rel="noopener noreferrer">
                        View Case Study
                        <ExternalLink className="ml-1 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </a>
                    ) : (
                      <>
                        View Case Study
                        <ExternalLink className="ml-1 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show more button if there are many case studies */}
        {caseStudies.length > 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group" asChild>
              <a href="/portfolio">
                View All Case Studies
                <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
          </div>
        )}

        {/* Additional metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 p-8 bg-gray-50 rounded-2xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {caseStudies.length}+
            </div>
            <div className="text-gray-600 text-sm">Successful Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">$50M+</div>
            <div className="text-gray-600 text-sm">Client Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">6 Months</div>
            <div className="text-gray-600 text-sm">Average ROI Timeline</div>
          </div>
        </div>
      </div>
    </section>
  );
}
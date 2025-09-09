"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Smartphone,
  Cloud,
  LineChart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface Service {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  color: string;
  projects?: string;
  href?: string;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

const services: Service[] = [
  {
    name: "Web Development",
    description:
      "Lightning-fast, responsive websites built with cutting-edge technologies.",
    icon: Code2,
    features: ["React/Next.js", "Performance Optimized", "SEO Ready"],
    color: "from-blue-500 to-cyan-500",
    projects: "150+",
    href: "/services/web-development",
  },
  {
    name: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that users love.",
    icon: Smartphone,
    features: ["iOS & Android", "Cross-platform", "App Store Ready"],
    color: "from-purple-500 to-pink-500",
    projects: "80+",
    href: "/services/mobile-apps",
  },
  {
    name: "Cloud Solutions",
    description: "Scalable cloud infrastructure that grows with your business.",
    icon: Cloud,
    features: ["AWS/Azure", "Auto-scaling", "99.9% Uptime"],
    color: "from-green-500 to-teal-500",
    projects: "120+",
    href: "/services/cloud-solutions",
  },
  {
    name: "Digital Strategy",
    description: "Comprehensive digital transformation roadmaps for success.",
    icon: LineChart,
    features: ["Data-driven", "ROI Focused", "Growth Hacking"],
    color: "from-orange-500 to-red-500",
    projects: "90+",
    href: "/services/digital-strategy",
  },
];

export function ServicesSection({
  title = "Solutions That Drive Results",
  subtitle = "From concept to deployment, we deliver comprehensive software solutions that transform businesses and accelerate growth.",
  badge = "Our Services",
  className = "",
}: ServicesSectionProps) {
  return (
    <section
      className={`py-24 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">{badge}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div
          className={`grid gap-8 ${
            services.length <= 2
              ? "md:grid-cols-2"
              : services.length === 3
              ? "md:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {services.map((service, index) => (
            <Card
              key={`${service.name}-${index}`}
              className="group relative border-none shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-white"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>
              <CardContent className="pt-8 pb-6 relative z-10">
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.name}
                  </h3>
                  {service.projects && (
                    <Badge variant="outline" className="text-xs">
                      {service.projects}
                    </Badge>
                  )}
                </div>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={`${feature}-${featureIndex}`}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="group/btn w-full justify-between p-0 h-auto hover:bg-transparent"
                  asChild={!!service.href}
                >
                  {service.href ? (
                    <a href={service.href}>
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <>
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Need a custom solution? We're here to help you build exactly what
            you need.
          </p>
          <Button size="lg" className="group" asChild>
            <a href="/contact">
              Discuss Your Project
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

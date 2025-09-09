"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface WhyChooseUsSectionProps {
  processSteps?: ProcessStep[];
  title?: string;
  subtitle?: string;
  badge?: string;
  processTitle?: string;
  showProcess?: boolean;
  className?: string;
}

const items = [
  {
    title: "Expert Team",
    description:
      "Senior developers with 8+ years experience in cutting-edge technologies and best practices.",
    icon: Users,
    stat: "50+ Experts",
    color: "text-blue-500",
  },
  {
    title: "Proven Results",
    description:
      "500+ successful projects delivered with 98% client satisfaction and measurable business impact.",
    icon: Target,
    stat: "98% Satisfaction",
    color: "text-green-500",
  },
  {
    title: "Innovation First",
    description:
      "We leverage the latest technologies and methodologies to build future-ready solutions.",
    icon: Lightbulb,
    stat: "24/7 Support",
    color: "text-purple-500",
  },
];

const defaultProcessSteps = [
  {
    step: "01",
    title: "Discovery",
    desc: "Understanding your vision and requirements",
  },
  {
    step: "02",
    title: "Design",
    desc: "Creating user-centered designs and prototypes",
  },
  {
    step: "03",
    title: "Develop",
    desc: "Building with cutting-edge technologies",
  },
  {
    step: "04",
    title: "Deploy",
    desc: "Launching and ongoing support",
  },
];

export function WhyChooseUsSection({
  processSteps = defaultProcessSteps,
  title = "Your Success is Our Mission",
  subtitle = "Partner with a team that's committed to your growth and success. Here's what sets us apart in the software development landscape.",
  badge = "Why Choose Us",
  processTitle = "Our Proven Process",
  showProcess = true,
  className = "",
}: WhyChooseUsSectionProps) {
  return (
    <section
      className={`py-24 bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800">{badge}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {items.map((item, index) => (
            <Card
              key={`${item.title}-${index}`}
              className="group border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 backdrop-blur-sm transform hover:-translate-y-1"
            >
              <CardContent className="pt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-xl bg-gray-100 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className="font-bold group-hover:bg-blue-50 transition-colors duration-300"
                  >
                    {item.stat}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Timeline */}
        {showProcess && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-8">
              {processTitle}
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((phase, index) => (
                <div
                  key={`${phase.step}-${index}`}
                  className="text-center group relative"
                >
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-y-1/2 z-0"></div>
                  )}

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                      {phase.step}
                    </div>
                    <h4 className="font-semibold mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {phase.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Process Info */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    2-4 Weeks
                  </div>
                  <div className="text-gray-600 text-sm">
                    Average Project Start
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    Daily Updates
                  </div>
                  <div className="text-gray-600 text-sm">
                    Progress Transparency
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    24/7 Support
                  </div>
                  <div className="text-gray-600 text-sm">Post-Launch Care</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

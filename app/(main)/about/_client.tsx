"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Target,
  Lightbulb,
  Shield,
  ArrowRight,
  Award,
  TrendingUp,
  Heart,
} from "lucide-react";
import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const values = [
  {
    title: "Client-Focused",
    description:
      "We put our clients first, ensuring their success through dedicated support and tailored solutions.",
    icon: Users,
    color: "from-primary to-secondary",
  },
  {
    title: "Innovation",
    description:
      "We stay ahead of technology trends to deliver cutting-edge solutions that drive growth.",
    icon: Lightbulb,
    color: "from-primary to-secondary",
  },
  {
    title: "Excellence",
    description:
      "We maintain the highest standards of quality in every project we undertake.",
    icon: Target,
    color: "from-primary to-secondary",
  },
  {
    title: "Security",
    description:
      "We prioritize data security and privacy in all our solutions and operations.",
    icon: Shield,
    color: "from-primary to-secondary",
  },
];

const team = [
  {
    name: "Hallel Ojowuro",
    role: "CEO & Founder",
    image:
      "/ceo.png",
    alt: "A portrait of Hallel Ojowuro, CEO and Founder of CyberWizDev",
    bio: "With over 5 years of experience in software development and technology leadership.",
    expertise: [
      "Full-Stack Development",
      "System Architecture",
      "Team Leadership",
    ],
  },
];

const stats = [
  { number: "10+", label: "Projects Completed", icon: Award },
  { number: "5+", label: "Years Experience", icon: TrendingUp },
  { number: "100%", label: "Client Satisfaction", icon: Heart },
];

const milestones = [
  {
    year: "2020",
    event: "CyberWizDev Founded",
    description: "Started as a small team with big dreams",
  },
  {
    year: "2021",
    event: "First Major Project",
    description: "Delivered our first enterprise solution",
  },
  {
    year: "2022",
    event: "Team Expansion",
    description: "Grew our talented development team",
  },
  {
    year: "2023",
    event: "10+ Projects",
    description: "Reached milestone of 50 completed projects",
  },
  {
    year: "2024",
    event: "Innovation Focus",
    description: "Pioneering cutting-edge solutions",
  },
];

export default function AboutPageClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % milestones.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] bg-background flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-background/80 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
            alt="A diverse team of professionals collaborating in a modern office"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute bottom-32 right-20 w-16 h-16 bg-secondary/20 rounded-full animate-bounce" />
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-primary/20 rounded-full animate-ping" />
        </div>

        <div
          className={`relative z-30 max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block mb-6 px-4 py-2 bg-surface/70 backdrop-blur-sm rounded-full text-foreground text-sm font-medium border border-border">
            Transforming Ideas into Digital Reality
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            About CyberWizDev
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We are a team of passionate developers, designers, and strategists
            dedicated to transforming businesses through innovative software
            solutions.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            >
              Our Story <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent px-8 py-4 text-lg"
            >
              Meet Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background relative -mt-20 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-surface rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-700 delay-${
                    index * 200
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-full">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to industry leadership, discover the
              milestones that shaped our story.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center gap-6 p-6 rounded-xl transition-all duration-500 cursor-pointer ${
                    activeTimeline === index
                      ? "bg-surface shadow-lg scale-105 border-l-4 border-primary"
                      : "bg-surface/50 hover:bg-surface/80"
                  }`}
                  onClick={() => setActiveTimeline(index)}
                >
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      activeTimeline === index
                        ? "bg-gradient-to-br from-primary to-secondary scale-110 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {milestone.event}
                    </h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
                alt="A timeline graphic showing the growth of CyberWizDev over the years"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2 text-white">Building the Future</h3>
                <p className="text-white/90">One innovation at a time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These fundamental principles guide our decisions, shape our
              culture, and drive us to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-surface overflow-hidden"
              >
                <CardContent className="pt-8 pb-6 relative">
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.color}`}
                  />

                  <div className="flex justify-center mb-6">
                    <div
                      className={`p-4 rounded-full bg-gradient-to-br ${value.color} transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {value.description}
                  </p>

                  <div className="mt-6 text-center">
                    <div
                      className={`inline-block w-12 h-1 bg-gradient-to-r ${value.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Meet Our Visionary</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The talented individual driving our mission to transform
              businesses through technology.
            </p>
          </div>

          <div className="flex justify-center">
            {team.map((member) => (
              <Card
                key={member.name}
                className="max-w-md border-none shadow-2xl overflow-hidden bg-surface group hover:shadow-3xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold text-lg mb-4">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-center">
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-accent transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-surface overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Let's collaborate to bring your vision to life with cutting-edge
              technology solutions that drive growth and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="hover:bg-accent px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

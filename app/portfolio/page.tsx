import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "School Management System",
    description:
      "A modern school management system built with Vite (React) and ExpressJS (Node.js), featuring real-time app data for analytics and chart.",
    image: "/portfolio/school-management.png",
    tags: [
      "ReactJS",
      "ExpressJS",
      "Vite",
      "Socket.io",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "Docker",
    ],
    demoUrl: "https://school.cyberwizdev.com.ng/",
    githubUrl: "https://github.com/hallel20/school",
  },
  {
    title: "Healthcare Management System",
    description:
      "A comprehensive healthcare management system with appointment scheduling and patient records management.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    demoUrl: "#",
    githubUrl: "https://github.com/hallel20/health-care",
  },
  {
    title: "Real Estate Platform",
    description:
      "A feature-rich real estate platform with virtual tours and advanced property search capabilities.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    tags: ["ReactJS", "Vite", "Flask", "MariaDB", "Docker"],
    demoUrl: "#",
    githubUrl: "https://github.com/hallel20/real-estate",
  },
];

export default function Portfolio() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
            alt="Portfolio background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-white mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our latest projects and see how we've helped businesses
            transform their digital presence.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="border-none shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.demoUrl}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.githubUrl}
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        Source Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

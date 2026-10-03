import Image from "next/image";
import Link from "@/components/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star, TrendingUp, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Development Portfolio | CyberWizDev",
  description:
    "Explore the web development portfolio of CyberWizDev. We specialize in creating custom web applications, e-commerce sites, and more. Contact us for a free consultation.",
  keywords: [
    "web development portfolio",
    "web design portfolio",
    "react developer",
    "next.js developer",
    "full-stack developer",
    "custom web applications",
  ],
};

const projects = [
  {
    title: "School Management System",
    description:
      "A modern school management system built with Vite (React) and ExpressJS (Node.js), featuring real-time app data for analytics and chart.",
    image: "/portfolio/school-management.png",
    alt: "Screenshot of the dashboard of a school management system",
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
    featured: true,
    metrics: { users: "1.2K", performance: "98%", uptime: "99.9%" }
  },
  {
    title: "Healthcare Management System",
    description:
      "A comprehensive healthcare management system with appointment scheduling and patient records management.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    alt: "A doctor using a laptop to access a healthcare management system",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    demoUrl: "https://health-care.pxxl.click",
    githubUrl: "https://github.com/hallel20/health-care",
    featured: false,
    metrics: { users: "856", performance: "96%", uptime: "99.8%" }
  },
  {
    title: "Real Estate Platform",
    description:
      "A feature-rich real estate platform with virtual tours and advanced property search capabilities.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    alt: "A modern house with a swimming pool, representing a real estate platform",
    tags: ["ReactJS", "Vite", "Flask", "MariaDB", "Docker"],
    demoUrl: "https://www.havenca.xyz",
    githubUrl: "https://github.com/hallel20/real-estate",
    featured: false,
    metrics: { users: "2.4K", performance: "97%", uptime: "99.7%" }
  },
];

const stats = [
  { icon: Users, label: "Happy Clients", value: "150+" },
  { icon: Star, label: "Projects Completed", value: "200+" },
  { icon: TrendingUp, label: "Success Rate", value: "99%" },
  { icon: Zap, label: "Years Experience", value: "5+" },
];

export default function Portfolio() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Web Development Portfolio | CyberWizDev",
    description:
      "Explore the web development portfolio of CyberWizDev. We specialize in creating custom web applications, e-commerce sites, and more. Contact us for a free consultation.",
    url: "https://cyberwizdev.com.ng/portfolio",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          image: project.image,
          url: project.demoUrl,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
            alt="A desk with a laptop displaying code, representing our web development portfolio"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-surface/70 backdrop-blur-sm border border-border mb-8">
              <Star className="h-5 w-5 text-primary mr-2" />
              <span className="text-foreground font-medium">Award-Winning Development</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Our
              <span className="block text-gradient">
                Portfolio
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover our collection of cutting-edge web applications that have 
              transformed businesses and delighted users worldwide.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface/70 backdrop-blur-sm border border-border mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

      {/* Featured Project */}
      <section className="relative mt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {projects.filter(p => p.featured).map((project) => (
            <Card key={project.title} className="group relative overflow-hidden border-0 shadow-2xl bg-surface/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium">
                      <Star className="h-3 w-3 mr-1" />
                      Featured Project
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <CardContent className="sm:p-12 p-3 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary">{project.metrics.users}</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{project.metrics.performance}</div>
                      <div className="text-sm text-muted-foreground">Performance</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-secondary">{project.metrics.uptime}</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm rounded-full font-medium border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-glow transition-all duration-300" 
                      asChild
                    >
                      <Link href={project.demoUrl} className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View Live Demo
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-primary/20 hover:bg-primary/5" asChild>
                      <Link href={project.githubUrl} className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        Source Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Recent Projects
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              More Amazing Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each project represents our commitment to excellence and innovation in web development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(p => !p.featured).map((project, index) => (
              <Card
                key={project.title}
                className="group border-0 shadow-xl overflow-hidden bg-surface hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Project Number */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white font-bold">
                    {String(index + 2).padStart(2, '0')}
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Mini Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-primary">{project.metrics.users}</div>
                      <div className="text-xs text-muted-foreground">Users</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-green-600">{project.metrics.performance}</div>
                      <div className="text-xs text-muted-foreground">Speed</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-secondary">{project.metrics.uptime}</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 bg-accent text-foreground text-xs rounded-full">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1" asChild>
                      <Link href={project.demoUrl} className="flex items-center justify-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="hover:bg-accent flex-1" asChild>
                      <Link href={project.githubUrl} className="flex items-center justify-center gap-2">
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8">
            Tech Stack
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Technologies We Master
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            We use cutting-edge technologies to build scalable, performant, and beautiful applications.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'].map((tech) => (
              <div key={tech} className="group p-6 bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tech}
                </div>
              </div>
            ))}
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
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's transform your vision into a powerful web application that drives results and delights users.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:shadow-glow transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/contact">Start Your Project Today</Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="hover:bg-accent backdrop-blur-sm px-8 py-4 text-lg"
              asChild
            >
              <Link href="/about">Learn About Our Process</Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}
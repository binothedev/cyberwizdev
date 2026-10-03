import Image from "next/image";
import Link from "@/components/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  GitBranch,
  Server,
  Smartphone,
  Globe,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Terminal,
  Layers,
  Settings,
  FileText,
  Download,
  ExternalLink
} from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Guide | CyberWizDev Documentation",
  description:
    "Comprehensive technical documentation covering our development stack, best practices, deployment guides, and API references. Learn how we build scalable web applications.",
  keywords: [
    "technical documentation",
    "web development guide",
    "react documentation",
    "next.js guide",
    "deployment guide",
    "api documentation",
    "development best practices",
  ],
};

const techStack = [
  {
    category: "Frontend",
    icon: Code2,
    color: "from-primary to-secondary",
    technologies: [
      { name: "React 18", description: "Modern UI library with hooks and concurrent features" },
      { name: "Next.js 14", description: "Full-stack React framework with app directory" },
      { name: "TypeScript", description: "Type-safe JavaScript development" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Framer Motion", description: "Production-ready motion library" }
    ]
  },
  {
    category: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-400",
    technologies: [
      { name: "Node.js", description: "JavaScript runtime for server-side development" },
      { name: "Express.js", description: "Minimal and flexible web framework" },
      { name: "Prisma", description: "Type-safe database toolkit" },
      { name: "tRPC", description: "End-to-end typesafe APIs" },
      { name: "Socket.io", description: "Real-time bidirectional communication" }
    ]
  },
  {
    category: "Database",
    icon: Database,
    color: "from-purple-500 to-violet-400",
    technologies: [
      { name: "PostgreSQL", description: "Advanced open-source relational database" },
      { name: "Redis", description: "In-memory data structure store" },
      { name: "MongoDB", description: "Document-oriented NoSQL database" },
      { name: "Supabase", description: "Open source Firebase alternative" }
    ]
  },
  {
    category: "DevOps",
    icon: Cloud,
    color: "from-orange-500 to-red-400",
    technologies: [
      { name: "Docker", description: "Containerization platform" },
      { name: "AWS", description: "Cloud computing services" },
      { name: "Vercel", description: "Frontend deployment platform" },
      { name: "GitHub Actions", description: "CI/CD automation" }
    ]
  }
];

const guides = [
  {
    title: "Getting Started",
    description: "Set up your development environment and create your first project",
    icon: Zap,
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    sections: ["Environment Setup", "Project Creation", "Development Server", "First Deployment"],
    difficulty: "Beginner",
    readTime: "15 min"
  },
  {
    title: "API Integration",
    description: "Learn how to integrate with RESTful and GraphQL APIs effectively",
    icon: Globe,
    color: "bg-gradient-to-br from-primary to-secondary",
    sections: ["REST APIs", "GraphQL", "Authentication", "Error Handling"],
    difficulty: "Intermediate",
    readTime: "30 min"
  },
  {
    title: "Database Design",
    description: "Design scalable database schemas and optimize query performance",
    icon: Database,
    color: "bg-gradient-to-br from-green-500 to-teal-600",
    sections: ["Schema Design", "Relationships", "Indexing", "Optimization"],
    difficulty: "Advanced",
    readTime: "45 min"
  },
  {
    title: "Security Best Practices",
    description: "Implement robust security measures in your web applications",
    icon: Shield,
    color: "bg-gradient-to-br from-red-500 to-pink-600",
    sections: ["Authentication", "Authorization", "CORS", "Data Protection"],
    difficulty: "Advanced",
    readTime: "35 min"
  },
  {
    title: "Performance Optimization",
    description: "Optimize your applications for speed and user experience",
    icon: Zap,
    color: "bg-gradient-to-br from-primary to-secondary",
    sections: ["Code Splitting", "Lazy Loading", "Caching", "Bundle Analysis"],
    difficulty: "Intermediate",
    readTime: "40 min"
  },
  {
    title: "Deployment Guide",
    description: "Deploy your applications to production with confidence",
    icon: Cloud,
    color: "bg-gradient-to-br from-purple-500 to-indigo-600",
    sections: ["Build Process", "Environment Variables", "Domain Setup", "Monitoring"],
    difficulty: "Intermediate",
    readTime: "25 min"
  }
];

const quickLinks = [
  { name: "API Reference", icon: FileText, href: "#api-reference" },
  { name: "Component Library", icon: Layers, href: "#components" },
  { name: "CLI Tools", icon: Terminal, href: "#cli-tools" },
  { name: "Configuration", icon: Settings, href: "#configuration" },
];

export default function TechnicalGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: "Technical Guide | CyberWizDev Documentation",
    description:
      "Comprehensive technical documentation covering our development stack, best practices, deployment guides, and API references.",
    url: "https://cyberwizdev.com.ng/docs/technical-guide",
    author: {
      "@type": "Organization",
      name: "CyberWizDev"
    },
    datePublished: "2024-01-01",
    dateModified: "2024-12-01"
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
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
            alt="Code editor with multiple files open showing technical documentation"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-surface/70 backdrop-blur-sm border border-border mb-8">
              <BookOpen className="h-5 w-5 text-primary mr-2" />
              <span className="text-foreground font-medium">Technical Documentation</span>
            </div>
             
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Technical
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Guide
              </span>
            </h1>
             
            <p className="text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed">
              Everything you need to know about our development stack, best practices, 
              and deployment strategies. Built by developers, for developers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button className="group transition-all duration-300 px-8 py-4 text-lg hover:shadow-[0_14px_34px_var(--glow)]">
                Start Reading
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" className="px-8 py-4 text-lg">
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </Button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center p-4 bg-surface/70 backdrop-blur-sm border border-border rounded-xl hover:bg-accent transition-all duration-300"
                >
                  <link.icon className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

      {/* Technology Stack */}
      <section className="relative mt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Our Stack
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Technology Overview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the cutting-edge technologies we use to build scalable, performant applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((category) => (
              <Card key={category.category} className="group border-0 shadow-xl overflow-hidden bg-surface hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-r ${category.color} text-white`}>
                    <div className="flex items-center mb-4">
                      <category.icon className="h-8 w-8 mr-3" />
                      <h3 className="text-xl font-bold">{category.category}</h3>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {category.technologies.map((tech) => (
                        <div key={tech.name} className="group/tech">
                          <h4 className="font-semibold text-foreground mb-1 group-hover/tech:text-primary transition-colors">
                            {tech.name}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {tech.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Learning Paths
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Guides
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step tutorials and best practices to master modern web development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Card key={guide.title} className="group border-0 shadow-lg overflow-hidden bg-surface hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-0">
                  {/* Icon Header */}
                  <div className={`p-8 ${guide.color} text-white relative overflow-hidden`}>
                    <div className="relative z-10">
                      <guide.icon className="h-12 w-12 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{guide.title}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="px-3 py-1 bg-white/20 rounded-full">
                          {guide.difficulty}
                        </span>
                        <span>{guide.readTime}</span>
                      </div>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {guide.description}
                    </p>

                    {/* Sections */}
                    <div className="space-y-3 mb-8">
                      <h4 className="font-semibold text-foreground mb-3">What you'll learn:</h4>
                      {guide.sections.map((section) => (
                        <div key={section} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm text-muted-foreground">{section}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 group">
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                Code Examples
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Ready-to-Use Code Snippets
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Copy and paste production-ready code examples. All snippets are tested, 
                documented, and follow industry best practices.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "TypeScript configurations",
                  "React component patterns",
                  "API route handlers",
                  "Database queries",
                  "Authentication flows"
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Button className="transition-all duration-300 hover:shadow-[0_14px_34px_var(--glow)]">
                Browse Code Examples
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20"></div>
              <Card className="relative border border-border shadow-2xl bg-surface overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted px-6 py-4 flex items-center">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-muted-foreground text-sm">api/users/route.ts</span>
                  </div>
                  <div className="p-6 text-sm text-foreground font-mono leading-relaxed">
                    <div className="text-secondary">import</div>{" "}
                    <span className="text-foreground">{"{ NextRequest }"}</span>{" "}
                    <div className="text-secondary">from</div>{" "}
                    <span className="text-primary">'next/server'</span>
                    <br />
                    <br />
                    <div className="text-primary">export</div>{" "}
                    <div className="text-secondary">async function</div>{" "}
                    <span className="text-foreground">GET</span>() {"{"}
                    <br />
                    {"  "}<div className="text-secondary">const</div>{" "}
                    <span className="text-foreground">users</span> = <div className="text-secondary">await</div>{" "}
                    <span className="text-primary">db.user.findMany</span>()
                    <br />
                    {"  "}<div className="text-secondary">return</div>{" "}
                    <span className="text-primary">Response.json</span>(<span className="text-foreground">users</span>)
                    <br />
                    {"}"}
                  </div>
                </CardContent>
              </Card>
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
            Need More Help?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Our technical documentation is continuously updated. Can't find what you're looking for? 
            Reach out to our development team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="transition-all duration-300 hover:scale-105 px-8 py-4 text-lg hover:shadow-[0_14px_34px_var(--glow)]"
              asChild
            >
              <Link href="/contact">Get Technical Support</Link>
            </Button>
             
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg"
              asChild
            >
              <Link href="https://github.com/cyberwizdev" className="flex items-center">
                <GitBranch className="mr-2 h-5 w-5" />
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
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
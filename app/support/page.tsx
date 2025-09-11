import Image from "next/image";
import Link from "@/components/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  HelpCircle,
  Book,
  Video,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Search,
  Star,
  MessageSquare,
  FileText,
  Headphones,
  Rocket,
  Code2,
  CreditCard,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Support | CyberWizDev",
  description:
    "Get help and support for your web development projects. Access our knowledge base, contact support, and join our community.",
  keywords: [
    "support",
    "help",
    "customer service",
    "technical support",
    "knowledge base",
  ],
};

const supportChannels = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-400",
    availability: "Available 24/7",
    responseTime: "< 5 minutes",
    bestFor: "Quick questions and urgent issues",
  },
  {
    title: "Email Support",
    description: "Send us detailed questions and get comprehensive answers",
    icon: Mail,
    color: "from-blue-500 to-cyan-400",
    availability: "Mon - Fri, 9AM - 6PM",
    responseTime: "< 24 hours",
    bestFor: "Complex technical issues",
  },
  {
    title: "Phone Support",
    description: "Talk directly with our technical experts",
    icon: Phone,
    color: "from-purple-500 to-violet-400",
    availability: "Mon - Fri, 9AM - 6PM",
    responseTime: "Immediate",
    bestFor: "Enterprise customers",
  },
  {
    title: "Community Forum",
    description: "Connect with other developers and share knowledge",
    icon: Users,
    color: "from-orange-500 to-red-400",
    availability: "Always open",
    responseTime: "Community driven",
    bestFor: "General discussions and tips",
  },
];

const faqCategories = [
  {
    title: "Getting Started",
    icon: Rocket,
    count: 12,
    questions: [
      "How do I set up my development environment?",
      "What are the system requirements?",
      "How do I create my first project?",
      "Where can I find code examples?",
    ],
  },
  {
    title: "Technical Issues",
    icon: Code2,
    count: 24,
    questions: [
      "Why is my build failing?",
      "How do I fix deployment errors?",
      "Database connection issues",
      "Performance optimization tips",
    ],
  },
  {
    title: "Billing & Plans",
    icon: CreditCard,
    count: 8,
    questions: [
      "How does pricing work?",
      "Can I upgrade my plan?",
      "Refund and cancellation policy",
      "Custom enterprise solutions",
    ],
  },
  {
    title: "Security",
    icon: Shield,
    count: 15,
    questions: [
      "How is my data protected?",
      "Two-factor authentication setup",
      "Security best practices",
      "Vulnerability reporting",
    ],
  },
];

const supportResources = [
  {
    title: "Knowledge Base",
    description: "Comprehensive articles and tutorials",
    icon: Book,
    color: "bg-blue-100 text-blue-600",
    count: "200+ articles",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    icon: Video,
    color: "bg-purple-100 text-purple-600",
    count: "50+ videos",
  },
  {
    title: "API Reference",
    description: "Complete API documentation",
    icon: FileText,
    color: "bg-green-100 text-green-600",
    count: "Full coverage",
  },
  {
    title: "Status Page",
    description: "Real-time system status",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
    count: "Live updates",
  },
];

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80"
            alt="Customer support and help center"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/85 to-slate-900/95"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Headphones className="h-5 w-5 text-[#3498db] mr-2" />
              <span className="text-white/90 font-medium">
                24/7 Support Available
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              How Can We
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3498db] to-cyan-400">
                Help You?
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Our dedicated support team is here to help you succeed. Get
              answers, solve problems, and accelerate your development.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3498db] text-slate-800 placeholder-slate-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="relative -mt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel) => (
              <Card
                key={channel.title}
                className="group border-0 shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-0">
                  <div
                    className={`p-6 bg-gradient-to-r ${channel.color} text-white`}
                  >
                    <channel.icon className="h-12 w-12 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{channel.title}</h3>
                    <p className="text-white/90 text-sm">
                      {channel.description}
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">
                          Availability:
                        </span>
                        <span className="text-sm font-medium text-slate-800">
                          {channel.availability}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">
                          Response:
                        </span>
                        <span className="text-sm font-medium text-slate-800">
                          {channel.responseTime}
                        </span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-slate-600">
                          {channel.bestFor}
                        </p>
                      </div>
                    </div>
                    <Button className="w-full bg-[#3498db] hover:bg-[#2980b9]">
                      Get Help Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3498db]/10 text-[#3498db] font-medium text-sm mb-4">
              Frequently Asked
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Common Questions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Quick answers to the questions we hear most often.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faqCategories.map((category) => (
              <Card
                key={category.title}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <category.icon className="h-8 w-8 text-[#3498db] mr-3" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {category.title}
                      </h3>
                      <span className="text-sm text-slate-500">
                        {category.count} questions
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {category.questions.map((question) => (
                      <div
                        key={question}
                        className="text-slate-600 hover:text-[#3498db] transition-colors cursor-pointer text-sm"
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Self-Service Resources
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find answers and learn at your own pace with our comprehensive
              resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportResources.map((resource) => (
              <Card
                key={resource.title}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 ${resource.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <resource.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{resource.description}</p>
                  <div className="text-sm text-[#3498db] font-medium mb-6">
                    {resource.count}
                  </div>
                  <Button variant="outline" size="sm" className="group">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Our support team is standing by to help you resolve any issues and
            get back to building amazing applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#3498db] to-cyan-400 hover:shadow-xl hover:shadow-[#3498db]/25 transition-all duration-300 px-8 py-4 text-lg"
            >
              Contact Support Team
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

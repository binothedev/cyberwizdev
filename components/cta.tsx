"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, ExternalLink } from "lucide-react";

interface CTAButton {
  text: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "primary" | "secondary";
  external?: boolean;
}

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttons?: CTAButton[];
  features?: string[];
  backgroundGradient?: string;
  className?: string;
}

const defaultButtons = [
  {
    text: "Start Your Project",
    href: "/contact",
    icon: MessageSquare,
    variant: "primary" as const,
  },
  {
    text: "View Our Portfolio",
    href: "/portfolio",
    icon: ExternalLink,
    variant: "secondary" as const,
  },
];

const defaultFeatures = [
  "🚀 Free consultation",
  "💡 Custom proposal", 
  "⚡ Fast turnaround"
];

export function CTASection({
  title = "Ready to Transform Your Business?",
  subtitle = "Join hundreds of successful companies who've accelerated their growth with our innovative software solutions. Let's build something amazing together.",
  buttons = defaultButtons,
  features = defaultFeatures,
  backgroundGradient = "from-blue-600 via-purple-600 to-pink-600",
  className = ""
}: CTASectionProps) {
  return (
    <section className={`py-24 bg-gradient-to-r ${backgroundGradient} relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-float-delayed"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/50 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {buttons.map((button, index) => (
            <Button
              key={`${button.text}-${index}`}
              size="lg"
              className={`group px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                button.variant === 'primary'
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'border-white/30 text-white hover:bg-white/10 bg-transparent border-2'
              }`}
              asChild
            >
              {button.external ? (
                <a href={button.href} target="_blank" rel="noopener noreferrer">
                  {button.icon && <button.icon className="mr-2 h-5 w-5" />}
                  {button.text}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <Link href={button.href}>
                  {button.icon && <button.icon className="mr-2 h-5 w-5" />}
                  {button.text}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </Button>
          ))}
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="text-white/80 text-sm md:text-base">
            {features.join(" • ")}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">24h</div>
            <div className="text-white/70 text-sm">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">100%</div>
            <div className="text-white/70 text-sm">Satisfaction Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">No Risk</div>
            <div className="text-white/70 text-sm">Free Consultation</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
"use client";

import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  className?: string;
}

const NODES = [
  { id: "web", label: "WEB", x: 130, y: 130 },
  { id: "app", label: "APP", x: 670, y: 130 },
  { id: "api", label: "API", x: 130, y: 470 },
  { id: "cld", label: "CLD", x: 670, y: 470 },
] as const;

const HUB = { x: 400, y: 300 };

export function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      className={`relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-hero-ink ${className}`}
    >
      {/* Blueprint grid — structure, not noise */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.07]" />

      {/* Frame lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {/* Signature element: systems schematic — replaces the empty blur orbs */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.55] md:opacity-70">
        <svg
          viewBox="0 0 800 600"
          className="w-[140%] max-w-none md:w-full md:max-w-4xl"
          aria-hidden="true"
        >
          {NODES.map((node) => {
            const midX = (node.x + HUB.x) / 2;
            const midY = (node.y + HUB.y) / 2 - 30 * (node.y < HUB.y ? 1 : -1);
            const path = `M ${node.x} ${node.y} Q ${midX} ${midY} ${HUB.x} ${HUB.y}`;
            return (
              <g key={node.id}>
                {/* connector beam */}
                <path
                  d={path}
                  fill="none"
                  stroke="#5EEAD4"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                />
                <path
                  d={path}
                  fill="none"
                  stroke="#FFB454"
                  strokeWidth="1.5"
                  strokeDasharray="4 10"
                  className="schematic-flow"
                />
                {/* traveling packet */}
                <circle r="3.5" fill="#FFB454">
                  <animateMotion
                    dur={`${3 + NODES.indexOf(node) * 0.6}s`}
                    repeatCount="indefinite"
                    path={path}
                  />
                </circle>
                {/* node */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="30"
                  fill="#0F1420"
                  stroke="#5EEAD4"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                  className="schematic-node"
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.05em"
                  fill="#B7C0D4"
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* hub */}
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="46"
            fill="#0F1420"
            stroke="#FFB454"
            strokeWidth="2"
          />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="46"
            fill="none"
            stroke="#FFB454"
            strokeOpacity="0.4"
            strokeWidth="2"
            className="schematic-hub-ring"
          />
          <text
            x={HUB.x}
            y={HUB.y - 3}
            textAnchor="middle"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.05em"
            fill="#EDEFF5"
          >
            YOUR
          </text>
          <text
            x={HUB.x}
            y={HUB.y + 12}
            textAnchor="middle"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.05em"
            fill="#EDEFF5"
          >
            PRODUCT
          </text>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <p className="mb-8 text-sm md:text-base font-mono tracking-wide text-amber-400/80">
          {"// building future-ready software since 2016"}
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
          Systems built to{" "}
          <span className="text-amber-400">outlast the roadmap</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          We design and engineer custom software — from web platforms to
          enterprise systems — built to hold up as your business scales.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="group bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-300"
            asChild
          >
            <Link href="/contact">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/5 backdrop-blur-sm border-white/15 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
            asChild
          >
            <Link href="#case-studies">View Success Stories</Link>
          </Button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 border-t border-white/10 pt-10">
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "200+", label: "Happy Clients" },
            { value: "25+", label: "Countries" },
            { value: "8+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — a real cue, not a decorative bounce */}
      <Link
        href="#case-studies"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
      >
        <span className="text-[10px] font-mono tracking-widest text-gray-500 group-hover:text-amber-400 transition-colors">
          SCROLL
        </span>
        <div className="w-6 h-10 border-2 border-white/20 group-hover:border-amber-400/60 rounded-full flex justify-center transition-colors">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-dot" />
        </div>
      </Link>

      <style jsx>{`
        .bg-hero-ink {
          background: radial-gradient(
            120% 100% at 50% 0%,
            #131a29 0%,
            #0a0e17 60%
          );
        }
        .bg-blueprint-grid {
          background-image:
            linear-gradient(#5eead4 1px, transparent 1px),
            linear-gradient(90deg, #5eead4 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .schematic-flow {
          animation: dash-flow 1.4s linear infinite;
        }
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -28;
          }
        }
        .schematic-node {
          animation: node-breathe 4s ease-in-out infinite;
        }
        @keyframes node-breathe {
          0%,
          100% {
            stroke-opacity: 0.5;
          }
          50% {
            stroke-opacity: 0.9;
          }
        }
        .schematic-hub-ring {
          animation: hub-pulse 2.4s ease-out infinite;
          transform-origin: 400px 300px;
        }
        @keyframes hub-pulse {
          0% {
            transform: scale(1);
            stroke-opacity: 0.5;
          }
          100% {
            transform: scale(1.35);
            stroke-opacity: 0;
          }
        }
        .animate-scroll-dot {
          animation: scroll-dot 1.8s ease-in-out infinite;
        }
        @keyframes scroll-dot {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .schematic-flow,
          .schematic-node,
          .schematic-hub-ring,
          .animate-scroll-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

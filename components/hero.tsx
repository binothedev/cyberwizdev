import Link from "@/components/link";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  className?: string;
}

const CHIPS = ["WEB", "APP", "API", "CLD", "YOUR PRODUCT"] as const;

const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "200+", label: "Happy Clients" },
  { value: "25+", label: "Countries" },
  { value: "8+", label: "Years Experience" },
] as const;

export function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden pb-[60px] pt-14 md:pt-[90px] ${className}`}>
      {/* Brand glow behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[20%] h-[420px] bg-[radial-gradient(ellipse_at_50%_0,var(--glow),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1120px] px-5">
        <div className="mb-[22px] flex flex-wrap gap-2 font-mono">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-line bg-surface px-3 py-[3px] text-[0.78rem] text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </div>

        <p className="mb-[18px] font-mono text-sm text-primary">
          {"// building future-ready software since 2016"}
        </p>

        <h1 className="max-w-[800px] text-[clamp(2.2rem,6vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.035em]">
          Systems built to{" "}
          <em className="text-gradient not-italic">outlast</em> the roadmap
        </h1>

        <p className="mb-8 mt-[22px] max-w-[620px] text-lg leading-relaxed text-muted-foreground md:text-[1.15rem]">
          We design and engineer custom software — from web platforms to
          enterprise systems — built to hold up as your business scales.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="#contact">Start Your Project</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#work">View Success Stories</Link>
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-surface p-[22px]">
              <strong className="block text-2xl font-bold tracking-[-0.03em] text-primary md:text-[2rem]">
                {stat.value}
              </strong>
              <small className="text-sm text-muted-foreground">
                {stat.label}
              </small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

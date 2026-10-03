import Link from "@/components/link";
import type { CaseStudy } from "@/lib/landing-projects";

export type { CaseStudy };

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  className?: string;
}

export function CaseStudiesSection({
  caseStudies,
  className = "",
}: CaseStudiesSectionProps) {
  return (
    <section
      id="work"
      className={`border-y border-line bg-surface py-[84px] ${className}`}
    >
      <div className="mx-auto max-w-[1120px] px-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
          Success Stories
        </p>
        <h2 className="my-2 text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] tracking-[-0.03em]">
          Real results, real impact
        </h2>
        <p className="mb-10 max-w-[620px] text-muted-foreground">
          See how we&apos;ve helped businesses transform their operations
          through innovative software.
        </p>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.slug ?? study.title}
              className="rounded-2xl border border-line bg-background p-[26px] transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_34px_var(--glow)]"
            >
              {(study.category || study.duration) && (
                <p className="font-mono text-[0.78rem] uppercase text-muted-foreground">
                  {[study.category, study.duration].filter(Boolean).join(" · ")}
                </p>
              )}
              <h3 className="mt-2 text-[1.15rem] font-semibold">
                {study.title}
              </h3>
              <p className="mt-1.5 text-[0.95rem] text-muted-foreground">
                {study.description}
              </p>
              {study.results && (
                <p className="my-3 text-[1.1rem] font-bold text-primary">
                  {study.results}
                </p>
              )}
              {study.href && (
                <Link
                  href={study.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9rem] font-semibold text-primary"
                >
                  View case study →
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;

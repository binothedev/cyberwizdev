import Link from "@/components/link";
import { Button } from "@/components/ui/button";

export function CTASection({ className = "" }: { className?: string }) {
  return (
    <section id="contact" className={`pb-[84px] ${className}`}>
      <div className="mx-auto max-w-[1120px] px-5">
        <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--glow),transparent)]"
          />
          <div className="relative px-6 py-16 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] tracking-[-0.03em]">
            Ready to transform your business?
          </h2>
          <p className="mx-auto mb-8 mt-[22px] max-w-[620px] text-lg leading-relaxed text-muted-foreground md:text-[1.15rem]">
            Join hundreds of companies who&apos;ve accelerated their growth
            with our software. Let&apos;s build something amazing together.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href="mailto:info@cyberwizdev.com.ng">Start Your Project</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#work">View Our Portfolio</Link>
            </Button>
          </div>

          <p className="mt-6 font-mono text-[0.78rem] text-muted-foreground">
            Free consultation · Custom proposal · 24h response time
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;

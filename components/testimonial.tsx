export function TestimonialSection({ className = "" }: { className?: string }) {
  return (
    <section className={`pb-[84px] ${className}`}>
      <div className="mx-auto max-w-[1120px] px-5">
        <figure className="max-w-[760px] rounded-[20px] border border-line bg-surface p-[26px] md:p-10">
          <blockquote className="text-[1.15rem] leading-[1.5] tracking-[-0.01em] md:text-[1.35rem]">
            {"“CyberWizDev transformed our entire digital infrastructure. The team's expertise in modern technologies helped us increase our revenue by 300% within 6 months.”"}
          </blockquote>
          <figcaption className="mt-[22px] flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-bold text-primary-foreground"
            >
              S
            </span>
            <span>
              <strong className="block text-sm font-semibold">
                Sarah Johnson
              </strong>
              <small className="text-sm text-muted-foreground">
                CEO, TechStart Inc.
              </small>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default TestimonialSection;

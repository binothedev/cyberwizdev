const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your vision and requirements.",
  },
  {
    number: "02",
    title: "Design",
    description: "Creating user-centered designs and prototypes.",
  },
  {
    number: "03",
    title: "Develop",
    description: "Building with cutting-edge technologies.",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Launching, with ongoing support.",
  },
];

export function ProcessSection({ className = "" }: { className?: string }) {
  return (
    <section id="process" className={`py-[84px] ${className}`}>
      <div className="mx-auto max-w-[1120px] px-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
          Our Proven Process
        </p>
        <h2 className="my-2 text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] tracking-[-0.03em]">
          From first call to launch
        </h2>
        <p className="mb-10 max-w-[620px] text-muted-foreground">
          Starts in 2–4 weeks, with daily updates and 24/7 post-launch care.
        </p>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-line bg-surface p-[26px] transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_34px_var(--glow)]"
            >
              <div className="text-[2.4rem] font-bold leading-none">
                <span className="text-gradient">{step.number}</span>
              </div>
              <h3 className="mt-3 text-[1.15rem] font-semibold">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[0.95rem] text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;

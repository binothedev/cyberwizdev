import Link from "@/components/link";

const services = [
  {
    count: "110+",
    title: "Web Development",
    description:
      "Lightning-fast, responsive websites built with cutting-edge technologies.",
    features: ["React/Next.js", "Performance optimized", "SEO ready"],
  },
  {
    count: "80+",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that users love.",
    features: ["iOS & Android", "Cross-platform", "App Store ready"],
  },
  {
    count: "120+",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure that grows with your business.",
    features: ["AWS/Azure", "Auto-scaling", "99.9% uptime"],
  },
  {
    count: "90+",
    title: "Digital Strategy",
    description:
      "Comprehensive digital transformation roadmaps for success.",
    features: ["Data-driven", "ROI focused", "Growth hacking"],
  },
];

export function ServicesSection({ className = "" }: { className?: string }) {
  return (
    <section id="services" className={`py-[84px] ${className}`}>
      <div className="mx-auto max-w-[1120px] px-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
          Our Services
        </p>
        <h2 className="my-2 text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] tracking-[-0.03em]">
          Solutions that drive results
        </h2>
        <p className="mb-10 max-w-[620px] text-muted-foreground">
          From concept to deployment, we deliver comprehensive software
          solutions that transform businesses and accelerate growth.
        </p>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href="/services"
              className="flex flex-col rounded-2xl border border-line bg-surface p-[26px] transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_34px_var(--glow)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[1.15rem] font-semibold leading-snug">
                  {service.title}
                </h3>
                <span className="font-mono text-[1.6rem] font-bold leading-none text-primary">
                  {service.count}
                </span>
              </div>
              <p className="mt-1.5 text-[0.95rem] text-muted-foreground">
                {service.description}
              </p>
              <ul className="my-3.5 list-none p-0">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="relative py-0.5 pl-[18px] text-[0.85rem] text-muted-foreground before:absolute before:left-0 before:top-0.5 before:text-primary before:content-['›']"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="mt-auto text-[0.9rem] font-semibold text-primary">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

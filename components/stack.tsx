interface TechnologyStackProps {
  technologies?: { name: string }[];
  title?: string;
  className?: string;
}

const DEFAULT_TECHNOLOGIES = [
  { name: "React" },
  { name: "Next.js" },
  { name: "Node.js" },
  { name: "Python" },
  { name: "AWS" },
  { name: "Docker" },
  { name: "MongoDB" },
  { name: "TypeScript" },
];

export function TechnologyStack({
  technologies = DEFAULT_TECHNOLOGIES,
  title = "Technologies we master",
  className = "",
}: TechnologyStackProps) {
  return (
    <div
      className={`border-y border-line bg-surface py-[22px] ${className}`}
      aria-label="Technology stack"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-7 gap-y-2.5 px-5 font-mono text-[0.9rem] text-muted-foreground">
        <span className="text-foreground">{title}</span>
        {technologies.map((tech) => (
          <span key={tech.name}>{tech.name}</span>
        ))}
      </div>
    </div>
  );
}

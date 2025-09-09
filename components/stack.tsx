"use client"

interface Technology {
  name: string;
  logo?: string;
  color?: string;
}

interface TechnologyStackProps {
  technologies?: Technology[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultTechnologies = [
  { name: "React", color: "bg-blue-500" },
  { name: "Next.js", color: "bg-black" },
  { name: "Node.js", color: "bg-green-600" },
  { name: "Python", color: "bg-yellow-500" },
  { name: "AWS", color: "bg-orange-500" },
  { name: "Docker", color: "bg-blue-600" },
  { name: "MongoDB", color: "bg-green-500" },
  { name: "TypeScript", color: "bg-blue-700" },
];

export function TechnologyStack({
  technologies = defaultTechnologies,
  title = "Technologies We Master",
  subtitle,
  className = ""
}: TechnologyStackProps) {
  return (
    <section className={`py-16 bg-white border-b ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {technologies.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="group flex items-center gap-3 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                {tech.logo ? (
                  <img 
                    src={tech.logo} 
                    alt={`${tech.name} logo`} 
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <div className={`w-6 h-6 rounded ${tech.color || 'bg-gray-400'} group-hover:scale-110 transition-transform duration-300`}></div>
                )}
              </div>
              <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            And many more cutting-edge technologies to bring your vision to life
          </p>
        </div>
      </div>
    </section>
  );
}
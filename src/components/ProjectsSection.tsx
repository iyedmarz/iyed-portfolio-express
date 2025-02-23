
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Car Service Booking App",
    description: "A modern web application for scheduling car maintenance and repair services",
    tech: ["React", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    title: "Auto Parts Inventory",
    description: "Inventory management system for automotive parts with real-time tracking",
    tech: ["TypeScript", "Express", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    title: "Vehicle Analytics Dashboard",
    description: "Interactive dashboard for analyzing vehicle performance metrics",
    tech: ["React", "Chart.js", "Firebase"],
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-[#0B0B1E] relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Featured Projects</h2>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:bg-white/10 animate-fade-in border border-purple-500/20 ${
                index % 2 === 0 ? 'hover:animate-drift-left' : 'hover:animate-drift-right'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-purple-200 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm hover:animate-rev-light border border-purple-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors"
                >
                  <Github size={20} className="hover:animate-rev-up" />
                  <span>Code</span>
                </a>
                <a
                  href={project.live}
                  className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors"
                >
                  <ExternalLink size={20} className="hover:animate-rev-up" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

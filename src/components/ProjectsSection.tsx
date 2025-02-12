
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
    <section id="projects" className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Featured Projects</h2>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:bg-white/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <Github size={20} />
                  <span>Code</span>
                </a>
                <a
                  href={project.live}
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <ExternalLink size={20} />
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

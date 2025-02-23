
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online shopping platform with modern UI/UX design.",
    image: "/lovable-uploads/117d6f0d-db13-4e50-ab27-18cf4524808f.png",
    tech: ["React", "Node.js"],
    github: "#",
    live: "#",
  },
  {
    title: "Fitness App",
    description: "Mobile application for tracking workouts and health metrics.",
    image: "/lovable-uploads/117d6f0d-db13-4e50-ab27-18cf4524808f.png",
    tech: ["Flutter", "Firebase"],
    github: "#",
    live: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization and analytics platform.",
    image: "/lovable-uploads/117d6f0d-db13-4e50-ab27-18cf4524808f.png",
    tech: ["Vue.js", "D3.js"],
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

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Featured Projects</h2>
        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-purple-500/20 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent group-hover:scale-110 transition-transform duration-500" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Project Info */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-purple-200 mb-4">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors group/link"
                    >
                      <Github size={20} className="group-hover/link:rotate-12 transition-transform" />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.live}
                      className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors group/link"
                    >
                      <ExternalLink size={20} className="group-hover/link:rotate-12 transition-transform" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

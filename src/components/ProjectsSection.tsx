import { useState } from "react";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Self Checkout System",
    description: "An AI-powered self-checkout system for retail stores.",
    longDescription:
      "An innovative self-checkout solution that allows customers to scan and recognize products automatically using machine learning. The system integrates computer vision for product detection, a seamless checkout process, and a user-friendly interface. Built with Next.js for the frontend, Nest.js for the backend, and MongoDB for data management, it ensures a fast and efficient shopping experience.",
    image: [
      "/SCO1.png",
      "/SCO2.png",
      "/SCO3.png",
      "/SCO4.png",
      "/SCO5.png",
      "/SCO6.png",
    ],
    tech: [
      "Next.js",
      "Nest.js",
      "PostgreSQL",
      "Machine Learning",
      "TensorFlow",
      "Redux",
      "TypeScript",
      "Tauri",
    ],
    github: "#",
    live: "#",
  },
  {
    title: "GymRat",
    description: "Mobile application for tracking workouts and health metrics.",
    longDescription:
      "A comprehensive fitness tracking application that helps users monitor their workout routines, track calories, set goals, and visualize progress over time. Built with Flutter for cross-platform functionality and Firebase for backend services, this app includes features like custom workout plans, nutrition tracking, and social sharing capabilities.",
    image: [],
    tech: ["React", "node.js", "Express", "", ""],
    github: "#",
    live: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization and analytics platform.",
    longDescription:
      "A powerful analytics dashboard that transforms complex data into insightful visualizations. This platform offers real-time monitoring, customizable widgets, and interactive charts that help businesses make data-driven decisions. Built with Vue.js for the frontend and D3.js for data visualization, it integrates with various data sources and provides exportable reports and alerts.",
    image: [],
    tech: [
      "Next.js",
      "D3.js",
      "GraphQL",
      "Node.js",
      "PostgreSQL",
      "WebSockets",
    ],
    github: "#",
    live: "#",
  },
  // {
  //   title: "Analytics Dashboard",
  //   description: "Real-time data visualization and analytics platform.",
  //   longDescription:
  //     "A powerful analytics dashboard that transforms complex data into insightful visualizations. This platform offers real-time monitoring, customizable widgets, and interactive charts that help businesses make data-driven decisions. Built with Vue.js for the frontend and D3.js for data visualization, it integrates with various data sources and provides exportable reports and alerts.",
  //   image: "/lovable-uploads/117d6f0d-db13-4e50-ab27-18cf4524808f.png",
  //   tech: ["Vue.js", "D3.js", "GraphQL", "Node.js", "PostgreSQL", "WebSockets"],
  //   github: "#",
  //   live: "#",
  // },
];

const ProjectsSection = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<
    null | (typeof projects)[0]
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const openProjectModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
  };

  // Calculate which projects to display
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-[#0B0B1E] relative overflow-hidden"
    >
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
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          {language === "en" ? "Featured Projects" : "Projets en Vedette"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <div
              key={project.title + index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-purple-500/20 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => openProjectModal(project)}
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent group-hover:scale-110 transition-transform duration-500" />
                <img
                  src={project.image[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Project Info */}
              <div className="px-6 pt-6 pb-3">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-purple-200 mb-4 text-sm">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 2 && (
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                      +{project.tech.length - 2}
                    </span>
                  )}
                </div>

                {/* Links */}
                {/* <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors group/link"
                  >
                    <Github size={20} className="group-hover/link:rotate-12 transition-transform" />
                    <span>{language === "en" ? "Code" : "Code"}</span>
                  </a>
                  <a
                    href={project.live}
                    className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors group/link"
                  >
                    <ExternalLink size={20} className="group-hover/link:rotate-12 transition-transform" />
                    <span>{language === "en" ? "Live Demo" : "Démo"}</span>
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button - Only display if there are more projects to show */}
        {projects.length > 3 && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => setShowAll(!showAll)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                theme === "dark"
                  ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30"
                  : "bg-purple-200 text-purple-600 hover:bg-purple-300 border border-purple-300"
              }`}
            >
              {showAll ? (
                <>
                  <span>
                    {language === "en" ? "Show Less" : "Afficher Moins"}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {language === "en" ? "Show More" : "Afficher Plus"}
                  </span>
                  <ChevronDown size={20} />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      )}
    </section>
  );
};

export default ProjectsSection;


import { useState } from "react";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "EasyCarScan",
    description: {
      en: "helps car owners identify issues with real-time image recognition and OBD scanning. Just scan and understand your car's problems easily!",
      fr: "aide les propriétaires de voitures à identifier les problèmes grâce à la reconnaissance d'image en temps réel et à la numérisation OBD. Scannez et comprenez facilement les problèmes de votre voiture!"
    },
    longDescription: {
      en: "EasyCarScan is designed for everyday drivers with basic car knowledge who want a quick and easy way to diagnose their vehicle's issues. The app features a real-time camera scanner that recognizes car components and warning lights, providing possible causes and solutions. Additionally, it supports OBD scanning, allowing users to read and understand fault codes without needing advanced mechanical skills. With a user-friendly interface and clear explanations, ECS makes car troubleshooting accessible to everyone.",
      fr: "EasyCarScan est conçu pour les conducteurs quotidiens ayant des connaissances de base en automobile qui souhaitent un moyen rapide et facile de diagnostiquer les problèmes de leur véhicule. L'application dispose d'un scanner de caméra en temps réel qui reconnaît les composants de la voiture et les voyants d'avertissement, fournissant les causes possibles et les solutions. De plus, elle prend en charge la numérisation OBD, permettant aux utilisateurs de lire et de comprendre les codes d'erreur sans avoir besoin de compétences mécaniques avancées. Avec une interface conviviale et des explications claires, ECS rend le dépannage automobile accessible à tous."
    },
    contribution: "",
    image: ["/easycarScan1.png"],
    tech: ["work under progress"],
    github: "#",
    live: "#",
  },

  {
    title: "TripHive",
    description: {
      en: "Trip Hive is a responsible tourism platform inspired by the harmony of nature and bees.",
      fr: "Trip Hive est une plateforme de tourisme responsable inspirée par l'harmonie de la nature et des abeilles."
    },
    longDescription: {
      en: "Trip Hive is a responsible tourism platform inspired by nature and the harmony of bees. Founded in Ain Jeloula, it transforms each trip into a sustainable act by planting a tree for every booking—starting with Carob and Fig trees in the local region. Visit Web site https://www.trip-hive.com/ Unfortunaly it still not have any data to showcase the website properly.",
      fr: "Trip Hive est une plateforme de tourisme responsable inspirée par la nature et l'harmonie des abeilles. Fondée à Ain Jeloula, elle transforme chaque voyage en un acte durable en plantant un arbre pour chaque réservation—en commençant par des caroubiers et des figuiers dans la région locale. Visitez le site Web https://www.trip-hive.com/ Malheureusement, il n'a toujours pas de données pour présenter correctement le site Web."
    },
    contribution: "",
    image: ["/trip1.png", "/trip4.png", "/trip2.png", "/trip3.png"],
    tech: ["Next.Js", "Redux", "MongoDB"],
    github: "#",
    live: "",
  },
  {
    title: "ETK-SCO",
    description: {
      en: "An AI-powered self-checkout system for retail stores.",
      fr: "Un système de caisse libre-service alimenté par l'IA pour les magasins de détail."
    },
    longDescription: {
      en: "An innovative self-checkout solution that allows customers to scan and recognize products automatically using machine learning. The system integrates computer vision for product detection, a seamless checkout process, and a user-friendly interface. Built with Next.js for the frontend, Nest.js for the backend, and MongoDB for data management, it ensures a fast and efficient shopping experience.",
      fr: "Une solution innovante de caisse libre-service qui permet aux clients de scanner et de reconnaître automatiquement les produits à l'aide de l'apprentissage automatique. Le système intègre la vision par ordinateur pour la détection des produits, un processus de paiement fluide et une interface conviviale. Construit avec Next.js pour le frontend, Nest.js pour le backend et MongoDB pour la gestion des données, il garantit une expérience d'achat rapide et efficace."
    },
    contribution: "",
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
    title: "FoodTuck",
    description: {
      en: "FoodTuck lets customers explore the menu, learn about the restaurant, and order food online with ease.",
      fr: "FoodTuck permet aux clients d'explorer le menu, d'en savoir plus sur le restaurant et de commander de la nourriture en ligne facilement."
    },
    longDescription: {
      en: "FoodTuck is a modern, user-friendly restaurant website where customers can explore an interactive menu with detailed dish descriptions and images. They can learn about the restaurant's story, check operating hours and location, and easily place orders for delivery or pickup. The site offers a seamless ordering experience with customizable meal options and secure payment methods.",
      fr: "FoodTuck est un site Web de restaurant moderne et convivial où les clients peuvent explorer un menu interactif avec des descriptions détaillées des plats et des images. Ils peuvent découvrir l'histoire du restaurant, vérifier les heures d'ouverture et l'emplacement, et passer facilement des commandes pour la livraison ou le retrait. Le site offre une expérience de commande fluide avec des options de repas personnalisables et des méthodes de paiement sécurisées."
    },
    contribution: "",
    image: ["/foodtuck.png"],
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Redux", "tailwindCSS"],
    github: "#",
    live: "#",
  },
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
                  {project.description[language]}
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

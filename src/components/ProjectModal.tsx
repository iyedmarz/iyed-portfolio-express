
import React from "react";
import { X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface ProjectModalProps {
  project: {
    title: string;
    description: {
      en: string;
      fr: string;
    };
    longDescription?: {
      en: string;
      fr: string;
    };
    contribution?: string;
    image: string[];
    tech: string[];
    github: string;
    live: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`relative max-w-3xl w-11/12 max-h-[90vh] overflow-auto rounded-2xl shadow-xl animate-fade-in ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-800/90 to-gray-900/90 border border-purple-500/30"
            : "bg-gradient-to-b from-white to-gray-100 border border-purple-300/50"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full z-10 ${
            theme === "dark"
              ? "bg-gray-800/80 text-purple-300 hover:bg-gray-700/80"
              : "bg-white/80 text-purple-600 hover:bg-gray-100/80"
          }`}
          aria-label={language === "en" ? "Close" : "Fermer"}
        >
          <X size={20} />
        </button>

        <div className="relative aspect-video w-full overflow-hidden">
          <Swiper
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="w-full h-full"
          >
            {project.image.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev text-white opacity-70 hover:opacity-100"></div>
            <div className="swiper-button-next text-white opacity-70 hover:opacity-100"></div>
          </Swiper>
        </div>

        <div className="p-6">
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {project.title}
          </h2>

          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {project.longDescription 
              ? project.longDescription[language] 
              : project.description[language]
            }
          </p>
          
          {project.contribution ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                {language === "en" ? "My Contributions" : "Mes Contributions"}
              </h3>
              <div>{project.contribution}</div>
            </div>
          ) : null}

          <div className="mb-6">
            <h3
              className={`text-lg font-semibold mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {language === "en" ? "Technologies" : "Technologies"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-sm ${
                    theme === "dark"
                      ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      : "bg-purple-100 text-purple-600 border border-purple-300"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

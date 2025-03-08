import { GraduationCap, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/utils/translations";

const HeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-[#0B0B1E] overflow-hidden">
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

      {/* Content */}
      <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="text-center md:text-left animate-fade-in-slow md:flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 mb-6 ">
            <Rocket size={18} className="animate-bounce" />
            <span className="text-sm font-medium">{t.role}</span>
            <GraduationCap size={18} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white animate-slide-in">
            Iyed Marzouki
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto md:mx-0 mb-8">
            {t.description}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href="#about"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-500 transition-all hover:scale-105 duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              {t.explore}
            </a>
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all hover:scale-105 duration-300"
            >
              {t.projects}
            </a>
          </div>
        </div>
        <div className="md:flex-1 flex justify-center md:justify-end animate-fade-in">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-purple-400/50 animate-pulse" />
            <img
              src="/lovable-uploads/26e439cf-e0f5-41d2-baba-495715e4ae9d.png"
              alt="Iyed Marzouki"
              className="absolute inset-0 w-full h-full rounded-full object-cover border-4 border-purple-400/20 hover:scale-105 transition-transform duration-300"
            />
            <div
              className="absolute inset-[-10px] rounded-full border-2 border-purple-400/20 animate-spin-slow"
              style={{ animationDuration: "20s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialLinks from "@/components/SocialLinks";
import { useLanguage } from "@/context/LanguageContext";
import { Languages } from "lucide-react";

const Index = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <main className="bg-[#0B0B1E]">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLanguage(language === "en" ? "fr" : "en")}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full hover:bg-purple-500/20 transition-all"
        >
          <Languages size={20} />
          <span>{language === "en" ? "Français" : "English"}</span>
        </button>
      </div>
      <SocialLinks />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

export default Index;


import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialLinks from "@/components/SocialLinks";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Languages, Sun, Moon } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <main className={theme === "dark" ? "bg-[#0B0B1E]" : "bg-white"}>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setLanguage(language === "en" ? "fr" : "en")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            theme === "dark"
              ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
              : "bg-purple-100 text-purple-600 hover:bg-purple-200"
          }`}
        >
          <Languages size={20} />
          <span>{language === "en" ? "Français" : "English"}</span>
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            theme === "dark"
              ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
              : "bg-purple-100 text-purple-600 hover:bg-purple-200"
          }`}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
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

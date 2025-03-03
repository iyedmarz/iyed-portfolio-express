
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialLinks from "@/components/SocialLinks";
import RobotBuilderModal from "@/components/RobotBuilderModal";
import RobotWelcome from "@/components/RobotWelcome";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useGame } from "@/context/GameContext";
import { Languages, Sun, Moon } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { robotCompleted, setRobotCompleted, showedRobotBuilder, setShowedRobotBuilder } = useGame();
  const [showRobotBuilder, setShowRobotBuilder] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    
    // Check if this is the first visit and we haven't shown the robot builder yet
    if (!showedRobotBuilder) {
      // Short delay before showing robot builder for better UX
      const timer = setTimeout(() => {
        setShowRobotBuilder(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // If we've already shown the robot builder before, show content immediately
      setContentVisible(true);
    }
  }, [theme, showedRobotBuilder]);

  const handleRobotComplete = () => {
    setRobotCompleted(true);
    setShowRobotBuilder(false);
    setShowedRobotBuilder(true);
    setContentVisible(true);
  };

  const handleSkipRobotBuilder = () => {
    setShowRobotBuilder(false);
    setShowedRobotBuilder(true);
    setContentVisible(true);
  };

  // Apply dynamic CSS based on robot completion
  const getRobotStyles = () => {
    if (!robotCompleted) return {};
    
    return theme === 'dark' 
      ? { background: 'linear-gradient(180deg, #0B0B1E 0%, #16123a 100%)' }
      : { background: 'linear-gradient(180deg, #ffffff 0%, #f3f0ff 100%)' };
  };

  return (
    <main 
      className={theme === "dark" ? "bg-[#0B0B1E]" : "bg-white"}
      style={getRobotStyles()}
    >
      {/* Robot builder modal for the interactive experience */}
      {showRobotBuilder && (
        <RobotBuilderModal 
          onClose={handleSkipRobotBuilder} 
          onComplete={handleRobotComplete} 
        />
      )}
      
      {/* Robot welcome message */}
      <RobotWelcome />
      
      {/* Language and theme switchers */}
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
      
      {/* Main content - only shown after robot builder interaction or skip */}
      <div className={`transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <SocialLinks />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
      
      {/* Toaster for notifications */}
      <Toaster />
    </main>
  );
};

export default Index;

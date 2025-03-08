
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialLinks from "@/components/SocialLinks";
import RobotBuilderModal from "@/components/RobotBuilderModal";
import RobotWelcome from "@/components/RobotWelcome";
import EntryOptionsModal from "@/components/EntryOptionsModal";
import CodingChallengeModal from "@/components/CodingChallengeModal";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useGame } from "@/context/GameContext";
import { Languages, Sun, Moon } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { 
    robotCompleted, 
    setRobotCompleted, 
    showedRobotBuilder, 
    setShowedRobotBuilder,
    codingCompleted,
    setCodingCompleted,
    entryOption,
    setEntryOption,
    resetEntryState
  } = useGame();
  
  const [showEntryOptions, setShowEntryOptions] = useState(false);
  const [showRobotBuilder, setShowRobotBuilder] = useState(false);
  const [showCodingChallenge, setShowCodingChallenge] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    
    // Reset entry state on each page load to show options modal
    resetEntryState();
    
    // Short delay before showing entry options for better UX
    const timer = setTimeout(() => {
      setShowEntryOptions(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [theme, resetEntryState]);

  // Effect to handle content visibility after entry options interaction
  useEffect(() => {
    // If entry option is selected or robot builder was shown
    if (entryOption || showedRobotBuilder) {
      setContentVisible(true);
    } else {
      setContentVisible(false);
    }
  }, [entryOption, showedRobotBuilder]);

  const handleSelectRobotBuilder = () => {
    setEntryOption("robot");
    setShowEntryOptions(false);
    setShowRobotBuilder(true);
  };

  const handleSelectCodingChallenge = () => {
    setEntryOption("coding");
    setShowEntryOptions(false);
    setShowCodingChallenge(true);
  };

  const handleDirectEntry = () => {
    setEntryOption("direct");
    setShowEntryOptions(false);
    setShowedRobotBuilder(true);
    setContentVisible(true);
  };

  const handleRobotComplete = () => {
    setRobotCompleted(true);
    setShowRobotBuilder(false);
    setShowedRobotBuilder(true);
    setContentVisible(true);
  };

  const handleCodingComplete = () => {
    setCodingCompleted(true);
    setShowCodingChallenge(false);
    setShowedRobotBuilder(true);
    setContentVisible(true);
  };

  const handleSkipEntryOption = () => {
    setShowEntryOptions(false);
    setShowRobotBuilder(false);
    setShowCodingChallenge(false);
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
      {/* Entry options modal */}
      {showEntryOptions && (
        <EntryOptionsModal
          onSelectRobotBuilder={handleSelectRobotBuilder}
          onSelectCodingChallenge={handleSelectCodingChallenge}
          onDirectEntry={handleDirectEntry}
          onClose={handleSkipEntryOption}
        />
      )}
      
      {/* Robot builder modal */}
      {showRobotBuilder && (
        <RobotBuilderModal 
          onClose={handleSkipEntryOption} 
          onComplete={handleRobotComplete} 
        />
      )}
      
      {/* Coding challenge modal */}
      {showCodingChallenge && (
        <CodingChallengeModal
          onClose={handleSkipEntryOption}
          onComplete={handleCodingComplete}
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
      
      {/* Main content - only shown after interaction or skip */}
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

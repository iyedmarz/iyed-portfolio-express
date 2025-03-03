
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialLinks from "@/components/SocialLinks";
import CameraModal from "@/components/CameraModal";
import MoodWelcome from "@/components/MoodWelcome";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useMood } from "@/context/MoodContext";
import { Languages, Sun, Moon } from "lucide-react";

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { mood, setMood, showedCamera, setShowedCamera } = useMood();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    
    // Check if this is the first visit and we haven't shown the camera modal yet
    if (!showedCamera) {
      // Short delay before showing camera modal for better UX
      const timer = setTimeout(() => {
        setShowCameraModal(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // If we've already shown the camera modal before, show content immediately
      setContentVisible(true);
    }
  }, [theme, showedCamera]);

  const handleMoodDetected = (detectedMood: 'happy' | 'neutral' | 'surprised' | 'sad') => {
    setMood(detectedMood);
    setShowCameraModal(false);
    setShowedCamera(true);
    setContentVisible(true);
  };

  const handleSkipCamera = () => {
    setShowCameraModal(false);
    setShowedCamera(true);
    setContentVisible(true);
  };

  // Apply dynamic CSS based on detected mood
  const getMoodStyles = () => {
    if (!mood) return {};
    
    switch (mood) {
      case 'happy':
        return theme === 'dark' 
          ? { background: 'linear-gradient(180deg, #0B0B1E 0%, #16123a 100%)' }
          : { background: 'linear-gradient(180deg, #ffffff 0%, #f3f0ff 100%)' };
      case 'neutral':
        return {}; // Default styling
      case 'surprised':
        return theme === 'dark'
          ? { background: 'linear-gradient(180deg, #0B0B1E 0%, #1a1e33 100%)' }
          : { background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)' };
      case 'sad':
        return theme === 'dark'
          ? { background: 'linear-gradient(180deg, #0B0B1E 0%, #231a33 100%)' }
          : { background: 'linear-gradient(180deg, #ffffff 0%, #fff0fb 100%)' };
      default:
        return {};
    }
  };

  return (
    <main 
      className={theme === "dark" ? "bg-[#0B0B1E]" : "bg-white"}
      style={getMoodStyles()}
    >
      {/* Camera modal for the interactive experience */}
      {showCameraModal && (
        <CameraModal 
          onClose={handleSkipCamera} 
          onMoodDetected={handleMoodDetected} 
        />
      )}
      
      {/* Mood-based welcome message */}
      <MoodWelcome />
      
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
      
      {/* Main content - only shown after camera interaction or skip */}
      <div className={`transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <SocialLinks />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
};

export default Index;

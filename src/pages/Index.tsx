
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import SocialLinks from "@/components/SocialLinks";
import RobotBuilderModal from "@/components/RobotBuilderModal";
import RobotWelcome from "@/components/RobotWelcome";
import EntryOptionsModal from "@/components/EntryOptionsModal";
import CodingChallengeModal from "@/components/CodingChallengeModal";
import UnderConstructionModal from "@/components/UnderConstructionModal";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useGame } from "@/context/GameContext";
import { Languages, ArrowLeft } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const {
    robotCompleted,
    setRobotCompleted,
    showedRobotBuilder,
    setShowedRobotBuilder,
    codingCompleted,
    setCodingCompleted,
    entryOption,
    setEntryOption,
    resetEntryState,
    entryOptionsShownInSession,
    setEntryOptionsShownInSession,
  } = useGame();

  // Set this to true to show the under construction modal
  const [showUnderConstruction, setShowUnderConstruction] = useState(true);
  const [showEntryOptions, setShowEntryOptions] = useState(false);
  const [showRobotBuilder, setShowRobotBuilder] = useState(false);
  const [showCodingChallenge, setShowCodingChallenge] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    document.body.className = theme;

    // Only proceed with normal app initialization if not under construction
    if (!showUnderConstruction) {
      if (!entryOptionsShownInSession) {
        resetEntryState();
        const timer = setTimeout(() => {
          setShowEntryOptions(true);
          setEntryOptionsShownInSession(true);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setContentVisible(true);
      }
    }
  }, [
    theme,
    resetEntryState,
    entryOptionsShownInSession,
    setEntryOptionsShownInSession,
    showUnderConstruction,
  ]);

  useEffect(() => {
    if (entryOption || showedRobotBuilder) {
      setContentVisible(true);
    } else {
      setContentVisible(false);
    }
  }, [entryOption, showedRobotBuilder]);

  const handleDeveloperAccess = () => {
    setShowUnderConstruction(false);
    toast({
      title: language === "en" ? "Developer Access Granted" : "Accès Développeur Accordé",
      description: language === "en" 
        ? "You now have access to the portfolio content." 
        : "Vous avez maintenant accès au contenu du portfolio.",
      duration: 3000,
    });
    
    // Initialize the portfolio with entry options
    if (!entryOptionsShownInSession) {
      resetEntryState();
      setTimeout(() => {
        setShowEntryOptions(true);
        setEntryOptionsShownInSession(true);
      }, 1000);
    } else {
      setContentVisible(true);
    }
  };

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

  const handleResetToEntryOptions = () => {
    setShowEntryOptions(true);
    setShowRobotBuilder(false);
    setShowCodingChallenge(false);
    setContentVisible(false);
    
    toast({
      title: language === "en" ? "Welcome back!" : "Bienvenue à nouveau!",
      description: language === "en" 
        ? "You can choose a different entry option now." 
        : "Vous pouvez choisir une autre option d'entrée maintenant.",
      duration: 3000,
    });
  };

  const getRobotStyles = () => {
    if (!robotCompleted) return {};

    return theme === "dark"
      ? { background: "linear-gradient(180deg, #0B0B1E 0%, #16123a 100%)" }
      : { background: "linear-gradient(180deg, #ffffff 0%, #f3f0ff 100%)" };
  };

  return (
    <main
      className={theme === "dark" ? "bg-[#0B0B1E]" : "bg-white"}
      style={getRobotStyles()}
    >
      {/* Show Under Construction Modal if enabled */}
      {showUnderConstruction && <UnderConstructionModal onDeveloperAccess={handleDeveloperAccess} />}

      {/* Only show these components if not under construction */}
      {!showUnderConstruction && (
        <>
          {showEntryOptions && (
            <EntryOptionsModal
              onSelectRobotBuilder={handleSelectRobotBuilder}
              onSelectCodingChallenge={handleSelectCodingChallenge}
              onDirectEntry={handleDirectEntry}
              onClose={handleSkipEntryOption}
            />
          )}

          {showRobotBuilder && (
            <RobotBuilderModal
              onClose={handleSkipEntryOption}
              onComplete={handleRobotComplete}
            />
          )}

          {showCodingChallenge && (
            <CodingChallengeModal
              onClose={handleSkipEntryOption}
              onComplete={handleCodingComplete}
            />
          )}

          <RobotWelcome />

          {contentVisible && !showEntryOptions && (
            <Button
              onClick={handleResetToEntryOptions}
              variant="outline"
              size="icon"
              className={`fixed top-4 left-4 z-40 rounded-full transition-all ${
                theme === "dark"
                  ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/30"
                  : "bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-300"
              }`}
              aria-label={language === "en" ? "Return to options" : "Retour aux options"}
            >
              <ArrowLeft size={20} />
            </Button>
          )}

          <div className="fixed top-4 right-4 z-40 flex gap-2">
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
          </div>

          <div
            className={`transition-opacity duration-700 ${
              contentVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <SocialLinks />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ReviewsSection />
            <ContactSection />
          </div>
        </>
      )}

      <Toaster />
    </main>
  );
};

export default Index;

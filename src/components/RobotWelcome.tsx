
import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles } from "lucide-react";
import { translations } from "@/utils/translations";

const RobotWelcome = () => {
  const { robotCompleted, entryOption } = useGame();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show welcome message if an entry option was selected
    if (entryOption && (robotCompleted || entryOption === "direct" || entryOption === "coding")) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000); // Display welcome message for 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [robotCompleted, entryOption]);

  if (!visible) return null;

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 animate-fade-in">
      <div className={`p-6 rounded-xl shadow-lg ${
        theme === "dark" 
          ? "bg-gray-800/90 text-white" 
          : "bg-white/90 text-gray-800"
      } flex flex-col items-center max-w-md backdrop-blur-sm`}
      >
        <Sparkles className="w-16 h-16 text-primary mb-4 animate-rev-light" />
        <h2 className="text-2xl font-bold mb-2">
          {t.portfolioWelcomeTitle || "Welcome to My Portfolio!"}
        </h2>
        <p className="text-center">
          {t.portfolioWelcomeMessage || "Thanks for visiting my digital space. Feel free to explore my projects and learn more about my work."}
        </p>
      </div>
    </div>
  );
};

export default RobotWelcome;

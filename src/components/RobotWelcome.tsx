
import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Robot } from "lucide-react";
import { useTranslation } from "@/utils/translations";

const RobotWelcome = () => {
  const { robotCompleted } = useGame();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (robotCompleted) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000); // Display welcome message for 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [robotCompleted]);

  if (!visible) return null;

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 animate-fade-in">
      <div className={`p-6 rounded-xl shadow-lg ${
        theme === "dark" 
          ? "bg-gray-800/90 text-white" 
          : "bg-white/90 text-gray-800"
      } flex flex-col items-center max-w-md backdrop-blur-sm`}
      >
        <Robot className="w-16 h-16 text-primary mb-4 animate-rev-light" />
        <h2 className="text-2xl font-bold mb-2">
          {t.robotWelcomeTitle || "Robot Assistant Activated!"}
        </h2>
        <p className="text-center">
          {t.robotWelcomeMessage || "Welcome to my portfolio. Your robot assistant is ready to help you navigate through my work and projects."}
        </p>
      </div>
    </div>
  );
};

export default RobotWelcome;

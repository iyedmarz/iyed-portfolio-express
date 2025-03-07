
import { useState } from "react";
import { X, Code, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { translations } from "@/utils/translations";

interface EntryOptionsModalProps {
  onSelectRobotBuilder: () => void;
  onSelectCodingChallenge: () => void;
  onDirectEntry: () => void;
  onClose: () => void;
}

const EntryOptionsModal = ({
  onSelectRobotBuilder,
  onSelectCodingChallenge,
  onDirectEntry,
  onClose,
}: EntryOptionsModalProps) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const isDark = theme === "dark";
  const t = translations[language as 'en' | 'fr'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className={`${
        isDark 
          ? "bg-gray-900/95 text-white border border-purple-500/20" 
          : "bg-white/95 text-gray-800 border border-purple-200"
        } rounded-xl p-8 shadow-xl w-full max-w-3xl relative animate-fade-in`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 ${
            isDark 
              ? "text-gray-400 hover:text-white" 
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-8">
          {t.entryOptions.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coding Challenge Option */}
          <div
            className={`relative overflow-hidden ${
              isDark 
                ? hoveredOption === "coding" 
                  ? "bg-gradient-to-b from-blue-900/50 to-blue-800/30 border-blue-500/70" 
                  : "bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-gray-700/50" 
                : hoveredOption === "coding" 
                  ? "bg-gradient-to-b from-blue-50 to-blue-100 border-blue-300" 
                  : "bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200"
            } p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-xl border-2`}
            onClick={onSelectCodingChallenge}
            onMouseEnter={() => setHoveredOption("coding")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`p-4 rounded-full ${
              isDark 
                ? "bg-blue-800/50 text-blue-300" 
                : "bg-blue-100 text-blue-600"
            } mb-4`}>
              <Code size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {t.entryOptions.codingChallenge}
            </h3>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {t.entryOptions.codingDescription}
            </p>
            <Button 
              variant={isDark ? "outline" : "default"} 
              className={`mt-auto ${
                isDark 
                  ? "bg-blue-800/30 hover:bg-blue-700/50 border-blue-500/30 text-blue-300" 
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {language === "en" ? "Select" : "Sélectionner"}
            </Button>
          </div>

          {/* Robot Builder Option */}
          <div
            className={`relative overflow-hidden ${
              isDark 
                ? hoveredOption === "robot" 
                  ? "bg-gradient-to-b from-purple-900/50 to-purple-800/30 border-purple-500/70" 
                  : "bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-gray-700/50" 
                : hoveredOption === "robot" 
                  ? "bg-gradient-to-b from-purple-50 to-purple-100 border-purple-300" 
                  : "bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200"
            } p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-xl border-2`}
            onClick={onSelectRobotBuilder}
            onMouseEnter={() => setHoveredOption("robot")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`p-4 rounded-full ${
              isDark 
                ? "bg-purple-800/50 text-purple-300" 
                : "bg-purple-100 text-purple-600"
            } mb-4`}>
              <Bot size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {t.entryOptions.robotBuilder}
            </h3>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {t.entryOptions.robotDescription}
            </p>
            <Button 
              variant={isDark ? "outline" : "default"} 
              className={`mt-auto ${
                isDark 
                  ? "bg-purple-800/30 hover:bg-purple-700/50 border-purple-500/30 text-purple-300" 
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
            >
              {language === "en" ? "Select" : "Sélectionner"}
            </Button>
          </div>

          {/* Direct Entry Option */}
          <div
            className={`relative overflow-hidden ${
              isDark 
                ? hoveredOption === "direct" 
                  ? "bg-gradient-to-b from-green-900/50 to-green-800/30 border-green-500/70" 
                  : "bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-gray-700/50" 
                : hoveredOption === "direct" 
                  ? "bg-gradient-to-b from-green-50 to-green-100 border-green-300" 
                  : "bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200"
            } p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-xl border-2`}
            onClick={onDirectEntry}
            onMouseEnter={() => setHoveredOption("direct")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`p-4 rounded-full ${
              isDark 
                ? "bg-green-800/50 text-green-300" 
                : "bg-green-100 text-green-600"
            } mb-4`}>
              <ArrowRight size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {t.entryOptions.directEntry}
            </h3>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {t.entryOptions.directDescription}
            </p>
            <Button 
              variant={isDark ? "outline" : "default"} 
              className={`mt-auto ${
                isDark 
                  ? "bg-green-800/30 hover:bg-green-700/50 border-green-500/30 text-green-300" 
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {language === "en" ? "Select" : "Sélectionner"}
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          {t.entryOptions.footer}
        </div>
      </div>
    </div>
  );
};

export default EntryOptionsModal;


import { useState } from "react";
import { X, Code, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-3xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">
          {language === "en" ? "Choose Your Path" : "Choisissez Votre Voie"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coding Challenge Option */}
          <div
            className={`bg-gradient-to-b ${
              isDark 
                ? hoveredOption === "coding" ? "from-blue-900/50 to-blue-800/30" : "from-gray-800 to-gray-700" 
                : hoveredOption === "coding" ? "from-blue-50 to-blue-100" : "from-gray-50 to-gray-100"
            } p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-lg border ${
              isDark 
                ? hoveredOption === "coding" ? "border-blue-500" : "border-gray-700" 
                : hoveredOption === "coding" ? "border-blue-300" : "border-gray-200"
            }`}
            onClick={onSelectCodingChallenge}
            onMouseEnter={() => setHoveredOption("coding")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`p-4 rounded-full ${
              isDark 
                ? "bg-blue-900/30 text-blue-400" 
                : "bg-blue-100 text-blue-600"
            } mb-4`}>
              <Code size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {language === "en" ? "Coding Challenge" : "Défi de Codage"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === "en" 
                ? "Solve a mini coding puzzle to unlock the portfolio" 
                : "Résolvez un mini puzzle de codage pour débloquer le portfolio"}
            </p>
            <Button variant="outline" className="mt-auto">
              {language === "en" ? "Select" : "Sélectionner"}
            </Button>
          </div>

          {/* Robot Builder Option */}
          <div
            className={`bg-gradient-to-b ${
              isDark 
                ? hoveredOption === "robot" ? "from-purple-900/50 to-purple-800/30" : "from-gray-800 to-gray-700" 
                : hoveredOption === "robot" ? "from-purple-50 to-purple-100" : "from-gray-50 to-gray-100"
            } p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-lg border ${
              isDark 
                ? hoveredOption === "robot" ? "border-purple-500" : "border-gray-700" 
                : hoveredOption === "robot" ? "border-purple-300" : "border-gray-200"
            }`}
            onClick={onSelectRobotBuilder}
            onMouseEnter={() => setHoveredOption("robot")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`p-4 rounded-full ${
              isDark 
                ? "bg-purple-900/30 text-purple-400" 
                : "bg-purple-100 text-purple-600"
            } mb-4`}>
              <Bot size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {language === "en" ? "Robot Builder" : "Constructeur de Robot"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === "en" 
                ? "Assemble a robot assistant to help navigate the portfolio" 
                : "Assemblez un assistant robot pour vous aider à naviguer dans le portfolio"}
            </p>
            <Button variant="outline" className="mt-auto">
              {language === "en" ? "Select" : "Sélectionner"}
            </Button>
          </div>

          {/* Direct Entry Option */}
          <div
            className={`bg-gradient-to-b ${
              isDark 
                ? hoveredOption === "direct" ? "from-green-900/50 to-green-800/30" : "from-gray-800 to-gray-700" 
                : hoveredOption === "direct" ? "from-green-50 to-green-100" : "from-gray-50 to-gray-100"
            } p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-lg border ${
              isDark 
                ? hoveredOption === "direct" ? "border-green-500" : "border-gray-700" 
                : hoveredOption === "direct" ? "border-green-300" : "border-gray-200"
            }`}
            onClick={onDirectEntry}
            onMouseEnter={() => setHoveredOption("direct")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`p-4 rounded-full ${
              isDark 
                ? "bg-green-900/30 text-green-400" 
                : "bg-green-100 text-green-600"
            } mb-4`}>
              <ArrowRight size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {language === "en" ? "Direct Entry" : "Entrée Directe"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === "en" 
                ? "Skip the challenges and explore the portfolio right away" 
                : "Ignorez les défis et explorez immédiatement le portfolio"}
            </p>
            <Button variant="outline" className="mt-auto">
              {language === "en" ? "Select" : "Sélectionner"}
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          {language === "en" 
            ? "Choose any option to continue. You can always return later." 
            : "Choisissez n'importe quelle option pour continuer. Vous pourrez toujours revenir plus tard."}
        </div>
      </div>
    </div>
  );
};

export default EntryOptionsModal;

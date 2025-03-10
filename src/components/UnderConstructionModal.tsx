
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Construction } from "lucide-react";

const UnderConstructionModal = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className={`w-11/12 max-w-md p-8 rounded-xl shadow-2xl text-center animate-fade-in ${
        theme === "dark" 
          ? "bg-gradient-to-b from-gray-800 to-gray-900 border border-purple-500/30" 
          : "bg-white border border-purple-300/50"
      }`}>
        <Construction className={`w-20 h-20 mx-auto mb-6 ${
          theme === "dark" ? "text-purple-400" : "text-purple-600"
        }`} />
        
        <h2 className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {language === "en" ? "Portfolio Under Construction" : "Portfolio en Construction"}
        </h2>
        
        <p className={`mb-6 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          {language === "en" 
            ? "Thank you for your interest! My portfolio is currently under development and will be available soon."
            : "Merci de votre intérêt ! Mon portfolio est actuellement en cours de développement et sera disponible prochainement."}
        </p>
        
        <div className={`w-full h-2 mb-6 rounded-full overflow-hidden ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`}>
          <div className={`h-full rounded-full animate-pulse ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-600"
          }`} style={{ width: "75%" }}></div>
        </div>
        
        <div className={`text-sm ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>
          {language === "en" 
            ? "Expected completion: Coming soon"
            : "Achèvement prévu : Bientôt disponible"}
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionModal;

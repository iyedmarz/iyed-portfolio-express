
import { useState, useEffect } from "react";
import { X, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { translations } from "@/utils/translations";

interface CodingChallengeModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const CodingChallengeModal = ({ onClose, onComplete }: CodingChallengeModalProps) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState<{
    title: string;
    description: string;
    template: string;
    solution: RegExp;
  }>({
    title: "",
    description: "",
    template: "",
    solution: /./
  });
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isDark = theme === "dark";
  const t = translations[language as 'en' | 'fr'];

  const challenges = [
    {
      title: language === "en" ? "Print a welcome message" : "Affichez un message de bienvenue",
      description: language === "en" 
        ? "Write a function that prints 'Hello, Portfolio!'" 
        : "Écrivez une fonction qui affiche 'Bonjour, Portfolio!'",
      template: "function welcomeMessage() {\n  // Write your code here\n}",
      solution: /console\.log\(['"]Hello,\s*Portfolio!['"]|['"]Bonjour,\s*Portfolio!['"]\)/
    },
    {
      title: language === "en" ? "Calculate the sum" : "Calculez la somme",
      description: language === "en"
        ? "Write a function that returns the sum of two numbers"
        : "Écrivez une fonction qui renvoie la somme de deux nombres",
      template: "function sum(a, b) {\n  // Write your code here\n}",
      solution: /return\s+a\s*\+\s*b|a\s*\+\s*b/
    },
    {
      title: language === "en" ? "Filter even numbers" : "Filtrez les nombres pairs",
      description: language === "en"
        ? "Write a function that filters even numbers from an array"
        : "Écrivez une fonction qui filtre les nombres pairs d'un tableau",
      template: "function filterEven(numbers) {\n  // Write your code here\n}",
      solution: /return\s+numbers\.filter\(\s*\w+\s*=>\s*\w+\s*%\s*2\s*===?\s*0\)|numbers\.filter\(\s*\w+\s*=>\s*\w+\s*%\s*2\s*===?\s*0\)/
    }
  ];

  useEffect(() => {
    // Randomly select a challenge
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);
    setCode(randomChallenge.template);
  }, [language]);

  const checkSolution = () => {
    setIsSubmitting(true);
    
    // Simulate checking
    setTimeout(() => {
      const result = challenge.solution.test(code);
      setIsCorrect(result);
      
      if (result) {
        toast({
          title: t.codingChallenge.success,
          description: t.codingChallenge.successMessage,
        });
        
        // Short delay before completing
        setTimeout(() => {
          onComplete();
        }, 1500);
      } else {
        toast({
          title: t.codingChallenge.error,
          description: t.codingChallenge.errorMessage,
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  const selectNewChallenge = () => {
    let newChallenge;
    do {
      newChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    } while (newChallenge.title === challenge.title);
    
    setChallenge(newChallenge);
    setCode(newChallenge.template);
    setIsCorrect(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className={`${
        isDark 
          ? "bg-gray-900/95 text-white border border-purple-500/20" 
          : "bg-white/95 text-gray-800 border border-purple-200"
        } rounded-xl p-8 shadow-xl w-full max-w-4xl relative animate-fade-in`}>
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
          {t.codingChallenge.title}
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
          <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{challenge.description}</p>
          
          <div className="flex justify-end mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={selectNewChallenge}
              disabled={isSubmitting}
              className={`flex items-center gap-1 ${
                isDark 
                  ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-200" 
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <RefreshCw size={16} />
              {t.codingChallenge.newChallenge}
            </Button>
          </div>
          
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full min-h-[220px] p-4 font-mono text-sm rounded-lg focus:outline-none focus:ring-2 ${
                isCorrect === true 
                  ? `border-2 border-green-500 focus:ring-green-500/20 ${isDark ? "bg-green-950/30" : "bg-green-50"}` 
                  : isCorrect === false 
                    ? `border-2 border-red-500 focus:ring-red-500/20 ${isDark ? "bg-red-950/30" : "bg-red-50"}` 
                    : `border border-gray-600 focus:ring-purple-500/20 ${isDark ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-800"}`
              }`}
              disabled={isSubmitting}
              spellCheck="false"
            />
            
            {isSubmitting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 dark:bg-black/40 rounded-lg">
                <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
            className={`${
              isDark 
                ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-200" 
                : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {t.codingChallenge.skip}
          </Button>
          
          <Button 
            onClick={checkSolution}
            disabled={isSubmitting}
            className={`flex items-center gap-2 ${
              isDark 
                ? "bg-purple-700 hover:bg-purple-600 text-white" 
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <Check size={18} />
            {t.codingChallenge.submit}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodingChallengeModal;

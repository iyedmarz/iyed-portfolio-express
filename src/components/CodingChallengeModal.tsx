
import { useState, useEffect } from "react";
import { X, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

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
          title: language === "en" ? "Success!" : "Succès !",
          description: language === "en" 
            ? "Your solution is correct!" 
            : "Votre solution est correcte !",
        });
        
        // Short delay before completing
        setTimeout(() => {
          onComplete();
        }, 1500);
      } else {
        toast({
          title: language === "en" ? "Not quite right" : "Pas tout à fait",
          description: language === "en" 
            ? "Try again or select another challenge" 
            : "Essayez à nouveau ou sélectionnez un autre défi",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {language === "en" ? "Coding Challenge" : "Défi de Codage"}
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">{challenge.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{challenge.description}</p>
          
          <div className="flex justify-end mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={selectNewChallenge}
              disabled={isSubmitting}
              className="flex items-center gap-1"
            >
              <RefreshCw size={16} />
              {language === "en" ? "New Challenge" : "Nouveau Défi"}
            </Button>
          </div>
          
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full min-h-[200px] p-4 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 ${
                isCorrect === true 
                  ? "border-green-500 focus:ring-green-500/20" 
                  : isCorrect === false 
                    ? "border-red-500 focus:ring-red-500/20" 
                    : "border-gray-300 dark:border-gray-600 focus:ring-primary/20"
              } bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}
              disabled={isSubmitting}
            />
            
            {isSubmitting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/20 rounded-md">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            {language === "en" ? "Skip Challenge" : "Ignorer le Défi"}
          </Button>
          
          <Button 
            onClick={checkSolution}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Check size={18} />
            {language === "en" ? "Submit Solution" : "Soumettre la Solution"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodingChallengeModal;

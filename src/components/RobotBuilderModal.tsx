import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { X, Cpu, Circle, BatteryFull, Eye, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { translations } from "@/utils/translations";

interface RobotPart {
  id: string;
  name: string;
  icon: JSX.Element;
  placed: boolean;
  position?: { x: number; y: number };
  targetZone: { x: number; y: number; radius: number };
}

interface RobotBuilderModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const RobotBuilderModal = ({ onClose, onComplete }: RobotBuilderModalProps) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language as "en" | "fr"];
  const isDark = theme === "dark";

  const [draggedPart, setDraggedPart] = useState<string | null>(null);
  const [robotParts, setRobotParts] = useState<RobotPart[]>([
    {
      id: "brain",
      name: language === "en" ? "Brain" : "Contrôleur",
      icon: <Cpu className="h-8 w-8" />,
      placed: false,
      targetZone: { x: 20, y: 18, radius: 15 },
    },
    {
      id: "wheels",
      name: language === "en" ? "Wheels" : "Roues",
      icon: <Circle className="h-8 w-8" />,
      placed: false,
      targetZone: { x: 50, y: 90, radius: 15 },
    },
    {
      id: "sensors",
      name: language === "en" ? "Sensors" : "Capteurs",
      icon: <Eye className="h-8 w-8" />,
      placed: false,
      targetZone: { x: 80, y: 18, radius: 15 },
    },
    {
      id: "battery",
      name: language === "en" ? "Power Source" : "Source d'énergie",
      icon: <BatteryFull className="h-8 w-8" />,
      placed: false,
      targetZone: { x: 80, y: 55, radius: 15 },
    },
    {
      id: "hand",
      name: language === "en" ? "Actuators" : "Actionneurs",
      icon: <Hand className="h-8 w-8" />,
      placed: false,
      targetZone: { x: 20, y: 75, radius: 15 },
    },
  ]);

  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dropFeedback, setDropFeedback] = useState<{
    message: string;
    isSuccess: boolean;
  } | null>(null);

  useEffect(() => {
    // Check if all parts are placed
    const allPlaced = robotParts.every((part) => part.placed);
    if (allPlaced && !isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      toast({
        title: language === "en" ? "Robot completed!" : "Robot terminé !",
        description:
          language === "en"
            ? "Your robot is ready to assist you"
            : "Votre robot est prêt à vous assister",
      });

      // Import and trigger confetti effect
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: isDark
            ? ["#8B5CF6", "#C084FC", "#D8B4FE"]
            : ["#8B5CF6", "#A855F7", "#7C3AED"],
        });
      });
    }
  }, [robotParts, isComplete, language, isDark]);

  useEffect(() => {
    if (dropFeedback) {
      const timer = setTimeout(() => {
        setDropFeedback(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [dropFeedback]);

  const handleDragStart = (partId: string) => {
    setDraggedPart(partId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPart) return;

    const assemblyArea = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - assemblyArea.left) / assemblyArea.width) * 100;
    const y = ((e.clientY - assemblyArea.top) / assemblyArea.height) * 100;

    // Find the part being dragged
    const part = robotParts.find((p) => p.id === draggedPart);
    if (!part) return;

    const distance = Math.sqrt(
      Math.pow(x - part.targetZone.x, 2) + Math.pow(y - part.targetZone.y, 2)
    );

    if (distance <= part.targetZone.radius) {
      // Update the part's position to the center of the target zone
      setRobotParts((prevParts) =>
        prevParts.map((p) =>
          p.id === draggedPart
            ? {
                ...p,
                placed: true,
                position: { x: p.targetZone.x, y: p.targetZone.y },
              }
            : p
        )
      );
      setDropFeedback({
        message: `${part.name} ${
          language === "en" ? "placed correctly!" : "placé correctement !"
        }`,
        isSuccess: true,
      });
    } else {
      setDropFeedback({
        message:
          language === "en"
            ? `Try placing the ${part.name.toLowerCase()} in its correct position`
            : `Essayez de placer ${part.name.toLowerCase()} dans sa position correcte`,
        isSuccess: false,
      });
    }

    setDraggedPart(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={`${
          isDark
            ? "bg-gray-900/95 text-white border border-purple-500/20"
            : "bg-white/95 text-gray-800 border border-purple-200"
        } rounded-xl p-8 shadow-xl w-full max-w-4xl relative animate-fade-in`}
      >
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
          {t.buildRobotTitle || "Build Your Robot"}
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div
            className={`${
              isDark
                ? "bg-gray-800/80 border border-gray-700"
                : "bg-gray-100 border border-gray-200"
            } p-4 rounded-xl flex flex-wrap gap-4 md:w-1/3`}
          >
            <h3 className="w-full text-lg font-semibold">
              {language === "en" ? "Parts" : "Pièces"}
            </h3>
            {robotParts.map(
              (part) =>
                !part.placed && (
                  <div
                    key={part.id}
                    draggable
                    onDragStart={() => handleDragStart(part.id)}
                    className={`flex flex-col items-center justify-center ${
                      isDark
                        ? "bg-gray-700 hover:bg-gray-600 shadow-purple-800/20"
                        : "bg-white hover:bg-gray-50 shadow-purple-300/20"
                    } p-3 rounded-lg shadow-md hover:shadow-lg cursor-grab transition-all animate-fade-in-slow`}
                  >
                    <div className="text-purple-500">{part.icon}</div>
                    <span
                      className={`mt-1 text-sm text-center ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {part.name}
                    </span>
                  </div>
                )
            )}
            {robotParts.every((part) => part.placed) && (
              <div className="w-full text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                {language === "en"
                  ? "All parts used!"
                  : "Toutes les pièces utilisées !"}
              </div>
            )}
          </div>

          {/* Robot assembly area */}
          <div
            className={`${
              isDark
                ? "bg-gray-800/60 border border-gray-700"
                : "bg-gray-200/60 border border-gray-300"
            } rounded-xl flex-1 h-96 md:h-[450px] relative overflow-hidden`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              backgroundImage: "url('/lovable-uploads/robot2.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {dropFeedback && (
              <div
                className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-medium z-10 ${
                  dropFeedback.isSuccess
                    ? "bg-green-500"
                    : isDark
                    ? "bg-red-500"
                    : "bg-red-500"
                } animate-fade-in`}
              >
                {dropFeedback.message}
              </div>
            )}

            {/* Target zones */}
            {robotParts.map(
              (part) =>
                !part.placed && (
                  <div
                    key={`target-${part.id}`}
                    className="absolute border-2 border-dashed border-purple-500 animate-pulse z-10"
                    style={{
                      left: `${part.targetZone.x}%`,
                      top: `${part.targetZone.y}%`,
                      width: `${part.targetZone.radius * 2}px`,
                      height: `${part.targetZone.radius * 2}px`,
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-purple-500 whitespace-nowrap font-medium">
                      {part.name}
                    </span>
                  </div>
                )
            )}

            {/* Placed parts */}
            {robotParts.map(
              (part) =>
                part.placed &&
                part.position && (
                  <div
                    key={part.id}
                    className="absolute transition-all duration-300 animate-rev-up z-20"
                    style={{
                      left: `${part.position.x}%`,
                      top: `${part.position.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className={`${
                        isDark
                          ? "text-purple-400 bg-gray-800/80"
                          : "text-purple-600 bg-white/80"
                      } rounded-full p-1`}
                    >
                      {part.icon}
                    </div>
                    <span className="sr-only">{part.name}</span>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className={`${
              isDark
                ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-200"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {t.codingChallenge?.skip || "Skip Challenge"}
          </Button>

          {isComplete ? (
            <Button
              onClick={onComplete}
              className={` ${
                isDark
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
              variant="default"
            >
              {t.enterPortfolio || "Enter Portfolio"}
            </Button>
          ) : (
            <div
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {language === "en"
                ? "Place all 5 robot parts to continue"
                : "Placez les 5 pièces du robot pour continuer"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RobotBuilderModal;

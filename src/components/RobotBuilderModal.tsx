import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { X, Cpu, Circle, BatteryFull, Eye, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [draggedPart, setDraggedPart] = useState<string | null>(null);
  const [robotParts, setRobotParts] = useState<RobotPart[]>([
    { 
      id: "brain", 
      name: "Brain (Contrôleur)", 
      icon: <Cpu className="h-8 w-8" />, 
      placed: false,
      targetZone: { x: 20, y: 18, radius: 15 } 
    },
    { 
      id: "wheels", 
      name: "Wheels (Roues)", 
      icon: <Circle className="h-8 w-8" />, 
      placed: false,
      targetZone: { x: 50, y: 90, radius: 15 } 
    },
    { 
      id: "sensors", 
      name: "Sensors (Capteurs)", 
      icon: <Eye className="h-8 w-8" />, 
      placed: false,
      targetZone: { x: 80, y: 18, radius: 15 } 
    },
    { 
      id: "battery", 
      name: "Power Source (Source d'énergie)", 
      icon: <BatteryFull className="h-8 w-8" />, 
      placed: false,
      targetZone: { x: 80, y: 55, radius: 15 } 
    },
    { 
      id: "hand", 
      name: "Actuators (Actionneurs)", 
      icon: <Hand className="h-8 w-8" />, 
      placed: false,
      targetZone: { x: 20, y: 75, radius: 15 } 
    },
  ]);
  
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dropFeedback, setDropFeedback] = useState<{ message: string; isSuccess: boolean } | null>(null);

  useEffect(() => {
    const allPlaced = robotParts.every(part => part.placed);
    if (allPlaced && !isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      toast({
        title: "Robot completed!",
        description: "Your robot is ready to assist you",
      });
      
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }
  }, [robotParts, isComplete]);

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

    const part = robotParts.find(p => p.id === draggedPart);
    if (!part) return;

    const distance = Math.sqrt(
      Math.pow(x - part.targetZone.x, 2) + 
      Math.pow(y - part.targetZone.y, 2)
    );

    if (distance <= part.targetZone.radius) {
      setRobotParts(prevParts => 
        prevParts.map(p => 
          p.id === draggedPart 
            ? { ...p, placed: true, position: { x: p.targetZone.x, y: p.targetZone.y } } 
            : p
        )
      );
      setDropFeedback({
        message: `${part.name} placed correctly!`,
        isSuccess: true
      });
    } else {
      setDropFeedback({
        message: `Try placing the ${part.name.toLowerCase()} in its correct position`,
        isSuccess: false
      });
    }

    setDraggedPart(null);
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
          Build Your Robot to Unlock Portfolio
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex flex-wrap gap-4 md:w-1/3">
            <h3 className="w-full text-lg font-semibold dark:text-white">Parts</h3>
            {robotParts.map((part) => (
              !part.placed && (
                <div
                  key={part.id}
                  draggable
                  onDragStart={() => handleDragStart(part.id)}
                  className="flex flex-col items-center justify-center bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm hover:shadow-md cursor-grab transition-shadow animate-fade-in-slow"
                >
                  <div className="text-primary dark:text-primary-foreground">
                    {part.icon}
                  </div>
                  <span className="mt-1 text-sm text-center dark:text-gray-200">{part.name}</span>
                </div>
              )
            ))}
            {robotParts.every(part => part.placed) && (
              <div className="w-full text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                All parts used!
              </div>
            )}
          </div>
          
          <div 
            className="bg-gray-200 dark:bg-gray-600 rounded-lg flex-1 h-96 md:h-[450px] relative overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              backgroundImage: "url('/lovable-uploads/98a59aec-8be9-4fea-87f1-31b6558bd709.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
            {dropFeedback && (
              <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-medium z-10 ${
                dropFeedback.isSuccess ? 'bg-green-500' : 'bg-red-500'
              } animate-fade-in`}>
                {dropFeedback.message}
              </div>
            )}
            
            {robotParts.map((part) => (
              !part.placed && (
                <div
                  key={`target-${part.id}`}
                  className="absolute border-2 border-dashed border-primary animate-pulse z-10"
                  style={{ 
                    left: `${part.targetZone.x}%`, 
                    top: `${part.targetZone.y}%`,
                    width: `${part.targetZone.radius * 2}px`,
                    height: `${part.targetZone.radius * 2}px`,
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-primary dark:text-primary-foreground whitespace-nowrap">
                    {part.name}
                  </span>
                </div>
              )
            ))}
            
            {robotParts.map((part) => (
              part.placed && part.position && (
                <div
                  key={part.id}
                  className="absolute transition-all duration-300 animate-rev-up z-20"
                  style={{ 
                    left: `${part.position.x}%`, 
                    top: `${part.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="text-primary dark:text-primary-foreground bg-white/80 dark:bg-gray-800/80 rounded-full p-1">
                    {part.icon}
                  </div>
                  <span className="sr-only">{part.name}</span>
                </div>
              )
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          {isComplete ? (
            <Button 
              onClick={onComplete}
              className="animate-rev-up"
              variant="default"
            >
              Enter Portfolio
            </Button>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Place all 5 robot parts to continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RobotBuilderModal;

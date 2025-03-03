
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { X, Cpu, Circle, Circle2, BatteryFull, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RobotPart {
  id: string;
  name: string;
  icon: JSX.Element;
  placed: boolean;
  position?: { x: number; y: number };
}

interface RobotBuilderModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const RobotBuilderModal = ({ onClose, onComplete }: RobotBuilderModalProps) => {
  const [draggedPart, setDraggedPart] = useState<string | null>(null);
  const [robotParts, setRobotParts] = useState<RobotPart[]>([
    { id: "cpu", name: "CPU", icon: <Cpu className="h-8 w-8" />, placed: false },
    { id: "wheels", name: "Wheels", icon: <Circle className="h-8 w-8" />, placed: false },
    { id: "sensors", name: "Sensors", icon: <Eye className="h-8 w-8" />, placed: false },
    { id: "battery", name: "Battery", icon: <BatteryFull className="h-8 w-8" />, placed: false },
    { id: "antenna", name: "Antenna", icon: <Circle2 className="h-8 w-8" />, placed: false },
  ]);
  
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Check if all parts are placed
    const allPlaced = robotParts.every(part => part.placed);
    if (allPlaced && !isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      toast({
        title: "Robot completed!",
        description: "Your robot is ready to assist you",
      });
      
      // Import and trigger confetti effect
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }
  }, [robotParts, isComplete]);

  const handleDragStart = (partId: string) => {
    setDraggedPart(partId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPart) return;

    // Get the position in the robot assembly area
    const assemblyArea = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - assemblyArea.left) / assemblyArea.width) * 100;
    const y = ((e.clientY - assemblyArea.top) / assemblyArea.height) * 100;

    // Update the part's position
    setRobotParts(prevParts => 
      prevParts.map(part => 
        part.id === draggedPart 
          ? { ...part, placed: true, position: { x, y } } 
          : part
      )
    );

    setDraggedPart(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-3xl relative">
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
          {/* Parts inventory */}
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
          
          {/* Robot assembly area */}
          <div 
            className="bg-gray-200 dark:bg-gray-600 rounded-lg flex-1 h-64 md:h-auto relative overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-500 text-center">
                {robotParts.some(part => part.placed) ? "" : "Drag and drop parts here"}
              </div>
            </div>
            
            {/* Robot body outline */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-48 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg"></div>
            
            {/* Placed parts */}
            {robotParts.map((part) => (
              part.placed && part.position && (
                <div
                  key={part.id}
                  className="absolute transition-all duration-300 animate-rev-up"
                  style={{ 
                    left: `${part.position.x}%`, 
                    top: `${part.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="text-primary dark:text-primary-foreground">
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

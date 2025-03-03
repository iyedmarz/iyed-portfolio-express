
import { createContext, useContext, useState, ReactNode } from "react";

interface GameContextType {
  robotCompleted: boolean;
  setRobotCompleted: (completed: boolean) => void;
  showedRobotBuilder: boolean;
  setShowedRobotBuilder: (showed: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [robotCompleted, setRobotCompleted] = useState<boolean>(false);
  const [showedRobotBuilder, setShowedRobotBuilder] = useState(false);

  return (
    <GameContext.Provider value={{ 
      robotCompleted, 
      setRobotCompleted, 
      showedRobotBuilder, 
      setShowedRobotBuilder 
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

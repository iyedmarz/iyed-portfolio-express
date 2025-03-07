
import { createContext, useContext, useState, ReactNode } from "react";

interface GameContextType {
  robotCompleted: boolean;
  setRobotCompleted: (completed: boolean) => void;
  showedRobotBuilder: boolean;
  setShowedRobotBuilder: (showed: boolean) => void;
  codingCompleted: boolean;
  setCodingCompleted: (completed: boolean) => void;
  entryOption: "robot" | "coding" | "direct" | null;
  setEntryOption: (option: "robot" | "coding" | "direct" | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [robotCompleted, setRobotCompleted] = useState<boolean>(false);
  const [showedRobotBuilder, setShowedRobotBuilder] = useState(false);
  const [codingCompleted, setCodingCompleted] = useState<boolean>(false);
  const [entryOption, setEntryOption] = useState<"robot" | "coding" | "direct" | null>(null);

  return (
    <GameContext.Provider value={{ 
      robotCompleted, 
      setRobotCompleted, 
      showedRobotBuilder, 
      setShowedRobotBuilder,
      codingCompleted,
      setCodingCompleted,
      entryOption,
      setEntryOption
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

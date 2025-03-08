
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GameContextType {
  robotCompleted: boolean;
  setRobotCompleted: (completed: boolean) => void;
  showedRobotBuilder: boolean;
  setShowedRobotBuilder: (showed: boolean) => void;
  codingCompleted: boolean;
  setCodingCompleted: (completed: boolean) => void;
  entryOption: "robot" | "coding" | "direct" | null;
  setEntryOption: (option: "robot" | "coding" | "direct" | null) => void;
  resetEntryState: () => void; // For page reload
  entryOptionsShownInSession: boolean;
  setEntryOptionsShownInSession: (shown: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage if available
  const [robotCompleted, setRobotCompleted] = useState<boolean>(() => {
    return localStorage.getItem("robotCompleted") === "true";
  });
  
  const [showedRobotBuilder, setShowedRobotBuilder] = useState(() => {
    return localStorage.getItem("showedRobotBuilder") === "true";
  });
  
  const [codingCompleted, setCodingCompleted] = useState<boolean>(() => {
    return localStorage.getItem("codingCompleted") === "true";
  });
  
  const [entryOption, setEntryOption] = useState<"robot" | "coding" | "direct" | null>(() => {
    const saved = localStorage.getItem("entryOption");
    return (saved as "robot" | "coding" | "direct" | null) || null;
  });

  // Track if entry options have been shown in the current session
  // This won't persist in localStorage - it's just for the current session
  const [entryOptionsShownInSession, setEntryOptionsShownInSession] = useState(false);

  // Function to reset entry state
  const resetEntryState = () => {
    setShowedRobotBuilder(false);
    localStorage.removeItem("showedRobotBuilder");
  };

  // Save state to localStorage when changed
  useEffect(() => {
    localStorage.setItem("robotCompleted", robotCompleted.toString());
  }, [robotCompleted]);

  useEffect(() => {
    localStorage.setItem("showedRobotBuilder", showedRobotBuilder.toString());
  }, [showedRobotBuilder]);

  useEffect(() => {
    localStorage.setItem("codingCompleted", codingCompleted.toString());
  }, [codingCompleted]);

  useEffect(() => {
    if (entryOption) {
      localStorage.setItem("entryOption", entryOption);
    }
  }, [entryOption]);

  return (
    <GameContext.Provider value={{ 
      robotCompleted, 
      setRobotCompleted, 
      showedRobotBuilder, 
      setShowedRobotBuilder,
      codingCompleted,
      setCodingCompleted,
      entryOption,
      setEntryOption,
      resetEntryState,
      entryOptionsShownInSession,
      setEntryOptionsShownInSession
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

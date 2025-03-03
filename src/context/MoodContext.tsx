
import { createContext, useContext, useState, ReactNode } from "react";

type Mood = 'happy' | 'neutral' | 'surprised' | 'sad' | null;

interface MoodContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
  showedMoodSelector: boolean;
  setShowedMoodSelector: (showed: boolean) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [mood, setMood] = useState<Mood>(null);
  const [showedMoodSelector, setShowedMoodSelector] = useState(false);

  return (
    <MoodContext.Provider value={{ mood, setMood, showedMoodSelector, setShowedMoodSelector }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};

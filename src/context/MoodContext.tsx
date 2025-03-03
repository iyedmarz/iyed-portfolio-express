
import { createContext, useContext, useState, ReactNode } from "react";

type Mood = 'happy' | 'neutral' | 'surprised' | 'sad' | null;

interface MoodContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
  showedCamera: boolean;
  setShowedCamera: (showed: boolean) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [mood, setMood] = useState<Mood>(null);
  const [showedCamera, setShowedCamera] = useState(false);

  return (
    <MoodContext.Provider value={{ mood, setMood, showedCamera, setShowedCamera }}>
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

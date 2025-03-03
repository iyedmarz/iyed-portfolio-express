
import React, { useState } from 'react';
import { Smile, Meh, Frown, PartyPopper, Lightbulb } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface MoodSelectorModalProps {
  onClose: () => void;
  onMoodSelected: (mood: 'happy' | 'neutral' | 'surprised' | 'sad') => void;
}

const MoodSelectorModal = ({ onClose, onMoodSelected }: MoodSelectorModalProps) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'surprised' | 'sad' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMoodSelect = (mood: 'happy' | 'neutral' | 'surprised' | 'sad') => {
    setSelectedMood(mood);
    setIsAnimating(true);
    
    // Play mood-specific animations
    if (mood === 'happy') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    // After animation completes, proceed
    setTimeout(() => {
      onMoodSelected(mood);
    }, 1500);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${theme === 'dark' ? 'bg-black/70' : 'bg-black/50'}`}>
      <div 
        className={cn(
          "relative w-full max-w-md p-6 rounded-xl shadow-xl transition-all duration-300",
          isAnimating && "scale-105",
          theme === "dark" 
            ? "bg-[#0F0F2D] border border-purple-500/20" 
            : "bg-white border border-purple-200"
        )}
      >
        <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {language === 'en' ? 'How are you feeling today?' : 'Comment vous sentez-vous aujourd\'hui?'}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Happy */}
          <button
            onClick={() => handleMoodSelect('happy')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 transform hover:scale-105",
              selectedMood === 'happy' ? "ring-2 ring-yellow-400 scale-105" : "",
              theme === "dark" 
                ? "bg-purple-900/50 hover:bg-purple-800/50" 
                : "bg-purple-100 hover:bg-purple-200"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all",
              theme === "dark" ? "bg-yellow-400/20" : "bg-yellow-100"
            )}>
              <Smile 
                size={36} 
                className={cn(
                  "text-yellow-400 transition-all",
                  selectedMood === 'happy' && "animate-bounce"
                )} 
              />
            </div>
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              {language === 'en' ? 'Happy' : 'Joyeux'}
            </span>
          </button>
          
          {/* Neutral */}
          <button
            onClick={() => handleMoodSelect('neutral')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 transform hover:scale-105",
              selectedMood === 'neutral' ? "ring-2 ring-blue-400 scale-105" : "",
              theme === "dark" 
                ? "bg-purple-900/50 hover:bg-purple-800/50" 
                : "bg-purple-100 hover:bg-purple-200"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              theme === "dark" ? "bg-blue-400/20" : "bg-blue-100"
            )}>
              <Meh 
                size={36} 
                className={cn(
                  "text-blue-400 transition-all",
                  selectedMood === 'neutral' && "animate-pulse"
                )} 
              />
            </div>
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              {language === 'en' ? 'Neutral' : 'Neutre'}
            </span>
          </button>
          
          {/* Surprised */}
          <button
            onClick={() => handleMoodSelect('surprised')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 transform hover:scale-105",
              selectedMood === 'surprised' ? "ring-2 ring-green-400 scale-105" : "",
              theme === "dark" 
                ? "bg-purple-900/50 hover:bg-purple-800/50" 
                : "bg-purple-100 hover:bg-purple-200"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              theme === "dark" ? "bg-green-400/20" : "bg-green-100"
            )}>
              <Lightbulb 
                size={36} 
                className={cn(
                  "text-green-400 transition-all",
                  selectedMood === 'surprised' && "animate-spin-slow"
                )} 
              />
            </div>
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              {language === 'en' ? 'Surprised' : 'Surpris'}
            </span>
          </button>
          
          {/* Sad */}
          <button
            onClick={() => handleMoodSelect('sad')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 transform hover:scale-105",
              selectedMood === 'sad' ? "ring-2 ring-red-400 scale-105" : "",
              theme === "dark" 
                ? "bg-purple-900/50 hover:bg-purple-800/50" 
                : "bg-purple-100 hover:bg-purple-200"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              theme === "dark" ? "bg-red-400/20" : "bg-red-100"
            )}>
              <Frown 
                size={36} 
                className={cn(
                  "text-red-400 transition-all",
                  selectedMood === 'sad' && "animate-pulse"
                )} 
              />
            </div>
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              {language === 'en' ? 'Sad' : 'Triste'}
            </span>
          </button>
        </div>
        
        <div className="flex justify-between gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className={`flex-1 ${theme === 'dark' ? 'border-purple-500/20 text-purple-400' : 'border-purple-200 text-purple-600'}`}
          >
            {language === 'en' ? 'Skip' : 'Passer'}
          </Button>
          
          <Button
            onClick={() => selectedMood ? onMoodSelected(selectedMood) : onMoodSelected('neutral')}
            disabled={!selectedMood && !isAnimating}
            className={`flex-1 ${
              theme === 'dark' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {language === 'en' ? 'Enter Portfolio' : 'Entrer dans le Portfolio'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelectorModal;

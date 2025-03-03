
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useMood } from '@/context/MoodContext';
import { Smile, Meh, Frown, PartyPopper, Sparkles, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

const MoodWelcome = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { mood } = useMood();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (mood === 'happy') {
      // Trigger confetti for happy mood
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Hide the welcome message after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [mood]);

  if (!mood || !visible) return null;

  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 ${
      theme === 'dark' 
        ? 'bg-purple-900/80 backdrop-blur-md border border-purple-500/30' 
        : 'bg-purple-100/90 backdrop-blur-md border border-purple-300/50'
    } px-6 py-4 rounded-xl shadow-lg animate-fade-in max-w-md`}>
      <div className="flex items-center gap-3">
        {mood === 'happy' && <PartyPopper className="text-yellow-400" size={28} />}
        {mood === 'neutral' && <Lightbulb className="text-blue-400" size={28} />}
        {mood === 'surprised' && <Sparkles className="text-green-400" size={28} />}
        {mood === 'sad' && <Smile className="text-red-400" size={28} />}
        
        <div>
          <h3 className={`font-bold text-lg ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'en' ? getEnglishGreeting(mood) : getFrenchGreeting(mood)}
          </h3>
          <p className={`${
            theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
          }`}>
            {language === 'en' ? getEnglishMessage(mood) : getFrenchMessage(mood)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper functions for different messages based on mood
function getEnglishGreeting(mood: string) {
  switch (mood) {
    case 'happy':
      return 'You look happy today!';
    case 'neutral':
      return 'Welcome to my portfolio!';
    case 'surprised':
      return 'Surprised to see you!';
    case 'sad':
      return 'Let me cheer you up!';
    default:
      return 'Welcome!';
  }
}

function getFrenchGreeting(mood: string) {
  switch (mood) {
    case 'happy':
      return 'Vous semblez heureux aujourd\'hui!';
    case 'neutral':
      return 'Bienvenue sur mon portfolio!';
    case 'surprised':
      return 'Surpris de vous voir!';
    case 'sad':
      return 'Laissez-moi vous remonter le moral!';
    default:
      return 'Bienvenue!';
  }
}

function getEnglishMessage(mood: string) {
  switch (mood) {
    case 'happy':
      return 'Your happiness brings positive energy to my portfolio!';
    case 'neutral':
      return 'Looking forward to showing you my work and projects!';
    case 'surprised':
      return 'I hope my projects will impress you even more!';
    case 'sad':
      return 'I hope browsing through my creative work will brighten your day!';
    default:
      return 'Thanks for visiting my portfolio!';
  }
}

function getFrenchMessage(mood: string) {
  switch (mood) {
    case 'happy':
      return 'Votre bonheur apporte de l\'énergie positive à mon portfolio!';
    case 'neutral':
      return 'J\'ai hâte de vous montrer mon travail et mes projets!';
    case 'surprised':
      return 'J\'espère que mes projets vous impressionneront encore plus!';
    case 'sad':
      return 'J\'espère que parcourir mon travail créatif égayera votre journée!';
    default:
      return 'Merci de visiter mon portfolio!';
  }
}

export default MoodWelcome;

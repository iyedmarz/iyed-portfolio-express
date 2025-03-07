
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get the user's preferred color scheme from OS/browser settings
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Initialize with saved theme or fall back to preferred scheme, defaulting to dark
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || (prefersDarkMode ? "dark" : "dark");
  });

  // Apply theme to body and save to localStorage when changed
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
    
    // Apply theme to scrollbar
    const scrollbars = document.querySelectorAll('::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb');
    scrollbars.forEach(scrollbar => {
      scrollbar.classList.remove('dark', 'light');
      scrollbar.classList.add(theme);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

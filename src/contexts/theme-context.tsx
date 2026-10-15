import { createContext, useContext, useState, type PropsWithChildren } from 'react';

export type ThemeMode = 'light' | 'dark';

type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  button: string;
  buttonText: string;
  border: string;
};

type ThemeContextValue = {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const themeColors: Record<ThemeMode, ThemeColors> = {
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#172033',
    textMuted: '#536176',
    button: '#2563EB',
    buttonText: '#FFFFFF',
    border: '#DCE3ED',
  },
  dark: {
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    textMuted: '#CBD5E1',
    button: '#93C5FD',
    buttonText: '#172033',
    border: '#374151',
  },
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: themeColors[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}

import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const colors = {
  light: {
    background: "#FFFFFF",
    text: "#000000",
    primary: "#007AFF",
    secondary: "#5856D6",
    card: "#F2F2F2",
    border: "#E5E5E5",
    placeholder: "#888",
  },
  dark: {
    background: "#000000",
    text: "#FFFFFF",
    primary: "#0A84FF",
    secondary: "#5E5CE6",
    card: "#1C1C1E",
    border: "#38383A",
    placeholder: "#888",
  },
};

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  colors: typeof colors.light;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  isDark: false,
  colors: colors.light,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemColorScheme || "light");

  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";
  const themeColors = colors[theme];

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark, colors: themeColors }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);

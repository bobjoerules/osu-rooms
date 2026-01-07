import { createContext, useContext, useMemo, ReactNode } from "react";
import { useColorScheme } from "react-native";

export type Theme = {
  background: string;
  card: string;
  text: string;
  subtext: string;
  inputBg: string;
  inputText: string;
  border: string;
  primary: string;
  destructive: string;
  link: string;
  message: string;
  placeholder: string;
  buttonText: string;
  shadowOpacity: number;
  shadowRadius: number;
};

export const lightTheme: Theme = {
  background: "#f2f2f7",
  card: "#ffffff",
  text: "#1c1c1e",
  subtext: "#3c3c4399",
  inputBg: "#f2f2f7",
  inputText: "#1c1c1e",
  border: "#d1d1d6",
  primary: "#007aff",
  destructive: "#ff3b30",
  link: "#007aff",
  message: "#ff9f0a",
  placeholder: "#8e8e93",
  buttonText: "#ffffff",
  shadowOpacity: 0.08,
  shadowRadius: 16,
};

export const darkTheme: Theme = {
  background: "#000000",
  card: "#1c1c1e",
  text: "#f2f2f7",
  subtext: "#ebebf599",
  inputBg: "#2c2c2e",
  inputText: "#f2f2f7",
  border: "#3a3a3c",
  primary: "#0a84ff",
  destructive: "#ff453a",
  link: "#0a84ff",
  message: "#ffd60a",
  placeholder: "#8e8e93",
  buttonText: "#ffffff",
  shadowOpacity: 0.25,
  shadowRadius: 18,
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const theme = useMemo(
    () => (colorScheme === "dark" ? darkTheme : lightTheme),
    [colorScheme]
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

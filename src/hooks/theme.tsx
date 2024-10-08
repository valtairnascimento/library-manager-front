import React, { createContext, useState, useContext } from "react";

import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface IThemeContextProps {
  toggleTheme(): void;
  theme: ITheme;
}

interface ITheme {
  title: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    black: string;
    gray: string;

    success: string;
    info: string;
    warning: string;
  };
}

interface ThemeLibraryProviderProps {
  children: React.ReactNode;
}

const ThemeLibraryContext = createContext<IThemeContextProps>(
  {} as IThemeContextProps
);

const ThemeLibraryProvider: React.FC<ThemeLibraryProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ITheme>(() => {
    const savedTheme = localStorage.getItem("@library-manager-front:theme");

    if (savedTheme) {
      return JSON.parse(savedTheme);
    } else {
      return dark;
    }
  });

  const toggleTheme = () => {
    if (theme.title === "dark") {
      setTheme(light);
      localStorage.setItem(
        "@library-manager-front:theme",
        JSON.stringify(light)
      );
    } else {
      setTheme(dark);
      localStorage.setItem(
        "@library-manager-front:theme",
        JSON.stringify(dark)
      );
    }
  };

  return (
    <ThemeLibraryContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeLibraryContext.Provider>
  );
};

function useTheme(): IThemeContextProps {
  const context = useContext(ThemeLibraryContext);

  return context;
}

export { ThemeLibraryProvider, useTheme };

import { ThemeProvider } from "@emotion/react";
import type { ReactNode } from "react";

import { GlobalStyles } from "@/theme/GlobalStyles";
import { theme } from "@/theme/theme";
import "@/theme/variables/default.css";
import "@/theme/variables/tokens.css";

export interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

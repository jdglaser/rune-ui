import { ThemeProvider } from "@emotion/react";
import type { ReactNode } from "react";

import { GlobalStyles } from "@/theme/globalStyles";
import { theme } from "@/theme/theme";
import "@/theme/variables/tokens.css";
import "@/theme/variables/default.css";

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

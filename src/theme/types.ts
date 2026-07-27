import type { theme } from "@/theme/theme";

export type AppTheme = typeof theme;
export type SpacingKey = keyof AppTheme["space"];

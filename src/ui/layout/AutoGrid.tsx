import { css, useTheme } from "@emotion/react";
import type { ComponentPropsWithoutRef } from "react";

import type { AppTheme, SpacingKey } from "@/theme";

export type AutoGridProps = ComponentPropsWithoutRef<"div"> & {
  minItemWidth?: AutoGridSize;
  gap?: SpacingKey;
};

export type AutoGridSize = keyof AppTheme["autoGrid"]["minItemWidth"];

export default function AutoGrid({
  minItemWidth = "md",
  gap = "md",
  className,
  children,
  ...rest
}: AutoGridProps) {
  const theme = useTheme();

  const autoGridStyles = css({
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.autoGrid.minItemWidth[minItemWidth]}, 100%), 1fr))`,
    gap: theme.space[gap],
  });

  return (
    <div {...rest} className={className} css={autoGridStyles}>
      {children}
    </div>
  );
}

import { css, useTheme } from "@emotion/react";
import type { ComponentPropsWithoutRef } from "react";

import type { SpacingKey } from "@/theme";

export type AutoGridProps = ComponentPropsWithoutRef<"div"> & {
  minItemWidth?: string;
  gap?: SpacingKey;
};

export default function AutoGrid({
  minItemWidth = "16rem",
  gap = "md",
  className,
  children,
  ...rest
}: AutoGridProps) {
  const theme = useTheme();

  const autoGridStyles = css({
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${minItemWidth}, 100%), 1fr))`,
    gap: theme.space[gap],
  });

  return (
    <div {...rest} className={className} css={autoGridStyles}>
      {children}
    </div>
  );
}

import { css, useTheme } from "@emotion/react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import type { SpacingKey } from "@/theme";

const alignItemsMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
} satisfies Record<string, CSSProperties["alignItems"]>;

const justifyContentMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  "space-between": "space-between",
  "space-around": "space-around",
} satisfies Record<string, CSSProperties["justifyContent"]>;

export type InlineProps = ComponentPropsWithoutRef<"div"> & {
  gap?: SpacingKey;
  align?: keyof typeof alignItemsMap;
  justify?: keyof typeof justifyContentMap;
  wrap?: boolean;
};

export default function Inline({
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  className,
  children,
  ...rest
}: InlineProps) {
  const theme = useTheme();

  const inlineStyles = css({
    display: "flex",
    flexDirection: "row",
    alignItems: alignItemsMap[align],
    justifyContent: justifyContentMap[justify],
    flexWrap: wrap ? "wrap" : "nowrap",
    gap: theme.space[gap],
  });

  return (
    <div {...rest} className={className} css={inlineStyles}>
      {children}
    </div>
  );
}

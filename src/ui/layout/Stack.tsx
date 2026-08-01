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

export type StackProps = ComponentPropsWithoutRef<"div"> & {
  gap?: SpacingKey;
  align?: keyof typeof alignItemsMap;
  justify?: keyof typeof justifyContentMap;
};

export default function Stack({
  gap = "md",
  align = "stretch",
  justify = "start",
  className,
  children,
  ...rest
}: StackProps) {
  const theme = useTheme();

  const stackStyles = css({
    display: "flex",
    flexDirection: "column",
    alignItems: alignItemsMap[align],
    justifyContent: justifyContentMap[justify],
    gap: theme.space[gap],
  });

  return (
    <div {...rest} className={className} css={stackStyles}>
      {children}
    </div>
  );
}

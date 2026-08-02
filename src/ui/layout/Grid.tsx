import { css, useTheme } from "@emotion/react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import type { SpacingKey } from "@/theme";

export type GridProps = ComponentPropsWithoutRef<"div"> & {
  columns?: CSSProperties["gridTemplateColumns"];
  rows?: CSSProperties["gridTemplateRows"];
  gap?: SpacingKey;
  columnGap?: SpacingKey;
  rowGap?: SpacingKey;
  align?: CSSProperties["alignItems"];
};

export default function Grid({
  columns,
  rows,
  gap = "md",
  align = "center",
  columnGap,
  rowGap,
  className,
  children,
  ...rest
}: GridProps) {
  const theme = useTheme();

  const gridStyles = css({
    display: "grid",
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    alignItems: align,
    gap: theme.space[gap],
    columnGap: columnGap ? theme.space[columnGap] : undefined,
    rowGap: rowGap ? theme.space[rowGap] : undefined,
  });

  return (
    <div {...rest} className={className} css={gridStyles}>
      {children}
    </div>
  );
}

import { css, useTheme } from "@emotion/react";
import type { ComponentPropsWithoutRef } from "react";

import type { AppTheme, SpacingKey } from "@/theme";

export type ContainerSize = keyof AppTheme["contentWidths"];

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
  gutter?: SpacingKey;
};

export default function Container({
  size = "normal",
  gutter = "md",
  className,
  children,
  ...rest
}: ContainerProps) {
  const theme = useTheme();

  const containerStyles = css({
    width: "100%",
    maxWidth: theme.contentWidths[size],
    marginInline: "auto",
    paddingInline: theme.space[gutter],
  });

  return (
    <div {...rest} className={className} css={containerStyles}>
      {children}
    </div>
  );
}

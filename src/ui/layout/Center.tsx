import { css } from "@emotion/react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";

export type CenterAxis = "both" | "horizontal" | "vertical";

export type CenterProps = ComponentPropsWithoutRef<"div"> & {
  axis?: CenterAxis;
  minHeight?: CSSProperties["minHeight"];
};

export default function Center({
  axis = "both",
  minHeight,
  className,
  children,
  ...rest
}: CenterProps) {
  const centerHorizontally = axis === "both" || axis === "horizontal";
  const centerVertically = axis === "both" || axis === "vertical";

  const centerStyles = css({
    display: "grid",
    justifyItems: centerHorizontally ? "center" : "stretch",
    alignItems: centerVertically ? "center" : "stretch",
    minHeight,
  });

  return (
    <div {...rest} className={className} css={centerStyles}>
      {children}
    </div>
  );
}

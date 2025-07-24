import { JSX } from "react";
import { BarProps } from "recharts";

export const CustomBottomBar = (props: BarProps): JSX.Element => {
  const fill = props.fill ?? "#000";
  const x = +(props.x ?? 0);
  const y = +(props.y ?? 0);
  const width = +(props.width ?? 0);
  const height = +(props.height ?? 0);

  const offset = 9;
  const radius = 9;

  return (
    <path
      d={`
        M ${x} ${y + offset + height}
        L ${x} ${y + offset + radius}
        Q ${x} ${y + offset} ${x + radius} ${y + offset}
        L ${x + width - radius} ${y + offset}
        Q ${x + width} ${y + offset} ${x + width} ${y + offset + radius}
        L ${x + width} ${y + offset + height}
        Z
      `}
      fill={fill}
    />
  );
};

import React from "react";

interface LineDividerProps {
  color?: string;
  width?: string;
  orientation?: "horizontal" | "vertical";
}

const LineDivider: React.FC<LineDividerProps> = ({
  color = "#E6E6E1",
  width = "100%",
  orientation = "horizontal",
}) => {
  const style =
    orientation === "horizontal"
      ? {
          width: width,
          height: "1px",
          backgroundColor: color,
        }
      : {
          width: "1px",
          height: width,
          backgroundColor: color,
        };

  return <div style={style} />;
};

export default LineDivider;

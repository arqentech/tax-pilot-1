import { ChevronRight } from "lucide-react";

interface PrimaryButtonProps {
  text: string;
  width?: string;
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function PrimaryButton({
  text,
  width = "auto",
  bgColor = "#007BFF",
  hoverColor = "#0068d6",
  textColor = "#FFFFFF",
  onClick,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      style={{
        width,
        height: "62px",
        backgroundColor: bgColor,
        color: textColor,
        boxShadow:
          "0px -3px 3px 0px #5DAAFF inset, 0px 5px 8px 0px #419CFF inset, 0px 6px 10px 0px #037BFF1A",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
      className="mt-6 rounded-full px-6 font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
      onMouseEnter={(e) =>
        !disabled && (e.currentTarget.style.backgroundColor = hoverColor)
      }
      onMouseLeave={(e) =>
        !disabled && (e.currentTarget.style.backgroundColor = bgColor)
      }
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text} <ChevronRight size={18} />
    </button>
  );
}

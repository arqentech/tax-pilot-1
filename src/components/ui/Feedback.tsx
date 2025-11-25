import { useState } from "react";

const Feedback = ({
  question = "Was this article helpful?",
  options = defaultOptions,
  onSelect,
  className = "",
}: FeedbackProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <div className={`rounded-[26px] py-8 ${className}`}>
      <h3 className="font-bricolage text-[22px] font-extrabold leading-[30px]">
        {question}
      </h3>

      <div className="mt-6 grid gap-4 grid-cols-3">
        {options.map((option) => {
          const isActive = selected === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleClick(option.value)}
              className={`
                flex h-[124px] max-w-[314px] flex-col items-center justify-center 
                rounded-[28px] border px-6 text-center transition 
                bg-[#FBFBFA] border-[#E6E6E1]
                hover:border-[#0166FF] hover:bg-[#F0F6FF]
                focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-[#0166FF] focus-visible:ring-offset-2
                ${isActive ? "border-[#0166FF] bg-[#E9F2FF]" : ""}
              `}
            >
              <img
                src={option.icon}
                alt={option.iconAlt ?? option.label}
                className="h-14 w-14"
                loading="lazy"
              />
              <span className="mt-2 text-[16px] font-semibold text-[#34352E]">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Feedback;

type FeedbackOption = {
  value: string;
  label: string;
  icon: string;
  iconAlt?: string;
};

type FeedbackProps = {
  question?: string;
  options?: FeedbackOption[];
  onSelect?: (value: string) => void;
  className?: string;
};

const defaultOptions: FeedbackOption[] = [
  {
    value: "yes",
    label: "Yes",
    icon: "/svg/feedback/yes.svg",
    iconAlt: "Happy face",
  },
  {
    value: "meh",
    label: "Meh",
    icon: "/svg/feedback/meh.svg",
    iconAlt: "Neutral face",
  },
  {
    value: "no",
    label: "No",
    icon: "/svg/feedback/no.svg",
    iconAlt: "Concerned face",
  },
];

import React, { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import {
  MinimumRequirementForm,
  startMinimumRequirement,
  validateMinimumRequirementStep,
} from "@/api/minimumRequirements.api";

interface StepState {
  stepId: number;
  form: MinimumRequirementForm;
  lastStepId: number;
}

interface MinimumRequirementsModalProps {
  serviceId: number;
  onComplete: () => void;
  onClose: () => void;
}

const MinimumRequirementsModal: React.FC<MinimumRequirementsModalProps> = ({
  serviceId,
  onComplete,
  onClose,
}) => {
  const [stepHistory, setStepHistory] = useState<StepState[]>([]);
  const [currentStep, setCurrentStep] = useState<StepState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [textAnswer, setTextAnswer] = useState("");
  const [selectAnswer, setSelectAnswer] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const results = await startMinimumRequirement(serviceId);
        if (!results.form) {
          onComplete();
          return;
        }
        const step: StepState = {
          stepId: results.step_id,
          form: results.form,
          lastStepId: results.last_step_id,
        };
        setCurrentStep(step);
        setStepHistory([step]);
      } catch {
        onComplete();
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [serviceId]);

  useEffect(() => {
    if (!isComplete) return;
    if (countdown <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isComplete, countdown, onComplete]);

  const handleAnswer = async (answer: string) => {
    if (!currentStep || isValidating) return;
    setIsValidating(true);
    setError(null);
    try {
      const results = await validateMinimumRequirementStep(
        currentStep.stepId,
        answer,
      );
      if (results.next_step === false) {
        setIsComplete(true);
      } else {
        const nextStep: StepState = {
          stepId: results.next_step.id,
          form: results.next_step,
          lastStepId: results.last_step_id,
        };
        setCurrentStep(nextStep);
        setStepHistory((prev) => [...prev, nextStep]);
        setTextAnswer("");
        setSelectAnswer("");
      }
    } catch {
      setError("* Minimum requirements not met");
    } finally {
      setIsValidating(false);
    }
  };

  const handleBack = () => {
    if (stepHistory.length <= 1) return;
    const newHistory = stepHistory.slice(0, -1);
    setStepHistory(newHistory);
    setCurrentStep(newHistory[newHistory.length - 1]);
    setError(null);
    setTextAnswer("");
    setSelectAnswer("");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-[490px] w-full flex justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#007BFF] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (isComplete) {
    return null;
  }

  if (!currentStep) return null;

  const { form, stepId, lastStepId } = currentStep;
  const showProgressBar = lastStepId > 1;
  const showBackButton = stepHistory.length > 1;
  const progress = showProgressBar ? (stepId / lastStepId) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl px-8 pt-6 pb-8 max-w-[490px] w-full shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 flex-shrink-0">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="text-[#34352E] hover:text-gray-500 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex-1">
            {showProgressBar && (
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#007BFF] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-5 flex-shrink-0 text-[#34352E] hover:text-gray-500 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-[#34352E] font-bricolage font-extrabold text-[22px] leading-[30px] mb-2">
            {form.label}
          </h2>
          <p className="text-[#9D9E98] font-archivo text-[14px] leading-[22px]">
            Minimum requirements to request the chosen service!
          </p>
        </div>

        {form.type === "yes_or_no" ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleAnswer("yes")}
              disabled={isValidating}
              className="bg-[#007BFF] text-white rounded-full px-10 py-3 font-bricolage font-extrabold text-[18px] hover:bg-[#0068d6] disabled:opacity-50 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer("no")}
              disabled={isValidating}
              className="border-2 border-gray-300 text-[#34352E] rounded-full px-10 py-3 font-bricolage font-extrabold text-[18px] hover:border-gray-400 disabled:opacity-50 transition-colors"
            >
              No
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {form.type === "text" && (
              <div>
                <input
                  type="text"
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder="Place your answer here"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#34352E] font-archivo text-[16px] focus:outline-none focus:ring-2 focus:ring-[#007BFF] placeholder:text-[#9D9E98]"
                />
              </div>
            )}

            {form.options && form.options.length > 0 && (
              <div>
                <label className="block text-[14px] font-archivo font-medium text-[#34352E] mb-1.5">
                  Select an option
                </label>
                <div className="relative">
                  <select
                    value={selectAnswer}
                    onChange={(e) => setSelectAnswer(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-[#34352E] font-archivo text-[16px] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                  >
                    <option value="">Select an option</option>
                    {form.options.map((opt, i) => {
                      const label: string =
                        typeof opt === "string" ? opt : opt.label;
                      const val: string =
                        typeof opt === "string" ? opt : opt.value;
                      return (
                        <option key={i} value={val}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <svg
                      className="w-4 h-4 text-[#9D9E98]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button
                onClick={() => handleAnswer(selectAnswer || textAnswer)}
                disabled={isValidating || (!textAnswer && !selectAnswer)}
                className="bg-[#007BFF] text-white rounded-full px-14 py-3 font-bricolage font-extrabold text-[18px] hover:bg-[#0068d6] disabled:opacity-50 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-500 font-archivo text-[14px] text-center mt-4 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default MinimumRequirementsModal;

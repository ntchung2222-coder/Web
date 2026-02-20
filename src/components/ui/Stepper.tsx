import * as React from "react";
import { cn } from "@/src/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                i < currentStep
                  ? "bg-primary border-primary text-white"
                  : i === currentStep
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-bg-input border-white/10 text-text-muted"
              )}
            >
              {i < currentStep ? <Check size={18} /> : i + 1}
            </div>
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest absolute -bottom-6 whitespace-nowrap",
                i <= currentStep ? "text-text-main" : "text-text-muted"
              )}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-4 bg-white/5 relative -top-3">
              <div
                className="absolute inset-0 bg-primary transition-all duration-500"
                style={{ width: i < currentStep ? "100%" : "0%" }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

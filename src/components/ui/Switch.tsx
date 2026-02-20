import * as React from "react";
import { cn } from "@/src/lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export function Switch({ label, className, ...props }: SwitchProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group", className)}>
      <div className="relative">
        <input type="checkbox" className="sr-only peer" {...props} />
        <div className="w-11 h-6 bg-bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-white/10" />
      </div>
      {label && <span className="text-sm font-medium text-text-body group-hover:text-text-main transition-colors">{label}</span>}
    </label>
  );
}

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full h-[var(--input-height)] rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-[var(--input-font)] text-[var(--text)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--text)] placeholder:text-[var(--text-tertiary)] focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-[3px] focus-visible:ring-[var(--primary-container)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

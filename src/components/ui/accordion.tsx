import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, title, children, defaultOpen = false, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div
      ref={ref}
      className={cn(
        "border border-[var(--border)] rounded-[var(--radius-card)] bg-[var(--bg-surface)] overflow-hidden",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-[var(--spacing-lg)] text-left font-semibold text-[var(--text)] hover:bg-[var(--bg-elevated)] transition-colors duration-200"
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[var(--primary)] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-[var(--spacing-lg)] pt-0 text-[var(--text-secondary)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-3", className)}
    {...props}
  >
    {children}
  </div>
));
Accordion.displayName = "Accordion";

export { Accordion, AccordionItem };

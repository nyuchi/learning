import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-white rounded-[var(--radius-button)] hover:brightness-110 hover:-translate-y-0.5 active:brightness-95 active:translate-y-0 shadow-[var(--shadow-base)] hover:shadow-[var(--shadow-md)]",
        destructive:
          "bg-[var(--error)] text-white rounded-[var(--radius-button)] hover:brightness-110",
        outline:
          "border-[1.5px] border-[var(--primary)] bg-transparent text-[var(--primary)] rounded-[var(--radius-button)] hover:bg-[var(--primary-container)]",
        secondary:
          "bg-[var(--bg-surface)] text-[var(--text)] border border-[var(--border)] rounded-[var(--radius-button)] hover:border-[var(--primary)]",
        ghost:
          "rounded-[var(--radius-button)] hover:bg-[var(--primary-container)] hover:text-[var(--primary)]",
        link:
          "text-[var(--primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[var(--btn-default-height)] px-5 py-2.5 text-[var(--btn-default-font)] [&_svg]:size-[var(--btn-default-icon)]",
        sm: "h-[var(--btn-sm-height)] px-3 py-1.5 text-[var(--btn-sm-font)] [&_svg]:size-[var(--btn-sm-icon)]",
        lg: "h-[var(--btn-lg-height)] px-7 py-3.5 text-[var(--btn-lg-font)] [&_svg]:size-[var(--btn-lg-icon)]",
        icon: "h-[var(--btn-icon-size)] w-[var(--btn-icon-size)] [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

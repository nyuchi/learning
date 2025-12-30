import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-badge)] px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-container)] text-[var(--on-primary-container)]",
        secondary:
          "bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
        destructive:
          "bg-[var(--error)] text-white",
        success:
          "bg-[var(--success)] text-[var(--color-bg-base-dark)]",
        warning:
          "bg-[var(--warning)] text-[var(--color-bg-base-dark)]",
        outline:
          "border border-[var(--border)] text-[var(--text)]",
        cobalt:
          "bg-[var(--color-cobalt-container-dark)] text-[var(--color-cobalt-on-container-dark)]",
        tanzanite:
          "bg-[var(--color-tanzanite-container-dark)] text-[var(--color-tanzanite-on-container-dark)]",
        malachite:
          "bg-[var(--color-malachite-container-dark)] text-[var(--color-malachite-on-container-dark)]",
        gold:
          "bg-[var(--color-gold-container-dark)] text-[var(--color-gold-on-container-dark)]",
        terracotta:
          "bg-[var(--color-terracotta-container-dark)] text-[var(--color-terracotta-on-container-dark)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

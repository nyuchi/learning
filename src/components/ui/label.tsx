import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "inline-flex items-center gap-1.5 font-medium text-sm",
  {
    variants: {
      variant: {
        default: "text-[var(--text)]",
        primary: "text-[var(--primary)]",
        secondary: "text-[var(--text-secondary)]",
        muted: "text-[var(--text-tertiary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ variant, className }))}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label, labelVariants };

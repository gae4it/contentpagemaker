import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles with rounded borders
          "inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          // Variants
          {
            "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600":
              variant === "primary",
            "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400":
              variant === "secondary",
            "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600":
              variant === "danger",
            "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400":
              variant === "ghost",
          },
          // Sizes
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };

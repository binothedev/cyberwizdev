import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Base layout
          "flex h-10 w-full rounded-md px-3 py-2 text-sm",
          // Colors + borders hooked to theme tokens
          "bg-background text-foreground",
          "border border-input placeholder:text-muted-foreground",
          // Focus states
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // File input styles (if type=file)
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

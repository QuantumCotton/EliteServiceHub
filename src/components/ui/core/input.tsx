import * as React from "react"
import { cn } from "../../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, type, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            className="block mb-2 text-sm font-medium"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div 
              className="absolute inset-y-0 left-0 flex items-center pl-3"
            >
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error ? 'border-red-500' : '',
              icon ? 'pl-10' : '',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
)
Input.displayName = "Input"

export { Input }

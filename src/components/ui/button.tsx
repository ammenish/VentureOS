import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111110]/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#111110] text-white shadow-xs hover:bg-[#27272A] active:bg-black",
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-700 active:bg-red-800",
        outline:
          "border border-[#E5E5E0] bg-white/80 backdrop-blur-xs text-[#111110] shadow-xs hover:bg-neutral-50 hover:border-neutral-300",
        secondary:
          "bg-[#111110]/[0.06] text-[#111110] hover:bg-[#111110]/[0.1] active:bg-[#111110]/[0.14]",
        ghost:
          "text-neutral-600 hover:bg-black/[0.04] hover:text-[#111110]",
        link: "text-[#111110] font-semibold underline-offset-4 hover:underline",
        accent:
          "bg-[#FF4F00] text-white shadow-xs hover:bg-[#E54600] active:bg-[#CC3E00]",
        success:
          "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 active:bg-emerald-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-2xl px-8 text-lg",
        icon: "h-10 w-10 rounded-xl",
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

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        variant === "default" && "bg-surface/50 border-border text-muted",
        variant === "accent" && "bg-accent/10 border-accent/20 text-accent-text",
        className
      )}
    >
      {children}
    </span>
  );
}

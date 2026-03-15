import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = true, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-surface border border-border rounded-xl md:rounded-2xl overflow-hidden glass-card",
        hoverEffect && "transition-all duration-300 glass-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("p-6 md:p-8", className)}>
      {children}
    </div>
  );
}

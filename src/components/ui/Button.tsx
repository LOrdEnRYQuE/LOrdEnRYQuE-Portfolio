import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  children: React.ReactNode;
}

export function Button({ 
  variant = "primary", 
  size = "md", 
  href, 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-accent text-background hover:bg-accent-hover shadow-lg hover:shadow-accent/20",
    secondary: "bg-surface border border-border text-foreground hover:bg-surface-hover hover:border-border-strong",
    outline: "border border-border text-foreground hover:border-accent hover:text-accent bg-transparent",
    ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };
  
  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} target={props.target}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

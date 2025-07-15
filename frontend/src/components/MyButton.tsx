"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer font-semibold";
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 rounded hover:shadow-lg hover:shadow-blue-500",
    secondary:
      "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500",
    outline:
      "border border-gray-400 text-white-800 hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
};

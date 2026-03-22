import React from "react";
import "./LmsButton.scss";

interface LmsButtonProps {
  buttonText: string;
  handleClick: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "small" | "medium" | "large";
  styleType?: "default" | "inline" | "outline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function LmsButton({
  buttonText,
  handleClick,
  variant = "primary",
  size = "medium",
  styleType = "default",
  type = "button",
  disabled = false,
  className = "",
}: LmsButtonProps) {
  const buttonClass = ["lms-button", variant, size, styleType, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} onClick={handleClick} className={buttonClass} disabled={disabled}>
      {buttonText}
    </button>
  );
}

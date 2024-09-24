import React from "react";
import "./LmsButton.scss"; // Импортируем стили

interface LmsButtonProps {
  buttonText: string;
  handleClick: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "small" | "medium" | "large";
  styleType?: "default" | "inline" | "outline";
}

export default function LmsButton({
  buttonText,
  handleClick,
  variant = "primary", // Цветовые схемы: primary, secondary, success, danger
  size = "medium",     // Размеры: small, medium, large
  styleType = "default", // Стили: default, inline, outline
}: LmsButtonProps) {
  // Объединяем классы для кнопки
  const buttonClass = `lms-button ${variant} ${size} ${styleType}`;

  return (
    <button onClick={handleClick} className={buttonClass}>
      {buttonText}
    </button>
  );
}

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faExclamationTriangle, faExclamationCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface IntellyButtonProps {
  buttonText: string;
  handleClick: () => void;
  styleType?: "primary" | "secondary" | "success" | "warning" | "danger";
  showIcon?: boolean;
}

const IntellyButton: React.FC<IntellyButtonProps> = ({
  buttonText,
  handleClick,
  styleType = "primary",
  showIcon = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const buttonStyles = {
    primary: {
      backgroundColor: "#007bff",
      color: "#fff",
      defaultIcon: faInfoCircle,
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "#fff",
      defaultIcon: faInfoCircle,
    },
    success: {
      backgroundColor: "#28a745",
      color: "#fff",
      defaultIcon: faCheck,
    },
    warning: {
      backgroundColor: "#ffc107",
      color: "#000",
      defaultIcon: faExclamationTriangle,
    },
    danger: {
      backgroundColor: "#dc3545",
      color: "#fff",
      defaultIcon: faExclamationCircle,
    },
  };

  const hoverStyles = {
    primary: {
      backgroundColor: "#0056b3",
    },
    secondary: {
      backgroundColor: "#5a6268",
    },
    success: {
      backgroundColor: "#218838",
    },
    warning: {
      backgroundColor: "#e0a800",
    },
    danger: {
      backgroundColor: "#c82333",
    },
  };

  const activeStyles = {
    primary: {
      backgroundColor: "#004085",
    },
    secondary: {
      backgroundColor: "#343a40",
    },
    success: {
      backgroundColor: "#1e7e34",
    },
    warning: {
      backgroundColor: "#c69500",
    },
    danger: {
      backgroundColor: "#bd2130",
    },
  };

  const selectedStyle = buttonStyles[styleType];
  const iconToUse = selectedStyle.defaultIcon;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        ...selectedStyle,
        ...(isHovered && hoverStyles[styleType]),
        ...(isActive && activeStyles[styleType]),
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {showIcon && <FontAwesomeIcon icon={iconToUse} style={{ marginRight: "8px" }} />}
      {buttonText}
    </button>
  );
};

export default IntellyButton;

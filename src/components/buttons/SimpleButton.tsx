import styled from "styled-components";
import React from "react";

export interface SimpleButtonProps {
  height?: string;
  color?: string;
  textColor?: string;
  onClick?: () => void;
  children?: JSX.Element | string;
  type?: "button" | "submit" | "reset";
}

const simpleButton = ({
  height,
  color,
  textColor,
  onClick,
  children,
  type,
}: SimpleButtonProps) => {
  return (
    <Button
      height={height}
      textColor={textColor}
      color={color}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};

const Button = styled.button<{ height?: string; textColor?: string }>`
  height: ${({ height }) => height || "30px"};
  border-radius: 4px;
  padding: 4px 8px;
  background-color: ${({ color, theme }) =>
    color || theme.colors.tertiaryMedium};
  color: ${({ textColor, theme }) => textColor || theme.colors.primary};
  font-size: 1.4rem;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
`;

export default simpleButton;

import React from "react";
import styled, { css } from "styled-components";

export interface ToggleButtonProps {
  options: string[];
  onChange: (index: number) => void;
  selected: number;
  disabled?: boolean;
  className?: string;
  isSelectWaterType?: boolean;
}

const ToggleButton = ({
  options,
  onChange,
  disabled,
  selected,
  className,
  isSelectWaterType,
}: ToggleButtonProps) => {
  return (
    <Container
      isSelectWaterType={isSelectWaterType}
      className={className}
      disabled={disabled}
    >
      {options.map((option, index) => {
        return (
          <Button
            isSelectWaterType={isSelectWaterType}
            type="button"
            key={`toggle-button_${index}`}
            selected={index === selected}
            onClick={() => (disabled ? {} : onChange(index))}
          >
            {option}
          </Button>
        );
      })}
    </Container>
  );
};

const Container = styled.div<{
  disabled: boolean;
  isSelectWaterType?: boolean;
}>`
  ${({ isSelectWaterType }) =>
    isSelectWaterType
      ? css`
          margin-top: 20px;
          height: 40px;
        `
      : css`
          border: 1px solid ${({ theme }) => theme.colors.border};
        `};
  display: inline-flex;
  margin-right: auto;
  background-color: ${({ theme }) => theme.colors.light};
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  border-radius: 50px;
`;

const Button = styled.button<{
  selected: boolean;
  isSelectWaterType?: boolean;
}>`
  ${({ isSelectWaterType }) =>
    isSelectWaterType
      ? css<{ selected: boolean }>`
          font-weight: 500;
          background-color: ${({ theme, selected }) =>
            selected ? theme.colors.primary : "none"};
          padding: 12px;
        `
      : css<{ selected: boolean }>`
          background-color: ${({ theme, selected }) =>
            selected ? theme.colors.secondary : "none"};
          margin: -1px;
          padding: 7px;
          height: 32px;
        `}
  color: ${({ theme, selected }) =>
    selected ? "white" : theme.colors.primary};
  border-radius: 50px;
`;

export default ToggleButton;

import React, { useState } from "react";
import styled, { css } from "styled-components";

interface SwitchInterface {
  isOn: boolean;
  onChange?: (val: boolean) => void;
  label?: string;
  variant?: "primary" | "secondary";
}

const Switch = ({
  isOn,
  onChange,
  label,
  variant = "primary",
}: SwitchInterface) => {
  const [value, setValue] = useState(isOn);

  return (
    <SwitchWrapper>
      <Label variant={variant}>{label}</Label>
      <SwitchCheckBox
        type="checkbox"
        id={`react-switch-new`}
        checked={value}
        onChange={() => {
          const newVal = !value;
          setValue(newVal);
          onChange(newVal);
        }}
      />
      <SwitchLabel htmlFor={`react-switch-new`} isOn={value}>
        <SwitchButton />
      </SwitchLabel>
    </SwitchWrapper>
  );
};

const commonStyle = css`
  content: "";
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  transition: 0.2s;
  background: #fff;
`;

const SwitchButton = styled.span`
  ${commonStyle}
  left: 2px;
  &:active {
    width: 45px;
  }
`;

const SwitchLabel = styled.label<{ isOn: boolean }>`
  ${commonStyle}
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 70px;
  height: 40px;
  background: ${({ isOn, theme }) =>
    isOn ? theme.colors.secondary : "#bfbfc0"};
  border-radius: 70px;
  position: relative;
  transition: background-color 0.2s;
`;

const SwitchCheckBox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  display: none;
  &:checked + ${SwitchLabel} ${SwitchButton} {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 0;
`;

const Label = styled.span<{ variant: string }>`
  color: ${({ variant }) => (variant === "primary" ? "#121a55" : "#FFF")};
  font-size: 1.4rem;
  margin: auto 8px auto 0;
  cursor: pointer;
  position: relative;
`;

export default Switch;

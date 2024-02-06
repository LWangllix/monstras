import React from "react";
import styled from "styled-components";

export interface CheckFieldProps {
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const CheckField = ({
  value = false,
  onChange,
  disabled = false,
}: CheckFieldProps) => {
  return (
    <Container>
      <CheckBox
        type="checkbox"
        checked={value}
        onChange={() => (!!onChange ? onChange(value) : null)}
        disabled={disabled}
      />
      <Label />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  background-color: #121a55;
  margin-right: 16px;
`;

const Label = styled.label`
  cursor: pointer;
  position: absolute;
  z-index: 4;
  width: 14px;
  height: 14px;
  left: 2px;
  top: 2px;

  background-color: white;

  &::after {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    opacity: 0;
    content: "";
    position: absolute;
    width: 9px;
    height: 5px;
    background: transparent;
    top: 2px;
    left: 1px;
    border: 3px solid #fcfff4;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`;
const CheckBox = styled.input<{ disabled: boolean }>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -4px;
  left: -4px;
  z-index: 7;
  opacity: 0;

  cursor: ${({ disabled }) => (disabled ? "text" : "pointer")};
  &:checked + label {
    background-color: transparent;
  }
  &:checked + label::after {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    opacity: 1;
  }
`;

export default CheckField;

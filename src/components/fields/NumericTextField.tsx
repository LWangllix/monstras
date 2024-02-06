import { FormikErrors } from "formik";
import React from "react";
import styled from "styled-components";
export interface NumericTextFieldProps {
  value?: string | number;
  name?: string;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  showError?: boolean;
  label?: string;
  icon?: JSX.Element;
  className?: string;
  left?: JSX.Element;
  right?: JSX.Element;
  padding?: string;
  onChange?: (props) => void;
  onClick?: () => void;
  bottomLabel?: string;
  disabled?: boolean;
  height?: number;
  readOnly?: boolean;
  onInputClick?: () => void;
  placeholder?: string;
  wholeNumber?: boolean;
}

const TextField = ({
  value,
  name,
  error,
  showError = true,
  readOnly = false,
  label,
  className,
  left,
  right,
  padding,
  onChange,
  onClick,
  bottomLabel,
  placeholder,
  disabled,
  height,
  onInputClick,
  wholeNumber = true,
}: NumericTextFieldProps) => {
  return (
    <Container className={className} padding={padding || "0"} onClick={onClick}>
      {!!label && <Label>{label}</Label>}
      <InputContainer error={!!error} height={height} disabled={disabled}>
        {left}
        <TextInput
          onClick={() => (onInputClick ? onInputClick() : null)}
          readOnly={readOnly}
          type={"text"}
          inputMode={"decimal"}
          name={name}
          autoComplete="off"
          value={value || ""}
          onChange={(e) => {
            if (wholeNumber) {
              /^[0-9]*$/.test(e.target.value) && onChange(e.target.value);
            } else {
              /^\d*[\.\,]?\d*$/.test(e.target.value) &&
                onChange(e.target.value.replace(",", "."));
            }
          }}
          placeholder={placeholder}
          min={"0"}
          disabled={disabled}
        />
        {right}
      </InputContainer>
      {showError ? (
        <ErrormMessage visible={!!showError && !!error}>{error}</ErrormMessage>
      ) : (
        <BollomLabel visible={!showError && !!bottomLabel}>
          {bottomLabel}
        </BollomLabel>
      )}
    </Container>
  );
};

const Container = styled.div<{ padding: string }>`
  display: block;

  padding: ${({ padding }) => padding};
`;

const InputContainer = styled.div<{
  error: boolean;
  height: number;
  disabled: boolean;
}>`
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 4px;
  display: flex;
  min-width: 108px;
  height: ${({ height }) => (height ? `${height}px` : `48px`)};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.input};
  justify-content: space-between;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
`;

const TextInput = styled.input`
  border: none;
  padding: 0 8px;
  width: 100%;
  :focus {
    outline: none;
  }
  background-color: ${({ theme }) => theme.colors.input};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.label};

  [type="number"] {
    -moz-appearance: textfield;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.label + "8F"};
  }
  ::-moz-placeholder {
    color: ${({ theme }) => theme.colors.label + "8F"};
  }
  ::-ms-placeholder {
    color: ${({ theme }) => theme.colors.label + "8F"};
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.label + "8F"};
  }
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
  font-size: 1.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.4rem;
  color: rgb(18, 26, 85);
  font-weight: 600;
`;

const ErrormMessage = styled.label<{ visible: boolean }>`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  height: 2.4rem;
`;

const BollomLabel = styled.label<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "inline-block" : "none")};
  width: 100%;
  color: #565656;
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.4rem;
`;

export default TextField;

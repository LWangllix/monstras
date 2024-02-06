import { FormikErrors } from "formik";
import React from "react";
import styled from "styled-components";

export interface TextFieldProps {
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
  subLabel?: string;
  isSecret?: boolean;
  placeholder?: string;
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
  subLabel,
  placeholder,
  disabled,
  height,
  onInputClick,
  isSecret = false,
}: TextFieldProps) => {
  return (
    <Container className={className} padding={padding || "0"} onClick={onClick}>
      {!!label && (
        <>
          <Label>{label}</Label>
          {!!subLabel && <SubLabel>{subLabel}</SubLabel>}
        </>
      )}
      <InputContainer error={!!error} height={height} disabled={disabled}>
        {left}
        <TextInput
          onClick={() => (onInputClick ? onInputClick() : null)}
          readOnly={readOnly}
          type={isSecret ? "password" : "text"}
          name={name}
          autoComplete="off"
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {right}
      </InputContainer>
      {showError && !!error ? (
        <ErrormMessage visible={showError && error.length > 0}>
          {error}
        </ErrormMessage>
      ) : null}
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
  height: ${({ height }) => (height ? `${height}px` : `48px`)};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.input};
  justify-content: space-between;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
`;

const TextInput = styled.input<{ readOnly: boolean; disabled: boolean }>`
  border: none;
  padding: 0 16px;
  width: 100%;

  cursor: ${({ readOnly, disabled }) =>
    !disabled && readOnly ? `pointer` : `text`};
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
  color: ${({ theme }) => theme.colors.label};
  font-size: 1.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.4rem;
  color: rgb(18, 26, 85);
  font-weight: 600;
`;

const SubLabel = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
  color: #0b1f518f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
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

export default TextField;

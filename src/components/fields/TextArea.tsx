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
  rows?: number;
  placeholder?: string;
}

const TextField = (props: TextFieldProps) => {
  const {
    value,
    name,
    error,
    showError = true,
    label,
    className,
    onChange,
    onClick,
    rows = 2,
    placeholder,
  } = props;

  return (
    <Container className={className} onClick={onClick}>
      {!!label && <Label>{label}</Label>}
      <InputContainer error={!!error}>
        <StyledTextArea
          placeholder={placeholder}
          rows={rows}
          name={name}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          {value}
        </StyledTextArea>
      </InputContainer>
      {showError && !!error ? <ErrormMessage>{error}</ErrormMessage> : null}
    </Container>
  );
};

const Container = styled.div`
  display: block;
`;

const InputContainer = styled.div<{ error: boolean }>`
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 4px;
  display: flex;
  height: auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.input};
  justify-content: space-between;
  padding: 8px;
  box-sizing: border-box;
`;

const StyledTextArea = styled.textarea`
  border: none;
  font-size: 1.6rem;
  line-height: 2rem;
  width: 100%;
  resize: none;
  color: ${({ theme }) => theme.colors.label};
  background-color: transparent;
  :focus {
    outline: none;
  }
`;

const Label = styled.label`
  display: inline-block;
  color: ${({ theme }) => theme.colors.label};
  font-size: 1.6rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ErrormMessage = styled.label`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default TextField;

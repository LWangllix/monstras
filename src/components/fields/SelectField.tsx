import { FormikErrors } from "formik";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../styles";

export interface SelectFieldProps {
  id?: string;
  name?: string;
  label?: string;
  value?: any;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  showError?: boolean;
  editable?: boolean;
  options?: any[];
  left?: JSX.Element;
  right?: JSX.Element;
  padding?: string;
  onChange?: (option) => void;
  disabled?: boolean;
  getOptionLabel?: (option) => string;
  className?: string;
  placeholder?: string;
}

const SelectField = ({
  label,
  value,
  name,
  error,
  showError = true,
  editable = true,
  options,
  className,
  left,
  right,
  padding,
  getOptionLabel,
  onChange,
  disabled,
  ...rest
}: SelectFieldProps) => {
  const [inputValue, setInputValue] = useState(
    value ? getOptionLabel(value) : null
  );

  const [showSelect, setShowSelect] = useState(false);
  const [suggestions, setSuggestions] = useState(options);
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowSelect(false);
      if (!value) {
        setInputValue(null);
      } else {
        setInputValue(getOptionLabel(value));
      }
    }
  };

  useEffect(() => {
    setSuggestions(options);
  }, [options]);

  useEffect(() => {
    if (!value) {
      setInputValue("");
    } else {
      setInputValue(getOptionLabel(value));
    }
  }, [value]);

  const handleClick = (option) => {
    setShowSelect(false);
    setInputValue(getOptionLabel(option));
    onChange(option);
  };

  return (
    <Container
      className={className}
      padding={padding || "0"}
      onClick={() => setShowSelect(!showSelect)}
    >
      <RelativeContainer tabIndex={1} onBlur={handleBlur}>
        {!!label && <Label>{label}</Label>}
        {
          <>
            <InputContainer
              readOnly={!editable}
              error={!!error}
              disabled={disabled}
            >
              <span>{left}</span>
              <Input
                readOnly={!editable}
                disabled={disabled}
                onClick={() => setShowSelect(true)}
                {...rest}
                name={name}
                value={inputValue || ""}
                autoComplete="off"
                onChange={(input) => {
                  if (input.target.value) {
                    setShowSelect(true);
                  }
                  setInputValue(input.target.value);
                  setSuggestions(
                    options.filter((option) => {
                      const label = getOptionLabel(option)
                        ?.toString()
                        .toLowerCase();
                      return label?.includes(input.target.value.toLowerCase());
                    })
                  );
                }}
              />
              <span>{right}</span>
            </InputContainer>
            {showSelect && !disabled && suggestions ? (
              <OptionContainer>
                {suggestions.map((option, index) => {
                  return (
                    <Option
                      key={index}
                      onClick={() => {
                        handleClick(option);
                      }}
                    >
                      {getOptionLabel(option)}
                    </Option>
                  );
                })}
              </OptionContainer>
            ) : null}
          </>
        }
        {showError && !!error ? <ErrormMessage>{error}</ErrormMessage> : null}
      </RelativeContainer>
    </Container>
  );
};

const Container = styled.div<{ padding: string }>`
  display: block;
  padding: ${({ padding }) => padding};
  @media ${device.mobileL} {
    border: none;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const OptionContainer = styled.div`
  position: absolute;
  z-index: 9;
  width: 100%;
  padding: 10px 0px;
  display: block;
  min-width: 220px;
  max-height: 200px;
  overflow-y: scroll;
  border: none;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 16px #121a5529;
  > * {
    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  > * {
    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;

const Option = styled.div`
  padding: 0px 16px;
  font: normal normal 500 1.6rem/36px Manrope;
  &:hover {
    background: #f3f3f7 0% 0% no-repeat padding-box;
  }
`;

const InputContainer = styled.div<{
  error: boolean;
  readOnly: boolean;
  disabled: boolean;
}>`
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 4px;
  display: flex;
  height: 48px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.input};
  align-items: center !important;
  justify-content: space-between;
  cursor: ${({ readOnly }) => (readOnly ? `pointer` : `text`)};
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
`;

const Input = styled.input<{ readOnly: boolean }>`
  border: none;
  display: inline-block;
  padding: 0 16px;
  min-width: 50px;
  cursor: ${({ readOnly }) => (readOnly ? `pointer` : `text`)};
  :focus {
    outline: none;
  }
  flex: 1;
  background-color: transparent;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.label};
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.label + "8F"};
  }
  ::-moz-placeholder {
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

const ErrormMessage = styled.label`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default SelectField;

import React from "react";
import styled from "styled-components";
import { device } from "../../styles";

export interface RadioOptionsProps {
  options: { label: string; value: string }[];
  name: string;
  value?: any;
  error?: string;
  showError?: boolean;
  className?: string;
  onChange?: (props) => void;
  label?: string;
  direction?: string;
  disabled?: boolean;
}

const RadioOptions = ({
  options,
  value,
  error,
  showError = true,
  name,
  onChange,
  className,
  direction = "row",
  label,
  disabled = false,
}: RadioOptionsProps) => {
  return (
    <Container className={className}>
      <Label>{label}</Label>
      <OptionsContainer direction={direction}>
        {options?.map((option, index) => {
          const key = `${name}_${option.value}`;
          return (
            <InputContainer
              key={key}
              first={index === 0}
              onClick={() => (!disabled ? onChange(option) : null)}
            >
              <input
                type="radio"
                name={name}
                id={key}
                value={option.value}
                checked={value.value === option.value}
                onChange={() => {}}
              />
              <OptionLabel htmlFor={key}>{option.label}</OptionLabel>
            </InputContainer>
          );
        })}
      </OptionsContainer>
      {showError && error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 8px 0;
  display: block;
`;

const OptionsContainer = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  margin: 14px 0 0 0;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const Label = styled.span`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const InputContainer = styled.div<{ first: boolean }>`
  margin: 0 8px ${({ first }) => (first ? 0 : "8px")} 0;
  cursor: grab;
  @media ${device.mobileL} {
    margin-bottom: 10px;
  }
`;

const OptionLabel = styled.label<any>`
  position: relative;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 500;
  margin-left: 8px;
  cursor: pointer;
  @media ${device.mobileL} {
    margin-left: 0px;
  }
`;

const ErrorMessage = styled.label`
  position: relative;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  @media ${device.mobileL} {
    margin-left: 0px;
  }
`;

export default RadioOptions;

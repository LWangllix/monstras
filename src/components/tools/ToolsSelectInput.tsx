import React from "react";
import styled from "styled-components";
import ToolAutoCompleteItem from "./ToolAutoCompleteItem";

export interface SelectFieldProps {
  onChange?: (option) => void;
  className?: string;
  options?: Array<Record<string, unknown>>;
  showSelect: boolean;
  ref?: React.Ref<HTMLDivElement>;
  inWarehouse?: boolean;
  onSearch: (props) => void;
  serachVal: string;
  onSetShowSelect: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
}

const ToolsSelectInput = ({
  options,
  className,
  onChange,
  showSelect,
  ref,
  onSearch,
  serachVal,
  onSetShowSelect,
  label,
}: SelectFieldProps) => {
  return (
    <>
      <Container className={className}>
        {!!label && <Label>{label}</Label>}
        <InputContainer tabIndex={1}>
          <Input
            value={serachVal || ""}
            onChange={(input) => {
              onSearch(input.target.value);
            }}
          />
        </InputContainer>
        {showSelect && (
          <OptionContainer ref={ref}>
            {options?.length > 0 ? (
              options.map((option, index) => {
                return (
                  <ToolAutoCompleteItem
                    key={index}
                    group={option}
                    onSelect={() => {
                      onSetShowSelect(false);
                      onChange(option);
                    }}
                  />
                );
              })
            ) : (
              <div>Nėra prijungiamų įrankių</div>
            )}
          </OptionContainer>
        )}
      </Container>
    </>
  );
};

const Container = styled.div``;

const OptionContainer = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 16px #121a5529;
  border-radius: 10px;
  overflow: auto;
  height: 330px;

  width: 450px;
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

const InputContainer = styled.div`
  background: #f3f3f7 0% 0% no-repeat padding-box;
  border: 1px solid #121a553d;
  border-radius: 4px;
`;

const Input = styled.input`
  border: none;
  display: inline-block;
  padding: 11px;

  color: #0b1f51;
  cursor: pointer;
  :focus {
    outline: none;
  }
  flex: 1;
  background-color: transparent;
  font-size: 1.6rem;
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

export default ToolsSelectInput;

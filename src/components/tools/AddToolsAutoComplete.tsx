import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import ToolAutoCompleteItem from "./ToolAutoCompleteItem";

export interface SelectFieldProps {
  showSelect: boolean;
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  serachVal: string;
  onSetShowSelect: React.Dispatch<React.SetStateAction<boolean>>;
  inWarehouse?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  onChange?: (option) => void;
  className?: string;
  options?: Array<Record<string, unknown>>;
}

const AddToolsAutoComplete = ({
  options,
  className,
  onChange,
  showSelect,
  ref,
  onSearch,
  serachVal,
  onSetShowSelect,
}: SelectFieldProps) => {
  return (
    <AbsoluteContainer ref={ref}>
      {showSelect && (
        <Container className={className}>
          <InputContainer tabIndex={1}>
            <Input
              value={serachVal || ""}
              onChange={(input) => {
                onSearch(input.target.value);
              }}
            />
          </InputContainer>

          <OptionContainer>
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
              <EmptyState>Nėra pridedamų įrankių</EmptyState>
            )}
          </OptionContainer>
        </Container>
      )}
    </AbsoluteContainer>
  );
};

const EmptyState = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  padding: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Container = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 16px #121a5529;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 300px;

  @media ${device.mobileL} {
    width: 100%;
  }
`;

const AbsoluteContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 100px;
  left: 0px;
  @media ${device.mobileL} {
    left: 16px;
    width: 90%;
  }
`;

const OptionContainer = styled.div`
  width: 100%;
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
  margin: 16px;
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

export default AddToolsAutoComplete;

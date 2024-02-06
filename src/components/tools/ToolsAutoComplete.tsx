import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import ToolAutoCompleteItem from "./ToolAutoCompleteItem";
export interface SelectFieldProps {
  groupId: string;
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  serachVal: string;
  typeId: string;
  inWarehouse?: boolean;
  onChange?: (option) => void;
  className?: string;
  options?: Array<Record<string, unknown>>;
}

const ToolsAutoComplete = ({
  options,
  onChange,
  groupId,
  typeId,
  inWarehouse,
}: SelectFieldProps) => {
  const shouldRender = (option) => {
    const isTheSame = groupId === option.groupId;
    const isInWater = !!option.tools[0]?.eventTools?.id;
    const isTypeTheSame = typeId === option?.tools[0]?.toolType?.id;
    return !isTheSame && isTypeTheSame && (inWarehouse ? !isInWater : true);
  };

  const optionItems = options
    .filter((option) => shouldRender(option))
    .map((option, index) => (
      <ToolAutoCompleteItem
        key={index}
        group={option}
        onSelect={() => onChange(option)}
      />
    ));

  return (
    <>
      <OptionContainer>
        {optionItems?.length > 0 ? (
          optionItems
        ) : (
          <EmptyState>Įrankius galima jungti tik tos pačios rūšies</EmptyState>
        )}
      </OptionContainer>
    </>
  );
};

const OptionContainer = styled.div`
  max-width: 100%;
  height: 100%;
  @media ${device.mobileM} {
    max-width: 320px;
  }
  @media ${device.mobileS} {
    max-width: 270px;
  }
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

export default ToolsAutoComplete;

import React from "react";
import styled from "styled-components";
import CustomTag from "../other/CustomTag";
import { device } from "../../styles";
import { handleMultipleSelectProps } from "../../types";
import { ToolType } from "../../server/models/ToolType";

interface FishFilterProps {
  tools: Array<string>;
  toolstypes: Array<ToolType>;
  handleTools: ({
    value,
    array,
    onSetArray,
  }: handleMultipleSelectProps) => void;
  onSetToolsFilter: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const FilterButton = ({
  tools,
  toolstypes,
  handleTools,
  onSetToolsFilter,
}: FishFilterProps) => {
  return (
    <FishContainer>
      <Title>Įrankiai</Title>
      <DataFishContainer>
        {toolstypes.map((f) => (
          <Button
            key={f.label}
            onClick={() =>
              handleTools({
                array: tools,
                value: f.id,
                onSetArray: onSetToolsFilter,
              })
            }
          >
            <CustomTag
              margin={"0px 4px 4px 0px"}
              isFilter={true}
              isPressed={tools.some((fi) => fi == f.id)}
              text={f.label}
            />
          </Button>
        ))}
      </DataFishContainer>
    </FishContainer>
  );
};

const Button = styled.div``;

const DataFishContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-weight: 600px;
  font-size: 1.6rem;
  margin: 16px 0px;
  color: rgb(18, 26, 85);
  font-weight: 600;
`;
const FishContainer = styled.div`
  background-color: white;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: none;
  overflow: none;
  right: 0px;
  top: 60px;
  @media ${device.mobileL} {
    padding: 0;
  }
`;

export default FilterButton;

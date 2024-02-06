import React from "react";
import styled from "styled-components";
import CustomTag from "../other/CustomTag";
import { device } from "../../styles";
import { handleMultipleSelectProps } from "../../types";
import { FishType } from "../../server/models/FishType";

interface FishFilterProps {
  fishes: Array<string>;
  fishtypes: Array<FishType>;
  handlefishes: ({
    value,
    array,
    onSetArray,
  }: handleMultipleSelectProps) => void;
  onSetFishFilter: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const FilterButton = ({
  fishes,
  fishtypes,
  handlefishes,
  onSetFishFilter,
}: FishFilterProps) => {
  return (
    <FishContainer>
      <Title>Žuvų rūšis</Title>
      <DataFishContainer>
        {fishtypes.map((f) => (
          <Button
            key={f.label}
            onClick={() =>
              handlefishes({
                array: fishes,
                value: f.id,
                onSetArray: onSetFishFilter,
              })
            }
          >
            <CustomTag
              margin={"0px 4px 4px 0px"}
              isFilter={true}
              isPressed={fishes.some((fi) => fi == f.id)}
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

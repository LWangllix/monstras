import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import { handleMultipleSelectProps } from "../../types";
import { EVENT_TYPES, fishingStatesLabels } from "../../utils/constants";
import CustomTag from "../other/CustomTag";
interface stateFIlterProps {
  fishingStatusFilter: Array<string>;
  handleFishingStatusFilterSelect: ({
    value,
    array,
    onSetArray,
  }: handleMultipleSelectProps) => void;
  onSetFishingStatusFilter: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const StateFilter = ({
  fishingStatusFilter,
  handleFishingStatusFilterSelect,
  onSetFishingStatusFilter,
}: stateFIlterProps) => {
  return (
    <FishContainer>
      <Title>Būsena</Title>
      <DataFishContainer>
        <Button
          key={fishingStatesLabels.builtTools}
          onClick={() =>
            handleFishingStatusFilterSelect({
              value: EVENT_TYPES.FishingToolsBuilt,
              array: fishingStatusFilter,
              onSetArray: onSetFishingStatusFilter,
            })
          }
        >
          <CustomTag
            margin={"0px 4px 4px 0px"}
            isFilter={true}
            isPressed={fishingStatusFilter.some(
              (s) => s == EVENT_TYPES.FishingToolsBuilt
            )}
            text={fishingStatesLabels.builtTools}
          />
        </Button>
        <Button
          key={fishingStatesLabels.fishWeightOnBoat}
          onClick={() =>
            handleFishingStatusFilterSelect({
              value: EVENT_TYPES.FishWeightOnBoat,
              array: fishingStatusFilter,
              onSetArray: onSetFishingStatusFilter,
            })
          }
        >
          <CustomTag
            margin={"0px 4px 4px 0px"}
            isFilter={true}
            isPressed={fishingStatusFilter.some(
              (s) => s == EVENT_TYPES.FishWeightOnBoat
            )}
            text={fishingStatesLabels.fishWeightOnBoat}
          />
        </Button>
        <Button
          key={fishingStatesLabels.fishWeightOnShore}
          onClick={() =>
            handleFishingStatusFilterSelect({
              value: EVENT_TYPES.FishWeightOnShore,
              array: fishingStatusFilter,
              onSetArray: onSetFishingStatusFilter,
            })
          }
        >
          <CustomTag
            margin={"0px 4px 4px 0px"}
            isFilter={true}
            isPressed={fishingStatusFilter.some(
              (s) => s == EVENT_TYPES.FishWeightOnShore
            )}
            text={fishingStatesLabels.fishWeightOnShore}
          />
        </Button>
        <Button
          key={fishingStatesLabels.startFishing}
          onClick={() =>
            handleFishingStatusFilterSelect({
              value: EVENT_TYPES.FishingStarted,
              array: fishingStatusFilter,
              onSetArray: onSetFishingStatusFilter,
            })
          }
        >
          <CustomTag
            margin={"0px 4px 4px 0px"}
            isFilter={true}
            isPressed={fishingStatusFilter.some(
              (s) => s == EVENT_TYPES.FishingStarted
            )}
            text={fishingStatesLabels.startFishing}
          />
        </Button>
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
  margin: 24px 0px 16px 0px;
  color: rgb(18, 26, 85);
  font-weight: 600;
  @media ${device.mobileL} {
    margin-bottom: 0px;
  }

  @media ${device.mobileL} {
    font: normal normal 600 16px/40px Manrope;
    letter-spacing: 0px;
    color: #0b1f51;
  }
`;

const FishContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: none;
  overflow: none;
  right: 0px;
  top: 60px;
  @media ${device.mobileL} {
    padding: 0;
    max-height: 320px;
    margin-bottom: 24px;
  }
`;

export default StateFilter;

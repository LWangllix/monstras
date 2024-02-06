import { map } from "lodash";
import React from "react";
import styled from "styled-components";
import { CaughtFish } from "../../server/models/CaughtFish";
import { device } from "../../styles";

export interface CaughtFishTableProps {
  fishes: Array<CaughtFish>;
}

const CaughtFishTable = ({ fishes }: CaughtFishTableProps) => {
  const uniqueFishes = fishes.reduce(function (previousValue, currentValue) {
    const index = previousValue.findIndex(
      (fish) => fish.fishType?.label === currentValue.fishType?.label
    );
    if (index === -1) {
      previousValue.push({ ...currentValue });
    } else {
      previousValue[index].weight =
        parseFloat(previousValue[index].weight) +
        parseFloat(currentValue.weight.toString());
    }
    return previousValue;
  }, []);
  return (
    <Container>
      <Line>
        <Label>ŽUVŲ RŪŠIS</Label>
        <Label>SUGAUTA, kg</Label>
      </Line>
      {map(uniqueFishes, (fish, index) => (
        <ContentLine key={`fish_${index}`} last={index === fishes.length - 1}>
          <FishLabel>{fish.fishType?.label || ""}</FishLabel>
          <FishLabel>{fish.weight}</FishLabel>
        </ContentLine>
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 32px;
  @media ${device.mobileL} {
    padding: 0 16px;
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentLine = styled.div<{ last: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: ${({ last }) => (!last ? `1px solid #121a553d` : `none`)};
`;

const Label = styled.div`
  font: normal normal 600 1.2rem/17px Manrope;
  color: #121a558a;
`;

const FishLabel = styled.div`
  font: normal normal 600 1.6rem/22px Manrope;
  color: #121a55;
`;

export default CaughtFishTable;

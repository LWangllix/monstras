import React from "react";
import styled from "styled-components";
import CustomTag from "../other/CustomTag";
import ToolIcon from "../tools/ToolIcon";
export interface FishStockerItemProps {
  group: any;
  onSelect: () => void;
}

const FishingToolItem = ({ group, onSelect }: FishStockerItemProps) => {
  const toolName = group?.tools[0]?.toolType?.label || "-";

  const toolsLenght = group?.tools?.reduce((lenght, item) => {
    return lenght + parseInt(item.net_length.toString());
  }, 0);

  const eyeSizes = group?.tools?.reduce(
    (sizes, item) => {
      const currentSmall = sizes.small;
      const currentBig = sizes.big;
      const newSmall =
        item.eye_size < currentSmall || currentSmall === 0
          ? item.eye_size
          : currentSmall;
      const newBig = item.eye_size > currentBig ? item.eye_size : currentBig;
      return {
        small: newSmall,
        big: newBig,
      };
    },
    { small: 0, big: 0 }
  );

  const eyeSizeLabel = `${eyeSizes.small} ${
    eyeSizes.big !== eyeSizes.small ? "-" : ""
  } ${eyeSizes.big !== eyeSizes.small ? eyeSizes.big : ""} mm`;

  const multipeItems = group?.tools?.length > 1;

  const seals = () =>
    group?.tools?.map((item, index) => {
      return <CustomTag key={`seal_nr_${index}`} text={item.seal_nr} />;
    });

  const getGroupStatus = () => {
    const t = group?.tools[0];
    return t?.eventTools?.id ? "in_water" : "not_in_water";
  };

  const getGroupLabel = () => {
    const waterBoby = group?.tools[0]?.eventTools?.event?.location?.waterBody;
    return waterBoby?.type === "baras" ? waterBoby.id : null;
  };

  return (
    <Container onClick={onSelect}>
      <StatusContainer>
        <StyledFishingIcon status={getGroupStatus()} label={getGroupLabel()} />
      </StatusContainer>
      <Content>
        <FirstRow>
          <ToolName>
            {`${toolName}, ${eyeSizeLabel}, ${toolsLenght} m`}
          </ToolName>
        </FirstRow>
        <SecondRow>{seals()}</SecondRow>
      </Content>
    </Container>
  );
};

const Container = styled.a`
  background: #ffffff 0% 0% no-repeat padding-box;

  border-radius: 8px;
  opacity: 1;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 0;
  margin: 8px 0;
  &:hover {
    background-color: #f3f3f7;
  }
`;

const StatusContainer = styled.div`
  display: flex;
`;

const StyledFishingIcon = styled(ToolIcon)`
  margin: auto 18px auto 14px;
  height: 48px;
`;

const Content = styled.div`
  flex: 1;
  flex-direction: column;
  margin: auto 0;
  overflow: hidden;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
  justify-content: space-between;
`;

const ToolName = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 16px;
  font: normal normal 500 1.6rem/48px Manrope;
  color: #0b1f51;
`;

const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  margin-top: 4px;
`;

export default FishingToolItem;

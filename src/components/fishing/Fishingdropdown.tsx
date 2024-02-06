import { useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../server/routers/api";
import { device } from "../../styles";
import { FishingStartedContext } from "../../utils/AppContextProvider";
import { locationTypes } from "../../utils/routers";
import Button from "../buttons/Button";
import Icons from "../other/Icon";

interface FishingDropdownInterface {
  onStartFishing?: () => void;
  onFinishFishing?: () => void;
  onWeightOnShore?: () => void;
  onWeightOnBoat?: () => void;
  onBuildTools?: (locationType: string) => void;
  disabled?: boolean;
}

const FishingDropdown = ({
  onStartFishing,
  onFinishFishing,
  onWeightOnShore,
  onWeightOnBoat,
  onBuildTools,
  disabled,
}: FishingDropdownInterface) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(device.mobileL);
  const [lastFishingStartTime, setLastFishingStartTime] = useState(null);

  const { setFishingStarted } = useContext(FishingStartedContext);

  useEffect(() => {
    if (open) {
      api.fishing.getLastFishingInfo({}).then((response) => {
        const fishingStartTime = response["lastFishingStartTime"];
        setLastFishingStartTime(fishingStartTime);
        setFishingStarted(response);
      });
    }
  }, [open]);

  const handleBuildTools = (locationType) => {
    if (lastFishingStartTime) {
      onBuildTools(locationType);
    }
  };
  const handleFishWeightShore = () => {
    if (lastFishingStartTime) {
      onWeightOnShore();
    }
  };
  const handleFishWeightBoat = () => {
    if (lastFishingStartTime) {
      onWeightOnBoat();
    }
  };

  const handleStartFishing = () => {
    setOpen(false);
    onStartFishing && onStartFishing();
  };

  const handleFinishFishing = () => {
    setOpen(false);
    onFinishFishing && onFinishFishing();
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <Container tabIndex={1} onBlur={handleBlur}>
      <StyledButton
        onClick={() => setOpen(!open)}
        variant="secondary"
        height={40}
        innerPadding={"0 16px"}
        padding={isMobile ? "0 0 0 16px" : "0 32px 0 16px"}
        right={<StyledIcon name="dropdownArrow" />}
        disabled={disabled}
      >
        Registruoti
      </StyledButton>
      {open ? (
        <InnerContainer>
          <Title>REGISTRUOTI PLAUKIMĄ:</Title>
          {!lastFishingStartTime ? (
            <Li onClick={handleStartFishing}>
              <Row>
                <Icon src="/icons/boat.svg" />
                <Action>Pradėti žvejybą</Action>
              </Row>
            </Li>
          ) : null}
          {lastFishingStartTime ? (
            <Li onClick={handleFinishFishing} disabled={!lastFishingStartTime}>
              <Row>
                <Icon src="/icons/finish_fishing.svg" />
                <Action>Baigti žvejybą</Action>
              </Row>
            </Li>
          ) : null}
          <Hr />
          <Title notfirst={true}>REGISTRUOTI ŽUVIES SVORĮ:</Title>
          <Li onClick={handleFishWeightBoat} disabled={!lastFishingStartTime}>
            <Row>
              <Icon src="/icons/fish.svg" />
              <Action>Žuvies svoris laive</Action>
            </Row>
            <InfoLabel>(Tik žvejojant Kuršių mariose)</InfoLabel>
          </Li>
          <Li
            onClick={handleFishWeightShore}
            last={true}
            disabled={!lastFishingStartTime}
          >
            <Row>
              <Icon src="/icons/fish.svg" />
              <Action>Žuvies svoris krante</Action>
            </Row>
          </Li>
          <Hr />
          <Title notfirst={true}>REGISTRUOTI ĮRANKIO BUVIMO VIETĄ:</Title>
          <Li
            onClick={() => handleBuildTools(locationTypes.baras)}
            disabled={!lastFishingStartTime}
          >
            <Row>
              <Icon src="/icons/anchor.svg" />
              <Action>Kuršių mariose</Action>
            </Row>
          </Li>
          <Li
            onClick={() => handleBuildTools(locationTypes.other)}
            disabled={!lastFishingStartTime}
          >
            <Row>
              <Icon src="/icons/anchor.svg" />
              <Action>Vidaus vandens telkiniuose</Action>
            </Row>
          </Li>
          <Li
            onClick={() => handleBuildTools(locationTypes.polder)}
            disabled={!lastFishingStartTime}
          >
            <Row>
              <Icon src="/icons/anchor.svg" />
              <Action>Polderiuose</Action>
            </Row>
          </Li>
        </InnerContainer>
      ) : null}
    </Container>
  );
};

const StyledIcon = styled(Icons)`
  margin-left: 10px;
  color: white;
  font-size: 2.5rem;
`;

const StyledButton = styled(Button)`
  @media ${device.mobileL} {
    width: 90px;
  }
`;

const InnerContainer = styled.div`
  box-shadow: 0px 2px 16px #121a5529;
  border-radius: 4px;
  color: white;
  background-color: white;
  width: 324px;
  padding: 24px;
  position: absolute;
  z-index: 3;
  left: 0;
  top: 50px;
  @media ${device.mobileL} {
    position: fixed;
    z-index: 8;
    left: 0;
    top: 64px;
    width: 100%;
    height: min-content;
  }
`;

const Container = styled.div`
  position: relative;
`;
const Title = styled.div<{ notfirst?: boolean }>`
  margin-top: ${({ notfirst }) => (notfirst ? "24px" : "0px")};
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 0.56px;
  color: #121a558f;
  margin-bottom: 16px;
`;
const Action = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: #121a55;
  margin-left: 14px;
  white-space: nowrap;
`;

const Icon = styled.img`
  color: ${({ theme }) => theme.colors.pending};
  vertical-align: middle;
  align-self: center;
`;

const Hr = styled.div`
  border: 1px solid #121a553d;
  margin: 0 -24px;
`;

const Li = styled.div<{
  last?: boolean;
  lastInContainer?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: ${({ last, lastInContainer }) =>
    last ? (lastInContainer ? "0px" : "23px") : "29px"};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoLabel = styled.span`
  margin: 0 0 0 35px;
  font-size: 1.2rem;
  color: #121a558f; ;
`;

export default FishingDropdown;

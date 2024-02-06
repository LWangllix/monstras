import React from "react";
import styled from "styled-components";
import { EVENT_TYPES } from "../../utils/constants";

export interface FishingIconsProps {
  status:
    | "fishWeightOnBoat"
    | "startFishing"
    | "builtTools"
    | "fishWeightOnShore"
    | "endFishing"
    | "new";
  label?: string;
  className?: string;
}

const FishingIcon = ({ status, className }: FishingIconsProps) => {
  if (status === EVENT_TYPES.FishingStarted) {
    return (
      <Container className={className}>
        <Img src="/icons/start_fishing.png" />
      </Container>
    );
  } else if (status === EVENT_TYPES.FishingToolsBuilt) {
    return (
      <Container className={className}>
        <Img src="/icons/built_tools.png" />
      </Container>
    );
  } else if (status === EVENT_TYPES.FishWeightOnBoat) {
    return (
      <Container className={className}>
        <Img src="/icons/fishWeightOnBoat.png" />
      </Container>
    );
  } else if (status === EVENT_TYPES.FishWeightOnShore) {
    return (
      <Container className={className}>
        <Img src="/icons/fishWeightOnShore.png" />
      </Container>
    );
  } else if (status === EVENT_TYPES.FishingEnded) {
    return (
      <Container className={className}>
        <Img src="/icons/finishFishing2.png" />
      </Container>
    );
  } else if (status === "new") {
    return (
      <Container className={className}>
        <Img src="/icons/new.png" />
      </Container>
    );
  } else {
    return null;
  }
};

const Container = styled.div`
  position: relative;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

export default FishingIcon;

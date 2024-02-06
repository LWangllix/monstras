import React, { useContext, useState } from "react";
import styled from "styled-components";
import FishingIcon from "../fishing/FishingIcon";
import Icons from "../other/Icon";
import dynamic from "next/dynamic";
import { Location } from "../../types";
import { UserContext } from "../../utils/AppContextProvider";
import { useRouter } from "next/router";
import { EVENT_TYPES } from "../../utils/constants";
import { User } from "../../server/models/User";

interface FIshingMarkerProps {
  location: Location;
  fisher: User;
  status:
    | "fishWeightOnBoat"
    | "startFishing"
    | "builtTools"
    | "fishWeightOnShore"
    | "endFishing";
  tools: Array<any>;
  id: string;
}

const MapMarker: any = dynamic(() => import("./FishingMapMarker"), {
  ssr: false,
});
const MapTooltip: any = dynamic(() => import("./MapTooltip"), {
  ssr: false,
});

const FishingMarker = ({
  location,
  fisher,
  status,
  tools,
  id,
}: FIshingMarkerProps) => {
  const router = useRouter();
  const [shouldClose, setShouldClose] = useState(true);
  const { isInspector } = useContext(UserContext);
  const inspectorProfile = isInspector && router.pathname?.includes("vidinis");

  const notClickableEvent =
    EVENT_TYPES.FishingEnded === status ||
    EVENT_TYPES.FishingStarted === status;

  const locationLabel =
    status === "startFishing"
      ? "Pradeda žvejybą"
      : status === "endFishing"
      ? "Baigta žvejyba"
      : status === "fishWeightOnShore"
      ? "Žuvų iškrovimas"
      : location?.waterBody?.type === "baras"
      ? `${location?.waterBody?.name}, Kuršių marios`
      : `${location?.waterBody?.name}, ${location?.municipality?.name}`;

  const Url = inspectorProfile ? `/vidinis/${id}` : `/zurnalas/${id}`;

  const handleOpenEvent = () => {
    if (
      status === EVENT_TYPES.FishingToolsBuilt ||
      status === EVENT_TYPES.FishWeightOnBoat ||
      status === EVENT_TYPES.FishWeightOnShore
    ) {
      router.push(Url);
    }
  };

  return (
    <MapMarker
      coordinates={location?.latlng || null}
      eventHandlers={{
        click: (e) => {
          setShouldClose(false);
          e.target.openPopup();
        },
        mouseover: (e) => {
          e.target.openPopup();
        },
        mouseout: (e) => {
          shouldClose && e.target.closePopup();
          setShouldClose(true);
        },
      }}
    >
      <MapTooltip>
        <Container clickable={!notClickableEvent} onClick={handleOpenEvent}>
          <FirstRow>
            <StyledFishingIcon status={status} />
            <SubRow>
              <Title>{locationLabel}</Title>
              <LabelContainer>
                <LocationIcon name={"Searchlocation"} />
                <LocationText>{`${location?.latlng.lat
                  .toString()
                  .substring(0, 9)} ${location?.latlng.lng
                  .toString()
                  .substring(0, 9)}`}</LocationText>
              </LabelContainer>
            </SubRow>
          </FirstRow>
          {tools?.length > 0 ? (
            <ToolsContainer>
              {(tools || []).map((tool, index) => {
                return (
                  <EventInfo key={`${index}_map_tool`}>
                    <ToolInfo>{`${tool.toolName}, ${tool.eyeSizeLabel}, ${tool.toolsLenght} m`}</ToolInfo>
                    <LabelContainer>
                      <UserIcon name={"user"} />
                      <UserText>{`${fisher.name.substring(0, 1)}. ${
                        fisher.lastName
                      }`}</UserText>
                    </LabelContainer>
                  </EventInfo>
                );
              })}
            </ToolsContainer>
          ) : null}
        </Container>
      </MapTooltip>
    </MapMarker>
  );
};

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div<{ clickable: boolean }>`
  cursor: ${({ clickable }) => (clickable ? "pointer" : "auto")};
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstRow = styled.div`
  display: flex;
  align-items: center;
`;

const ToolsContainer = styled.div`
  margin-top: 13px;
  display: flex;
  flex-direction: column;
`;

const StyledFishingIcon = styled(FishingIcon)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const Title = styled.div`
  font: normal normal bold 1.5rem/21px Manrope;
  color: #121a55;
`;

const SubRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToolInfo = styled.div`
  font: normal normal 600 1.2rem/17px Manrope;
  letter-spacing: 0px;
  color: #121a55;
`;

const LocationText = styled.span`
  color: ${({ theme }) => theme.colors.tertiary};
  font: normal normal medium 1.2rem/17px Manrope;
`;

const LocationIcon = styled(Icons)`
  color: ${({ theme }) => theme.colors.secondary};
  vertical-align: middle;
  margin-right: 6.5px;
  margin-left: -2px;
  font-size: 1.2rem;
`;

const UserText = styled.span`
  color: ${({ theme }) => theme.colors.tertiary};
  font: normal normal medium 1.2rem/17px Manrope;
`;

const UserIcon = styled(Icons)`
  color: ${({ theme }) => theme.colors.secondary};
  vertical-align: middle;
  margin-right: 6.5px;
  margin-left: -2px;
  font-size: 1.2rem;
`;

export default FishingMarker;

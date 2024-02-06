import { useMediaQuery } from "@material-ui/core";
import { format } from "date-fns";
import { map } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { device } from "../../styles";
import { UserContext } from "../../utils/AppContextProvider";
import api from "../../server/routers/api";
import { EVENT_TYPES, fishingStatesLabels } from "../../utils/constants";
import {
  getFishingEventTitle,
  mapFishLabels,
  mapToolsLabels,
} from "../../utils/fishing";
import CustomTag from "../other/CustomTag";
import Icon from "../other/Icon";
import FishingIcon from "./FishingIcon";
import Button from "../buttons/Button";
import FishingTag from "./FishingTag";
import MenuButton from "./../buttons/MenuButton";
import Menu from "../tools/ToolMenu";

export interface FishingEventItem {
  event: any;
  cancelEvent?: any;
  cancelEnabled?: boolean;
}

const FishingEventItem = ({
  event,
  cancelEvent,
  cancelEnabled = false,
}: FishingEventItem) => {
  const isMobile = useMediaQuery(device.mobileL);
  const router = useRouter();
  const eventType = event.type;
  const [menuOpen, setMenuOpen] = useState(false);

  const eventLocation = event?.location?.waterBody?.name;
  const eventLocationType = event?.location?.waterBody?.type;
  const tenant = event?.tenant?.name;
  const eventLocationEdited = event?.location?.edited;
  const notClickableEvent =
    EVENT_TYPES.FishingEnded === eventType ||
    EVENT_TYPES.FishingStarted === eventType;
  const { isInspector } = useContext(UserContext);

  const inspectorProfile = isInspector && router.pathname?.includes("vidinis");

  const eventTitle = getFishingEventTitle(eventType, eventLocation);

  const eventLabels =
    eventType === EVENT_TYPES.FishingToolsBuilt
      ? mapToolsLabels(event?.tools)
      : eventType === EVENT_TYPES.FishWeightOnBoat
      ? mapFishLabels(event?.fishes)
      : null;

  const eventDate = format(
    new Date(event.time),
    eventType === EVENT_TYPES.FishingStarted ? `yyyy-MM-dd H:mm` : `yyyy-MM-dd`
  );

  const fisher = `${event.user?.name?.substring(0, 1).toUpperCase()}.${
    event.user.lastName
  }`;

  const Url = inspectorProfile
    ? `/vidinis/${event?.id}`
    : `/zurnalas/${event?.id}`;

  const handleOpenCard = () => {
    if (
      eventType === EVENT_TYPES.FishingToolsBuilt ||
      eventType === EVENT_TYPES.FishWeightOnBoat ||
      eventType === EVENT_TYPES.FishWeightOnShore
    ) {
      router.push(Url);
    }
  };

  const handleCancelEvent = async (eventId: string) => {
    const response = await api.fishing.cancelEvent({
      eventId,
    });

    event.canceledAt = (response as FishingEventItem).event.canceledAt;
    cancelEvent?.((response as FishingEventItem).event.canceledAt);
  };

  return (
    <Container clickable={!notClickableEvent} canceled={!!event.canceledAt}>
      <StatusContainer>
        {!isMobile && (
          <StatusMarker isInspector={inspectorProfile} status={eventType} />
        )}
        <StyledFishingIcon status={eventType} />
      </StatusContainer>
      <Content onClick={handleOpenCard}>
        {inspectorProfile ? (
          <FirstRow>
            <Company>{tenant || fisher}</Company>
            <FishingTag
              status={eventType}
              text={fishingStatesLabels[eventType]}
              isEvent={true}
            />
          </FirstRow>
        ) : null}
        <FirstRow>
          <Event
            eventLocationEdited={eventLocationEdited && inspectorProfile}
            canceled={!!event.canceledAt}
          >
            {eventTitle}
            {eventLocationType === "baras" ? (
              <EventArea>, Kuršių marios</EventArea>
            ) : null}
          </Event>
          {!inspectorProfile ? (
            <FishingTag
              isEvent={true}
              status={eventType}
              text={fishingStatesLabels[eventType]}
            />
          ) : null}
        </FirstRow>
        <SecondRow>
          <div>
            <StyledIcon name="calendar" />
            <StyledText>{eventDate}</StyledText>
          </div>
          <div>
            <StyledIcon name="user" />
            <StyledText>{fisher}</StyledText>
          </div>
          <LabelsContainer>
            {map(eventLabels, (label, index) => (
              <CustomTag key={`label_${index}`} text={label} />
            ))}
          </LabelsContainer>
        </SecondRow>
      </Content>
      {cancelEnabled && (
        <>
          <ButtonContainer>
            <CancelButton
              variant="tertiary"
              left={<StyledImg src="/icons/disconnect.svg" />}
              height={32}
              innerPadding="0 16px"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelEvent(event.id);
              }}
              disabled={false}
            >
              Atšaukti
            </CancelButton>
          </ButtonContainer>
          <MobileButtonContainer>
            <MenuButton
              menuOpen={menuOpen}
              setMenuOpen={(open) => {
                setMenuOpen(open);
              }}
            >
              <Menu
                showCancelEvent={cancelEnabled}
                onCancelEvent={(e) => {
                  e.stopPropagation();
                  handleCancelEvent(event.id);
                }}
              />
            </MenuButton>
          </MobileButtonContainer>
        </>
      )}
    </Container>
  );
};

const LabelsContainer = styled.div`
  display: flex;
  @media ${device.mobileL} {
    visibility: hidden;
    width: 0;
    display: none;
  }
`;

const Container = styled.a<{ clickable: boolean; canceled: boolean }>`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 8px 16px #121a5514;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  opacity: 1;
  width: 100%;
  display: flex;
  vertical-align: middle;
  padding: 12px 8px 12px 0;
  margin: 8px 0;
  box-sizing: border-box;
  position: relative;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "text")};

  ${({ canceled }) =>
    canceled &&
    `
-webkit-filter: grayscale(1);
`}
`;

const Company = styled.div`
  font-weight: 600;
  font: 1.4rem;
  letter-spacing: 0px;
  color: #0b1f518f;
`;
const EventArea = styled.span`
  color: #121a55;
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.colors.tertiary};
  vertical-align: middle;
  margin: auto 14px auto 0;
  white-space: nowrap;
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.secondary};
  vertical-align: middle;
  margin-right: 10px;
  font-size: 1.9rem;
`;

const StatusContainer = styled.div`
  display: flex;
`;

const StatusMarker = styled.div<{ status: string; isInspector: boolean }>`
  width: 4px;
  height: ${({ isInspector }) => (isInspector ? "72px" : "40px")};
  background-color: ${({ theme, status }) => theme.colors[status]};
  box-shadow: 0px 30px 60px #121a5514;
  border-radius: 0px 8px 8px 0px;
  opacity: 1;
  margin-bottom: auto;
  margin-top: auto;
`;

const StyledFishingIcon = styled(FishingIcon)`
  margin: auto 16px auto 17px;
  height: 40px;
  width: 40px;
  @media ${device.mobileL} {
    margin: auto 8px auto 10px;
  }
`;
const MobileButtonContainer = styled.div`
  display: none;
  @media ${device.mobileL} {
    display: block;
  }
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
  justify-content: space-between;
  @media ${device.mobileM} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Event = styled.span<{ eventLocationEdited: boolean; canceled: boolean }>`
  display: inline-block;
  font-weight: bold;
  color: ${({ eventLocationEdited }) =>
    eventLocationEdited ? "#FE5B78" : "#121a55"};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 16px;

  ${({ eventLocationEdited }) =>
    eventLocationEdited &&
    css`
      &:after {
        content: " !";
      }
    `};

  ${({ canceled }) =>
    canceled &&
    `
text-decoration: line-through;
`}
`;

const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 4px;
`;

export default FishingEventItem;

const StyledImg = styled.img`
  height: 13.5px;
  width: 13.5px;
  margin-right: 6px;
`;

const CancelButton = styled(Button)`
  min-width: 100px;
  display: none;

  ${Container}:hover & {
    display: block;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  @media ${device.mobileL} {
    display: none;
  }
`;

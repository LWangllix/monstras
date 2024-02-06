import { format, isToday, isYesterday } from "date-fns";
import { map } from "lodash";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Loader from "../other/Loader";
import FishingEventItem from "./FishingEventItem";

const renderDate = ({ date, index }) => {
  if (isToday(new Date(date))) {
    return <DateContainer key={index}>ŠIANDIEN</DateContainer>;
  } else if (isYesterday(new Date(date))) {
    return <DateContainer key={index}>VAKAR</DateContainer>;
  } else if (date) {
    return (
      <DateContainer key={index}>
        {format(new Date(date), `yyyy-MM-dd`)}
      </DateContainer>
    );
  }
  return null;
};

interface EventListProps {
  fishings?: any[];
  lastFishingToCancel?: any;
  loading?: boolean;
  onCancel?: () => void;
}

const EventList = ({
  fishings,
  lastFishingToCancel,
  onCancel,
  loading,
}: EventListProps) => {
  // allow only first event to enable
  let cancelEnabledOnce = false;
  return (
    <Container>
      {map(fishings, (group, groupIndex) => {
        return (
          <EventListGroup key={group.date}>
            {renderDate({
              date: group.date,
              index: `${groupIndex}_date`,
            })}
            {map(group.events, (event) => {
              let cancelEnabled = false;

              if (
                !cancelEnabledOnce &&
                lastFishingToCancel?.["id"] === event.fishingId &&
                !event.canceledAt
              ) {
                cancelEnabled = true;
                cancelEnabledOnce = true;
              }
              return (
                <FishingEventItem
                  key={event.id}
                  event={event}
                  cancelEnabled={cancelEnabled}
                  cancelEvent={(canceledAt?: string) => {
                    event.canceledAt = canceledAt;
                    onCancel?.();
                  }}
                />
              );
            })}
          </EventListGroup>
        );
      })}
      {loading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : null}
    </Container>
  );
};

const EventListGroup = styled.div``;

const Container = styled.div`
  @media ${device.mobileL} {
    padding-bottom: 80px;
  }
`;

const DateContainer = styled.div`
  font: normal normal bold 1.4rem/19px Manrope;
  letter-spacing: 0.56px;
  color: #121a558f;
  text-transform: uppercase;
  margin: 24px 0;
`;

const LoaderContainer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

export default EventList;

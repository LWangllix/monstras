import { useMediaQuery } from "@material-ui/core";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tool } from "../../server/models/Tool";
import api from "../../server/routers/api";
import { device } from "../../styles";
import { currentPage, waterObjectType } from "../../utils/constants";
import { getCurrentLocation } from "../../utils/location";
import { locationTypes } from "../../utils/routers";
import BackButton from "../buttons/BackButton";
import EditCard from "../fishing/EditCard";
import InfoCard from "../other/InfoCard";
import LocationEmptyState from "../other/LocationEmptyState";
import Notification from "../other/Notification";
import AddTools from "./AddTools";
import ToolsList from "./ToolsList";

const generateInfo = (event, location) => {
  const i = [];
  if (location) {
    i.push({
      type:
        location?.waterBody.type === "not_found" ||
        location?.waterBody.type === "searching"
          ? null
          : "location",
      value:
        location?.waterBody.type === "not_found" ||
        location?.waterBody.type === "searching"
          ? null
          : `${location?.latlng?.lat
              ?.toString()
              .substring(0, 9)}, ${location?.latlng?.lng
              ?.toString()
              .substring(0, 9)}`,
    });
  }

  if (event?.time) {
    i.push({
      type: "date",
      value: format(new Date(event.time), "yyyy-MM-dd HH:mm"),
    });
  }
  return [i];
};

const getLocationType = (type) => {
  switch (type) {
    case locationTypes.baras:
      return waterObjectType.baras;
    case locationTypes.other:
      return waterObjectType.other;
    case locationTypes.polder:
      return waterObjectType.polder;
    default:
      return undefined;
  }
};

const BuildFishingTools = (props) => {
  const { onSetLocation } = props;
  const isMobile = useMediaQuery(device.mobileL);
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [searching, setSearching] = useState(true);
  const [location, setLocation] = useState(null);
  const [event, setEvent] = useState(null);
  const [lastFishingStartTime, setLastFishingStartTime] = useState({
    loading: true,
    lastFishingStartTime: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [locationError, setLocationError] = useState(0);

  const onLocationError = () => {
    setLocationError(1);
    setLocation(null);
    setSearching(false);
  };

  const onLocationSuccess = (coordinates) => {
    api.location
      .findToolLocation({
        coordinates,
        type: getLocationType(router.query.tipas)?.value,
        waterBodyId: router.query.id?.toString(),
      })
      .then((response) => {
        const foundLocation = response["location"];
        setLocation(foundLocation || null);
        onSetLocation(foundLocation || null);
        if (!foundLocation) {
          setLocationError(2);
        }
        setSearching(false);
      })
      .catch(() => {
        setLocationError(2);
        setSearching(false);
      });
  };

  useEffect(() => {
    api.fishing.getLastFishingInfo({}).then((response) => {
      const fishingStartTime = response["lastFishingStartTime"];
      setLastFishingStartTime({
        lastFishingStartTime: fishingStartTime,
        loading: false,
      });
    });
  }, []);

  useEffect(() => {
    setSearching(true);
    setEvent(null);
    setTools([]);
    if (router.query.id) {
      onLocationSuccess(null);
    } else {
      getCurrentLocation(onLocationSuccess, onLocationError);
    }
  }, [router.query.tipas, router.query.id]);

  useEffect(() => {
    if (location) {
      api.fishing
        .fishingAreaTools({
          waterBodyId: location.waterBody.id,
          isPolder: router.query.tipas === "polderis",
        })
        .then((response) => {
          setTools(response["tools"]);
        });
    }
  }, [location]);

  const handleConnectTools = (tool: Tool, group: any) => (e) => {
    api.tools
      .connectTool({
        connectToId: tool?.group_id,
        connectGroupId: group?.groupId,
        waterBodyId: location?.waterBody.id,
        eventId: e?.id,
        isPolder: router.query.tipas === "polderis",
      })
      .then((response) => {
        const updatedTools = response["tools"];
        if (updatedTools) {
          setTools(response["tools"]);
        }
      });
  };

  const handleDisconnectTool = (tool: any) => (e) => {
    api.tools
      .disconnectTool({
        toolId: tool.id,
        waterBodyId: location.waterBody.id,
        eventId: e?.id,
        isPolder: router.query.tipas === "polderis",
      })
      .then((response) => {
        const updateTools = response["tools"];
        if (updateTools) {
          setTools(updateTools);
        }
      });
  };

  const handleAddTool = (tool: any) => (e) => {
    api.tools
      .addToolsToEvent({
        eventId: e?.id,
        groupId: tool.groupId,
        waterBodyId: location?.waterBody?.id,
        isPolder: router.query.tipas === "polderis",
      })
      .then((response) => {
        const updatedTools = response["tools"];
        if (updatedTools) {
          setTools(updatedTools);
        }
      });
  };

  const handReturnGroup = (grouId) => (e) => {
    api.tools
      .returnTool({
        groupId: grouId,
        waterBodyId: location?.waterBody?.id,
        eventId: e?.id,
        isPolder: router.query.tipas === "polderis",
      })
      .then((response) => {
        const updateToolList = response["tools"];
        if (updateToolList) {
          setTools(updateToolList);
        }
      });
  };

  const handleEventUpdate = (callback) => {
    if (event) {
      callback(event);
    } else if (location) {
      api.tools
        .createEvent({ location, type: "builtTools" })
        .then((response) => {
          const e = response["event"];
          if (e) {
            setEvent(e);
            callback(e);
          }
        });
    }
  };

  const addToolDisabled =
    !location ||
    (!lastFishingStartTime.lastFishingStartTime &&
      !lastFishingStartTime.loading);

  const eventInfo = generateInfo(event, location);

  return (
    <>
      {!isMobile ? (
        <Row>
          <BackButton onClick={() => router.replace("/zurnalas")} />
        </Row>
      ) : null}

      <InfoCard
        url={"/zurnalas"}
        title={
          searching
            ? "Ieškoma vandens telkinio..."
            : location === null
            ? "Vandens telkinys nerastas"
            : location?.waterBody?.name
        }
        info={eventInfo}
        loading={searching}
        onEdit={() => setShowModal(true)}
        showModal={showModal}
        currentPage={currentPage.builtTools}
        dialogContent={
          <EditCard
            onSetClose={() => setShowModal(false)}
            onLocationSelect={(location) => {
              setLocation(location);
              onSetLocation(location);
            }}
            options={[getLocationType(router.query?.tipas)]}
          />
        }
      />
      <Container>
        {!lastFishingStartTime.lastFishingStartTime &&
          !lastFishingStartTime.loading && (
            <ToolsNotification
              text="Išplaukimas žvejoti neužregistruotas"
              error={true}
            />
          )}
        {location && !searching && (
          <MobileContainer>
            <ToolsList
              tools={tools}
              connectOptions={tools}
              onConnectTools={(tool, group) =>
                handleEventUpdate(handleConnectTools(tool, group))
              }
              onDisconnectTool={(tool) =>
                handleEventUpdate(handleDisconnectTool(tool))
              }
              onReturnGroup={(grouId) =>
                handleEventUpdate(handReturnGroup(grouId))
              }
              disabled={addToolDisabled}
            />
            <AddTools
              onOptionSelecet={(tool) => handleEventUpdate(handleAddTool(tool))}
              disabled={addToolDisabled}
              location={location}
            />
          </MobileContainer>
        )}
        {!location && !searching && (
          <LocationEmptyState
            locationError={locationError}
            onClick={
              locationError === 2
                ? () => {
                    setSearching(true);
                    getCurrentLocation(onLocationSuccess, onLocationError);
                  }
                : null
            }
          />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MobileContainer = styled.div`
  @media ${device.mobileL} {
    padding: 0 16px;
  }
`;

const ToolsNotification = styled(Notification)`
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
  box-sizing: border-box;
`;

export default BuildFishingTools;

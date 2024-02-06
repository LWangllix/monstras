import { find, forEach, isEmpty, map } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";
import { useAlert } from "../../monoCommon/components/Alerts";
import api from "../../server/routers/api";
import { device } from "../../styles";
import { Location } from "../../types";
import {
  currentPage,
  EVENT_TYPES,
  waterObjectType,
} from "../../utils/constants";
import { getCurrentLocation } from "../../utils/location";
import InfoCard from "../other/InfoCard";
import LocationEmptyState from "../other/LocationEmptyState";
import Notification from "../other/Notification";
import CaughtFishOnShoreToolsForm from "./CaughtFishToolsForm";
import EditCard from "./EditCard";
import FishingEmptyState from "./FishingEmptyState";
import NewFishFormDialog from "./NewFishFormDialog";

const getInfo = (location) => {
  const info = [];
  if (location) {
    info.push({
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
  return [info];
};

const mapFishForSubmit = (values, tools) => {
  const toolIds = Object.keys(values);
  const data = [];
  forEach(toolIds, (id) => {
    const foundTool = find(tools, (t) => (t.id = id));
    const toolFishes = values[id];
    const mapedToolFishes = map(toolFishes, (fish) => ({
      id: fish.type.id,
      label: fish.type.label,
      weight: fish.weight,
      groupId: foundTool.group_id,
    }));
    data.push(...mapedToolFishes);
  });
  return data;
};

interface CaughtFishesOnBoatProps {
  onSetLocation: React.Dispatch<React.SetStateAction<Location>>;
}

const CaughtFishesOnBoat = ({ onSetLocation }: CaughtFishesOnBoatProps) => {
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [searching, setSearching] = useState(true);
  const [location, setLocation] = useState(null);
  const [lastFishingStartTime, setLastFishingStartTime] = useState({
    loading: true,
    lastFishingStartTime: null,
  });
  const alert = useAlert();
  const [showAddFish, setShowAddFish] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolFish, setToolFish] = useImmer({});
  const [locationError, setLocationError] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const onLocationError = () => {
    setLocationError(1);
    setSearching(false);
  };

  const onLocationSuccess = (coordinates) => {
    setSearching(true);
    setLocationError(0);
    api.location
      .findToolLocation({
        coordinates,
        type: waterObjectType.baras.value,
      })
      .then((response) => {
        const foundLocation = response["location"];
        if (foundLocation) {
          setLocation(response["location"] || null);
          onSetLocation(response["location"] || null);
        } else {
          setLocationError(2);
        }
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
    getCurrentLocation(onLocationSuccess, onLocationError);
  }, []);

  useEffect(() => {
    if (location) {
      api.tools
        .getToolsForFishingLocation({
          waterBodyId: location.waterBody.id,
        })
        .then((response) => {
          if (response["tools"]) {
            setTools(response["tools"]);
          }
          setLocationError(2);
        })
        .catch(() => {
          setLocationError(2);
        });
    }
  }, [location]);

  const handleAddFish = (fish) => {
    setToolFish((draft) => {
      draft[selectedTool?.group_id] = fish;
    });
  };

  const handleSaveFish = (values, boatFishesWeighed = true) => {
    api.fishing
      .createCaughtFishEvent({
        fishes: values.fishes,
        location,
        boatFishesWeighed,
        type: EVENT_TYPES.FishWeightOnBoat,
      })
      .then((response) => {
        const inserted = response["inserted"];
        if (inserted) {
          router.push("/zurnalas");
          alert.show("Laimikis užregistruotas");
        } else {
          alert.error("Nepavyko užregistruoti laimikio");
        }
      });
  };

  const showTools = !searching && location && !isEmpty(tools);
  const noBuiltTools = !searching && location && isEmpty(tools);

  const renderContent = () => {
    if (showTools) {
      return (
        <CaughtFishOnShoreToolsForm
          tools={tools}
          toolFish={toolFish}
          onClickItem={(tool) => {
            setShowAddFish(true);
            setSelectedTool(tool);
          }}
          onSumbit={() => {
            if (!isEmpty(toolFish)) {
              const f = mapFishForSubmit(toolFish, tools);
              handleSaveFish({ fishes: f }, false);
            }
            //TODO: error message to explane if no fishes selected
          }}
        />
      );
    } else if (noBuiltTools) {
      return <FishingEmptyState title="Nėra pastatytų įrankių" />;
    } else if (!location && !searching && locationError != 0) {
      return (
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
      );
    }
  };

  return (
    <>
      <InfoCard
        url={"/zurnalas"}
        title={
          searching
            ? "Ieškoma vandens telkinio..."
            : location === null
            ? "Vandens telkinys nerastas"
            : location?.waterBody?.name
        }
        info={getInfo(location)}
        loading={searching}
        onEdit={() => setShowModal(true)}
        showModal={showModal}
        currentPage={currentPage.fishWeightOnBoat}
        dialogContent={
          <EditCard
            onSetClose={() => setShowModal(false)}
            onLocationSelect={(location) => {
              setLocation(location);
              onSetLocation(location);
            }}
            options={[waterObjectType.baras]}
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
        {renderContent()}
      </Container>
      <NewFishFormDialog
        visible={showAddFish}
        onClose={() => setShowAddFish(false)}
        onSubmit={handleAddFish}
        tool={selectedTool}
        toolFish={toolFish}
      />
    </>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  @media ${device.mobileL} {
    padding: 0 16px;
  }
`;

const ToolsNotification = styled(Notification)`
  margin-bottom: 16px;
`;

export default CaughtFishesOnBoat;

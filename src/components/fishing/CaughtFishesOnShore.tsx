import { find, forEach, isEmpty, map } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";
import { useAlert } from "../../monoCommon/components/Alerts";
import api from "../../server/routers/api";
import { device } from "../../styles";
import { currentPage, EVENT_TYPES } from "../../utils/constants";
import { getCurrentLocation } from "../../utils/location";
import ToggleButton from "../buttons/ToggleButton";
import InfoCard from "../other/InfoCard";
import LocationEmptyState from "../other/LocationEmptyState";
import Notification from "../other/Notification";
import CaughtFishesOnShoreWeightForm from "./CaughFishOnShoreWeightForm";
import CaughtFishOnShoreToolsForm from "./CaughtFishToolsForm";
import FishingEmptyState from "./FishingEmptyState";
import NewFishFormDialog from "./NewFishFormDialog";

const getInfo = (location) => {
  const info = [];
  if (location) {
    info.push({
      type: !location ? null : "location",
      value: !location
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

const indexTofishingLocationType = {
  0: "baras",
  1: "other",
  2: "polder",
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

const CaughtFishesOnShore = ({ onSetLocation }: CaughtFishesOnBoatProps) => {
  const [searching, setSearching] = useState(true);
  const [fishes, setFishes] = useState([]);
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolFish, setToolFish] = useImmer({});
  const [location, setLocation] = useState(null);
  const alert = useAlert();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAddFish, setShowAddFish] = useState(false);
  const router = useRouter();

  const lastFishingStartTime = {
    loading: true,
    lastFishingStartTime: null,
  };
  const [locationError, setLocationError] = useState(0);

  useEffect(() => {
    if (
      indexTofishingLocationType[selectedIndex] &&
      indexTofishingLocationType[selectedIndex] !== "baras"
    ) {
      api.tools
        .getAllToolsInWater({ type: indexTofishingLocationType[selectedIndex] })
        .then((response) => {
          const toolsInWater = response["tools"];
          if (toolsInWater) {
            setTools(toolsInWater);
          }
        });
    }
    setToolFish({});
  }, [selectedIndex]);

  useEffect(() => {
    if (location) {
      api.fishing.getCaughtFishOnBoat({}).then((response) => {
        const fishes = response["fishes"];
        if (!isEmpty(fishes)) {
          setFishes(fishes);
        }
        setSearching(false);
      });
    }
  }, [location]);

  const onLocationError = () => {
    setLocationError(1);
    setSearching(false);
  };

  const onLocationSuccess = (coordinates) => {
    setSearching(true);
    api.location.findMunicipality({ coordinates }).then((response) => {
      const foundLocation = response["location"];
      if (foundLocation) {
        setLocation(response["location"] || null);
        onSetLocation(response["location"] || null);
        setLocationError(0);
      } else {
        setLocationError(2);
      }
      setSearching(false);
    });
  };

  useEffect(() => getCurrentLocation(onLocationSuccess, onLocationError), []);

  const handleSaveFish = (values, boatFishesWeighed = true) => {
    api.fishing
      .createCaughtFishEvent({
        fishes: values.fishes,
        location,
        boatFishesWeighed,
        type: EVENT_TYPES.FishWeightOnShore,
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

  const handleAddFish = (fish) => {
    setToolFish((draft) => {
      draft[selectedTool?.group_id] = fish;
    });
  };

  const renderContent = () => {
    if (!location && !searching && locationError != 0) {
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
    } else if (
      !searching &&
      indexTofishingLocationType[selectedIndex] &&
      indexTofishingLocationType[selectedIndex] !== "baras"
    ) {
      if (!isEmpty(tools)) {
        return (
          <CaughtFishOnShoreToolsForm
            tools={tools}
            toolFish={toolFish}
            onClickItem={(tool) => {
              setShowAddFish(true);
              setSelectedTool(tool);
            }}
            onSumbit={() => {
              const f = mapFishForSubmit(toolFish, tools);
              handleSaveFish({ fishes: f }, false);
            }}
          />
        );
      } else {
        return <FishingEmptyState title="Nėra įrankių vandenyje" />;
      }
    } else if (
      !searching &&
      indexTofishingLocationType[selectedIndex] &&
      indexTofishingLocationType[selectedIndex] === "baras"
    ) {
      if (!isEmpty(fishes)) {
        return (
          <CaughtFishesOnShoreWeightForm
            fishes={fishes}
            onSubmit={handleSaveFish}
          />
        );
      } else {
        return (
          <FishingEmptyState title="Nėra užregistruoto laimikio vandenyje" />
        );
      }
    }
  };

  return (
    <DragableContainer
      draggable="true"
      onDragEnd={() => getCurrentLocation(onLocationSuccess, onLocationError)}
    >
      <InfoCard
        url={"/zurnalas"}
        title={
          searching
            ? "Ieškoma savivaldybės..."
            : location === null
            ? "Savivaldybė nerasta "
            : location?.municipality.name
        }
        info={getInfo(location)}
        loading={searching}
        // onEdit={() => setShowModal(true)}
        showModal={false}
        currentPage={currentPage.fishWeightOnShore}
        // dialogContent={
        //   <EditCard
        //     onSetClose={() => setShowModal(false)}
        //     onLocationSelect={(location) => {
        //       setLocation(location);
        //       onSetLocation(location);
        //     }}
        //     options={[]}

        //   />
        // }
      />
      <Container>
        {!lastFishingStartTime.lastFishingStartTime &&
          !lastFishingStartTime.loading && (
            <ToolsNotification
              text="Išplaukimas žvejoti neužregistruotas"
              error={true}
            />
          )}
        {!searching && locationError === 0 && (
          <ToggleButton
            isSelectWaterType={true}
            options={["Kuršių marios", "Vidaus vandens telkiniai", "Polderiai"]}
            onChange={(index) => setSelectedIndex(index)}
            selected={selectedIndex}
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
    </DragableContainer>
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

const DragableContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ToolsNotification = styled(Notification)`
  margin-bottom: 16px;
`;

export default CaughtFishesOnShore;

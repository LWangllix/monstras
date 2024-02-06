import { filter, map } from "lodash";
import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import { Tool } from "../../server/models/Tool";
import { Location } from "../../types";
import FishingMarker from "./FishingMarker";

interface FIshingMapProps {
  location?: Location;
  fisher?: string;
  status?:
    | "fishWeightOnBoat"
    | "startFishing"
    | "builtTools"
    | "fishWeightOnShore";
  tools?: Tool;
}

const Map: any = dynamic(() => import("./Map"), { ssr: false });
const MarkerClusterGroup = dynamic(
  () => import("react-leaflet-markercluster"),
  { ssr: false }
);

const FishingMap = ({ data }: Array<FIshingMapProps> | any) => {
  const toolsInfo = (responseTools) => {
    const data = [];
    const groups = [];
    responseTools?.forEach((tool) => {
      if (!groups.includes(tool?.group_id)) {
        const toolsGroup = filter(responseTools, (t) => {
          if (t.group_id === tool.group_id) return t;
        });
        data.push({
          groupId: tool.group_id,
          tools: toolsGroup,
        });
        groups.push(tool.group_id);
      }
    });

    return data.map((group) => {
      const toolName = group.tools[0]?.toolType?.label;
      const toolsLenght = group?.tools?.reduce((lenght, item) => {
        return lenght + parseInt(item.net_length);
      }, 0);

      const eyeSizes = group?.tools?.reduce(
        (sizes, item) => {
          const currentSmall = sizes.small;
          const currentBig = sizes.big;
          const newSmall =
            item.eye_size < currentSmall || currentSmall === 0
              ? item.eye_size
              : currentSmall;
          const newBig =
            item.eye_size > currentBig ? item.eye_size : currentBig;
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

      return { toolName, toolsLenght, eyeSizeLabel };
    });
  };

  return (
    <MapContainer>
      <Map coordinates={[55.322, 23.897]}>
        <MarkerClusterGroup
          animate={true}
          spiderfyDistanceMultiplier={1}
          animateAddingMarkers={true}
        >
          {map(data, (event, index) => {
            return (
              <div key={`marke_${index}`}>
                {event && (
                  <FishingMarker
                    id={event?.id}
                    location={event?.location}
                    fisher={event?.fisher}
                    status={event?.status}
                    tools={!!event.tools ? toolsInfo(event.tools) : null}
                  />
                )}
              </div>
            );
          })}
        </MarkerClusterGroup>
      </Map>
    </MapContainer>
  );
};

export default FishingMap;
const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: "100%";
  background-color: white;
`;

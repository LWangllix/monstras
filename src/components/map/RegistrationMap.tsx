import dynamic from "next/dynamic";
import React, { memo } from "react";
import styled from "styled-components";

interface LocationMarkerProps {
  location?: Location;
}

const FishAreaComponent = memo(({ location }: LocationMarkerProps) => {
  const Map: any = dynamic(() => import("./Map"), { ssr: false });
  const LocationMarker: any = dynamic(() => import("./LocationMarker"), {
    ssr: false,
  });

  return (
    <MapContainer>
      <Map coordinates={[55.322, 23.897]}>
        <LocationMarker location={location} />
      </Map>
    </MapContainer>
  );
});

export default FishAreaComponent;
const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: "100%";
  background-color: white;
`;

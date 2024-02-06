import React, { useState } from "react";
import styled from "styled-components";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { LatLngExpression } from "leaflet";

export interface MapFieldProps {
  value?: LatLngExpression;
  label?: string;
  editable?: boolean;
  onChange?: (value: { lat: number; lng: number }) => void;
  children?: JSX.Element;
}

const Map: any = dynamic(() => import("../map/Map"), { ssr: false });

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const MapField = ({
  label,
  value = [55.322, 23.897],
  children,
}: MapFieldProps) => {
  const [markerPosition, setMarkerPosition] = useState([
    55.322, 23.897,
  ] as LatLngExpression);

  useEffect(() => {
    setMarkerPosition(value);
  }, [value]);

  return (
    <div>
      <h3>{label}</h3>
      <MapContainer>
        <Map coordinates={markerPosition}>{children}</Map>
      </MapContainer>
    </div>
  );
};

export default MapField;

import { useMediaQuery } from "@material-ui/core";
import { LatLngExpression } from "leaflet";
import React from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  ZoomControl,
} from "react-leaflet";
import styled from "styled-components";
import { device } from "../../styles";

interface MapProps {
  children: JSX.Element;
  coordinates: LatLngExpression;
  setMap: any;
  map: any;
}

const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: 100%;
  z-index: 1;
  .leaflet-bar a {
    width: 56px;
    height: 56px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }

  .leaflet-bar a:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .leaflet-bar a:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .leaflet-bar a:first-child:before {
    content: "";
    width: 65%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 1px solid #b3b5c4;
  }
  .leaflet-right {
    width: 0px;
    height: 184px;
  }

  .leaflet-control {
    border: none;
    margin: 36px 30px;
    box-shadow: 0px 12px 24px #121a554d;
  }
  .material-icons {
    font-size: 2rem;
    color: #b3b5c4;
  }

  @media ${device.mobileL} {
    .leaflet-control {
      display: none;
    }
  }

  cursor: pointer;
`;

const Map = ({ children, coordinates, setMap = () => {} }: MapProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <StyledMapContainer
      center={coordinates}
      zoom={8}
      scrollWheelZoom={true}
      touchZoom={true}
      zoomControl={false}
      whenCreated={(map) => setMap(map)}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
        id="mapbox/streets-v11"
        tileSize={512}
        zoomOffset={-1}
        maxZoom={18}
      />
      <WMSTileLayer
        url="https://gis.biip.lt/services/service"
        format="image/png"
        layers="zvejybosBaraiMariose"
        transparent={true}
      />
      {children}
      {!isMobile ? (
        <ZoomControl
          position="bottomright"
          zoomInText={`<span class="material-icons plus">
        add
      </span>`}
          zoomOutText={`<span class="material-icons">
      remove
      </span>`}
        />
      ) : null}
    </StyledMapContainer>
  );
};
export default Map;

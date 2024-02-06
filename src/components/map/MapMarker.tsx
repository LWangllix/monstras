import React from "react";
import { Marker } from "react-leaflet";
import Leaflet from "leaflet";

const icon = new Leaflet.Icon({
  iconUrl: "/icons/marker.png",
  iconSize: new Leaflet.Point(25, 35),
});
interface MapMarkerProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

const MapMarker = ({ coordinates, ...rest }: MapMarkerProps) => {
  return <Marker position={coordinates} icon={icon} {...rest} />;
};

export default MapMarker;

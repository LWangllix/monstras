import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Location } from "../../types";

interface LocationMarkerProps {
  location: Location;
}

const LocationMarker = ({ location }: LocationMarkerProps) => {
  const Marker: any = dynamic(() => import("../map/MapMarker"), {
    ssr: false,
  });

  const map = useMap();

  useEffect(() => {
    map.locate();
  }, [map]);

  useEffect(() => {
    if (location) {
      map.flyTo(location.latlng, 13);
    }
  }, [location]);

  return location === null || typeof location === "undefined" ? null : (
    <Marker position={location.latlng}></Marker>
  );
};

export default LocationMarker;

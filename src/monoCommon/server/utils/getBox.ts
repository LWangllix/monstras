import { LatLngLiteral } from "leaflet";
import transformation from "transform-coordinates";
const transform = transformation("EPSG:4326", "3346");
export const getBox = (coordinates: LatLngLiteral, tolerance: number = 400, convert: boolean = true) => {
  const delta = tolerance;
  const transformed = convert ? transform.forward({
    x: coordinates.lng,
    y: coordinates.lat,
  }) : { y: coordinates.lng, x: coordinates.lat };
  const lCoordinates = { lng: transformed.x, lat: transformed.y };
  const topLeft = {
    lng: lCoordinates.lng - delta,
    lat: lCoordinates.lat + delta,
  };
  const bottomRight = {
    lng: lCoordinates.lng + delta,
    lat: lCoordinates.lat - delta,
  };
  const box = `${topLeft.lng},${bottomRight.lat},${bottomRight.lng},${topLeft.lat}`;
  return box;
};

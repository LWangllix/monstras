import axios from "axios";
import { LatLngLiteral } from "leaflet";
import transformation from "transform-coordinates";
import { getBox } from "../../../monoCommon/server/utils/getBox";
import turf from "turf";

export interface Geometry {
  coordinates: number[][][];
  type: string;
}

export interface Properties {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Feature {
  bbox: number[];
  geometry: Geometry;
  id: string;
  properties: Properties;
  type: string;
}
export interface RootObject {
  features: Feature[];
  type: string;
}

const QGIS = process.env.QGIS;
if (QGIS == undefined) {
  throw "QGIS env variable is not set";
}

export const getFishingAreaFromPoint = async (
  coordinates: LatLngLiteral,
  tolerance: number = 0.001
): Promise<Feature> => {
  const box = getBox(coordinates, tolerance, false);
  const endPoint = `${QGIS}/?SERVICE=WMS&VERSION=1.3.0&GEOMETRYNAME=centroid&REQUEST=GetFeatureInfo&BBOX=${box}&CRS=EPSG:4326&WIDTH=1637&HEIGHT=1159&LAYERS=zvejybosBaraiMariose&STYLES=&FORMAT=image/jpeg&QUERY_LAYERS=zvejybosBaraiMariose&INFO_FORMAT=application/json&I=555&J=359&FEATURE_COUNT=1&&WITH_GEOMETRY=TRUE`;
  const { data } = await axios.get(endPoint);
  const { features } = data;
  const feature = features[0];
  if (!feature) {
    return
  }
  const polygon = turf.polygon(feature.geometry.coordinates);
  const center = turf.centroid(polygon);
  const c = {
    lat: center.geometry.coordinates[1],
    lng: center.geometry.coordinates[0]
  };
  feature.properties.lat = c.lat;
  feature.properties.lng = c.lng;
  return feature;
};

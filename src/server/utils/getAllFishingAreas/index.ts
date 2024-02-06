import axios from "axios";
import { LatLngLiteral } from "leaflet";
import transformation from "transform-coordinates";
import { getBox } from "../../../monoCommon/server/utils/getBox";
const transform = transformation("EPSG:4326", "3346");

export interface Geometry {
  coordinates: number[][][];
  type: string;
}

export interface Properties {
  id: string;
  name: string;
}

export interface Feature {
  bbox: number[];
  geometry: Geometry;
  id: string;
  properties: Properties;
  type: string;
}

export interface RootObject {
  type: string;
  bbox: number[];
  features: Feature[];
}

const QGIS = process.env.QGIS;
if (QGIS == undefined) {
  throw "QGIS env variable is not set";
}

export const getAllFishingAreas = async (): Promise<Array<Feature>> => {
  const endPoint = `${QGIS}/?service=WFS&version=1.0.0&request=GetFeature&typeName=zvejybosBaraiMariose&outputFormat=application/json`;
  const { data } = await axios.get(endPoint);
  const { features } = data;
  return features;
};



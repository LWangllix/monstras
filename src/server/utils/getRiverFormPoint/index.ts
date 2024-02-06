import axios from "axios";
import { LatLngLiteral } from "leaflet";
import { getBox } from "../../../monoCommon/server/utils/getBox";

export interface Geometry {
  type: string;
  coordinates: any;
}

export interface Properties {
  OBJECTID: number;
  PAVADINIMA: string;
  KADASTROID: string;
  REDAGAVIMO: Date;
  ZIOCIUX: number;
  ZIOCIUY: number;
  SHAPE_Leng: number;
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  geometry_name: string;
  properties: Properties;
}

const SAVIVALDYBES_GEOSERVER = process.env.SAVIVALDYBES_GEOSERVER;
if (SAVIVALDYBES_GEOSERVER == undefined) {
  throw "SAVIVALDYBES_GEOSERVER env variable is not set";
}

export const getRivers = async (
  coordinates: LatLngLiteral,
  tolerance: number = 900
): Promise<Array<Feature>> => {
  const box = getBox(coordinates, tolerance);
  const endPoint = `${SAVIVALDYBES_GEOSERVER}/geoserver/uetk/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=uetk:Upes_kanalai&STYLES=&LAYERS=uetk:Upes_kanalai&exceptions=application/vnd.ogc.se_inimage&INFO_FORMAT=application/json&WIDTH=101&HEIGHT=101&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG:3346&BBOX=${box}`;
  const { data } = await axios.get(endPoint);
  const { features } = data;
  return features;
};

import axios from "axios";
import { LatLngLiteral } from "leaflet";
import transformation from "transform-coordinates";
import { getBox } from "../../../monoCommon/server/utils/getBox";
const transform = transformation("EPSG:4326", "3346");

export interface Geometry {
  type: string;
  coordinates: any;
}

export interface Properties {
  OBJECTID: number;
  PAVADINIMA: string;
  REDAGAVIMO: Date;
  OBJEKTOLKS: number;
  OBJEKTOL_1: number;
  KADASTROID: string;
  KATEGORIJA: number;
  SHAPE_Leng: number;
  SHAPE_Area: number;
  bank: boolean;
  atPoint: boolean;
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

export const getLakeFromPointService = async (
  coordinates: LatLngLiteral,
  tolerance: number = 0.001
): Promise<Array<Feature>> => {
  const box = getBox(coordinates, tolerance);
  const endPoint = `${SAVIVALDYBES_GEOSERVER}/geoserver/uetk/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=uetk:Ezerai_tvenkiniai_dirbiniai&STYLES=&LAYERS=uetk:Ezerai_tvenkiniai_dirbiniai&exceptions=application/vnd.ogc.se_inimage&INFO_FORMAT=application/json&WIDTH=101&HEIGHT=101&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG:3346&BBOX=${box}`;
  const { data } = await axios.get(endPoint);
  const { features } = data;
  return features;
};

export const getLakeFromPoint = async (
  coordinates: LatLngLiteral
): Promise<Array<Feature>> => {
  const tolerance = 500;
  const lakesAtPoint = await getLakeFromPointService(coordinates);
  const lakesAround = await getLakeFromPointService(coordinates, tolerance);
  const lakeAtPoint = lakesAtPoint[0];
  const features: Array<Feature> = lakesAround.map((feature) => {
    return {
      ...feature,
      properties: {
        ...feature.properties,
        atPoint:
          feature.properties.KADASTROID === lakeAtPoint?.properties?.KADASTROID,
        bank: !lakesAtPoint.some(
          (l) => l.properties.KADASTROID === feature.properties.KADASTROID
        ),
      },
    };
  });
  return features;
};

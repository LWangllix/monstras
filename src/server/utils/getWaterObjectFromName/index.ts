import axios from "axios";
import transformation from "transform-coordinates";
import latinize from "latinize";

declare module namespace {

  export interface Geometry {
    type: string;
    coordinates: number[][][][];
  }

  export interface Properties {
    OBJECTID: number;
    PAVADINIMA: string;
    searchName: string;
    REDAGAVIMO: Date;
    OBJEKTOLKS: number;
    OBJEKTOL_1: number;
    KADASTROID: string;
    KATEGORIJA: number;
    SHAPE_Leng: number;
    SHAPE_Area: number;
    latitude: number;
    longitude: number;
    ZIOCIUX?: number;
    ZIOCIUY?: number;
    ziotysLongitude?: number;
    ziotysLatitude?: number;
  }

  export interface Feature {
    type: string;
    id: string;
    geometry: Geometry;
    geometry_name: string;
    properties: Properties;
  }

  export interface Properties2 {
    name: string;
  }

  export interface Crs {
    type: string;
    properties: Properties2;
  }

  export interface GetFeatureResponse {
    score: number
    item: Feature
  }

}

export const geUETObjectByName = async (name: string): Promise<Array<namespace.GetFeatureResponse>> => {
  const url = `http://uetk-paieska.biip.lt/search/${name}`;
  const data: Array<namespace.GetFeatureResponse> = (await axios.get(url)).data;
  return data;
};
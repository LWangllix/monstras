import axios from "axios";
import transformation from "transform-coordinates";
import latinize from "latinize";

declare module namespace {
  interface SearchItem {
    refIndex: number;
    score: number;
  }
  export interface UpeKanalas extends SearchItem {
    item: {
      bbox: number[];
      geometry: {
        coordinates: number[][][];
        type: string;
      };
      id: string;
      properties: {
        KADASTROID: string;
        OBJECTID: number;
        PAVADINIMA: string;
        REDAGAVIMO: string;
        SHAPE_Leng: number;
        ZIOCIUX: number;
        ZIOCIUY: number;
        lat: number;
        lng: number;
      };
      type: string;
      title: string;
      title0: string;
    };
  }

  export interface EzerasTvenkinys extends SearchItem {
    item: {
      bbox: number[];
      geometry: {
        coordinates: number[][][][];
        type: string;
      };
      id: string;
      properties: {
        KADASTROID: string;
        KATEGORIJA: number;
        OBJECTID: number;
        OBJEKTOLKS: number;
        OBJEKTOL_1: number;
        PAVADINIMA: string;
        REDAGAVIMO: string;
        SHAPE_Area: number;
        SHAPE_Leng: number;
        lat: number;
        lng: number;
      };
      type: string;
    };
  }
  export interface Baras {
    item: {
      bbox: number[];
      geometry: {
        coordinates: number[][][];
        type: string;
      };
      id: string;
      properties: {
        id: string;
        name: string;
        lat: number;
        lng: number;
      };
      type: string;
      title: string;
      title0: string;
      title1: string;
    };
  }

  export interface Savivaldybe {
    bbox: number[];
    geometry: {
      coordinates: number[][][][];
      type: string;
    };
    id: string;
    properties: {
      APS_KODAS: string;
      SAV_KODAS: string;
      SAV_PAV: string;
      SAV_PLOTAS: number;
      SAV_R: string;
      SHAPE_Area: number;
      SHAPE_Leng: number;
    };
  }
  export interface RootObject {
    baraiMariose: Baras[];
    upesKanalai: UpeKanalas[];
    savivaldybes: Savivaldybe[];
    ezeraiTvenkiniai: EzerasTvenkinys[];
  }
}

export const search = async ({
  name,
  limit = 10,
}): Promise<namespace.RootObject> => {
  const url = `http://search.biip.lt/search/${name}/?limit=${limit}`;
  const data: namespace.RootObject = (await axios.get(url)).data;
  return data;
};

import { LatLngLiteral } from "leaflet";
import { Location } from "../../../types";
import { getMunicipalityFromPoint } from "../getMunicipalityFromPoint";

export interface getLocationProps {
  coordinates: LatLngLiteral;
  rest?: any,
}

export const getMunicipalityLocation = async ({
  coordinates,
  rest,
}: getLocationProps): Promise<Location> => {
  const municipality = await getMunicipalityFromPoint(coordinates);

  if (!!municipality) {
    return {
      edited: false,
      latlng: coordinates,
      municipality: municipality[0],
      ...rest,
    };
  }

  return null;
};

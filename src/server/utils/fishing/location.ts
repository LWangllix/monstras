import { LatLngLiteral } from "leaflet";
import { isEmpty } from "lodash";
import { getRepository } from "typeorm";
import { Location } from "../../../types";
import { Event } from "../../models/Event";
import { getFishingAreaFromPoint } from "../getFishingAreaFromPoint";
import { getLakeFromPointService } from "../getLakeFromPoint";
import { getMunicipalityFromPoint } from "../getMunicipalityFromPoint";
import { getRivers } from "../getRiverFormPoint";

export interface getLocationProps {
  coordinates: LatLngLiteral;
  edited: boolean;
  type?: string;
}


export const getRiverOrLake = async ({coordinates, edited}) => {
  const lakes = (await getLakeFromPointService(coordinates)).map((lake) => {
    return {
      id: lake.properties.KADASTROID,
      name: lake.properties.PAVADINIMA,
      type: "other",
    };
  });
  const river = (await getRivers(coordinates)).map((lake) => {
    return {
      id: lake.properties.KADASTROID,
      name: lake.properties.PAVADINIMA,
      type: "other",
    };
  });
  if (lakes.length > 0) {
    const municipality = await getMunicipalityFromPoint(coordinates);
    return {
      municipality: municipality[0],
      latlng: coordinates,
      waterBody: lakes[0],
      edited,
    };
  } else if (river.length > 0) {
    const municipality = await getMunicipalityFromPoint(coordinates);
    return {
      municipality: municipality[0],
      latlng: coordinates,
      waterBody: river[0],
      edited,
    };
  } else {
    return null;
  }
}

export const getFishingArea = async ({coordinates, edited}) => {
  const municipality = await getMunicipalityFromPoint(coordinates);
  const fishingArea = await getFishingAreaFromPoint(coordinates);
  if(fishingArea?.properties) {
    const { properties } = fishingArea;
    return {
      municipality: municipality[0],
      latlng: coordinates,
      waterBody: {
        name: properties?.name,
        id: properties?.id,
        type: "baras",
      },
      edited,
    };
  }
  return null;
}

export const getLocation = async ({
  coordinates,
  edited,
}: getLocationProps): Promise<Location> => {
  const fishingArea = await getFishingArea({coordinates, edited});
  if(!isEmpty(fishingArea)) {
    return fishingArea;
  }
  const riverOrLake = await getRiverOrLake({coordinates, edited});
  if(!isEmpty(riverOrLake)) {
    return riverOrLake;
  }
  const municipality = await getMunicipalityFromPoint(coordinates);
  return {
    municipality,
    latlng: coordinates,
  }
};

export const getEventLocation = async ({waterBodyId, type, userId, tenantId}) => {
    const query = getRepository(Event)
    .createQueryBuilder("event")
    .where("event.type = :event_type", {event_type: "builtTools"})
    .andWhere(
      `event.location ::jsonb -> 'waterBody' ->> 'id' = :waterBodyId`,
      {waterBodyId : waterBodyId}
    )
    .andWhere(
      `event.location ::jsonb -> 'waterBody' ->> 'type' = :type`,
      {type}
    )
    if (tenantId) {
      query.andWhere("event.tenantId = :tenant", { tenant: tenantId });
    } else {
      query.andWhere("event.userId = :user_id", { user_id: userId });
      query.andWhere("event.tenantId is null");
    }
    const event = await query.getOne();
    return event?.location;
 }

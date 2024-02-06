import { keys, map } from "lodash";
import { EVENT_TYPES } from "./constants";

export const groupfishingEventsByDate = (data) => {
  const groups = data.reduce((groups, events) => {
    const date = new Date(events?.time).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(events);
    return groups;
  }, {});

  const groupArrays = map(keys(groups), (date) => {
    return {
      date,
      events: groups[date],
    };
  });

  return groupArrays;
};

const shortCoordinate = (coordinate) => {
  return coordinate?.toString().substring(0, 5);
};

const compareCoordinates = (latLng1, latLng2) => {
  const lat1 = shortCoordinate(latLng1?.lat);
  const lat2 = shortCoordinate(latLng2?.lat);
  const lng1 = shortCoordinate(latLng1?.lng);
  const lng2 = shortCoordinate(latLng2?.lng);
  return lat1 === lat2 && lng1 === lng2;
};

export const eventsLocationsForMap = (fishings) =>
  map(fishings, (group) => {
    return group?.events.map((event) => {
      return {
        location: event.location || null,
        id: event.id,
        fisher: event.user,
        status: event.type,
        tools: event.type === "builtTools" ? event.tools : null,
      };
    });
  }).flat();

export const getFishingEventTitle = (eventType, eventLocation) => {
  switch (eventType) {
    case EVENT_TYPES.FishingStarted:
      return "Pradėta žvejyba";
    case EVENT_TYPES.FishWeightOnShore:
      return "Žuvų iškrovimas";
    case EVENT_TYPES.FishingEnded:
      return "Baigta žvejyba";
    default:
      return eventLocation;
  }
};

export const mapToolsLabels = (data) => {
  return map(data, (tool) => tool?.toolType?.label).filter(
    (label, index, array) => label && array.indexOf(label) === index
  );
};

export const mapFishLabels = (data) => {
  return map(data, (fish) => fish.label).filter(
    (label, index, array) => label && array.indexOf(label) === index
  );
};

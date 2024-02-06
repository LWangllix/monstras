import axios from "axios";
import { LatLngLiteral } from "leaflet";
const SAVIVALDYBES_GEOSERVER = process.env.SAVIVALDYBES_GEOSERVER;
if (SAVIVALDYBES_GEOSERVER == undefined) {
  throw "SAVIVALDYBES_GEOSERVER env variable is not set";
}
export const getMunicipalityFromPoint = async (coordinates: LatLngLiteral) => {
  const endPoint = `${SAVIVALDYBES_GEOSERVER}/geoserver/savivaldybes//wfs?request=GetFeature&version=1.0.0&SRSName=EPSG:4326&typeName=savivaldybes:apskritys&outputFormat=application/json&FILTER=%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%20xmlns:gml=%22http://www.opengis.net/gml%22%3E%3CIntersects%3E%3CPropertyName%3Egeom%3C/PropertyName%3E%3Cgml:Point%20srsName=%22EPSG:4326%22%3E%3Cgml:coordinates%3E${coordinates.lng},${coordinates.lat}%3C/gml:coordinates%3E%3C/gml:Point%3E%3C/Intersects%3E%3C/Filter%3E`;
  const { data } = await axios.get(endPoint);

  const { features } = data;

  if (features.length < 1) return [];

  return features.map((municipality) => {
    return {
      name: municipality.properties.SAV_PAV,
      id: municipality.id,
    };
  });
};

import axios from "axios";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import xml2json from "xml2json"
import initEnv from "../../../../../../server/initEnv";
import { User } from "../../../../../../server/models/User";


initEnv();

const headers = {
  'Content-Type': 'text/xml'
}

const E_VARTAI_HOST = process.env.E_VARTAI_HOST;
export const HOST = process.env.HOST;

if (HOST == undefined) {
  throw ("HOST env variable is not set");
}
if (E_VARTAI_HOST == undefined) {
  throw ("E_VARTAI_HOST env variable is not set");
}

export interface CustomData {
  originalUrl: string;
  host: string;
  ownerOfTenant?: string;
}

export async function method(
  user: User,
  params: Params
): Promise<Result | RouterError> {

  const customData: CustomData = {
    originalUrl: params.originalUrl, host: HOST
  }
  const customDataEncoded = encodeURIComponent(JSON.stringify(customData));
  const requestSoap = (await axios.get(`${E_VARTAI_HOST}/authRequest?customData=${customDataEncoded}`)).data;

  const ticketResponse = await axios.post(
    "https://www.epaslaugos.lt/portal/authenticationServices/auth.wsdl",
    requestSoap,
    {
      headers
    }
  )
  const data = JSON.parse(xml2json.toJson(ticketResponse.data));
  const ticket = data["soap:Envelope"]["soap:Body"]["authentication:authenticationResponse"]["authentication:ticket"] as string;
  const actionUrl = " https://www.epaslaugos.lt/portal/external/services/authentication/v2"
  return { ticket, actionUrl }
}

export const getEVartaitUser = async (ticketId: string) => {
  const requestSoap = (await axios.get(`${E_VARTAI_HOST}/ticketInfo?ticketId=${ticketId}`)).data
  const ticketResponse = await axios.post(
    "https://www.epaslaugos.lt/portal/authenticationServices/auth.wsdl",
    requestSoap, { headers }
  )
  const data = soapResultToProfile(ticketResponse.data);
  return data;
}

export const soapResultToProfile = (soap: string) => {
  const data = JSON.parse(xml2json.toJson(soap));
  const getValue = (proName: string) => {
    try {
      return data["soap:Envelope"]["soap:Body"]["authentication:authenticationDataResponse"]["authentication:userInformation"].find(n => n["authentication:information"] === proName)["authentication:value"]["authentication:stringValue"]
    } catch (error) {
      return null
    }

  }
  const getAttribute = (proName: string) => {
    try {
      return data["soap:Envelope"]["soap:Body"]["authentication:authenticationDataResponse"]["authentication:authenticationAttribute"].find(n => n["authentication:attribute"] === proName)["authentication:value"]
    } catch (error) {
      return null
    }
  }



  const code = getValue("lt-personal-code") || getAttribute("lt-personal-code") || data["soap:Envelope"]["soap:Body"]["authentication:authenticationDataResponse"]["authentication:authenticationAttribute"]["authentication:value"];
  const firstName = getValue("firstName");
  const lastName = getValue("lastName");
  const email = getValue("email");
  const companyCode = getAttribute("lt-company-code");
  const companyName = getValue("companyName");
  const phoneNumber = getValue("phoneNumber");
  return {
    code, firstName, lastName, phoneNumber, email, companyName, companyCode
  }
}

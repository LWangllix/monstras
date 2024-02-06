import { User } from "../../../../../../server/models/User";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import { getRepository } from "typeorm";
import { Tenant } from "../../../../../../server/models/Tenant";
import { intersection } from "lodash";
import Municipalities from "../../../../../../sav.json";
import validator from "email-validator";

export async function method(
  user: User,
  params: Params
): Promise<RouterError | Result> {
  const tenant = await getRepository(Tenant).findOne({
    where: { name: params.name, id: params.id },
  });
  const requestedTenant = await getRepository(Tenant).findOne({
    where: { name: params.name },
  });

  if (!tenant && requestedTenant) {
    return new RouterError(400, [
      { msgs: ["Su tokiu pavadinimu egzistuoja jau kita organizacija"] },
    ]);
  }

  const availableMunicipalities = Municipalities.map((m) => m.name);
  const prm = params.municipalities;
  const allMunicipalitiesValid =
    intersection(availableMunicipalities, prm).length === prm.length;
  if (!allMunicipalitiesValid) {
    return new RouterError(400, [
      { key: "municipalities", msgs: ["Nėra tokios savivaldybės"] },
    ]);
  }

  if (!validator.validate(params.email)) {
    return new RouterError(400, [
      { key: "email", msgs: ["Blogas elektroninio pašto formatas"] },
    ]);
  }
  if (params.name.length < 1) {
    return new RouterError(400, [
      {
        key: "tenantName",
        msgs: ["Nepalikite tuščio organizacijos pavadinimo laukelio"],
      },
    ]);
  }

  const updateTenant = await getRepository(Tenant).findOne({
    where: { id: params.id },
  });
  updateTenant.name = params.name;
  updateTenant.email = params.email;

  //TODO await getRepository(Tenant).update(updateTenant);
  return { id: updateTenant.id.toString() };
}

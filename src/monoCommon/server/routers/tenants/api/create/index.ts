import { getRepository } from "typeorm";
import { User } from "../../../../../../server/models/User";
import { Tenant } from "../../../../../../server/models/Tenant";
import RouterError from "../../../../../RouterError";
import { Result, Params } from "./config";
import { intersection } from "lodash";
import Municipalities from "../../../../../../sav.json";
import validator from "email-validator";
import saveEntity from "../../../../saveEntity";
import RouterRequest from "../../../../../RouterRequest";

export async function method(
  user: User,
  params: Params,
  routerRequest: RouterRequest
): Promise<RouterError | Result> {
  const tenant = await getRepository(Tenant).findOne({
    where: { name: params.name },
  });

  if (tenant) {
    return new RouterError(400, [{ msgs: ["organizacija egzistuoja"] }]);
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

  const newTenant = new Tenant();
  newTenant.name = params.name;
  newTenant.email = params.email;

  await saveEntity(Tenant, routerRequest, newTenant);

  return { id: newTenant.id.toString() };
}

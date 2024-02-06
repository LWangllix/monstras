import { getRepository } from "typeorm";
import { names, uniqueNamesGenerator } from "unique-names-generator";
import { Permissions } from "../../config";
import { Tenant } from "../models/Tenant";
import TenantUser from "../models/TenantUser";
import { User } from "../models/User";
import saveEntity from "../../monoCommon/server/saveEntity";
import { addUser } from "./initUsers";

export const addTenant = async (
  company: {
    name: string;
    phone: string;
    code: string;
    permission: { user: string; investigator: string };
    email: string;
  },
  owner: User,
  userAdmins: User[] = [],
  users: User[] = []
) => {
  const tenant = new Tenant();
  tenant.name = company.name;
  tenant.phone = company.phone;
  tenant.email = company.email;
  tenant.code = company.code;
  tenant.permission = company.permission;
  await saveEntity(Tenant, "init", tenant);
  const addUsers = [
    ...users,
    { ...owner, tenantOwner: Permissions.TenantOwner.statuses.ENABLED },
    ...userAdmins.map((u) => {
      return { ...u, usersAdmin: Permissions.Admin.statuses.ENABLED };
    }),
  ];
  await Promise.all(
    addUsers.map(async (u, i) => {
      const tenantUser = new TenantUser();
      //@ts-ignore
      tenantUser.user = u;
      tenantUser.tenant = tenant;
      tenantUser.phone = u.phone;
      tenantUser.email = u.email;
      tenantUser.permission = {
        user: Permissions.User.statuses.ENABLED,
        investigator: Permissions.Investigator.statuses.DISABLED,
      };
      //@ts-ignore
      if (u.tenantOwner) {
        tenantUser.permission.tenantOwner =
          Permissions.TenantOwner.statuses.ENABLED;
      }
      //@ts-ignore
      if (u.usersAdmin) {
        tenantUser.permission.usersAdmin = Permissions.Admin.statuses.ENABLED;
      }
      await saveEntity(TenantUser, "init", tenantUser);
    })
  );
};

const config = {
  dictionaries: [names],
};

export default async () => {
  let tempComp = [];
  for (let i = 0; i < 10; i++) {
    const name = uniqueNamesGenerator(config);
    const u = await addUser(
      uniqueNamesGenerator(config),
      uniqueNamesGenerator(config),
      "testUser" + i,
      name + "@test.biip.ly",
      "+37061111111",
      "slaptas",
      {
        user: Permissions.User.statuses.ENABLED,
        inspector: Permissions.Inspector.statuses.DISABLED,
        admin: Permissions.Admin.statuses.DISABLED,
        investigator: Permissions.Investigator.statuses.DISABLED,
      }
    );
    tempComp.push(u);
    if (tempComp.length > 3) {
      await addTenant(
        {
          permission: {
            user: Permissions.User.statuses.ENABLED,
            investigator: Permissions.Investigator.statuses.ENABLED,
          },
          name: "Eksperimentinis ūkis " + uniqueNamesGenerator(config),
          phone: "+37061123456",
          code: "1001111" + i,
          email: "test" + i + "@test.biip.ly",
        },
        tempComp.shift(),
        [tempComp.shift()],
        tempComp
      );
      tempComp = [];
    }
  }
};

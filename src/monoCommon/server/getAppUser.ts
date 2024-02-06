import { Request } from "express";
import { getRepository } from "typeorm";
import { Permissions } from "../../config";
import { AppUser } from "../../types";
import { Tenant } from "../../server/models/Tenant";

import { Permission, User } from "../../server/models/User";

const TENANT_OWNER_PERMISSION_ID = Permissions.TenantOwner.id;

const getAppUser = (req): AppUser => {
  if (req?.session?.passport?.user?.id) {
    const id = req?.session?.passport?.user?.id;

    const permission: Permission = req?.session?.passport?.user?.permission;

    const user: AppUser = {
      id,
      permission,
    };

    return user;
  } else {
    return {
      id: null,
      permission: null,
    };
  }
};

export const getTenant = async (
  req: Request
): Promise<{ tenantOwner: boolean; tenant?: Tenant }> => {
  const currentTenantId = req?.session?.passport?.user?.tenant?.id;
  const tenant = await getRepository(Tenant).findOne({
    where: { id: currentTenantId },
  });

  return { tenantOwner: false, tenant };
};
// interface DBUser extends User {
//   tenant?: Tenant;
// }
export const getDBUser = async (req: Request): Promise<User> => {
  const appUser = getAppUser(req);
  const user = await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.tenantUsers", "tenantUsers")
    .leftJoinAndSelect("tenantUsers.tenant", "tenant")
    .andWhere("User.id = :id", { id: appUser.id })
    .getOne();
  return user;
};

export default getAppUser;

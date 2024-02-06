import { Request } from "express";
import { Strategy as CustomStrategy } from "passport-custom";
import { getRepository } from "typeorm";
import { Permissions } from "../../../../config";
import { Tenant } from "../../../../server/models/Tenant";
import { User } from "../../../../server/models/User";
import {
  CustomData,
  getEVartaitUser,
} from "../../routers/eVartai/api/getTicket";
import NewTenantUser from "../../../../server/models/NewTenantUser";
import saveEntity from "../../saveEntity";

const eVartaiStrategy = () => {
  return new CustomStrategy(async (req: Request, done) => {
    try {
      const data = req.method === "GET" ? req.query : req.body;
      const ticket: string = data.ticket;
      const customData: CustomData = JSON.parse(
        decodeURIComponent(data.customData)
      );
      const {
        code,
        firstName,
        lastName,
        companyCode,
        companyName,
        email,
        phoneNumber,
      } = await getEVartaitUser(ticket);

      const userRepo = getRepository(User);

      const currentUser = await userRepo.findOne({ where: { username: code } });

      if (currentUser) {
        const user = currentUser;
        user.name = firstName;
        user.lastName = lastName;

        user.phone = phoneNumber;
        user.email = email;

        //@ts-ignore
        await userRepo.save(user);

        return done(
          null,
          { ...user, companyCode, companyName, username: code },
          //@ts-ignore
          customData
        );
      } else {
        const newTenantUser = await getRepository(NewTenantUser).findOne({
          where: { code: code },
        });
        if (newTenantUser) {
          const newUser = new User();
          newUser.username = code;
          newUser.name = firstName;
          newUser.lastName = lastName;
          newUser.email = email;
          newUser.phone = phoneNumber;
          newUser.permission = {
            admin: Permissions.Admin.statuses.DISABLED,
            inspector: Permissions.Inspector.statuses.DISABLED,
            user: Permissions.User.statuses.DISABLED,
            investigator: Permissions.Investigator.statuses.DISABLED,
          };
          await saveEntity(User, "newUser", newUser);

          //@ts-ignore
          return done(null, newUser, customData);
        } else {
          //@ts-ignore
          return done(null, false, { eVartai: "noAccount" });
        }
      }
    } catch (error) {
      console.log(error);
      //@ts-ignore
      return done(null, false, { eVartai: "error" });
    }
  });
};
export default eVartaiStrategy;

async function saveTenant(
  companyCode: any,
  companyName: any,
  email: any,
  newUser: User
) {
  if (companyCode) {
    const tenant =
      (await getRepository(Tenant).findOne({
        where: { code: companyCode },
      })) || new Tenant();
    tenant.code = companyCode;
    tenant.name = companyName;
    tenant.email = email;
    await saveEntity(Tenant, "eVartaiStrategy/saveTenant", tenant);
    return tenant;
  }
}

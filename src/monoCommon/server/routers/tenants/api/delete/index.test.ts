import db from "../../../../../monoCommon/server/db";
import { method } from ".";
import { User } from "../../../../models/User";
import { Connection, getRepository } from "typeorm";
import { Tenant } from "../../../../models/Tenant";
import { expectRouterError } from "../../../../../monoCommon/server/testing";
import saveEntity from "../../../../../monoCommon/server/saveEntity";

describe("delete tenant", () => {
  let conn: Connection;
  let testUser: User;
  beforeAll(async () => {
    conn = await db();
    testUser = await getRepository(User).findOne({
      where: { username: "tomas" },
    });
  });

  test("delete", async () => {
    const newTenant = new Tenant();
    newTenant.name = "deletetenant";
    newTenant.email = "deletetenant@gmail.com";
    await saveEntity(Tenant, "test", newTenant);


    await method(testUser, {
      id: newTenant.id.toString(),
    });

    const orExistDeletedTEnant = await getRepository(Tenant).findOne({
      where: {
        name: newTenant.name,
      },
    });
    expect(orExistDeletedTEnant).toBeUndefined();
  });
  test("delete not existing", async () => {
    await expectRouterError(
      method(testUser, {
        id: "-2147483647",
      })
    );
  });

  afterAll(async () => {
    await conn.close();
  });
});

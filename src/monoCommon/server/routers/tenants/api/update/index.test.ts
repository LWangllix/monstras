import db from "../../../../../monoCommon/server/db";
import { method } from ".";
import { User } from "../../../../models/User";
import { Connection, getRepository } from "typeorm";
import { expectRouterError } from "../../../../../monoCommon/server/testing";

jest.setTimeout(100000);
describe("update tenant", () => {
  let conn: Connection;
  let testUser: User;
  const newTenantName = "updateTenant";
  const updateOtherTenant = "Alytaus valdyba";
  beforeAll(async () => {
    conn = await db();
    testUser = await getRepository(User).findOne({
      where: { username: "tomas" },
    });
  });

  test("update", async () => {
    const updateTenant = await method(testUser, {
      id: "5",
      name: newTenantName,
      municipalities: [],
      email: "update@gmail.com",
    });
    expect(updateTenant["id"]).toBe("5");
  });
  test("can not update other tenant", async () => {
    await expectRouterError(
      method(testUser, {
        id: "5",
        name: updateOtherTenant,
        municipalities: [],
        email: "updateOtherTenant@gmail.com",
      })
    );
  });

  afterAll(async () => {
    await conn.close();
  });
});

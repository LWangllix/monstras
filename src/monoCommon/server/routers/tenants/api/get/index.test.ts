import db from "../../../../../monoCommon/server/db";
import { method } from ".";
import { User } from "../../../../models/User";
import { Connection, getRepository } from "typeorm";
import { expectRouterError } from "../../../../../monoCommon/server/testing";

jest.setTimeout(100000);
describe("Tenant", () => {
  let conn: Connection;
  let testUser: User;
  beforeAll(async () => {
    conn = await db();
    testUser = await getRepository(User).findOne({
      where: { username: "tomas" },
    });
  });
  test("get tenant by id ", async () => {
    const tenant = await method(testUser, { id: "1" });
    expect(tenant["tenant"].name).toBe("Kauno valdyba");
  });
  test("can not get not existing tenant ", async () => {
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

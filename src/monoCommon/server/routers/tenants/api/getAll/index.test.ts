import db from "../../../../../monoCommon/server/db";
import { method } from ".";
import { User } from "../../../../models/User";
import { Connection, getRepository } from "typeorm";

jest.setTimeout(100000);
describe("all tenants", () => {
  let conn: Connection;

  test("get all tenants", async () => {
    conn = await db();
    const testUser = await getRepository(User).findOne({
      where: { username: "tomas" },
    });

    const tenants = await method(testUser, {});
    expect(tenants["tenants"].length).toBe(8);
  });

  afterAll(async () => {
    await conn.close();
  });
});

import db from "../../../../../monoCommon/server/db";
import { method } from ".";
import { User } from "../../../../models/User";
import { Connection, getRepository } from "typeorm";
import { expectRouterError } from "../../../../../monoCommon/server/testing";

describe("User", () => {
  let conn: Connection;
  let testUser: User;

  beforeAll(async () => {
    conn = await db();
  });
    afterAll(async () => {
      await conn.close();
    });

  test("get user by id ", async () => {
    const testUser = await getRepository(User).findOne({
      where: { username: "tomas" },
    });
  });
  test("get user by id ", async () => {
    const user = await method(testUser, { userId: 1 });
    expect(user["user"]["permissions"].includes("admin")).toBe(true);
  });
  test("can not get not existing user ", async () => {
    await expectRouterError(
      method(testUser, {
        userId: -2147483647,
      })
    );
  });
});

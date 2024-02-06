import db from "../../../../../monoCommon/server/db";
import { method } from ".";
import { User } from "../../../../models/User";
import { Connection, getRepository } from "typeorm";
import { Tenant } from "../../../../models/Tenant";
import { expectRouterError } from "../../../../../monoCommon/server/testing";


describe("create tenant", () => {
  let conn: Connection;
  let testUser: User;
  const newTenantName = "newtenant";
  const duplicateTenantName = "duplicate";
  beforeAll(async () => {
    conn = await db();
    testUser = await getRepository(User).findOne({
      where: { username: "tomas" },
    });
  });

  test("create", async () => {
 
    const users = await method(testUser, {
      name: newTenantName,
      email: "new@gmail.com",
      municipalities:[]
    });
    expect(users).toBeDefined();
  });
  test("create duplicate", async () => {


    await method(testUser, {
      name: duplicateTenantName,
      email: "duplicate@gmail.com",
      municipalities: [],
    });
    await expectRouterError(
      method(testUser, {
        name: duplicateTenantName,
        email: "duplicate@gmail.com",
        municipalities: [],
      })
    );
  });

  afterAll(async () => {
    await getRepository(Tenant).delete({ name: newTenantName });
    await getRepository(Tenant).delete({ name: duplicateTenantName });
    await conn.close();
  });
});

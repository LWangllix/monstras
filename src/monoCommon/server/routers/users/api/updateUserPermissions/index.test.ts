import db from "../../../../../monoCommon/server/db";
import { method, sourceArrayIncludesAllTargetMembers } from ".";
import { Connection, getRepository } from "typeorm";
import { User } from "../../../../models/User";
import {
  expectRouterError,
  maybeCreateTestUser,
} from "../../../../../monoCommon/server/testing";

describe("routers/users/api/updateUserPermissions", () => {
  let conn: Connection;
  let testUser: User;
  let adminUser: User;
  const adminUserName = "UpdatePermissionsAdminUser";
  const testUserName = "UpdatePermissionsTestUser";

  beforeAll(async () => {
    conn = await db();
    testUser = await maybeCreateTestUser(testUserName, "");
    adminUser = await maybeCreateTestUser(adminUserName, "admin");
    expect(testUser).toBeDefined();
    expect(adminUser).toBeDefined();
  });

  afterAll(async () => {
    await getRepository(User).remove(adminUser);
    await getRepository(User).remove(testUser);
    await conn.close();
  });

  test("Update permision with wron permission", async () => {
    expect(adminUser.hasPermission("admin")).toBe(true);
    await expectRouterError(
      method(adminUser, {
        userId: testUser.id,
        permissions: ["some not existing permission"],
        tenants: ["Alytaus valdyba"],
      })
    );
  });

  test("Update permission for non existing user", async () => {
    await expectRouterError(
      method(adminUser, {
        userId: "-1",
        permissions: ["admin"],
        tenants: ["Alytaus valdyba"],
      })
    );
  });

  test("Admin can not remove his own admins permission", async () => {
    await expectRouterError(
      method(adminUser, {
        userId: adminUser.id,
        permissions: [],
        tenants: ["Alytaus valdyba"],
      })
    );
  });
  test("Assign tenant", async () => {
    const response = await method(adminUser, {
      userId: testUser.id,
      permissions: ["admin"],
      tenants: ["Alytaus valdyba"],
    });

    expect(response["id"]).toBe(testUser.id);
  });

  test("only admin can assign only existing tenant", async () => {
    await expectRouterError(
      method(adminUser, {
        userId: adminUser.id,
        permissions: ["admin"],
        tenants: ["not exist"],
      })
    );
  });

  test("Assign permission", async () => {
    const response = await method(adminUser, {
      userId: testUser.id,
      permissions: ["admin"],
      tenants: [],
    });
    expect((response as unknown as { id: string })?.id).toBe(testUser.id);
  });

  test("sourceArrayIncludesAllTargetMembers", () => {
    expect(sourceArrayIncludesAllTargetMembers(["a", "b"], ["a", "b"])).toBe(
      true
    );
    expect(
      sourceArrayIncludesAllTargetMembers(["a", "b", "c"], ["a", "b"])
    ).toBe(true);
    expect(sourceArrayIncludesAllTargetMembers(["a"], ["a", "b"])).toBe(false);
    expect(sourceArrayIncludesAllTargetMembers([], ["a", "b"])).toBe(false);
    expect(sourceArrayIncludesAllTargetMembers([], [])).toBe(true);
  });
});

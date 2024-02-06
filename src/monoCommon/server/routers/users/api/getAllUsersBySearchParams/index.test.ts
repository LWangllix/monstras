import db from "../../../../../monoCommon/server/db";
import { method } from ".";
import { User } from "../../../../models/User";
import { Connection, getRepository } from "typeorm";
import { Result } from "./config";
import { maybeCreateTestUser } from "../../../../../monoCommon/server/testing";
import { Password } from "../../../../models/Password";

const createMultipleTestUser = async (params: {
  count: number;
  username: string;
  lastname?: string;
  name?: string;
  permission?: string;
}) => {
  const { count, username, lastname, name, permission } = params;

  const passworRepo = getRepository(Password);
  const userRepo = getRepository(User);

  for (let i = 0; i < count; i++) {
    try {
      const user = new User();
      const password = new Password();
      password.value = "slaptas";
      password.attempts = 0;
      await passworRepo.save(password);
      user.lastName = lastname || "User";
      user.name = name || "Tester";
      user.username = `${username}${i}`;
      user.email = `${username}${i}@test.com`;
      await userRepo.save(user);
    } catch (error) {
      //console.log('duplicate');
    }
  }
};

describe("routes/uses/api/getAllUsersBySearchParams", () => {
  let conn: Connection;
  let admin: User;

  beforeAll(async () => {
    conn = await db();
    admin = await maybeCreateTestUser("AllUsersAdmin", "admin");
  });

  afterAll(() => {
    conn.close();
  });

  test("Search users by lastname", async () => {
    const lastname = "SearchLastName";
    await createMultipleTestUser({
      count: 7,
      username: "searchUserTester",
      lastname,
    });
    const { users } = (await method(admin, {
      searchLastName: lastname,
      page: 1,
      take: 7,
    })) as Result;

    expect(users[1]).toBe(7);
  });

  test("Search users by firstname", async () => {
    const name = "SearchLastName";
    await createMultipleTestUser({
      count: 7,
      username: "firstNameUser",
      name,
    });
    const { users } = (await method(admin, {
      searchName: name,
      page: 1,
      take: 7,
    })) as Result;

    expect(users[1]).toBe(7);
  });
});

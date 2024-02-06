import { getRepository } from "typeorm";
import { Permissions } from "../../config";
import { Password } from "../../monoCommon/server/models/Password";
import { User } from "../../server/models/User";
import RouterError from "../RouterError";
import saveEntity from "./saveEntity";

export const getTestFutureDate = (): Date => {
  const time = new Date().getTime() + 24 * 60 * 60000;
  return new Date(time);
};

export const getTestPastDate = (): Date => {
  const time = new Date().getTime() - 24 * 60 * 60000;
  return new Date(time);
};

export const expectRouterError = async (
  method: Promise<any>,
  tesMsg?: string
) => {
  const response = await method;
  tesMsg && console.log(tesMsg || "", response);
  expect(<RouterError>response?.isRouterError).toBe(true);
};

export const maybeCreateTestUser = async (
  username: string,
  permission?: string
) => {
  const user = await getRepository(User).findOne({
    where: { username: username },
  });

  if (!user) {
    const user = new User();
    user.lastName = "User";
    user.name = "Fetch";
    user.username = username;
    user.email = "testuser@test.com";
    user.phone = "111111111";
    user.permission = {
      user: Permissions.User.statuses.ENABLED,
      inspector: Permissions.Inspector.statuses.APPROVER,
      admin: Permissions.Admin.statuses.ENABLED,
      investigator: Permissions.Investigator.statuses.ENABLED,
    };
    await saveEntity(User, "testting", user);
    const password = new Password();
    password.user = user;
    password.attempts = 0;
    password.value = await Password.generateHash(user.id, "slaptas");
    await saveEntity(Password, "testting", password);
  }
  return user;
};

const age = {
  label: "Paauginti jaunikliai",
  value: "jaunikliai",
};

export const fishMocks = {
  registration: {
    BAD_FICH_ID: {
      fishId: "1000",
      age,
      amount: 10,
    },
    FISH_100: {
      fishId: "1",
      age,
      amount: 100,
    },
    FISH_200: {
      fishId: "2",
      age,
      amount: 100,
    },
    FISH_0: {
      fishId: "1",
      age,
      amount: 0,
    },
  },
  report: {
    BAD_FICH_ID: {
      id: "1000",
      reportedAmount: 10,
      reportedWeight: 10,
    },
    FISH_100: {
      id: "1",
      reportedAmount: 100,
      reportedWeight: 50,
    },
    FISH_200: {
      id: "2",
      reportedAmount: 100,
      reportedWeight: 50,
    },
    FISH_0: {
      id: "1",
      reportedAmount: 0,
      reportedWeight: 0,
    },
  },
  BAD_FICH_ID: {
    id: "1000",
    age,
    amount: 10,
    reportedAmount: null,
    reportedWeight: null,
    reviewAmount: null,
    reviewWeight: null,
  },
  FISH_100: {
    id: "1",
    age,
    amount: 100,
    reportedAmount: null,
    reportedWeight: null,
    reviewAmount: null,
    reviewWeight: null,
  },
  FISH_200: {
    id: "2",
    age,
    amount: 100,
    reportedAmount: null,
    reportedWeight: null,
    reviewAmount: null,
    reviewWeight: null,
  },
  FISH_0: {
    id: "1",
    age,
    amount: 0,
    reportedAmount: null,
    reportedWeight: null,
    reviewAmount: null,
    reviewWeight: null,
  },
};

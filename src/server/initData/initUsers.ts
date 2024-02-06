import { Entity, getRepository } from "typeorm";
import { names, uniqueNamesGenerator } from "unique-names-generator";
import { Permissions } from "../../config";
import { Password } from "../../monoCommon/server/models/Password";
import { Permission, User } from "../models/User";
import saveEntity from "../../monoCommon/server/saveEntity";
import { addTenant } from "./initTenants";

export const addUser = async (
  name: string,
  lastName: string,
  userName: string,
  email: string,
  phone: string,
  pass: string,
  permissions: Permission
): Promise<User> => {
  const user = new User();

  user.lastName = lastName;
  user.name = name;
  user.username = userName;
  user.email = email;
  user.phone = phone;

  user.permission = permissions;

  await saveEntity(User, "init", user);
  if (pass) {
    const password = new Password();
    password.user = user;
    password.attempts = 0;
    password.value = await Password.generateHash(user.id, pass);
    await saveEntity(Password, "init", password);
  }
  return user;
};

export default async () => {
  if ((await getRepository(User).count()) > 0) {
    return;
  }
  const Tomas = new User();
  Tomas.permission = {
    user: Permissions.User.statuses.ENABLED,
    inspector: Permissions.Inspector.statuses.DISABLED,
    admin: Permissions.Admin.statuses.ENABLED,
    investigator: Permissions.Investigator.statuses.DISABLED,
  };
  Tomas.username = "tomas";
  Tomas.email = "tomas@kukis.net";
  Tomas.name = "Tomas";
  Tomas.lastName = "Kukis";
  Tomas.phone = "0000";
  await saveEntity(User, "init", Tomas);

  await addTenant(
    {
      name: "Tomas UAB",
      phone: "123456789",
      code: "123456789",
      email: "tomas@test.biip.lt",
      permission: {
        user: Permissions.User.statuses.ENABLED,
        investigator: Permissions.Investigator.statuses.DISABLED,
      },
    },
    Tomas
  );

  const password = new Password();
  password.user = Tomas;
  password.attempts = 0;
  const pass = "slaptas";
  password.value = await Password.generateHash(password.user.id, pass);
  await saveEntity(Password, "init", password);

  await addUser(
    "Jonas",
    "Jonaitis",
    "ins1",
    "jonas.jonaitis@testam.net",
    "+37061111111",
    "slaptas",
    {
      user: Permissions.User.statuses.DISABLED,
      inspector: Permissions.Inspector.statuses.ENABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.DISABLED,
    }
  );

  const owner = await addUser(
    "Petras",
    "Petraitis",
    "owner",
    "petrats.petraitis@testam.net",
    "+37061111111",
    "slaptas",
    {
      user: Permissions.User.statuses.DISABLED,
      inspector: Permissions.Inspector.statuses.DISABLED,
      admin: Permissions.Inspector.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.DISABLED,
    }
  );

  const userAdmin = await addUser(
    "Marija",
    "Maryte",
    "useradmin",
    "UserAdmin@kukis.net",
    "+37061111111",
    "slaptas",
    {
      user: Permissions.User.statuses.DISABLED,
      inspector: Permissions.Inspector.statuses.DISABLED,
      admin: Permissions.Admin.statuses.ENABLED,
      investigator: Permissions.Investigator.statuses.DISABLED,
    }
  );

  await addUser(
    "mokslas",
    "mokslas",
    "mokslas",
    "investigator@kukis.net",
    "+37061111111",
    "slaptas",
    {
      user: Permissions.User.statuses.ENABLED,
      inspector: Permissions.Inspector.statuses.DISABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.ENABLED,
    }
  );

  await addUser(
    "Studentas",
    "1",
    "studentas1",
    "investigator@kukis.net",
    "+37061111111",
    "iafW6l4l1I8KdUFo",
    {
      user: Permissions.User.statuses.ENABLED,
      inspector: Permissions.Inspector.statuses.DISABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.ENABLED,
    }
  );

  await addUser(
    "Studentas",
    "2",
    "studentas2",
    "investigator@kukis.net",
    "+37061111111",
    "ZZh9ZkwLfNCNP8jN",
    {
      user: Permissions.User.statuses.ENABLED,
      inspector: Permissions.Inspector.statuses.DISABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.ENABLED,
    }
  );

  await addUser(
    "Testinis",
    "1",
    "testinis1",
    "investigator@kukis.net",
    "+37061111111",
    "VSYSgvOVEEGXFX6O",
    {
      user: Permissions.User.statuses.ENABLED,
      inspector: Permissions.Inspector.statuses.DISABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.ENABLED,
    }
  );

  await addUser(
    "Testinis",
    "2",
    "testinis2",
    "investigator@kukis.net",
    "+37061111111",
    "GkEx20Jxqi8gamr1",
    {
      user: Permissions.User.statuses.ENABLED,
      inspector: Permissions.Inspector.statuses.DISABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.ENABLED,
    }
  );

  await addUser(
    "Tomas",
    "Virbickas",
    "tomas.virbickas",
    "tomas.virbickas@am.lt",
    "+37061111111",
    "z4sscH3hsE5cLLKf",
    {
      user: Permissions.User.statuses.ENABLED,
      inspector: Permissions.Inspector.statuses.DISABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.ENABLED,
    }
  );

  const AMUsers = await Promise.all([
    addUser(
      "Linas",
      "Zvejys",
      "zvejas",
      "vanglikas.lukas@gmail.com",
      "+37061111111",
      "slaptas",
      {
        user: Permissions.User.statuses.ENABLED,
        inspector: Permissions.Inspector.statuses.DISABLED,
        admin: Permissions.Admin.statuses.DISABLED,
        investigator: Permissions.Investigator.statuses.DISABLED,
      }
    ),
    addUser(
      "Laimis",
      "Laimis",
      "laimis",
      "laimis.runkevicius@am.lt",
      "+37061111111",
      "slaptas",
      {
        user: Permissions.User.statuses.DISABLED,
        inspector: Permissions.Inspector.statuses.DISABLED,
        admin: Permissions.Admin.statuses.DISABLED,
        investigator: Permissions.Investigator.statuses.DISABLED,
      }
    ),
    addUser(
      "Eimantas",
      "Norkūnas",
      "eimantas",
      "eimantas.norkunas@am.lt",
      "+37061111111",
      "slaptas",
      {
        user: Permissions.User.statuses.ENABLED,
        inspector: Permissions.Inspector.statuses.DISABLED,
        admin: Permissions.Admin.statuses.DISABLED,
        investigator: Permissions.Investigator.statuses.DISABLED,
      }
    ),
    addUser(
      "Dovile",
      "Maminskaite",
      "dovile",
      "dovile.maminskaite@am.lt",
      "+37061111111",
      "slaptas",
      {
        user: Permissions.User.statuses.DISABLED,
        inspector: Permissions.Inspector.statuses.DISABLED,
        admin: Permissions.Admin.statuses.DISABLED,
        investigator: Permissions.Investigator.statuses.DISABLED,
      }
    ),
  ]);

  await addUser(
    "Laimis-ins",
    "Laimis",
    "laimis-ins",
    "laimis.runkevicius@am.lt",
    "+37061111111",
    "slaptas",
    {
      user: Permissions.User.statuses.DISABLED,
      inspector: Permissions.Inspector.statuses.ENABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.DISABLED,
    }
  );
  await addUser(
    "Eimantas-ins",
    "Norkūnas",
    "eimantas-ins",
    "eimantas.norkunas@am.lt",
    "+37061111111",
    "slaptas",
    {
      user: Permissions.User.statuses.DISABLED,
      inspector: Permissions.Inspector.statuses.ENABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.DISABLED,
    }
  );

  await addUser(
    "Dovile-ins",
    "Maminskaite",
    "dovile-ins",
    "dovile.maminskaite@am.lt",
    "+37061111111",
    "slaptas",
    {
      user: Permissions.User.statuses.DISABLED,
      inspector: Permissions.Inspector.statuses.ENABLED,
      admin: Permissions.Admin.statuses.DISABLED,
      investigator: Permissions.Investigator.statuses.DISABLED,
    }
  );

  addTenant(
    {
      permission: {
        user: Permissions.User.statuses.ENABLED,
        investigator: Permissions.Investigator.statuses.DISABLED,
      },
      name: "Aplinkos Ministerija",
      phone: "+37061111111",
      code: "12345678",
      email: "test@am.biip.lt",
    },
    owner,
    [userAdmin],
    AMUsers
  );
};

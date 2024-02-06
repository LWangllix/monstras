import { Strategy as CustomStrategy } from "passport-custom";
import { getRepository } from "typeorm";
import { User } from "../../../../server/models/User";
import { Password } from "../../../../monoCommon/server/models/Password";

const passwordStrategy = () => {
  return new CustomStrategy(async (req, done) => {
    const { username, password } = req.body;
    const userRepo = getRepository(User);
    const PasswordRepo = getRepository(Password);

    const user = await userRepo
      .createQueryBuilder("User")
      .andWhere("User.username = :code", { code: username })
      .getOne();

    if (user) {
      const dbPassword = await PasswordRepo.findOne({
        relations: ["user"],
        where: { user: user },
      });
      if (dbPassword.attempts >= 3) {
        //@ts-ignore
        return done(null, false, {
          message: "Paskyra užblokuota, susisiekite su administratorium",
          id: dbPassword.id,
        });
      } else if (
        !(await Password.checkHash(password, dbPassword.value, user.id))
      ) {
        dbPassword.attempts++;
        await PasswordRepo.save(dbPassword);
        const error = { message: "Blogas slaptažodis" };
        //@ts-ignore
        return done(null, false, error);
      } else {
        dbPassword.attempts = 0;
        await PasswordRepo.save(dbPassword);
        return done(null, user);
      }
    } else {
      const error = { message: "Nežinomas naudotojas" };
      //@ts-ignore
      return done(null, false, error);
    }
  });
};
export default passwordStrategy;

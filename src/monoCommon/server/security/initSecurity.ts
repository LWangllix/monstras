import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import cookieParser from "cookie-parser";
import { Application } from "express";
import session from "express-session";
import passport from "passport";
import redis from "redis";
import { getRepository } from "typeorm";
import { PERMISSION_STATUSES } from "../../../config";
import NewTenantUser from "../../../server/models/NewTenantUser";
import TenantUser from "../../../server/models/TenantUser";
import { User } from "../../../server/models/User";
import { CustomData } from "../routers/eVartai/api/getTicket";
import { getAuthRoute } from "../../../server/utils/routing";
import saveEntity from "../saveEntity";
import eVartaiStrategy from "./loginStrategies/eVartaiStrategy";
import passwordStrategy from "./loginStrategies/passwordStrategy";

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

if (REDIS_HOST == undefined) {
  throw "REDIS_HOST env variable is not set";
}
if (REDIS_PORT == undefined) {
  throw "REDIS_PORT env variable is not set";
}

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

const onLogin = async (user: User) => {
  const currentUser = await getRepository(User)
    .createQueryBuilder("User")
    .addSelect("User.username")
    .andWhere("User.id = :id", { id: user.id })
    .getOne();

  const newTenantUsers = await getRepository(NewTenantUser).find({
    relations: ["tenant"],
    where: { code: currentUser.username },
  });

  for (
    let newTenantUserI = 0;
    newTenantUserI < newTenantUsers.length;
    newTenantUserI++
  ) {
    const newTenantUser = newTenantUsers[newTenantUserI];
    const tu =
      (await getRepository(TenantUser).findOne({
        relations: ["tenant", "user"],
        where: {
          tenant: { id: newTenantUser.tenant.id },
          user: { id: currentUser.id },
        },
      })) || new TenantUser();
    tu.permission = {
      user: PERMISSION_STATUSES.ENABLED,
      investigator: PERMISSION_STATUSES.DISABLED,
    };
    tu.email = newTenantUser.email;
    tu.phone = newTenantUser.phone;
    tu.user = user;
    tu.tenant = newTenantUser.tenant;
    await saveEntity(TenantUser, "TenantUser", tu);
    await getRepository(NewTenantUser).delete(newTenantUser.id);
  }
};

export const initSecurity = (app: Application) => {
  app.use(
    session({
      secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
      resave: false,
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: true,
      cookie: { maxAge: 6 * 30 * 24 * 60 * 60 * 1000 }, // 0.5 year
    })
  );
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.urlencoded({ extended: false })); //TODO: deprecated bodyParser usage should be removed
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use("domain-login", passwordStrategy());
  passport.use("evartai-login", eVartaiStrategy());
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });
  app.use((req, res, next) => {
    const sessionExpiresIn =
      new Date(req.session.cookie.expires).getTime() - new Date().getTime();
    res.setHeader("session-expires", sessionExpiresIn);
    next();
  });
  app.use("/eVartai", (req, res, next) => {
    try {
      if (req.method === "POST") {
        const ticket: string = req.body.ticket;
        const customDataEncoded: string = req.body.customData;
        const customData: CustomData = JSON.parse(
          decodeURIComponent(customDataEncoded)
        );
        const { host } = customData;
        return res.redirect(
          `${host}/eVartai?ticket=${ticket}&customData=${customDataEncoded}`
        );
      }
      passport.authenticate("evartai-login", async (err, user, info) => {
        if (err) {
          return res.redirect("/negalimaJungtis");
        }
        if (!user) {
          return res.redirect(
            "/negalimaJungtis?info=" + info.message + "&error=" + err
          );
        }
        await onLogin(user);
        const dbU = await getRepository(User).findOne({
          relations: ["tenantUsers", "tenantUsers.tenant"],
          where: { id: user.id },
        });
        req.logIn(user, async (err) => {
          if (err) {
            return next(err);
          }

          const route = getAuthRoute(dbU);
          return res.redirect(route);
        });
      })(req, res, next);
    } catch (error) {
      return res.redirect("/negalimaJungtis?error=" + error);
    }
  });
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("domain-login", (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          username: req.body.username || "",
          id: info.id || null,
          error: info.message,
        });
      }

      req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        await onLogin(user);
        return res.json({ user });
      });
    })(req, res, next);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.use("/api/userInfo", (req, resp) => {
    return resp.json(req?.session?.passport?.user || {});
  });

  app.get("/login", (req, res, next) => {
    if (req.user) {
      res.redirect((req.query.originalUrl as string) || "/");
    } else {
      next();
    }
  });
};

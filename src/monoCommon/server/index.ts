import express from "express";
import next from "next";
import db from "./db";
import { addLoggingToRequests } from "./logger";
import apiRouter from "../../server/routers/apiRouter";
import filesRouter from "./files";
import { initSecurity } from "./security/initSecurity";
import { getDBUser } from "./getAppUser";
import { RoleAdmin, RoleFisher, RoleFisherInTenant, RoleInspector } from "../../server/utils/roles";
import { getAuthRoute } from "../../server/utils/routing";

const initServer = async () => {
  await db();
  try {
    const dev = !(process.env.PROD === "true");
    const nextApp = next({ dev });
    const handle = nextApp.getRequestHandler();
    const port = process.env.PORT;

    await nextApp.prepare();
    const app = express();
    addLoggingToRequests(app);
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    initSecurity(app);
    [filesRouter(), apiRouter].forEach((r) => {
      app.use("/", r);
    });

    app.use("/", async (req, res, next) => {
      if (req.url === "/") {

        if (!req.user) {
          return res.redirect("/login");
        }

        const user = await getDBUser(req);
        const route = getAuthRoute(user)
        return res.redirect(route);
      }
      else next();
    });

    app.all("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, (err?) => {
      if (err) throw err;
      console.log(
        `> Ready on http://localhost:${port} - env ${process.env.ENV}`
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

initServer();

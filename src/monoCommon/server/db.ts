import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import initEnv from "../../server/initEnv";

import { entities } from "../../server/entities";
import initData from "../../server/initData";
import { User } from "../../server/models/User";
initEnv();
[
  "DB_HOST",
  "DB_PORT",
  "DB_USER_NAME",
  "DB_PASSWORD",
  "DB_SYNC",
  "DB_LOG",
].forEach((key) => {
  if (!process.env[key]) {
    console.log(process.env);
    throw new Error(`${key} is not defined`);
  }
});
const {
  DB_HOST,
  DB_PORT,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_SYNC,
  DB_DATABASE,
  DB_LOG,
  DB_CA_CERT,
  HIDE_DB_READY,
} = process.env;
let connPromise;
export default function () {
  if (connPromise) {
    return connPromise;
  }
  connPromise = new Promise((resolve, reject) => {
    createConnection({
      type: "postgres",
      host: DB_HOST,
      port: parseInt(DB_PORT),
      username: DB_USER_NAME,
      password: DB_PASSWORD,
      database: DB_DATABASE || "postgres",
      synchronize: DB_SYNC === "true",
      logging: DB_LOG === "true",
      entities: entities(),
      ssl: DB_CA_CERT
        ? {
            rejectUnauthorized: true,
            ca: DB_CA_CERT,
          }
        : false,
    })
      .then(async (con) => {
        if ((await getRepository(User).count()) === 0) {
          await initData();
        }
        !HIDE_DB_READY && console.log("DB ready!");
        resolve(con);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return connPromise;
}

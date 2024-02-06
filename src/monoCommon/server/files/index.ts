import express from "express";
import multer from "multer";
import {
  RoleInvestigator,
  RoleInvestigatorInTenant,
  RoleInspector,
  RoleAdmin,
  RoleFisherInTenant,
  RoleFisher,
} from "../../../server/utils/roles";

import { getDBUser } from "../getAppUser";
import { hasPermission } from "../utils/hasPermission";
const minio = require("minio");

export default () => {
  const router = express.Router();

  const minioClient = new minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    useSSL: process.env.MINIO_USESSL === "true",
    port: process.env.MINIO_PORT && parseInt(process.env.MINIO_PORT),
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRETKEY,
  });

  const canAccessFile = [
    {
      permissions: [RoleInvestigator, RoleInvestigatorInTenant, RoleAdmin],
      bucket: "zvejyba",
    },
    {
      permissions: [RoleInspector, RoleFisherInTenant, RoleFisher, RoleAdmin],
      bucket: "protokolai",
    },
  ];

  const authUser = async (request, response, next) => {
    const user = await getDBUser(request);

    if (
      !canAccessFile.some(
        (c) =>
          c.bucket === request.params.name &&
          c.permissions.some((p) => hasPermission(user, p))
      )
    ) {
      return response.status(500).json("neturite priegos");
    }

    next();
  };

  router.post(
    "/upload/:name/:id",
    multer({
      storage: multer.memoryStorage(),
    }).any(),
    authUser,
    async (request, response) => {
      //@ts-ignore
      if (request.files !== []) {
        //@ts-ignore
        if (request.files.some((f) => f["mimetype"] !== "application/pdf")) {
          return response.status(500).json("negalimas failas");
        }

        //@ts-ignore
        Array.from(request.files as any).map((file) => {
          minioClient.putObject(
            request.params.name,
            request.params.id,
            file["buffer"],
            (err, etag) => {
              if (err) return console.log(err);
            }
          );
        });
      }

      response.setHeader("Content-Type", "application/json");
      return response.status(200).json({
        status: "succes",
      });
    }
  );

  router.get("/failas/:name/:id", authUser, async (request, response) => {
    minioClient.getObject(
      request.params.name,
      request.params.id,
      (error, stream) => {
        if (error) {
          return response.status(500).send(error);
        }
        stream.pipe(response);
      }
    );
  });

  router.delete(
    "/delete/failas/:name/:id",
    authUser,
    async (request, response) => {
      minioClient.removeObject(
        request.params.name,
        request.params.id,
        (error) => {
          if (error) {
            return response.status(500).send(error);
          }
          return response.status(200).json({
            status: "succes",
          });
        }
      );
    }
  );

  return router;
};

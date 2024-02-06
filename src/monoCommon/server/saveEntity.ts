import { EntityTarget, getRepository } from "typeorm";
import { BaseEntity } from "./models/BaseEntity";
import { HistoryLog } from "./models/HistoryLog";
import RouterRequest from "../RouterRequest";

function saveEntity<T>(
  Entity: EntityTarget<T>,
  routerRequest: RouterRequest | string,
  data: T
) {
  const modify: BaseEntity = data as unknown as BaseEntity;
  const repo = getRepository(Entity);
  if (!(typeof routerRequest === "string")) {
    const rRequest = routerRequest as unknown as RouterRequest;
    if (modify.id) {
      modify.updatedBy = {
        ip: rRequest?.req?.ip,
        user: rRequest?.user?.id,
        tenant: rRequest?.tenant?.id,
        tenantUser: rRequest?.tenantUser?.id,
      };
    } else {
      modify.createdBy = {
        ip: rRequest?.req?.ip,
        user: rRequest?.user?.id,
        tenant: rRequest?.tenant?.id,
        tenantUser: rRequest?.tenantUser?.id,
      };
    }
    modify.modifyPath = rRequest?.req?.url;
  } else {
    modify.modifyPath = routerRequest;
  }
  const table = repo.metadata.tableName;
  const historyLog = new HistoryLog();
  historyLog.createdBy = modify.createdBy;
  historyLog.updatedBy = modify.updatedBy;
  historyLog.table = table;

  return repo.save(data).then((e) => {
    const entity = e as unknown as BaseEntity;
    historyLog.entityId = entity.id;
    historyLog.data = entity;
    getRepository(HistoryLog).save(historyLog).catch(console.error);
    return e;
  });
}
export default saveEntity;

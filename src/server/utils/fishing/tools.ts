import { getRepository } from "typeorm";
import { CaughtFish } from "../../models/CaughtFish";
import { EventTools } from "../../models/EventTools";
import { Tenant } from "../../models/Tenant";
import { Tool } from "../../models/Tool";
import { User } from "../../models/User";

export const onShore = async (user: User, tenant: Tenant) => {
  const query = await getRepository(Tool)
    .createQueryBuilder("Tool")
    .leftJoinAndSelect("Tool.toolType", "tooltype")
    .leftJoinAndSelect("Tool.tenant", "tenant")
    .leftJoinAndSelect("Tool.user", "toolUser")
    .leftJoinAndMapOne(
      "Tool.eventTools",
      EventTools,
      "eventTools",
      "eventTools.end_date is null AND Tool.tool_id = eventTools.toolId"
    )
    .leftJoinAndSelect("eventTools.event", "event")
    .leftJoinAndSelect("event.user", "user")
    .select([
      "Tool.id",
      "Tool.seal_nr",
      "Tool.net_length",
      "Tool.group_id",
      "Tool.eye_size",
    ])
    .addSelect(["tooltype.id", "tooltype.label"])
    .addSelect(["eventTools.id"])
    .addSelect("event")
    .addSelect("user");
  if (tenant) {
    query.andWhere("tenant.id = :tenant", { tenant: tenant.id });
  } else {
    query.andWhere("toolUser.id = :user_id", { user_id: user.id });
    query.andWhere("tenant.id IS NULL");
  }
  const list = query.getMany();
  return list;
};

export interface onWaterProps {
  user: User;
  tenant: Tenant;
  waterBodyId: string;
  isPolder?: boolean;
}

export const onWater = async ({
  user,
  waterBodyId,
  tenant,
  isPolder,
}: onWaterProps) => {
  const query = await getRepository(Tool)
    .createQueryBuilder("Tool")
    .leftJoinAndSelect("Tool.toolType", "tooltype")
    .leftJoinAndSelect("Tool.tenant", "tenant")
    .leftJoinAndSelect("Tool.user", "toolUser")
    .leftJoinAndMapOne(
      "Tool.eventTools",
      EventTools,
      "eventTools",
      "eventTools.end_date is null AND Tool.tool_id = eventTools.toolId"
    )
    .leftJoinAndSelect("eventTools.event", "event")
    .leftJoinAndSelect("event.user", "user")
    .select([
      "Tool.id",
      "Tool.seal_nr",
      "Tool.net_length",
      "Tool.group_id",
      "Tool.eye_size",
    ])
    .addSelect(["tooltype.id", "tooltype.label"])
    .addSelect(["eventTools.id"])
    .addSelect("event")
    .addSelect("user");
  if (!isPolder) {
    query.andWhere(
      `event.location ::jsonb -> 'waterBody' ->> 'id' = :waterBodyId`,
      {
        waterBodyId,
      }
    );
  } else {
    query.andWhere(`event.location ::jsonb -> 'waterBody' ->> 'type' = :type`, {
      type: "polder",
    });
  }

  if (tenant) {
    query.andWhere("tenant.id = :tenant", { tenant: tenant.id });
  } else {
    query.andWhere("toolUser.id = :user_id", { user_id: user.id });
    query.andWhere("tenant.id IS NULL");
  }
  const list = query.getMany();
  return list;
};

export const onWaterFishWeightOnBoat = async ({
  user,
  tenant,
  waterBodyId,
  eventId,
}: any) => {
  const query = await getRepository(Tool)
    .createQueryBuilder("Tool")
    .leftJoinAndSelect("Tool.toolType", "tooltype")
    .leftJoinAndSelect("Tool.tenant", "tenant")
    .leftJoinAndSelect("Tool.user", "toolUser")
    .leftJoinAndMapOne(
      "Tool.eventTools",
      EventTools,
      "eventTools",
      "eventTools.end_date is null AND Tool.tool_id = eventTools.toolId"
    )
    .leftJoinAndSelect("eventTools.event", "event")
    .leftJoinAndSelect("event.user", "user")
    .leftJoinAndMapMany(
      "eventTools.caughtFishes",
      CaughtFish,
      "caughtFishes",
      "caughtFishes.group_id = eventTools.group_id AND caughtFishes.eventId = :eventId",
      { eventId }
    )
    .select([
      "Tool.id",
      "Tool.seal_nr",
      "Tool.net_length",
      "Tool.group_id",
      "Tool.eye_size",
    ])
    .addSelect(["tooltype.id", "tooltype.label"])
    .addSelect(["eventTools.id"])
    .addSelect("event")
    .addSelect("user")
    .addSelect(["caughtFishes.id"])
    .andWhere(`event.location ::jsonb -> 'waterBody' ->> 'id' = :waterBodyId`, {
      waterBodyId,
    });
  if (tenant) {
    query.andWhere("tenant.id = :tenant", { tenant: tenant.id });
  } else {
    query.andWhere("toolUser.id = :user_id", { user_id: user.id });
    query.andWhere("tenant.id IS NULL");
  }
  const list = query.getMany();
  return list;
};

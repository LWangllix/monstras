
import { Password } from "../monoCommon/server/models/Password";
import { Recover } from "../monoCommon/server/models/Recover";
import { Tenant } from "./models/Tenant";
import { User } from "./models/User";
import { UserInviteToTenant } from "./models/UserInviteToTenantInvite";
import TenantUser from "./models/TenantUser";
import NewTenantUser from "./models/NewTenantUser";
import { Naudotojas } from "../monoCommon/server/models/Naudotojas";
import { Log } from "../monoCommon/server/models/Log";
import { HistoryLog } from "../monoCommon/server/models/HistoryLog";
import { FlowActor } from "../BPMN/FlowActor";

export const entities = () => [
  User,
  Recover,
  Password,
  Tenant,
  UserInviteToTenant,
  TenantUser,
  NewTenantUser,
  Naudotojas,
  Log,
  HistoryLog,
  FlowActor
];

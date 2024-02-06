import { Permission } from "./server/models/Permission";
import { TenantInterface } from "./monoCommon/interfaces";

declare module "express-session" {
  export interface SessionData {
    passport: {
      user: { [key: string]: any };
    };
  }
}
export interface AppUser {
  id: string;
  permission: Permission;
}

export interface Location {
  latlng?: LatLng;
  waterBody?: {
    id: string;
    name: string;
    type?: string;
    area?: string;
  };
  municipality: { name: string; id: string };
  edited?: boolean;
}

export interface HandleMultipleSelectProps {
  value: string;
  array: Array<string>;
  onSetArray: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export interface bodyOfWaterProps {
  bodyOfWaters?: Array<{ id: number; name: string; category: string }>;
  municipalities?: Array<{ label: string; id: string }>;
  latlng?: LatLngLiteral;
}
export interface Tenant {
  id: string;
  code: string;
  name: string;
  email: string;
  municipalities: string = "";
  users: User[];
  deletedAt?: Date;
  permission: Permission;
}

export interface FishType {
  id: string;
  label: string;
  removed: boolean = false;
  countByNumber: boolean;
}

export interface NewTenantSimpleUserInterface {
  name: string;
  lastName: string;
  code: string;
  phone: string;
  email: string;
}
export interface NewTenantUserInterface extends NewTenantSimpleUserInterface {
  id: string;
  tenant: TenantInterface;
}

export interface handleMultipleSelectProps {
  value: string;
  array: Array<string>;
  onSetArray: React.Dispatch<React.SetStateAction<Array<string>>>;
}

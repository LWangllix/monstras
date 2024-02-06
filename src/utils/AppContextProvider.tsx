import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { User } from "../server/models/User";
import api from "../server/routers/api";
import { hasPermission } from "../monoCommon/server/utils/hasPermission";
import {
  RoleAdmin,
  RoleFisher,
  RoleInvestigator,
  RoleFisherFreelancerSuspended,
  RoleFisherInTenant,
  RoleFisherInTenantEnabled,
  RoleFisherInTenantSuspended,
  RoleInspector,
  RoleTenantOwner,
  RoleTenantOwnerFisherEnabled,
  RoleTenantOwnerFisherSuspended,
  RoleTenantUserAdmin,
} from "../server/utils/roles";
import { setTenantUserId as saveTenantUser } from "../monoCommon/utils/call";
import { OperatorExecutor, Permission } from "../monoCommon/Endpoint";
import {
  TenantInterface,
  TenantUserInterface,
  UserInterface,
} from "../monoCommon/interfaces";
interface UserContextInterface {
  user: { loading: boolean; user: UserInterface };
  tenant?: TenantInterface;
  tenantUser?: TenantUserInterface;
  isInvestigator: boolean;
  isFreelancer: boolean;
  isFreelancerSuspended: boolean;
  isTenantOwner: boolean;
  isTenantOwnerSuspended: boolean;
  isTenantOwnerActive: boolean;
  isUserAdmin: boolean;
  isTenantWorker: boolean;
  isTenantWorkerSuspended: boolean;
  isTenantWorkerActive: boolean;
  isInspector: boolean;
  isAdmin: boolean;
  isTenantUserSuspended: boolean;
  setUser: React.Dispatch<
    React.SetStateAction<{ loading: boolean; user: UserInterface }>
  >;
  switchTenant: (tenantUserId?: string) => void;
  refreshUser: () => void;
  hasPermission: (perm: Permission | OperatorExecutor) => boolean;
}

export const UserContext = createContext<UserContextInterface>({
  user: { loading: true, user: null },

  refreshUser: () => {},
  hasPermission: (perm: Permission | OperatorExecutor) => {
    return false;
  },
  isInvestigator: false,
  isFreelancer: false,
  isFreelancerSuspended: false,
  isTenantOwner: false,
  isTenantOwnerActive: false,
  isTenantOwnerSuspended: false,
  isUserAdmin: false,
  isTenantWorker: false,
  isTenantWorkerSuspended: false,
  isTenantWorkerActive: false,
  isInspector: false,
  isAdmin: false,
  isTenantUserSuspended: false,
  setUser: () => {},
  switchTenant: (tenantId?: string) => {},
});

interface CaughtFishOnBoatEventDataContextInterface {
  setCaughtFishOnBoatEvent: React.Dispatch<React.SetStateAction<any>>;
  caughtFishOnBoatEvent: any;
}

export const CaughtFishOnBoatEventContext =
  createContext<CaughtFishOnBoatEventDataContextInterface>({
    caughtFishOnBoatEvent: null,
    setCaughtFishOnBoatEvent: () => {},
  });

interface FishingStartedContextInterface {
  fishingStarting: boolean;
  setFishingStarting: (boolean) => void;
  fishingStarted: any;
  setFishingStarted: (data: any) => void;
}

export const FishingStartedContext =
  createContext<FishingStartedContextInterface>({
    fishingStarting: false,
    setFishingStarting: () => {},
    fishingStarted: null,
    setFishingStarted: () => {},
  });
interface ProtocolContextInterface {
  setProtocol: React.Dispatch<React.SetStateAction<any>>;
  protocol: any;
}
interface setHideResizeIconContextInterface {
  setHideResizeIcon: React.Dispatch<React.SetStateAction<boolean>>;
  hideResizeIcon: boolean;
}

export const ProtocolContext = createContext<ProtocolContextInterface>({
  protocol: null,
  setProtocol: () => {},
});

export const setHideResizeIconContext =
  createContext<setHideResizeIconContextInterface>({
    hideResizeIcon: false,
    setHideResizeIcon: () => {},
  });

const AppContextProvider = ({ children, onLoadingChange }) => {
  const [user, setUser] = useState<{ loading: boolean; user: User }>({
    loading: true,
    user: null,
  });
  const [caughtFishOnBoatEvent, setCaughtFishOnBoatEvent] = useState(null);
  const [protocol, setProtocol] = useState(null);
  const [hideResizeIcon, setHideResizeIcon] = useState(false);

  const [fishingStarting, setFishingStarting] = useState(false);
  const [fishingStarted, setFishingStarted] = useState({
    lastFishingStartTime: null,
  });

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    onLoadingChange(user?.loading);
  }, [user?.loading]);

  const refreshUser = () => {
    setUser({ ...user, loading: true });
    try {
      axios
        .get("/api/userInfo")
        .then(async (e) => {
          const userId = e.data?.id;
          if (userId) {
            const u = (await api.users.get({ userId }))["user"];
            const tenantUserId = localStorage.getItem("tenantUserId");
            const tenantUser = u.tenantUsers.find(
              (tu) => tu.id + "" === tenantUserId
            );
            setTenantUser(tenantUser);
            setUser({
              loading: false,
              user: { ...u },
            });
          } else {
            setUser({ loading: false, user: null });
          }
        })
        .catch((e) => {
          setUser({ loading: false, user: null });
        });
    } catch (e) {}
  };

  const [tenantUser, setTenantUser] = useState<TenantUserInterface>(null);

  const _hasPermission = (
    permission: Permission | OperatorExecutor
  ): boolean => {
    return hasPermission(user.user, permission, tenantUser?.id);
  };

  const switchTenant = (tenantUserId?: string) => {
    saveTenantUser(tenantUserId);
    localStorage.setItem("tenantUserId", tenantUserId);
    setTenantUser(user.user.tenantUsers.find((tu) => tu.id === tenantUserId));
  };

  const isFreelancer = !tenantUser && _hasPermission(RoleFisher);
  const isInvestigator = _hasPermission(RoleInvestigator);

  const isFreelancerSuspended =
    isFreelancer && _hasPermission(RoleFisherFreelancerSuspended);

  const isTenantOwner = !!tenantUser && _hasPermission(RoleTenantOwner);

  const isTenantOwnerActive =
    isTenantOwner && _hasPermission(RoleTenantOwnerFisherEnabled);

  const isTenantOwnerSuspended =
    isTenantOwner && _hasPermission(RoleTenantOwnerFisherSuspended);

  const isTenantUser = !!tenantUser && _hasPermission(RoleFisherInTenant);

  const isTenantUserSuspended =
    isTenantUser && _hasPermission(RoleFisherInTenantSuspended);

  const isTenantUserActive =
    isTenantUser && _hasPermission(RoleFisherInTenantEnabled);

  const isUserAdmin = isTenantUser && _hasPermission(RoleTenantUserAdmin);

  const isTenantWorker = isTenantUser && !isTenantOwner;

  const isTenantWorkerActive = isTenantWorker && isTenantUserActive;

  const isTenantWorkerSuspended = isTenantWorker && isTenantUserSuspended;

  const isInspector = _hasPermission(RoleInspector);

  const isAdmin = _hasPermission(RoleAdmin);

  return (
    <UserContext.Provider
      value={{
        switchTenant,
        user,
        setUser,
        refreshUser,
        hasPermission: _hasPermission,
        tenantUser,
        tenant: tenantUser?.tenant,
        isInvestigator,
        isFreelancer,
        isFreelancerSuspended,
        isTenantOwner,
        isTenantOwnerSuspended,
        isTenantOwnerActive,
        isUserAdmin,
        isTenantWorker,
        isTenantWorkerSuspended,
        isTenantWorkerActive,
        isInspector,
        isAdmin,
        isTenantUserSuspended,
      }}
    >
      <FishingStartedContext.Provider
        value={{
          fishingStarting,
          setFishingStarting,
          fishingStarted,
          setFishingStarted,
        }}
      >
        <CaughtFishOnBoatEventContext.Provider
          value={{
            caughtFishOnBoatEvent,
            setCaughtFishOnBoatEvent,
          }}
        >
          <setHideResizeIconContext.Provider
            value={{
              hideResizeIcon: hideResizeIcon,
              setHideResizeIcon: setHideResizeIcon,
            }}
          >
            <ProtocolContext.Provider value={{ protocol, setProtocol }}>
              {children}
            </ProtocolContext.Provider>
          </setHideResizeIconContext.Provider>
        </CaughtFishOnBoatEventContext.Provider>
      </FishingStartedContext.Provider>
    </UserContext.Provider>
  );
};

export default AppContextProvider;

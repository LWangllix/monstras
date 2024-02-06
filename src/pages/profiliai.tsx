import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import LayoutWithImage, { H1 } from "../monoCommon/components/layouts/LayoutWithImage";
import ProfileItem from "../components/login/ProfileItem";
import Icon from "../components/other/Icon";
import { PERMISSION_STATUSES } from "../config";
import { hasPermission } from "../monoCommon/server/utils/hasPermission";
import {
  RoleAdmin,
  RoleFisherFreelancer,
  RoleFisherInTenant,
  RoleInspector,
} from "../server/utils/roles";
import { device } from "../styles";
import { UserContext } from "../utils/AppContextProvider";

const ProfileSwitch = () => {
  const {
    user: { user },
    switchTenant,
  } = React.useContext(UserContext);
  const router = useRouter();

  if (!user) {
    router.replace("/login");
    return null;
  }

  const isFreelancer = hasPermission(user, RoleFisherFreelancer);
  const isInspector = hasPermission(user, RoleInspector);
  const isAdmin = hasPermission(user, RoleAdmin);

  const isTenantUser = user?.tenantUsers?.some((tu) => {
    return hasPermission(user, RoleFisherInTenant, tu.id);
  });

  const handleSwitch = (route, tenanUsr = null) => {
    switchTenant(tenanUsr);
    router.push(route);
  };

  if (!user) {
    return null;
  }

  return (
    <LayoutWithImage>
      <Container>
        <H1>Pasirinkite profilį</H1>
        {isFreelancer && (
          <ProfileItem
            title={`${user.name} ${user.lastName}`}
            subtitle={user.email}
            fisher={{
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              phone: user.phone,
              email: user.email,
              code: null,
              isTenant: false,
              permission: user.permission.user,
            }}
            onClick={() => handleSwitch("/zurnalas")}
          />
        )}
        {isTenantUser &&
          user.tenantUsers.map((tUser, index) => {
            return (
              <ProfileItem
                key={index}
                title={tUser.tenant.name}
                subtitle={`${user.name} ${user.lastName}`}
                fisher={{
                  id: tUser.id,
                  name: user.name,
                  lastName: user.lastName,
                  phone: tUser.tenant.phone,
                  email: tUser.tenant.email,
                  code: `${user.name} ${user.lastName}`,
                  isTenant: true,
                  permission:
                    tUser.permission.user === PERMISSION_STATUSES.SUSPENDED ||
                    tUser.tenant.permission.user ===
                      PERMISSION_STATUSES.SUSPENDED
                      ? PERMISSION_STATUSES.SUSPENDED
                      : tUser.permission.user,
                }}
                onClick={() => handleSwitch("/zurnalas", tUser.id)}
              />
            );
          })}
        {isInspector && (
          <ProfileItem
            title={`${user.name} ${user.lastName}`}
            subtitle="Inspektorius"
            fisher={{
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              phone: user.phone,
              email: user.email,
              code: "Inspektorius",
              isTenant: false,
              permission: user.permission.inspector,
            }}
            onClick={() => handleSwitch("/vidinis")}
          />
        )}
        {isAdmin && (
          <ProfileItem
            title={`${user.name} ${user.lastName}`}
            subtitle="Administratorius"
            fisher={{
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              phone: user.phone,
              email: user.email,
              code: null,
              isTenant: false,
              permission: user.permission.admin,
            }}
            onClick={() => handleSwitch("/admin")}
          />
        )}
        <BottomRow onClick={() => window.open("/logout", "_self")}>
          <StyledLogoutIcon name="exit" />
          <LogoutText>Atsijungti</LogoutText>
        </BottomRow>
      </Container>
    </LayoutWithImage>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.mobileL} {
    min-width: 100%;
  }
`;

const BottomRow = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 40px;
`;

const StyledLogoutIcon = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 2.5rem;
`;

const LogoutText = styled.div`
  font: normal normal medium 1.6rem/24px Manrope;
  color: #121a55;
  margin-left: 12px;
`;

export default ProfileSwitch;

import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { hasPermission } from "../../monoCommon/server/utils/hasPermission";
import {
  RoleFisher,
  RoleFisherInTenant,
  RoleInspector,
} from "../../server/utils/roles";
import { UserContext } from "../../utils/AppContextProvider";
import Avatar from "./Avatar";
import Icon from "./Icon";

const UserSwitchMenu = () => {
  const {
    user: { user },
    switchTenant,
    tenantUser,
  } = React.useContext(UserContext);
  const router = useRouter();

  const isFreelancer = hasPermission(user, RoleFisher);
  const isInspector = hasPermission(user, RoleInspector);

  const isTenantUser = user?.tenantUsers?.some((tu) => {
    return hasPermission(user, RoleFisherInTenant, tu.id);
  });

  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <div>
        <a href="/login">Prisijungti</a>
      </div>
    );
  }

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  const handleSwitch = (tenanUsr) => {
    switchTenant(tenanUsr?.id);
    router.push("/zurnalas");
    setOpen(!open);
  };

  return (
    <Container tabIndex={0} onBlur={handleBlur}>
      <div onClick={() => setOpen(!open)}>
        <Avatar name={user.name} surname={user.lastName} />
      </div>
      {open ? (
        <InnerContainer>
          {(isFreelancer || isInspector) && (
            <TopRow onClick={handleSwitch}>
              <Row>
                <StyledAvatar
                  active={!tenantUser}
                  name={user.name}
                  surname={user.lastName}
                />
                <Column>
                  <FullNameDiv>
                    {user.name} {user.lastName}
                  </FullNameDiv>
                  <InfoRow>
                    <InfoIcon name="phone"></InfoIcon>
                    <InfoText>{user?.phone}</InfoText>
                  </InfoRow>
                  <InfoRow>
                    <InfoIcon name="userEmail"></InfoIcon>
                    <InfoText>{user?.email}</InfoText>
                  </InfoRow>
                </Column>
              </Row>
              {!tenantUser ? <StyledActiveIcon name={"active"} /> : null}
            </TopRow>
          )}
          {isTenantUser &&
            user.tenantUsers?.map((tUser, index) => {
              return (
                <TopRow
                  key={`profile_${index}`}
                  onClick={() => handleSwitch(tUser)}
                >
                  <Row>
                    <StyledAvatar
                      active={tenantUser?.id === tUser.id}
                      name={user.name}
                      surname={user.lastName}
                    />
                    <Column>
                      <FullNameDiv>
                        {user.name} {user.lastName}
                      </FullNameDiv>
                      <InfoRow>
                        <InfoIcon name="phone"></InfoIcon>
                        <InfoText>{tUser.phone}</InfoText>
                      </InfoRow>
                      <InfoRow>
                        <InfoIcon name="userEmail"></InfoIcon>
                        <InfoText>{tUser?.email}</InfoText>
                      </InfoRow>
                      <InfoRow>
                        <InfoIcon name="company"></InfoIcon>
                        <InfoText>{tUser.tenant.name}</InfoText>
                      </InfoRow>
                      <InfoRow>
                        <InfoIcon name="info"></InfoIcon>
                        <InfoText>{tUser.tenant.code}</InfoText>
                      </InfoRow>
                    </Column>
                  </Row>
                  {tenantUser?.id === tUser.id ? (
                    <StyledActiveIcon name={"active"} />
                  ) : null}
                </TopRow>
              );
            })}
          <Hr />
          <BottomRow onClick={() => window.open("/logout", "_self")}>
            <StyledLogoutIcon name="exit" />
            <LogoutText>Atsijungti</LogoutText>
          </BottomRow>
        </InnerContainer>
      ) : null}
    </Container>
  );
};

const StyledLogoutIcon = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 2.5rem;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 4;
  min-width: 288px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 16px #121a5529;
  border-radius: 4px;
  padding: 16px;
`;

const Container = styled.div`
  position: relative;
`;

const Row = styled.div`
  display: flex;
`;

const InfoIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: 9.33px;
`;

const InfoRow = styled.div`
  margin-top: 8px;
  display: flex;
`;

const LogoutText = styled.div`
  font: normal normal medium 1.6rem/24px Manrope;
  color: #121a55;
  margin-left: 12px;
`;

const InfoText = styled.div`
  font: normal normal normal 1.2rem/17px Manrope;
  color: #7a7e9f;
`;

const StyledAvatar = styled(Avatar)`
  margin: 0 16px 0 0;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const StyledActiveIcon = styled(Icon)`
  color: ${({ theme }) => theme?.colors?.secondary};
  vertical-align: middle;
  margin-right: 8px;
  font-size: 2.9rem;
`;

const TopRow = styled.div`
  display: flex;
  min-width: 288px;
  margin-bottom: 20px;
  justify-content: space-between;
`;
const Hr = styled.div`
  border: 1px solid #121a553d;
  opacity: 1;
  margin: 16px -16px;
`;

const BottomRow = styled.div`
  display: flex;
  cursor: pointer;
`;

const FullNameDiv = styled.div`
  font: normal normal bold 1.6rem/22px Manrope;
  color: #121a55;
  margin-top: 10px;
  margin-bottom: 4px;
`;

export default UserSwitchMenu;

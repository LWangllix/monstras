import React from "react";
import styled from "styled-components";
import { Permissions, PERMISSION_STATUSES } from "../../config";
import { Naudotojas } from "../../monoCommon/server/models/Naudotojas";
import { User } from "../../server/models/User";
import { theme } from "../../styles";
import Avatar from "../other/Avatar";
import CustomTag from "../other/CustomTag";

export interface FishStockerItemProps {
  title: string;
  subtitle: string;
  fisher?: any;
  onClick: (stocker: Naudotojas) => void;
  user?: User;
}

const ProfileItem = ({
  fisher,
  title,
  subtitle,
  onClick,
}: FishStockerItemProps) => {
  const showStatus = fisher?.permission === Permissions.User.statuses.SUSPENDED;

  return (
    <Container status={fisher?.permission} onClick={() => onClick(fisher)}>
      <StatusContainer>
        {showStatus ? <StatusMarker status={fisher?.permission} /> : null}
        <StyledAvatar
          name={fisher.name}
          surname={fisher.lastName}
          status={fisher.permission}
        />
      </StatusContainer>
      <Content>
        <FirstRow>
          <TenantName>{title || ""}</TenantName>
          {showStatus ? (
            <CustomTag color={theme.colors.error} text={"Veikla sustabdyta"} />
          ) : null}
        </FirstRow>
        <SecondRow>
          <TenantCode>{subtitle || ""}</TenantCode>
        </SecondRow>
      </Content>
    </Container>
  );
};

const Container = styled.a<{ status: string }>`
  background: #ffffff 0% 0% no-repeat padding-box;
  cursor: pointer;
  box-shadow: 0px 8px 16px #121a5514;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  opacity: 1;
  width: 100%;
  max-width: 400px;
  display: flex;
  vertical-align: middle;
  padding: 12px 0;
  margin: 8px 0;
  border: 1px solid
    ${({ theme, status }) =>
      status === Permissions.User.statuses.DISABLED
        ? theme.colors.error
        : theme.colors.border};

  &:hover,
  &:focus {
    border: 1px solid #13c9e7;
    box-shadow: 0 0 0 4px rgb(19 201 231 / 20%);
    background: rgb(19 201 231 / 4%);
  }
`;

const StatusContainer = styled.div`
  display: flex;
`;

const StatusMarker = styled.div<{ status: string }>`
  width: 4px;
  height: 40px;
  background-color: ${({ theme, status }) =>
    status === Permissions.User.statuses.DISABLED
      ? theme.colors.pending
      : theme.colors.error};
  box-shadow: 0px 30px 60px #121a5514;
  border-radius: 0px 8px 8px 0px;
  opacity: 1;
  margin-bottom: auto;
  margin-top: auto;
`;

const StyledAvatar = styled(Avatar)<{ status: string }>`
  margin: auto 18px auto 15px;
  ${({ status, theme }) =>
    status === PERMISSION_STATUSES.SUSPENDED
      ? `background-color: ${theme.colors.error}`
      : ""}
`;

const Content = styled.div`
  flex: 1;
  flex-direction: column;
  margin: auto 0;
  overflow: hidden;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
  justify-content: space-between;
`;

const TenantName = styled.span`
  display: inline-block;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 22px;
  align-items: center;
  margin-top: 4px;
`;

const TenantCode = styled.div`
  font: normal normal 600 1.4rem/19px Manrope;
  color: #121a558f;
`;

export default ProfileItem;

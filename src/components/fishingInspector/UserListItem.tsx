import React from "react";
import styled from "styled-components";
import { User } from "../../server/models/User";
import Avatar from "../other/Avatar";

export interface UserItemProps {
  onClick: (number) => void;
  user?: User;
  isOwner?: boolean;
}

const UserListItem = ({ onClick, user, isOwner }: UserItemProps) => {
  return (
    <Container onClick={() => onClick(user.id)}>
      <StatusContainer>
        <StyledAvatar name={user?.name} surname={user?.lastName} />
      </StatusContainer>
      <Content>
        <FirstRow>
          <UserLine>{`${user.name} ${user.lastName}`}</UserLine>
          {isOwner ? <Owner>vadovas</Owner> : null}
        </FirstRow>
        <SecondRow>
          <TenantCode>{user.email}</TenantCode>
        </SecondRow>
      </Content>
    </Container>
  );
};

const Container = styled.a`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 8px 16px #121a5514;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  opacity: 1;
  width: 100%;
  display: flex;
  vertical-align: middle;
  padding: 12px 0;
  margin: 8px 0;
`;

const StatusContainer = styled.div`
  display: flex;
`;

const StyledAvatar = styled(Avatar)`
  margin: auto 18px auto 15px;
`;

const Content = styled.div`
  flex: 1;
  flex-direction: column;
  margin: auto 0;
  overflow: hidden;
`;

const Owner = styled.div`
  display: inline-block;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #121a558f;
  font-size: 1.4rem;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const UserLine = styled.span`
  display: inline-block;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 8px;
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

export default UserListItem;

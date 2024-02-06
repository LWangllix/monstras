import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { device, theme } from "../../styles";
import Fish from "../icons/Fish";
import Icon from "../other/Icon";

export const MobileFooter = ({ page }) => {
  const router = useRouter();
  const tenantsActive = page === "tenants";
  const eventsActive = page === "events";
  return (
    <Container>
      <PageButton onClick={() => router.push("/vidinis")} active={eventsActive}>
        <FishIcon
          fill={eventsActive ? theme.colors.secondary : theme.colors.tertiary}
        />
        <PageText>Žurnalas</PageText>
      </PageButton>
      <PageButton
        onClick={() => router.push("/vidinis/zuvu-istekliu-naudotojai")}
        active={tenantsActive}
      >
        <UserIcon name={"user"} active={tenantsActive} />
        <PageText>Naudotojai</PageText>
      </PageButton>
    </Container>
  );
};

const Container = styled.div`
  display: none;
  @media ${device.mobileL} {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 16px;
    background: white;
    box-shadow: 2px 0px 8px #121a5529;
    justify-content: space-around;
  }
`;

const PageButton = styled.div<{ active?: boolean }>`
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  border-radius: 20px;
  background: ${({ active }) => (active ? "#13C9E74D" : "transparent")};
  height: 32px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const FishIcon = styled(Fish)`
  margin: auto 8px auto 0;
`;

const PageText = styled.span`
  margin: auto 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`;

const UserIcon = styled(Icon)<{ active: boolean }>`
  width: 24px;
  height: 24px;
  color: ${({ theme, active }) =>
    active ? theme.colors.secondary : theme.colors.tertiary};
  margin: auto 8px auto 0;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

export default MobileFooter;

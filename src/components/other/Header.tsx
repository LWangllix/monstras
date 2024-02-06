import { useMediaQuery } from "@material-ui/core";
import { find, map } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import SimpleSelect from "../../components/fields/SimpleSelect";
import { device } from "../../styles";
import HeaderTab from "./HeaderTab";
import UserInfo from "./UserInfo";

interface HeaderProps {
  tabs: Array<{ route: string; label: string; isSelected: boolean }>;
  showMobileTabs?: boolean;
  showLabel?: boolean;
  children?: JSX.Element;
}

const Header = ({ tabs, showMobileTabs, showLabel, children }: HeaderProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery(device.mobileL);
  const { width, ref } = useResizeDetector();
  const showTabs = Math.round(width) > 150 * tabs.length + (children ? 250 : 0);

  const getSelectedOption = () => {
    return find(tabs, (t) => t.isSelected);
  };

  return (
    <Container>
      <InnerContainer>
        <Link href="/">
          <Logo src="/logo.svg" />
        </Link>
        <HeaderLeft ref={ref}>
          {children}
          {!isMobile &&
            showTabs &&
            tabs &&
            map(tabs, (tab, index) => {
              return <HeaderTab key={`header_tab_${index}`} {...tab} />;
            })}
          {((isMobile && showMobileTabs) ||
            (!isMobile && !showTabs && tabs)) && (
            <SimpleSelect
              options={tabs}
              value={getSelectedOption()}
              getOnptionLabel={(option) => option?.label}
              isOptionTheSame={(option1, option2) => {
                return (
                  option1?.label === option2?.label &&
                  option1?.route === option2?.route
                );
              }}
              onChange={(option) => router.push(option?.route)}
              iconRight="menu"
              showLabel={
                (!isMobile && showLabel) || (isMobile && !children && !!tabs)
              }
            />
          )}
          <UserInfo />
        </HeaderLeft>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  height: 80px;
  width: 100%;
  @media ${device.mobileL} {
    border-bottom: none;
    height: 64px;
  }
  @media ${device.mobileS} {
    padding: 8px 0;
    border-bottom: none;
    height: 64px;
    font-size: 2.4rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 32px;
`;

export default Header;

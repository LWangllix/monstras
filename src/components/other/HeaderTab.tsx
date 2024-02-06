import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";

interface HeaderTabProps {
  route: string;
  label: string;
  isSelected: boolean;
}

const HeaderTab = ({ route, label, isSelected }: HeaderTabProps) => {
  const router = useRouter();
  return (
    <Tab current={isSelected} onClick={() => router.push(route)}>
      {label}
    </Tab>
  );
};

const Tab = styled.div<{ current: boolean }>`
  font: normal normal 600 16px/40px Manrope;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 32px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ current }) =>
    current &&
    css`
      &::after {
        content: " ";
        position: absolute;
        background-color: ${({ theme }) => theme.colors.secondary};
        bottom: 10px;
        right: 0;
        width: 100%;
        height: 2px;
      }
    `}
`;

export default HeaderTab;

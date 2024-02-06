import React from "react";
import styled from "styled-components";
import { device } from "../../styles";

interface InfoColumnProps {
  label?: string;
  value?: string;
  reverse?: boolean;
}

const InfoColumn = ({ label, value, reverse = false }: InfoColumnProps) => {
  return (
    <Column>
      <InfoLabel reverse={reverse}>{label}</InfoLabel>
      <InfoValue reverse={reverse}>{value}</InfoValue>
    </Column>
  );
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 16px 0 0 0;
  padding-right: 16px;
  @media ${device.mobileL} {
    margin-bottom: 10px;
  }
`;

const InfoLabel = styled.span<{ reverse: boolean }>`
  font: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary + "8A"};
`;

const InfoValue = styled.span<{ reverse: boolean }>`
  text-align: left;
  font: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export default InfoColumn;

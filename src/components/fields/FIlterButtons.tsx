import { useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Icon from "../other/Icon";
import { device } from "../../styles";

interface FilterButtonProps {
  onShowFilterSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterButton = ({ onShowFilterSelect }: FilterButtonProps) => {
  const isMobile = useMediaQuery(device.mobileL);

  return (
    <Container>
      <ContainerInner onClick={() => onShowFilterSelect(true)}>
        <StyledIcon name={"filter"} />
        {!isMobile ? <FilterBut>Filtruoti</FilterBut> : null}
      </ContainerInner>
    </Container>
  );
};

const FilterBut = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  letter-spacing: 0px;
  color: #121a55;
  margin-left: 11px;
`;

const Container = styled.div`
  width: 88.5px;
  @media ${device.mobileL} {
    width: 56px;
    padding: 0;
  }
`;

const ContainerInner = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media ${device.mobileL} {
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 0;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.secondary};

  @media ${device.mobileL} {
    font-size: 3.5rem;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export default FilterButton;

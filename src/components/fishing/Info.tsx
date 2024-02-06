import React from "react";
import styled from "styled-components";
import Icon from "../other/Icon";
import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import { device } from "../../styles";

export interface FishStockingInfoProps {
  locationName: string;
  info: Array<Array<{ type: string; label: string; value: string }>>;
  onSetShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FishStockingInfo = ({
  locationName,
  info,
  onSetShowModal,
}: FishStockingInfoProps) => {
  const isMobile = useMediaQuery(device.mobileL);
  const router = useRouter();

  return (
    <Container>
      {isMobile ? (
        <BackButtonContainer onClick={() => router.back()}>
          <BackButton name={"backMobile"} />
        </BackButtonContainer>
      ) : null}
      <HeaderRow>
        <Location>{locationName}</Location>
        <StyledImg onClick={() => onSetShowModal(true)} src="/icons/edit.svg" />
      </HeaderRow>
      <InfoPeaceRow>
        {info?.map((items, index) => {
          if (index < 3) {
            return (
              <InfoPeacePair key={`fish_stocking_info_${index}`}>
                {items?.map((item, index) => {
                  if (!item) return;

                  return (
                    <InfoConainer key={index}>
                      <InfoPaceContainer>
                        <StyledIcon name={item?.type} />
                        <InfoPeaceColumn>
                          <Label>{item?.label}</Label>
                          <InfoPeaceLabel>{item?.value}</InfoPeaceLabel>
                        </InfoPeaceColumn>
                      </InfoPaceContainer>
                    </InfoConainer>
                  );
                })}
              </InfoPeacePair>
            );
          }
        })}
      </InfoPeaceRow>
    </Container>
  );
};

const Label = styled.label`
  color: #b3b5c4;
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Container = styled.div`
  padding: 27px 32px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  @media ${device.mobileL} {
    border-radius: 0 0 40px 40px;
  }
  background-image: url("/backgroundImageRightTop.png");
  background-position: top right;
  background-repeat: no-repeat;
`;

const InfoConainer = styled.div`
  position: relative;
  top: 0;
  margin-bottom: 4px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

const Location = styled.span`
  font-size: 3.2rem;
  color: #fff;
  font-weight: bold;
  margin-bottom: 8px;
  margin-right: 16px;
`;

const StyledImg = styled.img`
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  font-size: 1.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: 8px;
  margin-bottom: 2px;
`;

const InfoPaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: auto 0;
  padding: "8px 0";
  @media ${device.mobileL} {
    width: 100%;
    width: 200px;
  }
`;

const InfoPeacePair = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  flex: 1;
  max-width: "350px";
  min-width: "250px";
  @media ${device.mobileL} {
    flex-direction: "row";
    flex-wrap: wrap;
    width: 100%;
  }
  @media ${device.mobileS} {
    flex-direction: column;
  }
`;

const InfoPeaceRow = styled.div`
  display: flex;
  color: #fff;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
`;

const InfoPeaceColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const BackButton = styled(Icon)`
  color: white;
  font-size: 2.3rem;
`;

const BackButtonContainer = styled.div`
  cursor: pointer;
  margin: 20px 0px 20px -20px;
`;

const InfoPeaceLabel = styled.span`
  font-size: 1.6rem;
  color: #b3b5c4;
`;

export default FishStockingInfo;

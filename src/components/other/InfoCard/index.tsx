import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { Permissions } from "../../../config";
import { Tenant } from "../../../server/models/Tenant";
import { device } from "../../../styles";
import { UserContext } from "../../../utils/AppContextProvider";
import Loader from "../../other/Loader";
import Icon from "../Icon";
import Modal from "../Modal";

export interface FishStockingInfoProps {
  title: string;
  info: Array<Array<{ type: string; label: string; value: string }>>;
  showModal?: boolean;
  loading?: boolean;
  tenant?: Tenant;
  eventLocationEdited?: boolean;
  eventLocationType?: string;
  fisher?: string;
  currentPage?: string;
  dialogContent?: JSX.Element;
  onEdit?: (open: boolean) => void;
  url: string;
}

const InfoCard = ({
  title,
  info,
  loading,
  tenant,
  fisher,
  eventLocationEdited,
  eventLocationType,
  dialogContent,
  showModal = false,
  onEdit,
  currentPage,
  url,
}: FishStockingInfoProps) => {
  const isMobile = useMediaQuery(device.mobileL);
  const router = useRouter();

  const { hasPermission } = useContext(UserContext);
  const isInspector = hasPermission(Permissions.Inspector.id);

  return (
    <>
      <Container>
        {isMobile ? (
          <BackButtonContainer onClick={() => router.replace(url)}>
            <BackButton name={"backMobile"} />
          </BackButtonContainer>
        ) : null}
        <CurrentPage>{currentPage}</CurrentPage>
        {isInspector && typeof tenant === "string" ? (
          <>
            {" "}
            <HeaderRow isInspector={isInspector && !!tenant}>
              <Title eventLocationEdited={eventLocationEdited && !!tenant}>
                {title}
                {eventLocationType === "baras" ? (
                  <EventArea>, Kuršių marios</EventArea>
                ) : null}
              </Title>
            </HeaderRow>
            <TenantField>{tenant || fisher}</TenantField>
          </>
        ) : (
          <HeaderRow>
            <Title>{title}</Title>
            {onEdit && !loading ? (
              <StyledImg onClick={() => onEdit(true)} src="/icons/edit.svg" />
            ) : loading ? (
              <Loader color="white" />
            ) : null}
          </HeaderRow>
        )}

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
                            <InfoPeaceLabel>
                              {item?.value}
                              {item?.type === "location" &&
                              eventLocationEdited &&
                              isInspector ? (
                                <Exclamation />
                              ) : null}
                            </InfoPeaceLabel>
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
      {onEdit && <Modal isOpen={showModal}>{dialogContent}</Modal>}
    </>
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
const CurrentPage = styled.div`
  color: #b3b5c4;
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Exclamation = styled.span`
  color: #fe5b78;
  &:after {
    content: " !";
  }
`;

const Title = styled.span<{ eventLocationEdited?: boolean }>`
  font-size: 3.2rem;
  color: ${({ eventLocationEdited }) =>
    eventLocationEdited ? "#FE5B78" : "#fff;"};
  font-weight: bold;
  margin-right: 16px;
  @media ${device.mobileS} {
    font-size: 2.4rem;
  }
`;

const Container = styled.div`
  padding: 27px 32px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  @media ${device.mobileL} {
    border-radius: 0 0 40px 40px;
    padding: 10px 32px 27px 32px;
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

const HeaderRow = styled.div<{ isInspector?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ isInspector }) => (!isInspector ? "8px" : "0px")};
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
  margin: 10px 0px 20px -20px;
`;

const InfoPeaceLabel = styled.span`
  font-size: 1.6rem;
  color: #b3b5c4;
`;

const EventArea = styled.span`
  font-size: 3.2rem;
  color: #fff;
  font-weight: bold;
  margin-bottom: 8px;
  margin-right: 16px;
  @media ${device.mobileS} {
    font-size: 2.4rem;
  }
`;
const TenantField = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  color: #b3b5c4;
  margin-bottom: 12px;
`;

export default InfoCard;

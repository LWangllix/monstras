import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Icon from "../other/Icon";
import { Investigation } from "../../server/models/Investigation";

export interface InvestigationCardProps {
  investigation: Investigation;
}

const InvestigationCard = ({ investigation }: InvestigationCardProps) => {
  const router = useRouter();
  return (
    <>
      {investigation ? (
        <Container
          onClick={() =>
            router.replace(`moksliniai-tyrimai/${investigation.id}`)
          }
        >
          <Location>{investigation?.location.waterBody.name}</Location>
          <InfoLine>
            <InfoInnerLine>
              <StyledIcon name="date" />
              <StyledText>
                {format(new Date(investigation?.eventDate), `yyyy-MM-dd H:mm`)}
              </StyledText>
            </InfoInnerLine>
            <InfoInnerLine>
              <StyledIcon name="user" />
              <StyledText>
                {investigation?.user?.name[0]}. {investigation?.user?.lastName}
              </StyledText>
            </InfoInnerLine>
            <InfoInnerLine>
              <StyledIcon name="Searchlocation" />
              <StyledText>
                {investigation?.location?.municipality?.name}
              </StyledText>
            </InfoInnerLine>
          </InfoLine>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  cursor: pointer;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 8px 14px #121a550a;
  border: 1px solid #b3b5c48f;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  &:active {
    box-shadow: 0px 8px 14px #121a550a;
  }
  @media ${device.mobileL} {
    padding-bottom: 16px;
  }
`;

const InfoInnerLine = styled.div`
  margin-right: 9px;
  display: flex;
`;

const StyledText = styled.div`
  font: normal normal 500 1.4rem/19px Manrope;
  color: #121a55;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${device.mobileL} {
    width: 50px;
  }
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme?.colors?.secondary};
  vertical-align: middle;
  margin-right: 7px;
  font-size: 1.9rem;
`;

const InfoLine = styled.div`
  display: flex;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const Location = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: #121a55;
`;

export default InvestigationCard;

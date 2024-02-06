import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Protocol } from "../../server/models/Protocol";
import { device } from "../../styles";
import Icon from "../other/Icon";
export interface UserItemProps {
  proctocol: Protocol;
}
const ProtocolCard = ({ proctocol }: UserItemProps) => {
  const router = useRouter();
  return (
    <>
      {proctocol ? (
        <Container onClick={() => router.replace(proctocol.protocolLink)}>
          <TenantName>
            {proctocol?.tenant?.name || "Individuali įmonė"}
          </TenantName>
          <Location>{proctocol?.location.waterBody.name}</Location>
          <InfoLine>
            <InfoInnerLine>
              <StyledIcon name="date" />
              <StyledText>
                {format(new Date(proctocol?.date), `yyyy-MM-dd H:mm`)}
              </StyledText>
            </InfoInnerLine>
            <InfoInnerLine>
              <StyledIcon name="Searchlocation" />
              <StyledText>{proctocol?.location?.municipality?.name}</StyledText>
            </InfoInnerLine>
            <InfoInnerLine>
              <StyledIcon name="user" />
              <StyledText>
                {proctocol?.fisher?.name[0]}. {proctocol?.fisher?.lastName}
              </StyledText>
            </InfoInnerLine>
            <InfoInnerLine>
              <StyledIcon name="verified" />
              <StyledText>
                {proctocol?.inspector?.name[0]}.{" "}
                {proctocol?.inspector?.lastName}
              </StyledText>
            </InfoInnerLine>
          </InfoLine>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
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
  font-weight: 500;
  font-size: 1.4rem;
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
  margin: 8px 0px;
  flex-wrap: wrap;
`;

const TenantName = styled.span`
  font-weight: 600;
  font-size: 1.4rem;
  color: #0b1f518f;
  margin-bottom: 3px;
`;

const Location = styled.div`
  font-weight: bold;
  font-size: 1.6rem;
  color: #121a55;
`;

export default ProtocolCard;

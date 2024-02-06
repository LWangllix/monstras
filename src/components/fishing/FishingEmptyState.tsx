import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import { UserContext } from "../../utils/AppContextProvider";
import Button from "../buttons/Button";

export interface FishStockingEmptyStateProps {
  title: string;
  message?: string;
  buttonText?: string;
  onClick?: () => void;
}

const FishingEmptyState = ({
  onClick,
  title = "",
  message,
  buttonText = "",
}: FishStockingEmptyStateProps) => {
  const {
    isFreelancerSuspended,
    isTenantOwnerSuspended,
    isTenantWorkerSuspended,
  } = useContext(UserContext);
  return (
    <Container>
      <ContentContainer>
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
        {onClick ? (
          <StyledButton
            variant="primary"
            onClick={onClick}
            height={56}
            disabled={
              isFreelancerSuspended ||
              isTenantOwnerSuspended ||
              isTenantWorkerSuspended
            }
          >
            {buttonText}
          </StyledButton>
        ) : null}
      </ContentContainer>
    </Container>
  );
};

const Title = styled.div`
  font: normal normal bold 32px/44px Manrope;
  letter-spacing: 0px;
  color: #121a55;
  text-align: center;
  max-width: 500px;
`;

const Message = styled.p`
  font: 1.6rem;
  letter-spacing: 0px;
  color: #121a557b;
  text-align: center;
  max-width: 500px;
  margin-top: 16px;
`;

const ContentContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 32px;
  @media ${device.mobileL} {
    padding: 0 32px;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-top: 80px;
`;

export default FishingEmptyState;

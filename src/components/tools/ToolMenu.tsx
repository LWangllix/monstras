import React from "react";
import styled from "styled-components";

interface ToolsListProps {
  connectOptions?: () => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onReturn?: () => void;
  onRegisterToolEvent?: () => void;
  disabled?: boolean;
  onCancelEvent?: (e) => void;
  className?: string;
  showConnectButton?: boolean;
  showReturnButton?: boolean;
  showDisconnectButton?: boolean;
  showRegisterToolEvent?: boolean;
  showCancelEvent?: boolean;
}

const ToolMenu = ({
  showConnectButton,
  showReturnButton,
  showDisconnectButton,
  showRegisterToolEvent,
  onConnect,
  onDisconnect,
  onReturn,
  onRegisterToolEvent,
  showCancelEvent,
  onCancelEvent,
}: ToolsListProps) => {
  return (
    <>
      {showConnectButton && onConnect ? (
        <ButtonContainer type="button" onClick={onConnect}>
          <StyledImg src="/icons/connect.svg" />
          <Text>Prijungti</Text>
        </ButtonContainer>
      ) : null}
      {showDisconnectButton && onDisconnect ? (
        <ButtonContainer type="button" onClick={onDisconnect}>
          <StyledImg src="/icons/disconnect.svg" />
          <Text>Atskirti</Text>
        </ButtonContainer>
      ) : null}
      {showReturnButton && onReturn ? (
        <ButtonContainer type="button" onClick={onReturn}>
          <StyledImg src="/icons/connect.svg" />
          <Text>Sugrąžinti</Text>
        </ButtonContainer>
      ) : null}
      {showRegisterToolEvent && onRegisterToolEvent ? (
        <ButtonContainer type="button" onClick={onRegisterToolEvent}>
          <StyledImg src="/icons/anchor.svg" />
          <Text>Pastačiau/Ištraukiau įrankį</Text>
        </ButtonContainer>
      ) : null}
      {showCancelEvent && onCancelEvent ? (
        <ButtonContainer type="button" onClick={onCancelEvent}>
          <StyledImg src="/icons/disconnect.svg" />
          <Text>Atšaukti</Text>
        </ButtonContainer>
      ) : null}
    </>
  );
};

const Text = styled.span`
  font-size: 1.4rem;
  margin: auto 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledImg = styled.img`
  height: 16px;
  width: 16px;
  margin: auto 8px auto 0;
`;

const ButtonContainer = styled.button`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  &:hover {
    background-color: #f3f3f7;
  }
`;

export default ToolMenu;

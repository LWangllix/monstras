import { useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Button from "../buttons/Button";
import Modal from "./Modal";

interface AlertInteface {
  show: boolean;
  title?: string;
  message?: string;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  onClose?: () => void;
}

const Dialog = ({
  title,
  message,
  submitText,
  cancelText,
  onCancel,
  onSubmit,
  onClose,
  show,
}: AlertInteface) => {
  const isMobile = useMediaQuery(device.mobileM);
  return (
    <Modal isOpen={show} onBackdropPress={onClose}>
      <Container>
        <Content>
          {title && <Title>{title}</Title>}
          {message && <Message>{message}</Message>}
          <Row>
            {onSubmit && (
              <Button
                variant="primary"
                padding={isMobile ? "0 0 16px 0" : "0 8px 0 0"}
                innerPadding="0 16px"
                onClick={onSubmit}
                type="button"
              >
                {submitText || "Patvirtinti"}
              </Button>
            )}
            {onCancel && (
              <Button
                variant="tertiary"
                onClick={onCancel}
                padding={isMobile ? "0" : "0 0 0 8px"}
                type="button"
              >
                {cancelText || "Atšaukti"}
              </Button>
            )}
          </Row>
        </Content>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  margin: auto;
  @media ${device.mobileL} {
    width: 100%;
    padding: 0 16px;
  }
`;

const Content = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  width: 414px;
  padding: 48px 32px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.mobileL} {
    width: 100%;
    padding: 32px 16px;
  }
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.4rem;
  font-weight: bold;
  margin-top: auto;
  text-align: center;
  margin-bottom: 8px;
`;

const Message = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  margin-bottom: auto;
  text-align: center;
  opacity: 0.6;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  @media ${device.mobileM} {
    flex-direction: column;
    width: 90%;
  }
`;

export default Dialog;

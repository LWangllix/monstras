import React, { useEffect } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import { setHideResizeIconContext } from "../../utils/AppContextProvider";
interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onBackdropPress?: () => void;
}

const Modal = (props: ModalProps) => {
  const { isOpen, children, onBackdropPress } = props;

  const { setHideResizeIcon } = React.useContext(setHideResizeIconContext);
  useEffect(() => {
    setHideResizeIcon(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return <React.Fragment />;
  }

  return (
    <ModalContainer
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        onBackdropPress && onBackdropPress();
      }}
    >
      {children}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;

  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  margin: auto;
  @media ${device.mobileL} {
    padding: 0px;
  }
`;

export default Modal;

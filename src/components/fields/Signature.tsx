import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import styled from "styled-components";
import { useMediaQuery } from "@material-ui/core";
import Button from "../../components/buttons/Button";
import { device } from "../../styles";
import Icon from "../other/Icon";
import { useResizeDetector } from "react-resize-detector";
import SignatureField from "./SignatureField";

export interface SignatureProps {
  onSubmit: (isSignatureEmpty: boolean, signature: string) => void;
  onClose: () => void;
  onSetOpen: () => void;
  visible: boolean;
  signature: string;
}

const Signature = ({
  onSubmit,
  onClose,
  signature,
  onSetOpen,
  visible,
}: SignatureProps) => {
  const isMObile = useMediaQuery(device.mobileL);
  const signatureRef = useRef(null);
  const { width, height, ref } = useResizeDetector();

  const onClear = () => {
    signatureRef.current.clear();
  };

  const canvasStyle = {
    width: isMObile ? width : 605,
    height: isMObile ? height * 0.85 : 356,
    border: "1px solid #121A553D",
    backgroundColor: "#F3F3F7",
    borderRadius: 4,
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <RelativeContainer>
      <SignatureValue src={signature} />
      <SignatureField onSetOpen={onSetOpen} />
      <Modal visible={visible}>
        <Container tabIndex={0} visible={visible} ref={ref}>
          {!isMObile && (
            <Row>
              <StyledCloseButton fun={onClose} name={"close"} />
            </Row>
          )}
          <SignatureCanvas
            penColor="#212121"
            backgroundColor="#F3F3F7"
            throttle={50}
            ref={signatureRef}
            canvasProps={{
              width: isMObile ? width : 605,
              height: isMObile ? height * 0.85 : 356,
              style: canvasStyle,
            }}
          />
          <BottomRow>
            {!isMObile && (
              <StyledButtonLarge
                variant="tertiary"
                onClick={onClear}
                height={44}
              >
                Išvalyti
              </StyledButtonLarge>
            )}
            <SubRow>
              <StyledButton
                type="button"
                signature={true}
                variant="tertiary"
                onClick={onClose}
                height={44}
              >
                Atšaukti
              </StyledButton>
              <StyledButton
                type="button"
                signature={true}
                variant="primary"
                onClick={() =>
                  onSubmit(
                    signatureRef.current.isEmpty(),
                    signatureRef.current
                      .getTrimmedCanvas()
                      .toDataURL("image/png")
                  )
                }
                height={44}
              >
                Atlikta
              </StyledButton>
            </SubRow>
          </BottomRow>
        </Container>
      </Modal>
    </RelativeContainer>
  );
};

const Container = styled.div<{ visible: boolean }>`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
  width: 767px;
  margin: auto;
  @media ${device.mobileL} {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 0;
    margin: 0;
    padding: 45px 32px;
    box-shadow: none;
  }
`;

const StyledCloseButton = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 3.2rem;
  margin: auto 30px auto auto;
  @media ${device.mobileL} {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  padding: 30px 0;
  @media ${device.mobileL} {
    padding: 0;
  }
`;

const Modal = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  position: fixed;
  z-index: 8;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #121a5552;
  height: 100%;
  overflow-y: auto;
  @media ${device.mobileL} {
    background-color: #ffffff;
  }
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 45px 81px;

  @media ${device.mobileL} {
    width: 100%;
    padding: 45px 0 0 0;
  }
`;

const SubRow = styled.div`
  display: flex;
  @media ${device.mobileL} {
    width: 100%;
  }
  @media ${device.mobileS} {
    width: 100%;
    flex-direction: column;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  flex: 3;
`;

const SignatureValue = styled.img<{ src: string }>`
  position: absolute;
  display: ${({ src }) => (src ? "block" : "none")};
  width: 80px;
  height: 80px;
  left: 200px;
  bottom: 20px;
`;

const StyledButtonLarge = styled(Button)`
  display: flex;
  min-width: 150px;
  flex: 1;
  padding: 4px;
`;

const StyledButton = styled(Button)`
  display: flex;
  min-width: 120px;
  flex: 1;
  button {
    padding: 0;
  }
  padding: 4px;
`;

export default Signature;

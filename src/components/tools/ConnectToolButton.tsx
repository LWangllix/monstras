import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../buttons/Button";

interface ConnectToolButtonProps {
  children?: JSX.Element | string;
  disabled?: boolean;
}

export const ConnectToolButton = ({
  children,
  disabled,
}: ConnectToolButtonProps) => {
  const dropDownRef = useRef(null);

  const [showSelect, setShowSelect] = useState(false);

  const handleClickOutside = (event) => {
    if (dropDownRef?.current && !dropDownRef.current.contains(event.target)) {
      setShowSelect(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Container ref={dropDownRef}>
      <Styledbutton
        variant="tertiary"
        left={<StyledImg src="/icons/connect.svg" />}
        height={32}
        innerPadding="0 16px 0 10px"
        onClick={() => {
          setShowSelect(!showSelect);
        }}
        disabled={disabled}
      >
        Prijungti
      </Styledbutton>
      <AbsoluteContainer>
        {showSelect && <Content>{children}</Content>}
      </AbsoluteContainer>
    </Container>
  );
};

const Content = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 16px #121a5529;
  border-radius: 10px;
  overflow: auto;
  max-height: 330px;
  width: 450px;
`;

const AbsoluteContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 50px;
  right: 115px;
`;

const StyledImg = styled.img`
  height: 13.5px;
  width: 13.5px;
  margin-right: 6px;
  position: relative;
`;

const Styledbutton = styled(Button)`
  min-width: 100px;
`;

const Container = styled.div``;

export default ConnectToolButton;

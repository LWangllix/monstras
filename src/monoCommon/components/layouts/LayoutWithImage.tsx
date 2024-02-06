import React from "react";
import styled from "styled-components";
import { device } from "../../../styles";

const LayoutWithImage = (props: { children: React.ReactNode }) => {
  return (
    <Container>
      <Image>
        <BiipLogo href="/" />
      </Image>
      <Box>{props.children}</Box>
    </Container>
  );
};

export const H1 = styled.h1`
  text-align: center;
  font: normal normal bold 32px/44px Manrope;
  letter-spacing: 0px;
  color: #121a55;
  opacity: 1;
  padding-bottom: 24px;
  @media only screen and (max-width: 1000px) {
    padding-bottom: 0px;
    margin-top: 0px;
  }
`;

export const Container = styled.div`
  background-color: white;
  display: flex;
  width: 100;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  overflow: hidden;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    height: 100%;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 812px;
  overflow-y: auto;
  padding: 16px;
  @media only screen and (max-width: 1000px) {
    max-width: 400px;
    padding-top: 0px;
  }
`;
const Image = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${"/fonai/fonas.png"});
  @media ${device.mobileL} {
    display: none;
  }
`;

const BiipLogo = styled.a`
  display: block;
  width: 69px;
  height: 41px;
  position: absolute;
  right: 20px;
  top: 20px;
  background-image: url(${"/icons/biip-logo.svg"}); ;
`;

export const FieldContainer = styled.div`
  text-align: left;
  padding-top: 10px;
  width: 100%;
  max-width: 400px;
`;

export const Label = styled.label`
  text-align: left;
  font: normal normal 600 16px/40px Manrope;
  letter-spacing: 0px;
  color: #0b1f51;
  opacity: 1;
`;

export const Field = (props: { label: string; children: React.ReactNode }) => {
  return (
    <FieldContainer>
      <Label>{props.label}</Label>
      {props.children}
    </FieldContainer>
  );
};

export const SmallText = styled(Label)`
  text-align: left;
  width: 100%;
  display: block;
  padding-bottom: 42px;
  padding-top: 10px;
  max-width: 400px;
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  width: 330px;
  cursor: pointer;
  padding: 0 42px;
  height: 48px;
  background: #121a55 0% 0% no-repeat padding-box;
  border-radius: 28px;
  opacity: 1;
  font: normal normal 600 16px/22px Manrope;
  letter-spacing: 0px;
  color: #ffffff;
  margin: 10px;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  width: 100%;
  color: red;
`;

export const SuccessContainer = styled.div`
  text-align: center;
  width: 100%;
  color: green;
`;

export const ActionsContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  display: block;
  background: #f3f3f7 0% 0% no-repeat padding-box;
  border: 1px solid #121a553d;
  border-radius: 4px;
  opacity: 1;
  padding: 10px;
  width: 100%;
  height: 48px;
`;

export default LayoutWithImage;

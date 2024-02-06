import styled from "styled-components";
import React from "react";
import LayoutWithImage from "../../monoCommon/components/layouts/LayoutWithImage";
import { device } from "../../styles";

const Pending = () => {
  return (
    <LayoutWithImage>
      <Container>
        <Logo src="/logo.svg" />
        <H1>Prašymas išsiųstas</H1>
        <Description>
          Norint naudotis Įžuvinimo moduliu reikalingas leidimas, kurį gali
          suteikti tik Aplinkos apsaugos departamento atsakingas darbuotojas.
          Mes pranešėme Aplinkos apsaugos departamento atsakingiems darbuotojams
          apie jūsų užklausą. Kai tik bus patvirtinta užklausą, į jūsų el. paštą
          atsiųsime nuorodą su kuria galėsite pabaigti prisijungti.
        </Description>
      </Container>
    </LayoutWithImage>
  );
};
const Logo = styled.img`
  cursor: pointer;
  width: 91px;
  height: 54px;
  margin-bottom: 64px;
`;
const Container = styled.div`
  margin-bottom: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.mobileL} {
    margin-bottom: 0px;
  }
`;

const Description = styled.div`
  text-align: center;
  font: normal normal medium 1.6rem/26px Manrope;
  letter-spacing: 0px;
  color: #7a7e9f;
  width: 70%;
`;

const H1 = styled.h1`
  text-align: center;
  font: normal normal bold 32px/44px Manrope;
  letter-spacing: 0px;
  color: #121a55;
  opacity: 1;
  margin: 0px 0px 16px 0px;

  @media ${device.mobileL} {
    padding-bottom: 0px;
  }
`;

export default Pending;

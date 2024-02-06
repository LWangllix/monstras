import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "../components/buttons/Button";
import { device } from "../styles";

export const Page403 = () => {
  return (
    <ErrorPage
      title="Puslapis nepasiekiamas"
      description="Jūs neturite reikiamų teisių šiam puslapiui"
      backLink="/login"
      backText="Prisijungti"
    />
  );
};
export const ErrorPage = (props: {
  title?: string;
  description?: string;
  backLink?: string;
  backText?: string;
}) => {
  const { title, description, backText, backLink } = props;
  return (
    <Container>
      <ContentContainer>
        <Link href="/">
          <Logo src="/logo.svg" />
        </Link>
        <Card>
          <Title>{title || "Puslapis nerastas"}</Title>
          <Description>
            {description ||
              "Atsiprašome, puslapis, kurį bandote atidaryti, neegzistuoja."}
          </Description>
          <Link href={backLink || "/"}>
            <Button height={44} variant="primary">
              {backText || "Grįžti į pradinį puslapį"}
            </Button>
          </Link>
        </Card>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f6f9fc;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0px 19px;
  flex-direction: column;
  justify-content: center;
  background-image: url(backgroundImageRightTop.png),
    url(backgroundImageLeftTop.png);
  background-position: right top, left top;
  background-repeat: no-repeat, no-repeat;
  @media ${device.mobileL} {
    background-image: url(backgroundImageRightTop.png),
      url(backgroundImageLeftTop.png), url(fishHook.png);
    background-position: right top, left top, 50% 30%;
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-size: 100%, 100%, 70%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font: normal normal bold 3.2rem/44px Manrope;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
  text-align: center;
`;
const Description = styled.div`
  font: normal normal medium 1.6rem/26px Manrope;
  color: ${({ theme }) => theme.colors.tertiary};
  margin-bottom: 64px;
  text-align: center;
`;

const Logo = styled.img`
  cursor: pointer;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background-color: white;
  box-shadow: 0px 11px 10px #0000000d;
  border-radius: 16px;
  padding: 73px 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.mobileL} {
    padding: 73px 38px;
    background-color: transparent;
    box-shadow: none;
  }
`;

export default ErrorPage;

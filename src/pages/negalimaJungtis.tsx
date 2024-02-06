import { useMediaQuery } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "../components/buttons/Button";
import LayoutWithImage from "../monoCommon/components/layouts/LayoutWithImage";
import { device, theme } from "../styles";

const NegalimaJungtis = () => {
  const isMobile = useMediaQuery(device.mobileL);
  return (
    <LayoutWithImage>
      <Logo src="/logo.svg" />
      <H1>Anketa neaktyvi</H1>
      <Description>
        Jeigu esate Įmonės vadovas, susisiekite su aplinkos apsaugos
        departamentu (info@aad.amtest.lt)
      </Description>
      <Or>Arba</Or>
      <Description>
        Jeigu jungiatės kaip įmonės darbuotojas, susisiekite su savo įmonės
        vadovu
      </Description>
      <div>
        <Link href={"/logout"}>
          <Button
            variant="primary"
            type="submit"
            padding={isMobile ? "10px 0px 0px 0px" : "80px 16px 0 0"}
          >
            Atgal
          </Button>
        </Link>
      </div>
    </LayoutWithImage>
  );
};
export default NegalimaJungtis;

const Logo = styled.img`
  cursor: pointer;
  width: 91px;
  height: 54px;
  margin-bottom: 64px;
`;

const Description = styled.div`
  text-align: center;
  font: normal normal medium 1.6rem/26px Manrope;
  letter-spacing: 0px;
  color: #7a7e9f;
  width: 70%;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const Or = styled.div`
  text-align: center;
  font: normal normal medium 1.6rem/26px Manrope;
  letter-spacing: 0px;
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.primary};
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

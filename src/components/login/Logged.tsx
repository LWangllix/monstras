import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import LayoutWithImage from "../../monoCommon/components/layouts/LayoutWithImage";


const Label = styled.label`
  text-align: left;
  font: normal normal 600 16px/40px Manrope;
  letter-spacing: 0px;
  color: #0b1f51;
  opacity: 1;
`;

export const Button = styled.button`
  width: 294px;
  height: 56px;
  background: #121a55 0% 0% no-repeat padding-box;
  border-radius: 28px;
  opacity: 1;
  font: normal normal 600 16px/22px Manrope;
  letter-spacing: 0px;
  color: #ffffff;
  margin: 10px;
`;

const Or = styled.div`
  font: normal normal 600 16px/40px Manrope;
  letter-spacing: 1.02px;
  color: #0b1f518f;
  opacity: 1;
  padding-top: 30px;
  padding-bottom: 30px;
  @media only screen and (max-height: 1000px) {
    display: none;
  }
`;


export const Logged = () => {

  const router = useRouter();
  return (
    <LayoutWithImage>
      <a href="/logout"><Label>Spauskite norėdami</Label></a>
      <Button>Atsijungti</Button>
      <Or>Arba</Or>
      <Button onClick={() => router.push("/")}>Tęsti</Button>

    </LayoutWithImage>
  );
};

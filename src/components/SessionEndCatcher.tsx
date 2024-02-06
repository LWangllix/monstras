import { millisecondsToMinutes, millisecondsToSeconds } from "date-fns";
import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import { serverSessionExpires } from "../monoCommon/utils/call";
import ErrorPage from "../pages/404";
import api from "../server/routers/api";
import { UserContext } from "../utils/AppContextProvider";

const showExpiresBefore = 5 * 60 * 1000;
const showLoginScreen = 5 * 60 * 1000;
const SessionEndCatcher = ({ children }) => {
  const [expiresAfter, setExpiresAfter] = React.useState<number>();
  const { user } = React.useContext(UserContext);
  const refresh = () => {
    const serverSessionExpiresValue = serverSessionExpires;
    if (serverSessionExpiresValue) {
      setExpiresAfter(
        serverSessionExpiresValue - new Date().getTime() - showLoginScreen
      );
    }
  };
  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      api.public.ping({});
    }, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const userExpiresAfter = (expiresAfter || 0) - showLoginScreen;

  if (expiresAfter && userExpiresAfter < 0 && user.user) {
    return (
      <ErrorPage
        title="Jūsų sesija baigėsi"
        description="Prašome prisijungti dar kartą"
        backLink="/logout"
        backText="Prisijungti"
      />
    );
  }

  const minutes = millisecondsToMinutes(userExpiresAfter as number);
  const seconds = millisecondsToSeconds(
    (userExpiresAfter as number) - minutes * 60 * 1000
  );
  const printSec = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <>
      {user.user && expiresAfter && userExpiresAfter < showExpiresBefore && (
        <StyledDiv>
          <div>
            Jūsų sesija baigsis už {minutes} min. {printSec} s.{" "}
            <LinkBut>
              <Link href={"/logout"}>Prisijungti iš naujo</Link>
            </LinkBut>
          </div>
        </StyledDiv>
      )}
      {children}
    </>
  );
};

export default SessionEndCatcher;
const LinkBut = styled.span`
  width: 172px;
  height: 32px;
  background: #13c9e7 0% 0% no-repeat padding-box;
  border-radius: 40px;
  opacity: 1;
  padding: 5px 14px;
  margin: 0px 20px;
  font: normal normal 600 16px/22px Manrope;
`;
const StyledDiv = styled.div`
  z-index: 100;
  text-align: center;
  width: 100%;
  height: 48px;
  top: 0;
  background: #121a55 0% 0% no-repeat padding-box;
  color: #ffffff;
  display: flex;
  justify-content: center;
  font: normal normal medium 16px/22px Manrope;
  align-items: center;
`;

import Head from "next/head";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import "../../public/leaflet1.7.1/style.css";
import ErrorCatcher from "../components/ErrorCatcher";
import Loader from "../components/other/Loader";
import SessionEndCatcher from "../components/SessionEndCatcher";
import Alerts from "../monoCommon/components/Alerts";
import { GlobalStyle, theme } from "../styles";
import AppContextProvider from "../utils/AppContextProvider";

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Head>
        <title>Saugomų rūšių informacinė sistema</title>
        <link rel="icon" type="image/x-icon" href="/images/fav.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <ErrorCatcher>
          <GlobalStyle />
          <Alerts>
            <AppContextProvider onLoadingChange={setLoading}>
              <SessionEndCatcher>
                {!loading ? (
                  <Component {...pageProps} />
                ) : (
                  <EmptyStateContainer>
                    <LoaderWrapper>
                      <Loader />
                    </LoaderWrapper>
                  </EmptyStateContainer>
                )}
              </SessionEndCatcher>
            </AppContextProvider>
          </Alerts>
        </ErrorCatcher>
      </ThemeProvider>
    </>
  );
};

const LoaderWrapper = styled.div`
  margin: auto;
`;

const EmptyStateContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex: 1;
`;

export default App;

import { useMediaQuery } from "@material-ui/core";
import { LatLngLiteral } from "leaflet";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { usePermissionChecker } from "../utils/routers";
import BackButton from "./../components/buttons/BackButton";
import CaughtFishesOnShore from "../components/fishing/CaughtFishesOnShore";
import FisherHeader from "../components/fishing/FisherHeader";
import DefaultLayout from "../monoCommon/components/layouts/DefaultLayout";
import RegistrationMap from "./../components/map/RegistrationMap";
import { device } from "./../styles";

export interface handleCurrentLocationProps {
  coordinates?: LatLngLiteral;
  error: boolean;
}

const CaughtFishesOnBoatPage = () => {
  const allowed = usePermissionChecker();
  if (!allowed) {
    return null;
  }
  const router = useRouter();
  const isMobile = useMediaQuery(device.mobileL);
  const [mapFocused, setMapFocused] = useState(false);
  const [location, setLocation] = useState(null);

  return (
    <>
      <DefaultLayout
        mapFocused={mapFocused}
        onMapModalClose={setMapFocused}
        renderMap={<RegistrationMap location={location} />}
        navBar={<>{isMobile || <FisherHeader />}</>}
      >
        <Container>
          {isMobile || (
            <BackButton onClick={() => router.replace("/zurnalas")} />
          )}
          <CaughtFishesOnShore onSetLocation={setLocation} />
        </Container>
      </DefaultLayout>
    </>
  );
};

const Container = styled.div`
  margin: 0 32px;
  height: calc(100% - 118px);
  display: flex;
  flex-direction: column;
  @media ${device.mobileL} {
    margin: 0;
  }
`;

export default CaughtFishesOnBoatPage;

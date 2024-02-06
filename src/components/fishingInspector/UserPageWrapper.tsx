import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import api from "../../server/routers/api";
import { device } from "../../styles";
import BackButton from "../buttons/BackButton";
import EditUser from "../fishing/EditUser";
import DefaultLayout from "../../monoCommon/components/layouts/DefaultLayout";
import RegistrationMap from "../map/RegistrationMap";
import InfoCard from "../other/InfoCard";
import InspectorHeader from "./InspectorHeader";
import { useAlert } from "../../monoCommon/components/Alerts";

const generateInfo = (user) => {
  const firstColumn = [];
  const secondColumn = [];

  firstColumn.push({
    type: "phone",
    value: user?.phone,
  });
  secondColumn.push({
    type: "email",
    value: user?.email,
  });

  return [firstColumn, secondColumn];
};

const UserPageWrapper = ({
  user,
  setUser,
  tenantUser,
  setTenantUser,
  children,
}) => {
  const alert = useAlert();

  const router = useRouter();
  const tab = router.pathname;
  const id = router.query.darbuotojas;
  const tenantid = router.query.imone;

  const [mapFocused, setMapFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isMobile = useMediaQuery(device.mobileL);

  const title =
    tenantid === "individualus"
      ? `${user?.name || ""} ${user?.lastName || ""}`
      : `${tenantUser?.user?.name || ""} ${tenantUser?.user?.lastName || ""}`;

  const info = tenantid === "individualus" ? user : tenantUser;

  const url =
    tenantid !== "individualus"
      ? `/vidinis/zuvu-istekliu-naudotojai/${tenantid}/naudotojai`
      : `/vidinis/zuvu-istekliu-naudotojai`;

  const updateUser = (values) => {
    if (tenantid !== "individualus") {
      api.inspector
        .updateTenantUser({
          userId: id.toString(),
          name: values.name,
          lastName: values.last_name,
          phone: values.phone,
          email: values.email,
          isSuspended: values.is_suspended,
          isInvestigator: values.is_investigator,
          isAdministrator: values.is_administrator,
          personalCode: values.personal_code,
          tenantId: tenantid.toString(),
        })
        .then((response) => {
          const tenantUser = response["tenantUser"];
          if (!!tenantUser) {
            alert.show("Naudotojo duomenys atnaujinti");
            setTenantUser(tenantUser);
          } else {
            alert.error("Nepavyko atnaujinti naudotojo duomenų");
          }
        });
    } else {
      api.inspector
        .updateUser({
          userId: id.toString(),
          name: values.name,
          lastName: values.last_name,
          phone: values.phone,
          email: values.email,
          isSuspended: values.is_suspended,
          isInvestigator: values.is_investigator,
          personalCode: values.personal_code,
        })
        .then((response) => {
          const user = response["user"];
          if (!!user) {
            alert.show("Naudotojo duomenys atnaujinti");
            setUser(user);
          } else {
            alert.error("Nepavyko atnaujinti naudotojo duomenų");
          }
        });
    }
  };

  return (
    <>
      <DefaultLayout
        onMapModalClose={setMapFocused}
        mapFocused={mapFocused}
        renderMap={<RegistrationMap />}
        navBar={<>{isMobile || <InspectorHeader />}</>}
      >
        <Container>
          {isMobile || <BackButton onClick={() => router.push(url)} />}
          {(user || tenantUser) && (
            <TenantContainer isMobile={isMobile}>
              <InfoCard
                url={url}
                title={title}
                info={generateInfo(info)}
                onEdit={() => setShowModal(true)}
                showModal={showModal}
                dialogContent={
                  <EditUser
                    tenantUser={tenantUser}
                    user={user}
                    onSetClose={setShowModal}
                    updateUser={updateUser}
                  />
                }
              />
              <TenantUsers>
                <FirstRow>
                  <Tab
                    current={
                      tab ===
                      `/vidinis/zuvu-istekliu-naudotojai/[imone]/[darbuotojas]/zurnalas`
                    }
                    onClick={() =>
                      router.replace(
                        `/vidinis/zuvu-istekliu-naudotojai/${tenantid}/${id}/zurnalas`
                      )
                    }
                  >
                    Žvejybos žurnalas
                  </Tab>
                  <Tab
                    current={
                      tab ===
                      `/vidinis/zuvu-istekliu-naudotojai/[imone]/[darbuotojas]/irankiai`
                    }
                    onClick={() =>
                      router.replace(
                        `/vidinis/zuvu-istekliu-naudotojai/${tenantid}/${id}/irankiai`
                      )
                    }
                  >
                    Įrankių sąrašas
                  </Tab>
                </FirstRow>
                {children}
              </TenantUsers>
            </TenantContainer>
          )}
        </Container>
      </DefaultLayout>
    </>
  );
};

const Container = styled.div`
  padding: 0 32px 0 32px;
  @media ${device.mobileL} {
    padding: 0px;
  }
`;

const TenantContainer = styled.div<{ isMobile: boolean }>`
  margin: ${({ isMobile }) => (isMobile ? "0px" : "30px 0px 0px 0px")};
  background: #ffffff 0% 0% no-repeat padding-box;
`;

const Tab = styled.div<{ current: boolean }>`
  font: normal normal 600 16px/40px Manrope;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 32px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ current }) =>
    current &&
    css`
      &::after {
        content: " ";
        position: absolute;
        background-color: ${({ theme }) => theme.colors.secondary};
        bottom: 0;
        right: 0;
        width: 100%;
        height: 5px;
      }
    `}
`;
const FirstRow = styled.div`
  margin: 42px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
`;

const TenantUsers = styled.div`
  @media ${device.mobileL} {
    margin: 0 16px;
  }
`;

export default UserPageWrapper;

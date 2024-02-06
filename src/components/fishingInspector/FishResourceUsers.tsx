import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Tenant } from "../../server/models/Tenant";
import TenantUser from "../../server/models/TenantUser";
import api from "../../server/routers/api";
import { device } from "../../styles";
import { currentPage } from "../../utils/constants";
import { usePermissionChecker } from "../../utils/routers";
import EditTenant from "../fishing/EditTenant";
import FishingEventItem from "../fishing/FishingEventItem";
import InfoCard from "../other/InfoCard";
import ToolsList from "../tools/ToolsList";
import UserListItem from "./UserListItem";
import { Permissions } from "../../config";
import { Event } from "../../server/models/Event";
import { useAlert } from "../../monoCommon/components/Alerts";

export interface FishResourceUsersProps {
  tenant: Tenant;
  tenantWithUsers: Tenant;
  events?: Array<Event>;
  refreshInfo: () => void;
  owner: TenantUser;
}

const FishResourceUsers = ({
  tenant,
  events,
  refreshInfo,
  owner,
}: FishResourceUsersProps) => {
  const allowed = usePermissionChecker();
  if (!allowed) {
    return null;
  }

  const alert = useAlert();

  const router = useRouter();
  const isMobile = useMediaQuery(device.mobileL);

  const [showModal, setShowModal] = useState(false);

  const id = router.query.imone;
  const tab = router.pathname;
  const isJournalPage =
    tab === `/vidinis/zuvu-istekliu-naudotojai/[imone]/zurnalas`;
  const isToolsPage =
    tab === `/vidinis/zuvu-istekliu-naudotojai/[imone]/irankiai`;
  const isUsersPage =
    tab === `/vidinis/zuvu-istekliu-naudotojai/[imone]/naudotojai`;
  const generateInfo = (tenant) => {
    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];

    firstColumn.push({
      type: "location",
      value: tenant?.address || "nežinoma vieta",
    });
    firstColumn.push({
      type: "info",
      value: tenant?.code,
    });
    secondColumn.push({
      type: "phone",
      value: tenant?.phone,
    });
    secondColumn.push({
      type: "email",
      value: tenant?.email,
    });
    thirdColumn.push({
      type: "user",
      value: `${owner?.user?.name} ${owner?.user?.lastName}`,
    });

    return [firstColumn, secondColumn, thirdColumn];
  };

  const updateTenant = (values) => {
    api.inspector
      .updateTenant({
        name: values.name,
        code: values.code,
        address: values.address,
        ownerId: values.owner.id,
        isInvestigator: values.is_investigator,
        isSuspended: values.is_suspended,
        tenantId: id.toString(),
      })
      .then((response) => {
        const updated = response["updated"];
        if (updated) {
          alert.show("Įmonės duomenys atnaujinti");
          setShowModal(false);
          refreshInfo();
        } else {
          alert.error("Nepavyko atnaujinti įmonės duomenų");
        }
      });
  };

  return (
    <TenantContainer isMobile={isMobile}>
      <InfoCard
        url={"/vidinis/zuvu-istekliu-naudotojai"}
        title={tenant?.name}
        info={generateInfo(tenant)}
        onEdit={() => setShowModal(true)}
        showModal={showModal}
        currentPage={currentPage.tenant}
        dialogContent={
          <EditTenant
            updateTenant={updateTenant}
            tenant={tenant}
            onSetClose={setShowModal}
          />
        }
      />
      <TenantUsers>
        <FirstRow>
          <Tab
            current={isJournalPage}
            onClick={() =>
              router.replace(`/vidinis/zuvu-istekliu-naudotojai/${id}/zurnalas`)
            }
          >
            Žvejybos žurnalas
          </Tab>
          <Tab
            current={isToolsPage}
            onClick={() =>
              router.replace(`/vidinis/zuvu-istekliu-naudotojai/${id}/irankiai`)
            }
          >
            Įrankių sąrašas
          </Tab>
          <Tab
            current={isUsersPage}
            onClick={() =>
              router.replace(
                `/vidinis/zuvu-istekliu-naudotojai/${id}/naudotojai`
              )
            }
          >
            Narių sąrašas
          </Tab>
        </FirstRow>
        {isJournalPage ? (
          (events || []).map((event) => (
            <FishingEventItem key={`event_${event.id}`} event={event} />
          ))
        ) : isUsersPage ? (
          (tenant?.tenantUsers || []).map((tenantUser, index) => (
            <UserListItem
              key={`tenant_user_item_${index}`}
              user={tenantUser.user}
              isOwner={
                Permissions.TenantOwner.statuses.ENABLED ===
                tenantUser.permission.tenantOwner
              }
              onClick={(naudotojoId) =>
                router.push(
                  `/vidinis/zuvu-istekliu-naudotojai/${tenant.id}/${naudotojoId}/zurnalas`
                )
              }
            />
          ))
        ) : isToolsPage && tenant?.tools?.length > 0 ? (
          <ToolsList tools={tenant?.tools} />
        ) : null}
      </TenantUsers>
    </TenantContainer>
  );
};

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
  @media ${device.mobileM} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TenantUsers = styled.div`
  @media ${device.mobileL} {
    margin: 0 16px;
  }
`;

export default FishResourceUsers;

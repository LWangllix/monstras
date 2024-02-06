import { useRouter } from "next/router";
import React, { useState } from "react";

import styled from "styled-components";
import Button from "../../components/buttons/Button";
import FisherHeader from "../../components/fishing/FisherHeader";
import Avatar from "../../components/other/Avatar";
import api from "../../server/routers/api";
import { UserContext } from "../../utils/AppContextProvider";
import { usePermissionChecker } from "../../utils/routers";
import useServerRouter from "../../monoCommon/utils/useServerRouter";

const NariaiPage = () => {
  const allowed = usePermissionChecker();
  if (!allowed) {
    return null;
  }
  const router = useRouter();
  const { tenant, isTenantOwner, isUserAdmin, user } =
    React.useContext(UserContext);
  if (!tenant) {
    return (
      <Page>
        <FisherHeader />
        <PageContainer>
          <H1>Prisjunkite prie įmonės profilio norėdami matyti darbuotojus</H1>
        </PageContainer>
      </Page>
    );
  }
  const { data, reload } = useServerRouter(
    api.tenants.NewUserList,
    { pagination: { page: 0, perPage: Number.MAX_VALUE } },
    [tenant?.id]
  );

  return (
    <Page>
      <FisherHeader />
      <PageContainer>
        <TopLine style={{ display: "flex" }}>
          <H1>{tenant.name} nariai</H1>
          <div style={{ width: 160 }}>
            {" "}
            {(isTenantOwner || isUserAdmin) && (
              <Button
                route="/nariai/naujas"
                padding="0px 0px 0px 0px"
                variant="secondary"
              >
                Pridėti
              </Button>
            )}
          </div>
        </TopLine>
        {(data?.data || [])
          .sort((a, b) =>
            (a.name + " " + a.lastName).localeCompare(b.name + " " + b.lastName)
          )
          .map((n) => {
            return (
              <Card
                key={n.id}
                onClick={() => {
                  if (n.invited) {
                    router.push("/nariai/" + n.id);
                  }
                }}
              >
                <Avatar name={n.name} surname={n.lastName} />
                <NameContainer>
                  <Title>
                    {n.name} {n.lastName}
                  </Title>
                  <SubTitle>
                    {n.phone} {n.email}
                  </SubTitle>
                  {n.invited && (
                    <SubTitle>
                      <i>Laukiama prisijungimo</i>
                    </SubTitle>
                  )}
                </NameContainer>

                {n?.user?.id != user.user.id &&
                  (isTenantOwner || isUserAdmin) && (
                    <Menu
                      id={n.id}
                      onRemoveUser={() =>
                        api.tenants
                          .NewUserRemove({ id: n.id, invited: n.invited })
                          .then(reload)
                      }
                    />
                  )}
              </Card>
            );
          })}
      </PageContainer>
    </Page>
  );
};

const Menu = (props: { id: string; onRemoveUser: () => void }) => {
  const [open, setOpen] = useState(false);
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <MenuContainer onClick={() => setOpen(!open)} onBlur={handleBlur}>
      <Dots>...</Dots>
      {open && (
        <InnerContainer>
          <div onClick={props.onRemoveUser}>Pašalinti</div>
        </InnerContainer>
      )}
    </MenuContainer>
  );
};

const TopLine = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Page = styled.div`
  padding: 0 32px;
  height: 100vh;
  overflow: auto;
  background-color: white;
`;

const PageContainer = styled.div`
  padding-top: 15px;
  max-width: 564px;
  margin: 0 auto;
`;
const H1 = styled.h1`
  flex-grow: 1;
  font: normal normal bold 24px/40px Manrope;
  letter-spacing: 0px;
  color: #121a55;
`;
const InnerContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 4;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 16px #121a5529;
  border-radius: 4px;
  padding: 16px;
`;
const MenuContainer = styled.div`
  position: relative;
`;
const Dots = styled.div`
  color: #121a558a;
  padding: 20px;
  cursor: pointer; ;
`;
const Title = styled.h3`
  text-align: left;
  font: normal normal bold 16px/22px Manrope;
  letter-spacing: 0px;
  color: #121a55;
  padding: 0;
  margin: 0;
`;
const SubTitle = styled.h4`
  text-align: left;
  font: normal normal medium 14px/19px Manrope;
  letter-spacing: 0px;
  color: #121a558f;
  padding: 0;
  margin: 0;
`;
const NameContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
`;
const Card = styled.div`
  padding-left: 10px;
  display: flex;
  top: 362px;
  left: 872px;
  min-width: 564px;
  height: 72px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 8px 16px #121a5514;
  border: 1px solid #b3b5c48f;
  border-radius: 8px;
  opacity: 1;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

export default NariaiPage;

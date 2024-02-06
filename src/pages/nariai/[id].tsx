import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import NariaiPage from ".";
import Button from "../../components/buttons/Button";
import TextField from "../../components/fields/TextField";
import Icon from "../../components/other/Icon";
import Modal from "../../components/other/Modal";
import { RouterFormik } from "../../monoCommon/components/RouterFormik";
import api from "../../server/routers/api";
import { UserContext } from "../../utils/AppContextProvider";
import { usePermissionChecker } from "../../utils/routers";
import ErrorPage from "../404";
import { useAlert } from "../../monoCommon/components/Alerts";
const EditPage = () => {
  const alert = useAlert();
  const allowed = usePermissionChecker();
  if (!allowed) {
    return null;
  }
  const { isTenantOwner } = useContext(UserContext);
  if (!isTenantOwner) {
    return (
      <ErrorPage
        title="Neturite teisės"
        description="Prisijunkite prie įmonės valdytojo paskyros"
      />
    );
  }
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <PageCont>
      <NariaiPage />

      <Modal isOpen={true} onBackdropPress={() => router.push("/nariai")}>
        <PopArea>
          <PopContainer>
            <Close onClick={() => router.push("/nariai")}>
              <Icon name="close" />
            </Close>
            <DivForm>
              <RouterFormik
                id={id}
                defaultValues={{
                  code: "",
                  email: "",
                  lastName: "",
                  name: "",
                  phone: "",
                }}
                onSubmit={() => {
                  router.push("/nariai");
                  alert.show(
                    id === "naujas" ? "Naujo darbuotojo kvietimas sukurtas" : "Darbuotojo duomenys atnaujinti"
                  );
                }}
                save={api.tenants.NewUserAddOrUpdate}
                getValue={api.tenants.GetNewUser}
                onError={({ status }) => {
                  if (status === 500) {
                    alert.error(
                      id === "naujas" ? "Nepavyko sukurti naujo darbuotojo" : "Nepavyko atnaujinti duomenų"
                    );
                    router.push("/nariai");
                  }
                }}
              >
                {(props) => {
                  return (
                    <form onSubmit={props.handleSubmit}>
                      <H1>Pakviesti prisijungti prie komandos</H1>
                      <SubH1Container>
                        <SubH1>
                          Jūsų komandos draugai gaus el. laišką, suteikiantį
                          jiems prieigą prie jūsų komandos.
                        </SubH1>
                      </SubH1Container>
                      <TextFieldContainer>
                        <TextField
                          label="Vardas"
                          {...props.connectField("name")}
                        />
                        {props.connectField("name").error}
                      </TextFieldContainer>
                      <TextFieldContainer>
                        <TextField
                          label="Pavardė"
                          {...props.connectField("lastName")}
                        />
                      </TextFieldContainer>
                      <TextFieldContainer>
                        <TextField
                          label="Telefonas"
                          {...props.connectField("phone")}
                        />
                      </TextFieldContainer>
                      <TextFieldContainer>
                        <TextField
                          label="El.paštas"
                          {...props.connectField("email")}
                        />
                      </TextFieldContainer>
                      <TextFieldContainer>
                        <TextField
                          label="Asmens kodas"
                          {...props.connectField("code")}
                        />
                      </TextFieldContainer>
                      <DownBar style={{ display: "flex" }}>
                        <Button
                          variant="tertiary"
                          style={{ marginRight: 15, marginTop: 15 }}
                          type="reset"
                          onClick={() => {
                            router.push("/nariai");
                          }}
                        >
                          Atšaukti
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          style={{ marginLeft: 10, marginTop: 15 }}
                        >
                          Išsaugoti
                        </Button>
                      </DownBar>
                    </form>
                  );
                }}
              </RouterFormik>
            </DivForm>
          </PopContainer>
        </PopArea>
      </Modal>
    </PageCont>
  );
};
const PageCont = styled.div``;
const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 3rem;
`;
const DivForm = styled.div`
  margin: 64px;
  position: relative;
`;
const PopArea = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
`;
const SubH1Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 31px;
`;
const SubH1 = styled.div`
  text-align: center;
  font: normal normal medium 16px/26px Manrope;
  letter-spacing: 0px;
  color: #7a7e9f;
  opacity: 1;
  max-width: 400px;
`;
const TextFieldContainer = styled.div`
  margin-bottom: 16px;
`;
const PopContainer = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
  flex-direction: column;
  background-color: white;
  max-width: 674px;
  width: 100%;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
`;
const DownBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  flex-grow: 1;
  text-align: center;
  font: normal normal bold 32px/44px Manrope;
  letter-spacing: 0px;
  color: #121a55;
  opacity: 1;
  letter-spacing: 0px;
  color: #121a55;
  padding: 0px;
  margin-bottom: 8px;
`;

export default EditPage;

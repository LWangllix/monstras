import { useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useRef } from "react";
import styled from "styled-components";
import { Permissions } from "../../config";
import TenantUser from "../../server/models/TenantUser";
import { User } from "../../server/models/User";
import { device } from "../../styles";
import { validUpdateUser } from "../../utils/validations";
import Button from "../buttons/Button";
import CheckField from "../fields/CheckField";
import TextField from "../fields/TextField";
import Icon from "../other/Icon";

interface EditUserProps {
  onSetClose: React.Dispatch<React.SetStateAction<boolean>>;
  user?: User;
  tenantUser?: TenantUser;
  updateUser: (props) => void;
}

const EditUser = ({
  onSetClose,
  user,
  tenantUser,
  updateUser,
}: EditUserProps) => {
  const cardRef = useRef(null);
  const isMobile = useMediaQuery(device.mobileL);

  const handleSubmit = (values) => {
    updateUser(values);
    onSetClose(false);
  };

  const handleCancel = () => {
    onSetClose(false);
  };

  return (
    <>
      <Card ref={cardRef}>
        {isMobile ? (
          <BackButtonContainer onClick={handleCancel}>
            <BackButton name={"backMobile"} />
          </BackButtonContainer>
        ) : (
          <IconContainer onClick={handleCancel}>
            <StyledExitIcon name="close" />
          </IconContainer>
        )}
        <Formik
          initialValues={{
            name: tenantUser?.user?.name || user?.name || "",
            last_name: tenantUser?.user?.lastName || user?.lastName || "",
            personal_code: tenantUser?.user?.username || user?.username || "",
            phone: tenantUser?.phone || user?.phone || "",
            email: tenantUser?.email || user?.email || "",
            is_administrator:
              tenantUser?.permission?.usersAdmin ===
                Permissions.UsersAdmin.statuses.ENABLED || false,
            is_suspended:
              tenantUser?.permission?.user ===
                Permissions.User.statuses.SUSPENDED ||
              user?.permission?.user === Permissions.User.statuses.SUSPENDED ||
              false,

            is_investigator:
              tenantUser?.permission?.investigator ===
                Permissions.Investigator.statuses.ENABLED ||
              user?.permission?.investigator ===
                Permissions.Investigator.statuses.ENABLED ||
              false,
          }}
          onSubmit={handleSubmit}
          validate={(values) => validUpdateUser(values)}
          validateOnChange={false}
        >
          {({ values, errors, handleSubmit, setFieldValue, handleChange }) => {
            return (
              <>
                <Description padding="15px 0px 25px 0px">
                  INFORMACIJA APIE VADOVĄ/ FIZINĮ ASMENĮ (Redagavimas)
                </Description>
                <StyledForm
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  tabIndex={0}
                  onSubmit={handleSubmit}
                >
                  <Row>
                    <StyledTextInput
                      label="Vardas"
                      name="name"
                      padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                      value={values.name}
                      onChange={handleChange}
                      error={errors.name as string}
                    />
                    <StyledTextInput
                      label="Pavardė"
                      name="last_name"
                      padding={isMobile ? "0 0 16px 0" : "0"}
                      value={values.last_name}
                      onChange={handleChange}
                      error={errors.last_name as string}
                    />
                  </Row>
                  <Row>
                    <StyledTextInput
                      label="Asmens kodas"
                      name="personal_code"
                      padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                      value={values.personal_code}
                      onChange={handleChange}
                      error={errors.personal_code as string}
                    />
                    <StyledTextInput
                      label="Telefonas"
                      name="phone"
                      padding={isMobile ? "0 0 16px 0" : "0"}
                      value={values.phone}
                      onChange={handleChange}
                      error={errors.phone as string}
                    />
                  </Row>
                  <Row>
                    <StyledTextInput
                      label="El. pašto adresas"
                      name="email"
                      padding={isMobile ? "0 0 16px 0" : "0"}
                      value={values.email}
                      onChange={handleChange}
                      error={errors.email as string}
                    />
                  </Row>
                  <SecondRow>
                    <InnerRow>
                      <CheckFieldRow>
                        <CheckField
                          onChange={(e) => setFieldValue(`is_investigator`, !e)}
                          value={values.is_investigator}
                        />
                        <CheckFieldLabel>Mokslinė Veikla</CheckFieldLabel>
                      </CheckFieldRow>
                      {!!tenantUser ? (
                        <CheckFieldRow>
                          <CheckField
                            onChange={(e) =>
                              setFieldValue(`is_administrator`, !e)
                            }
                            value={values.is_administrator}
                          />
                          <CheckFieldLabel>
                            Vartotojų administratorius
                          </CheckFieldLabel>
                        </CheckFieldRow>
                      ) : null}
                    </InnerRow>
                    <div>
                      {!values.is_suspended ? (
                        <StyledButton
                          onClick={() =>
                            setFieldValue(`is_suspended`, !values.is_suspended)
                          }
                          variant="delete"
                          type="button"
                          height={40}
                        >
                          Sustabdyti veiklą
                        </StyledButton>
                      ) : (
                        <StyledButton
                          value={values.is_suspended}
                          onClick={() =>
                            setFieldValue(`is_suspended`, !values.is_suspended)
                          }
                          variant="secondary"
                          type="button"
                          height={40}
                        >
                          Atnaujinti veiklą
                        </StyledButton>
                      )}
                    </div>
                  </SecondRow>
                  <ButtonRow>
                    <Button
                      variant="primary"
                      type="submit"
                      padding={isMobile ? "0px" : "0px 34px 0 0"}
                    >
                      Saugoti
                    </Button>
                    <Button
                      variant="tertiary"
                      type="button"
                      padding={isMobile ? "16px  0px" : "0px 34px 0 0"}
                      onClick={() => handleCancel()}
                    >
                      Atšaukti
                    </Button>
                  </ButtonRow>
                </StyledForm>
              </>
            );
          }}
        </Formik>
      </Card>
    </>
  );
};
const BackButton = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 2.3rem;
  margin: 24px auto auto 20px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  z-index: 9;
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: pointer;
  z-index: 91;
`;

const CheckFieldLabel = styled.div`
  font: normal normal medium 16px/22px Manrope;
  color: #2c2760;
`;
const CheckFieldRow = styled.div`
  display: flex;
  margin-right: 32px;
  @media ${device.mobileL} {
    margin-bottom: 16px;
  }
`;

const StyledForm = styled(Form)`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
  @media ${device.mobileL} {
    flex-direction: column;
    margin-top: 0px;
  }
`;

const SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  width: 100%;
  @media ${device.mobileL} {
    flex-direction: column;
    margin-top: 0px;
  }
`;

const InnerRow = styled.div`
  display: flex;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledTextInput = styled(TextField)`
  flex: 1;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 40px;
  @media ${device.mobileL} {
    justify-content: center;
    flex-direction: column;
  }
`;

const StyledExitIcon = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 3.5rem;
  margin: 10px 10px auto auto;
`;

const StyledButton = styled(Button)`
  min-width: 155px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  width: 800px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  margin: auto;
  padding: 76px 64px 64px 64px;
  display: flex;
  margin: auto;
  flex-direction: column;
  @media ${device.mobileL} {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    padding: 76px 16px 0 16px;
  }
`;

const Description = styled.div<{ padding: string }>`
  font: normal normal bold 1.4rem/19px Manrope;
  letter-spacing: 0.56px;
  color: #121a558f;

  margin: ${({ padding }) => padding};
`;

export default EditUser;

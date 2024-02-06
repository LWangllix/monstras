import { useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useRef } from "react";
import styled from "styled-components";
import { Permissions } from "../../config";
import { Tenant } from "../../server/models/Tenant";
import { device } from "../../styles";
import { validUpdateTenant } from "../../utils/validations";
import Button from "../buttons/Button";
import CheckField from "../fields/CheckField";
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import Icon from "../other/Icon";

interface EditTenantProps {
  onSetClose: React.Dispatch<React.SetStateAction<boolean>>;
  tenant?: Tenant;
  updateTenant?: (props) => void;
}

const EditTenant = ({ onSetClose, tenant, updateTenant }: EditTenantProps) => {
  const cardRef = useRef(null);
  const isMobile = useMediaQuery(device.mobileL);

  const handleSubmit = (values) => {
    updateTenant(values);
    onSetClose(true);
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
            name: tenant?.name || "",
            code: tenant.code || "",
            address: tenant?.address || "",
            owner:
              tenant?.tenantUsers?.find(
                (t) =>
                  t.permission.tenantOwner ===
                  Permissions.TenantOwner.statuses.ENABLED
              ) || null,
            is_suspended:
              tenant?.permission?.user ===
                Permissions.User.statuses.SUSPENDED || false,
            is_investigator:
              tenant?.permission?.investigator ===
                Permissions.Investigator.statuses.ENABLED || false,
          }}
          onSubmit={handleSubmit}
          validate={(values) => validUpdateTenant(values)}
          validateOnChange={false}
        >
          {({ values, errors, handleSubmit, setFieldValue, handleChange }) => {
            return (
              <>
                <Description padding="15px 0px 25px 0px">
                  INFORMACIJA APIE ĮMONE (Redagavimas)
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
                      label="Pavadinimas"
                      name="name"
                      padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                      value={values.name}
                      onChange={handleChange}
                      error={errors.name as string}
                    />
                    <StyledTextInput
                      label="Įmonės kodas"
                      name="code"
                      padding={isMobile ? "0 0 16px 0" : "0"}
                      value={values.code}
                      onChange={handleChange}
                      error={errors.code as string}
                    />
                  </Row>
                  <Row>
                    <StyledTextInput
                      label="Adresas"
                      name="address"
                      padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                      value={values.address}
                      onChange={handleChange}
                      error={errors.address as string}
                    />

                    <StyledSelect
                      name={`owner`}
                      id="tenantUsers"
                      value={values?.owner}
                      options={tenant?.tenantUsers}
                      onChange={(e) => setFieldValue("owner", e)}
                      getOptionLabel={(option) =>
                        `${option?.user?.name} ${option?.user?.lastName}` || ""
                      }
                      showError={false}
                      error={errors.owner as string}
                      right={<StyledIcon name={"arrowDown"} />}
                      label="Vadovas"
                      padding={isMobile ? "8px 0px" : "0px"}
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

const StyledSelect = styled(SelectField)`
  flex: 1;
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
const StyledButton = styled(Button)`
  min-width: 155px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Card = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  width: 800px;
  height: 600px;
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

const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin: auto 8px;
  font-size: 1.1rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;

export default EditTenant;

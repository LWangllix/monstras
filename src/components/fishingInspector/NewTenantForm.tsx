import { useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Button from "../buttons/Button";
import TextField from "../fields/TextField";
import { device } from "../../styles";
import { validateNewTenant } from "../../utils/validations";
import RadioOptions from "../buttons/RadioOptions";
import { addPersonTypes } from "../../utils/constants";
import CheckField from "../fields/CheckField";

const NewTenantForm = ({ onSubmit }) => {
  const isMobile = useMediaQuery(device.mobileL);
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        name: "",
        last_name: "",
        personal_code: "",
        phone: "",
        email: "",
        tenant_name: "",
        tenant_code: "",
        address: "",
        person_type: addPersonTypes.tenant,
        is_investigator: false,
      }}
      onSubmit={onSubmit}
      validate={(values) => validateNewTenant(values)}
      validateOnChange={false}
    >
      {({ values, errors, handleSubmit, setFieldValue, handleChange }) => {
        return (
          <>
            <Title>Naujas naudotojas</Title>
            <StyledForm
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              tabIndex={0}
              onSubmit={handleSubmit}
            >
              <div>
                <StyledRadioOptions
                  options={Object.values(addPersonTypes)}
                  name="person_type"
                  value={values.person_type}
                  error={errors.person_type as string}
                  onChange={(e) => setFieldValue("person_type", e)}
                />
                <CheckFieldRow>
                  <CheckField
                    onChange={(e) => setFieldValue(`is_investigator`, !e)}
                    value={values.is_investigator}
                  />
                  <CheckFieldLabel>Mokslinė Veikla</CheckFieldLabel>
                </CheckFieldRow>
                <Description padding="15px 0px 25px 0px">
                  INFORMACIJA APIE VADOVĄ/ FIZINĮ ASMENĮ
                </Description>

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
                    padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
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
                    padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                    value={values.phone}
                    onChange={handleChange}
                    error={errors.phone as string}
                  />
                </Row>
                <Row>
                  <StyledTextInput
                    label="El. pašto adresas"
                    name="email"
                    padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email as string}
                  />
                </Row>
                {values.person_type.value !== "individual" ? (
                  <>
                    <Description padding="40px 0px 25px 0px">
                      INFORMACIJA APIE ĮMONĘ
                    </Description>
                    <Row>
                      <StyledTextInput
                        label="Pavadinimas"
                        name="tenant_name"
                        padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                        value={values.tenant_name}
                        onChange={handleChange}
                        error={errors.tenant_name as string}
                      />
                      <StyledTextInput
                        label="Įmonės kodas"
                        name="tenant_code"
                        padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                        value={values.tenant_code}
                        onChange={handleChange}
                        error={errors.tenant_code as string}
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
                    </Row>
                  </>
                ) : null}
              </div>

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
                  onClick={() =>
                    router.push("/vidinis/zuvu-istekliu-naudotojai")
                  }
                >
                  Atšaukti
                </Button>
              </ButtonRow>
            </StyledForm>
          </>
        );
      }}
    </Formik>
  );
};

const CheckFieldLabel = styled.div`
  font: normal normal medium 16px/22px Manrope;
  color: #2c2760;
`;
const CheckFieldRow = styled.div`
  display: flex;
`;

const Title = styled.div`
  font: normal normal bold 3.2rem/40px Manrope;
  color: #121a55;
`;

const StyledRadioOptions = styled(RadioOptions)`
  label {
    padding: 0px;
    margin: 0px 16px 0px 0px;
  }
`;

const Description = styled.div<{ padding: string }>`
  font: normal normal bold 1.4rem/19px Manrope;
  letter-spacing: 0.56px;
  color: #121a558f;

  margin: ${({ padding }) => padding};
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
const ButtonRow = styled.div`
  display: flex;
  margin-top: 40px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledTextInput = styled(TextField)`
  flex: 1;
`;

export default NewTenantForm;

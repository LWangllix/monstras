import { useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import RadioOptions from "../buttons/RadioOptions";
import Button from "../buttons/Button";
import TextField from "../fields/TextField";
import { device } from "../../styles";
import { personTypes } from "../../utils/constants";
import { validateRegistration } from "../../utils/validations";
import LayoutWithImage from "../../monoCommon/components/layouts/LayoutWithImage";

const FishStockingRegistratioForm = ({
  onSubmit,
  submitText,
  initialValues: { person_type, tenant_code, tenant_name, email, phone_number },
}) => {
  const isMobile = useMediaQuery(device.mobileL);

  return (
    <LayoutWithImage>
      <Logo src="/logo.svg" />
      <H1>Užpildykite duomenis</H1>
      <Description>
        Prašome užpildyti pagrindinius duomenis apie įmonę
      </Description>
      <Formik
        initialValues={{
          person_type: person_type,
          tenant_code: tenant_code,
          tenant_name: tenant_name,
          phone_number: phone_number,
          email: email,
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          return validateRegistration(values);
        }}
        validateOnChange={false}
      >
        {({ values, errors, handleSubmit, handleChange, setFieldValue }) => {
          return (
            <StyledForm
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              tabIndex={0}
              onSubmit={handleSubmit}
            >
              <RadioOptions
                options={Object.values(personTypes)}
                name="person_type"
                value={values.person_type}
                error={errors.person_type as string}
                onChange={(e) => setFieldValue("person_type", e)}
              />
              {values.person_type.value !== "individual" ? (
                <>
                  <StyledTextInput
                    label="Įmonės kodas"
                    name="tenant_code"
                    padding={"0 0 16px 0"}
                    value={values.tenant_code}
                    error={errors.tenant_code as string}
                    onChange={handleChange}
                  />
                  <StyledTextInput
                    label="Įmonės pavadinimas"
                    name="tenant_name"
                    padding={"0 0 16px 0"}
                    value={values.tenant_name}
                    error={errors.tenant_name as string}
                    onChange={handleChange}
                  />
                </>
              ) : null}

              <StyledTextInput
                label="Telefonas"
                name="phone_number"
                padding={"0 0 16px 0"}
                value={values.phone_number}
                error={errors.phone_number as string}
                onChange={handleChange}
              />
              <StyledTextInput
                label="El.paštas"
                name="email"
                padding={"0 0 16px 0"}
                value={values.email}
                error={errors.email as string}
                onChange={handleChange}
              />
              <div>
                <Button
                  variant="primary"
                  type="submit"
                  padding={isMobile ? "10px 0px 0px 0px" : "80px 16px 0 0"}
                >
                  {submitText}
                </Button>
              </div>
            </StyledForm>
          );
        }}
      </Formik>
    </LayoutWithImage>
  );
};

const StyledForm = styled(Form)`
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.mobileL} {
    width: 86%;
  }
`;

const StyledTextInput = styled(TextField)`
  flex: 1;
  width: 100%;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 91px;
  height: 54px;
  margin-bottom: 64px;
`;

const Description = styled.div`
  text-align: center;
  font: normal normal medium 1.6rem/26px Manrope;
  letter-spacing: 0px;
  color: #7a7e9f;
  width: 70%;
`;

const H1 = styled.h1`
  text-align: center;
  font: normal normal bold 32px/44px Manrope;
  letter-spacing: 0px;
  color: #121a55;
  opacity: 1;
  margin: 0px 0px 16px 0px;

  @media ${device.mobileL} {
    padding-bottom: 0px;
  }
`;

export default FishStockingRegistratioForm;

import { useMediaQuery } from "@material-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import { range } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Tool } from "../../server/models/Tool";
import { device } from "../../styles";
import { validateToolUpdate } from "../../utils/validations";
import Button from "../buttons/Button";
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import Icon from "../other/Icon";

interface UpdateToolFormProps {
  onSubmit: (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
  tool: Tool;
  loading: boolean;
}

const UpdateToolForm = ({ onSubmit, tool, loading }: UpdateToolFormProps) => {
  const isMobile = useMediaQuery(device.mobileL);
  const router = useRouter();

  if (tool) {
    return (
      <Formik
        initialValues={{
          eye_size: tool?.eye_size || "",
          net_length: parseInt(tool?.net_length.toString()) || "",
          seal_nr: tool?.seal_nr || "",
        }}
        onSubmit={onSubmit}
        validate={(values) => validateToolUpdate(values)}
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
              <div>
                <Row>
                  <StyledSelect
                    name={`eye_size`}
                    value={values.eye_size}
                    onChange={(e) => {
                      setFieldValue(`eye_size`, e);
                    }}
                    options={range(15, 101, 1)}
                    getOptionLabel={(option) => option || ""}
                    label="Akių dydis"
                    placeholder={"pasirinkite"}
                    padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                    error={errors.eye_size as string}
                    right={<StyledIcon name={"arrowDown"} />}
                  />
                  <StyledTextInput
                    label="Tinklaičių ilgis"
                    name="net_length"
                    padding={isMobile ? "0 0 16px 0" : "0px  16px 0px  0px"}
                    value={values.net_length}
                    onChange={handleChange}
                    error={errors.net_length as string}
                    right={<InputInnerLabel>m</InputInnerLabel>}
                  />
                  <StyledTextInput
                    label="Plombos nr."
                    name="seal_nr"
                    value={values.seal_nr}
                    onChange={handleChange}
                    error={errors.seal_nr as string}
                  />
                </Row>
              </div>

              <ButtonRow>
                <Button
                  variant="primary"
                  type="submit"
                  padding={isMobile ? "10px 0px 0px 0px" : "0px 34px 0 0"}
                  loading={loading}
                >
                  Saugoti
                </Button>
                <Button
                  variant="tertiary"
                  type="button"
                  padding={isMobile ? "10px 0px 0px 0px" : "0px 34px 0 0"}
                  onClick={() => router.back()}
                >
                  Atšaukti
                </Button>
              </ButtonRow>
            </StyledForm>
          );
        }}
      </Formik>
    );
  }
  return <></>;
};

const StyledSelect = styled(SelectField)`
  @media ${device.mobileL} {
    margin-top: 16px;
  }
`;
const InputInnerLabel = styled.div`
  margin: auto 8px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary + "8F"};
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
  margin-bottom: 32px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledTextInput = styled(TextField)`
  flex: 1;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin: auto 8px;
  font-size: 1.1rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;

export default UpdateToolForm;

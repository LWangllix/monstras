import { useMediaQuery } from "@material-ui/core";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import { validateFishWeight } from "../../utils/validations";
import Button from "../buttons/Button";
import CaughtFishesOnShoreRow from "./CaughtFishesOnShoreRow";

const mapFishForForm = (fishes) => {
  return fishes.map((f) => {
    return {
      id: f.fishType_id,
      label: f.fishType_label,
      weight: f.sum,
    };
  });
};

const FishOnBoatForm = ({ fishes, onSubmit }) => {
  const isMobile = useMediaQuery(device.mobileL);
  return (
    <Formik
      initialValues={{
        fishes: mapFishForForm(fishes),
        newFishes: [],
      }}
      onSubmit={(values) => onSubmit(values, true)}
      validate={(values) => validateFishWeight(values)}
      validateOnChange={false}
    >
      {({ values, errors, handleSubmit, setFieldValue }) => {
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
            <FieldArray
              name="fishes"
              render={() => (
                <>
                  <Subheader>SUŽVEJOTAS LAIMIKIS</Subheader>
                  {fishes?.length > 0
                    ? values.fishes?.map((item, index) => {
                        const fishErrors = errors[item.id];
                        return (
                          <CaughtFishesOnShoreRow
                            key={`fishes_row_${index}`}
                            item={item}
                            setFieldValue={setFieldValue}
                            index={index}
                            errors={fishErrors}
                            disabled={false}
                            approximateWeight={fishes[index].sum}
                          />
                        );
                      })
                    : null}
                </>
              )}
            />
            <ButtonRow>
              <Button
                variant="primary"
                type="submit"
                padding={isMobile ? "10px 0px 0px 0px" : "0px 34px 0 0"}
              >
                Saugoti
              </Button>
            </ButtonRow>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

const StyledForm = styled(Form)`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  display: flex;
  margin-bottom: 32px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const Subheader = styled.h2`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.tertiary};
  margin-top: 32px;
  margin-bottom: 16px;
`;

export default FishOnBoatForm;

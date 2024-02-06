import { useMediaQuery } from "@material-ui/core";
import { FormikErrors } from "formik";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import NumeicTextField from "../fields/NumericTextField";

export interface FishStickingRegistrationFishRow {
  item: { label: string; weight: number };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  index: number;
  errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | any;
  disabled?: boolean;
  approximateWeight: string;
}

const FishingRegistrationRow = ({
  item,
  setFieldValue,
  index,
  errors,
  approximateWeight,
  disabled = false,
}: FishStickingRegistrationFishRow) => {
  const isMobile = useMediaQuery(device.mobileL);
  const { weight } = item;
  return (
    <Row key={index}>
      {!isMobile && <FishLabel>{item.label}</FishLabel>}
      <StyledTextInput
        name={`fishes.${index}.weight`}
        value={weight}
        onChange={(e) => setFieldValue(`fishes.${index}.weight`, e)}
        label={isMobile ? item.label : "Tikslus svoris"}
        padding={isMobile ? "8px 0px" : "8px 0 8px 8px"}
        error={errors?.weight}
        showError={false}
        wholeNumber={false}
        bottomLabel={`sugauta ${approximateWeight} kg`}
        right={<InputInnerLabel>kg</InputInnerLabel>}
        disabled={disabled}
      />
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 550px;
`;

const FishLabel = styled.div`
  font: normal normal 600 1.6rem/40px Manrope;
  color: #0b1f51;
  min-width: 170px;
  margin: 0 16px 0 0;
  text-transform: capitalize;
`;

const StyledTextInput = styled(NumeicTextField)`
  flex: 1;
  max-width: 250px;
  @media ${device.mobileL} {
    max-width: 100%;
  }
`;

const InputInnerLabel = styled.div`
  margin: auto 8px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary + "8F"};
`;

export default FishingRegistrationRow;

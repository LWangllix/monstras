import { useMediaQuery } from "@material-ui/core";
import { ArrayHelpers, FormikErrors } from "formik";
import React from "react";
import styled from "styled-components";
import { FishType } from "../../server/models/FishType";
import { device } from "../../styles";
import NumericTextField from "../fields/NumericTextField";
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import Icon from "../other/Icon";

export interface FishStickingRegistrationFishRow {
  fishTypes: Array<FishType>;
  item: {
    type: string;
    business_size: string;
    amount: string;
    stored_fish_amount: string;
    side_fishing_catch: string;
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  arrayHelpers: ArrayHelpers;
  showDelete: boolean;
  index: number;
  errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | any;
  disabled?: boolean;
  values: Array<any>;
}

const FishingRegistrationRow = ({
  fishTypes,
  item,
  setFieldValue,
  arrayHelpers,
  showDelete,
  index,
  errors,
  values,
  disabled = false,
}: FishStickingRegistrationFishRow) => {
  const isMobile = useMediaQuery(device.mobileL);
  const validateFormat = /^\d*[\/]?\d*[\.\,]?\d*$/;
  const {
    type,
    business_size,
    amount,
    stored_fish_amount,
    side_fishing_catch,
  } = item;

  const removeDuplicates = () => {
    return fishTypes.filter((ft) => {
      return !values.some((f) => f.type.label == ft.label);
    });
  };

  return (
    <Row key={index}>
      {fishTypes.length > 0 ? (
        <StyledSelect
          name={`fishes.${index}.type`}
          value={type}
          onChange={(e) => setFieldValue(`fishes.${index}.type`, e)}
          options={removeDuplicates()}
          getOptionLabel={(option) => option?.label || ""}
          label="Žuvų rūšis"
          padding={isMobile ? "8px 0px" : "8px 0px 8px 0px"}
          error={errors?.type}
          showError={false}
          editable={false}
          id={`fish_stocking_registration_fish_type_${index}`}
          right={<StyledIcon0 name={"arrowDown"} />}
          disabled={disabled}
        />
      ) : null}

      <StyledNumericInput
        name={`fishes.${index}.business_size`}
        value={business_size}
        onChange={(e) => setFieldValue(`fishes.${index}.business_size`, e)}
        label="Verslinis dydis"
        padding={isMobile ? "8px 0px" : "8px 0 8px 8px"}
        error={errors?.business_size}
        showError={false}
        wholeNumber={false}
        right={<InputInnerLabel>cm</InputInnerLabel>}
        disabled={disabled}
      />
      <StyledNumericInput
        name={`fishes.${index}.amount`}
        value={amount}
        onChange={(e) => setFieldValue(`fishes.${index}.amount`, e)}
        label="Kiekis"
        padding={isMobile ? "8px 0px" : "8px 0 8px 8px"}
        error={errors?.amount}
        showError={false}
        wholeNumber={false}
        right={<InputInnerLabel>kg</InputInnerLabel>}
        disabled={disabled}
      />
      <StyledTextInput
        name={`fishes.${index}.stored_fish_amount`}
        value={stored_fish_amount}
        onChange={(e) => {
          if (validateFormat.test(e.target.value)) {
            setFieldValue(
              `fishes.${index}.stored_fish_amount`,
              e.target.value.replace(",", ".")
            );
          }
        }}
        label="Saugomų žuvų kiekis"
        padding={isMobile ? "8px 0px" : "8px 0 8px 8px"}
        error={errors?.stored_fish_amount}
        showError={false}
        right={<InputInnerLabel>vnt./kg</InputInnerLabel>}
        disabled={disabled}
      />
      <StyledNumericInput
        name={`fishes.${index}.side_fishing_catch`}
        value={side_fishing_catch}
        onChange={(e) => setFieldValue(`fishes.${index}.side_fishing_catch`, e)}
        label="Šalutinis žvejybos laimikis*"
        padding={isMobile ? "8px 0px" : "8px 0 8px 8px"}
        error={errors?.side_fishing_catch}
        showError={false}
        wholeNumber={false}
        right={<InputInnerLabel>%</InputInnerLabel>}
        disabled={disabled}
      />

      {showDelete && (
        <DeleteButton
          onClick={() => (disabled ? {} : arrayHelpers.remove(index))}
          disabled={disabled}
        >
          <DeleteIcon name={"delete"} />
        </DeleteButton>
      )}
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledTextInput = styled(TextField)``;

const StyledNumericInput = styled(NumericTextField)``;

const StyledSelect = styled(SelectField)`
  max-width: 195px;
  @media ${device.mobileL} {
    max-width: 100%;
  }
`;

const DeleteButton = styled.div<{ disabled: boolean }>`
  margin-top: auto;
  margin-bottom: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  height: 48px;
  display: flex;
  @media ${device.mobileL} {
    margin-bottom: 0px;
    height: auto;
  }
`;

const DeleteIcon = styled(Icon)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.error};
  font-size: 2.4rem;
  margin: auto 0 auto 16px;
  @media ${device.mobileL} {
    margin: 8px 0 16px 0;
  }
`;

const StyledIcon0 = styled(Icon)`
  cursor: pointer;
  margin: auto 8px;
  font-size: 1.1rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;

const InputInnerLabel = styled.div`
  margin: auto 8px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary + "8F"};
`;

export default FishingRegistrationRow;

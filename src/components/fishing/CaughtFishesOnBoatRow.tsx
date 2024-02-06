import { useMediaQuery } from "@material-ui/core";
import { ArrayHelpers, FormikErrors } from "formik";
import React from "react";
import styled from "styled-components";
import { FishType } from "../../server/models/FishType";
import { device } from "../../styles";
import {
  default as NumeicTextField,
  default as NumericTextField,
} from "../fields/NumericTextField";
import SelectField from "../fields/SelectField";
import Icon from "../other/Icon";

export interface FishStickingRegistrationFishRow {
  fishTypes: Array<FishType>;
  item: { type: FishType; weight: number };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  arrayHelpers: ArrayHelpers;
  showDelete: boolean;
  index: number;
  values: Array<any>;
  rowName: string;
  errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | any;
  disabled?: boolean;
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
  rowName,
}: FishStickingRegistrationFishRow) => {
  const isMobile = useMediaQuery(device.mobileL);
  const { type, weight } = item;

  const removeDuplicates = () => {
    return fishTypes.filter((ft) => {
      return !values.some((f) => f?.type?.label == ft.label);
    });
  };

  return (
    <Row key={index}>
      {fishTypes.length > 0 ? (
        <StyledSelect
          name={`${rowName}.${index}.type`}
          value={type}
          onChange={(e) => setFieldValue(`${rowName}.${index}.type`, e)}
          options={removeDuplicates()}
          getOptionLabel={(option) => option?.label || ""}
          label="Žuvų rūšis"
          padding={isMobile ? "8px 0px" : "8px 8px 8px 0px"}
          error={errors?.type}
          showError={false}
          editable={false}
          id={`fish_stocking_registration_fish_type_${index}`}
          right={<StyledIcon0 name={"arrowDown"} />}
          disabled={disabled}
        />
      ) : null}

      {isMobile ? (
        <ColumnRow>
          <StyledNumericTextInput
            name={`${rowName}.${index}.weight`}
            value={weight}
            onChange={(e) => setFieldValue(`${rowName}.${index}.weight`, e)}
            label="Svoris"
            padding={isMobile ? "8px 0px 8px 0px" : "8px 0 8px 8px"}
            error={errors?.weight}
            showError={false}
            wholeNumber={false}
            right={<InputInnerLabel>kg</InputInnerLabel>}
            disabled={disabled}
          />
        </ColumnRow>
      ) : (
        <StyledTextInput
          name={`${rowName}.${index}.weight`}
          value={weight}
          onChange={(e) => setFieldValue(`${rowName}.${index}.weight`, e)}
          label="Svoris"
          padding={isMobile ? "8px 0px" : "8px 0 8px 8px"}
          error={errors?.weight}
          showError={false}
          wholeNumber={false}
          right={<InputInnerLabel>kg</InputInnerLabel>}
          disabled={disabled}
        />
      )}
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

const ColumnRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTextInput = styled(NumeicTextField)`
  flex: 1;
`;

const StyledNumericTextInput = styled(NumericTextField)`
  flex: 1;
`;

const StyledSelect = styled(SelectField)`
  min-width: 115px;
  flex: 3;
  @media ${device.mobileL} {
    width: 100%;
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

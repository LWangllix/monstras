import { useMediaQuery } from "@material-ui/core";
import { ArrayHelpers, FormikErrors } from "formik";
import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { FishType } from "../../server/models/FishType";
import { device } from "../../styles";
import NumericTextField from "../fields/NumericTextField";
import SelectField from "../fields/SelectField";
import Icon from "../other/Icon";

export interface FishStickingRegistrationFishRow {
  fishTypes: Array<FishType>;
  item: {
    type: FishType;
    abundance: string;
    biomass: string;
    total_abundance_percent: string;
    total_biomass_percent: string;
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  arrayHelpers: ArrayHelpers;
  showDelete: boolean;
  index: number;
  errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | any;
  disabled?: boolean;
  values: Array<any>;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
}

const InvestigationFishRow = ({
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
  const {
    type,
    abundance,
    biomass,
    total_abundance_percent,
    total_biomass_percent,
  } = item;

  const removeDuplicates = () => {
    return fishTypes.filter((ft) => {
      return !values.some((f) => f.type.label == ft.label);
    });
  };

  return (
    <Cotainer key={index}>
      <Row margin="4px 0 16px">
        {fishTypes?.length > 0 ? (
          <StyledSelect
            name={`fishes.${index}.type`}
            value={type}
            onChange={(e) => setFieldValue(`fishes.${index}.type`, e)}
            options={removeDuplicates()}
            getOptionLabel={(option) => option?.label || ""}
            label="Žuvų rūšis"
            padding={isMobile ? "8px 0px" : "0px"}
            error={errors?.type}
            showError={false}
            editable={false}
            id={`fish_stocking_registration_fish_type_${index}`}
            right={<StyledIcon0 name={"arrowDown"} />}
            disabled={disabled}
          />
        ) : null}
      </Row>
      <Row margin="4px 0 16px">
        <StyledNumericInput
          name={`fishes.${index}.abundance`}
          value={abundance}
          onChange={(e) => setFieldValue(`fishes.${index}.abundance`, e)}
          label="Gausumas"
          padding={isMobile ? "8px 0px" : "0px"}
          error={errors?.abundance}
          showError={false}
          wholeNumber={false}
          disabled={disabled}
        />
        <StyledNumericInput
          name={`fishes.${index}.total_abundance_percent`}
          value={total_abundance_percent}
          onChange={(e) =>
            setFieldValue(`fishes.${index}.total_abundance_percent`, e)
          }
          label="% bendro gausumo"
          padding={isMobile ? "8px 0px" : "0px 0 0px 16px"}
          error={errors?.total_abundance_percent}
          showError={false}
          wholeNumber={false}
          disabled={disabled}
        />
      </Row>

      <Row margin="4px 0 16px">
        <StyledNumericInput
          name={`fishes.${index}.biomass`}
          value={biomass}
          onChange={(e) => setFieldValue(`fishes.${index}.biomass`, e)}
          label="Biomasė"
          padding={isMobile ? "8px 0px" : "0"}
          error={errors?.biomass}
          showError={false}
          wholeNumber={false}
          disabled={disabled}
        />
        <StyledNumericInput
          name={`fishes.${index}.total_biomass_percent`}
          value={total_biomass_percent}
          onChange={(e) =>
            setFieldValue(`fishes.${index}.total_biomass_percent`, e)
          }
          label="% bendros biomasės"
          padding={isMobile ? "8px 0px" : "0px 0 0px 16px"}
          error={errors?.total_biomass_percent}
          showError={false}
          wholeNumber={false}
          disabled={disabled}
        />
      </Row>
      {showDelete && (
        <DeleteButton
          onClick={() => (disabled ? {} : arrayHelpers.remove(index))}
          disabled={disabled}
        >
          <DeleteIcon name={"delete"} />
        </DeleteButton>
      )}
    </Cotainer>
  );
};

const Row = styled.div<{ margin: string }>`
  display: flex;
  margin: ${({ margin }) => `${margin}`};
  @media ${device.mobileL} {
    flex-direction: column;
    margin-top: 0px;
  }
`;

const StyledNumericInput = styled(NumericTextField)`
  width: 100%;
`;

const StyledSelect = styled(SelectField)`
  width: 100%;
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

const Cotainer = styled.div`
  width: 100%;
`;

export default InvestigationFishRow;

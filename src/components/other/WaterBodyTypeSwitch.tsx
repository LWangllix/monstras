import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import { waterObjectType } from "../../utils/constants";
import RadioOptions from "../buttons/RadioOptions";

interface WaterBodyTypeSwitchProps {
  label: string;
  options: { label: string; value: string }[];
  onChange: (props) => void;
}

const WaterBodyTypeSwitch = ({
  onChange,
  label,
  options,
}: WaterBodyTypeSwitchProps) => {
  const [waterType, setWaterType] = useState(waterObjectType.baras);
  return (
    <RadioButtonContainer>
      {label && <RadioButtonLabel>{label}</RadioButtonLabel>}
      <StyledRadioOptions
        options={options}
        name="water_object_type"
        value={waterType}
        onChange={(option) => {
          setWaterType(option);
          onChange(option);
        }}
      />
    </RadioButtonContainer>
  );
};

const RadioButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 24px 0;
  @media ${device.mobileL} {
    flex-direction: column;
    margin: 16px 0;
  }
`;
const RadioButtonLabel = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  color: #0b1f51;
`;

const StyledRadioOptions = styled(RadioOptions)`
  padding: 0;

  label {
    padding: 0 1rem !important;
  }
  div {
    margin: 0;
  }
`;

export default WaterBodyTypeSwitch;

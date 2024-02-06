import React, { useState } from "react";
import styled from "styled-components";
import { registerLocale } from "react-datepicker";
import lt from "date-fns/locale/lt";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import TextField from "./TextField";
import { format } from "date-fns";
import Icons from "../other/Icon";
import { device } from "../../styles";
import { useMediaQuery } from "@material-ui/core";

registerLocale("lt", lt);

interface TimepickerProps {
  value: Date;
  error: string;
  onChange: (props) => void;
  label?: string;
  disabled?: boolean;
}

const Timepicker = ({
  value,
  error,
  onChange,
  label,
  disabled,
}: TimepickerProps) => {
  const [open, setopen] = useState(false);

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setopen(false);
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const isMobile = useMediaQuery(device.mobileL);

  return (
    <TimeContainer tabIndex={1} onBlur={handleBlur}>
      <StyledTextInput
        readOnly={true}
        label={label}
        onClick={() => {
          setopen(!open);
        }}
        padding={isMobile ? "0 8px 0 0" : "0 0 0 8px"}
        value={value ? format(new Date(value), "HH:mm") : null}
        error={error}
        right={<TimeIcon name={"time"} />}
        disabled={disabled}
      />
      {open && !disabled ? (
        <DatePicker
          locale="lt"
          open={open}
          showTimeSelect
          filterTime={filterPassedTime}
          showTimeSelectOnly
          timeIntervals={30}
          selected={value}
          onChange={(date) => {
            onChange(date as Date);
            setopen(false);
          }}
          inline
        ></DatePicker>
      ) : null}
    </TimeContainer>
  );
};

const TimeContainer = styled.div`
  cursor: pointer;
  width: 50%;
  &:focus {
    outline: none;
  }
  @media ${device.mobileL} {
    width: 100%;
  }
  position: relative;
  .react-datepicker {
    top: 85px;
    position: absolute;
    z-index: 8;
    background-color: #ffffff;
    box-shadow: 0px 2px 16px #121a5529;
    border-radius: 10px;
    border: none;
  }
  .react-datepicker--time-only {
    width: 100%;
    min-width: 170px !important;
  }
  .react-datepicker__time-container {
    width: 100% !important;
    padding: 18px 0px;
  }
  .react-datepicker__time-box {
    width: 100% !important;
    text-align: start !important;
  }
  .react-datepicker__time-list-item {
    font: normal normal 500 1.6rem/22px Manrope !important;
    color: #121a55 !important;
    width: 100%;
  }
  .react-datepicker__time-list-item--disabled {
    color: ${({ theme }) => theme.colors.grey} !important;
  }

  .react-datepicker__time-list-item--selected {
    background-color: ${({ theme }) => theme.colors.input} !important;
  }

  .react-datepicker__header--time {
    display: none;
  }
`;

const TimeIcon = styled(Icons)`
  color: rgb(122, 126, 159);
  vertical-align: middle;
  margin-right: 8px;
  font-size: 2.8rem;
  align-self: center;
`;

const StyledTextInput = styled(TextField)`
  cursor: pointer !important;
`;

export default Timepicker;

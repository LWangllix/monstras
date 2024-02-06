import React, { useState } from "react";
import styled from "styled-components";
import { registerLocale } from "react-datepicker";
import lt from "date-fns/locale/lt";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import TextField from "./TextField";
import { format } from "date-fns";
import Icon from "../other/Icon";
import { device } from "../../styles";
import { FormikErrors } from "formik";

registerLocale("lt", lt);

export interface DatepickerProps {
  startDate?: Date;
  setStartDate?: React.Dispatch<React.SetStateAction<Date>>;
  disabled?: boolean;
  value?: Date;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  onChange?: (props) => void;
  label?: string;
  className?: string;
}

const Datepicker = ({
  value,
  error,
  onChange,
  label,
  disabled,
  className,
}: DatepickerProps) => {
  const [open, setopen] = useState(false);
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setopen(false);
    }
  };
<<<<<<< HEAD
  console.log(value);
=======

>>>>>>> eda9be7f28c30d91ab30ebe91cf61a21d4d94bba
  return (
    <Container
      className={className}
      tabIndex={1}
      onBlur={handleBlur}
      disabled={disabled}
    >
      <StyledTextInput
        readOnly={true}
        label={label}
        onClick={() => {
          !value && setopen(!open);
        }}
        onInputClick={() => {
          setopen(!open);
        }}
        padding="0 8px 0 0"
        value={value ? format(new Date(value), "yyyy-MM-dd") : null}
        error={error}
        right={
          <Row>
            {!disabled && value ? (
              <ClearContainer
                onClick={() => {
                  onChange(null);
                }}
              >
                <ClearIcon name={"close"} />
              </ClearContainer>
            ) : null}
            <CalendarIcon name={"calendar"} />
          </Row>
        }
        disabled={disabled}
      />
      {open && !disabled ? (
        <DateContainer>
          <DatePicker
            locale="lt"
            open={open}
            selected={value}
            onChange={(date) => {
<<<<<<< HEAD
              console.log(date);
=======
>>>>>>> eda9be7f28c30d91ab30ebe91cf61a21d4d94bba
              onChange(date as Date);
              setopen(false);
            }}
            inline
          ></DatePicker>
        </DateContainer>
      ) : null}
    </Container>
  );
};

const ClearIcon = styled(Icon)`
  cursor: pointer;
  margin: auto 8px;
  font-size: 2.1rem;
  align-self: center;
  color: ${({ theme }) => theme.colors.error};
`;

const ClearContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
`;

const DateContainer = styled.div`
  position: relative;
  &:focus {
    outline: none;
  }
  @media ${device.mobileL} {
    position: fixed;
    z-index: 3;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const CalendarIcon = styled(Icon)`
  color: rgb(122, 126, 159);
  vertical-align: middle;
  margin-right: 8px;
  font-size: 2.8rem;
  align-self: center;
`;

const Container = styled.div<{ disabled: boolean }>`
  cursor: pointer;
  width: 100%;
  &:focus {
    outline: none;
  }
  .react-datepicker__header {
    color: #121a55;
    background-color: #ffffff !important;
    border: none;
  }
  .react-datepicker__month {
    margin: 0;
  }
  .react-datepicker__day--outside-month {
    color: #151229;
    opacity: 0.6;
  }
  .react-datepicker__input-time-container {
    text-align: center;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__day {
    &:focus {
      outline: none;
    }
    margin: 26px 32px 0px 0px;

    font: normal normal normal 1.5rem/21px Manrope;
    &:hover {
      border-radius: 0px;
    }
  }
  .react-datepicker__input-time-container {
    margin: 0;
  }
  .react-datepicker {
    width: 364px;
    top: 10px;
    position: absolute;
    z-index: 2;
    background-color: #ffffff;
    box-shadow: 0px 2px 16px #121a5529;
    border-radius: 10px;
    padding: 0px 26px 20px 26px;
    border: none;
    @media ${device.mobileL} {
      transform: translate(15%, 50%);
    }
  }
  .react-datepicker-time__caption {
    font: normal normal 600 1.6rem/40px Manrope;
    display: block !important;
    margin: 15px 0px 10px 0px;
    text-align: center;
    color: #0b1f51;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .react-datepicker__day--selected {
    background-color: white;
    position: relative;
    z-index: 1;
    font: normal normal normal 1.5rem/21px Manrope;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: white;
    font: normal normal normal 1.5rem/21px Manrope;
    color: #121a55;
  }
  .react-datepicker__day--selected::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    background: #13c9e7 0% 0% no-repeat padding-box;
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .react-datepicker__day-name {
    font: normal normal bold 14px/19px Manrope;
    letter-spacing: 0px;
    color: #151229;
    margin: 26px 32px 0px 0px;
    border: none;
  }
  .react-datepicker__navigation {
    top: 20px;
  }
  .react-datepicker__current-month {
    text-align: center;
    font: normal normal 600 1.6rem/22px Manrope;
    letter-spacing: 0px;
    color: #121a55;
    margin-top: 13px;
    text-transform: capitalize;
  }
  .react-datepicker__navigation--previous {
    left: 17px;
  }
  .react-datepicker__navigation--next {
    right: 17px;
  }
  .react-datepicker__month-container {
    float: none;
  }
`;

const StyledTextInput = styled(TextField)<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "text" : "pointer")};
`;

export default Datepicker;

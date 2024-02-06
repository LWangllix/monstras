import { useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Button from "../buttons/Button";
import RangeDatepickerFrom from "../fields/RangeDatepickerFrom";
import RangeDatepickerTo from "../fields/RangeDatePickerTo";
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import Icon from "../other/Icon";
import MUNICIPALITIES from "../../components/../sav.json";
import { UserContext } from "../../utils/AppContextProvider";
import { Permissions } from "../../config";

interface ProtocolFilterCard {
  bodyWaterName?: string;
  dateRangeFrom?: Date;
  dateRangeTo?: Date;
  onSetClose?: React.Dispatch<React.SetStateAction<boolean>>;
  updateFilters?: (props) => void;
  inspectorFullName?: string;
  fisherFullName?: string;
  municipality?: string;
}

const ProtocolFilterCard = ({
  bodyWaterName,
  dateRangeFrom,
  dateRangeTo,
  onSetClose,
  updateFilters,
  inspectorFullName,
  fisherFullName,
  municipality,
}: ProtocolFilterCard) => {
  const cardRef = useRef(null);
  const { hasPermission } = useContext(UserContext);
  const isInspector = hasPermission(Permissions.Inspector.id);
  const [bodyWaterNameModal, setBodyWaterName] = useState(bodyWaterName);
  const [dateRangeFromModal, setDateRangeFrom] = useState(dateRangeFrom);
  const [dateRangeToModal, setDateRangeTo] = useState(dateRangeTo);
  const [inspectorFullNameModal, setInspectorFullName] =
    useState(inspectorFullName);
  const [fisherFullNameModal, setFisherFullName] = useState(fisherFullName);
  const [municipalityModal, setMunicipality] = useState(municipality);
  const municipalities = MUNICIPALITIES;

  const handleClickOutside = (event) => {
    if (cardRef?.current && !cardRef.current.contains(event.target)) {
      onSetClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const isMobile = useMediaQuery(device.mobileL);

  const clearFilters = () => {
    setBodyWaterName("");
    setDateRangeFrom(null);
    setDateRangeTo(null);
  };

  return (
    <>
      <Card ref={cardRef}>
        {!isMobile ? (
          <IconContainer onClick={() => onSetClose(false)}>
            <StyledIcon name="close" />
          </IconContainer>
        ) : (
          <FilterHeader>
            <BackButtonContainer onClick={() => onSetClose(false)}>
              <BackButton name={"backMobile"} />
            </BackButtonContainer>
            <ClearButton type="button" onClick={() => clearFilters()}>
              Išvalyti
            </ClearButton>
          </FilterHeader>
        )}
        <DateRow>
          <RangeDatepickerFrom
            value={dateRangeFromModal}
            onChange={setDateRangeFrom}
            dateTo={dateRangeToModal}
          />
          <RangeDatepickerTo
            value={dateRangeToModal}
            onChange={setDateRangeTo}
            dateFrom={dateRangeFromModal}
          />
        </DateRow>
        {isInspector ? (
          <StyledTextField
            onChange={(e) => {
              setBodyWaterName(e.target.value);
            }}
            label={" Vandens telkinio arba baro pavadinimas"}
            value={bodyWaterNameModal}
            padding="0 0 16px 0 "
          />
        ) : null}
        <StyledSelectField
          id="fish_stocking_location"
          value={municipalities.find((m) => m.id == municipalityModal)}
          onChange={(m) => (m ? setMunicipality(m) : setMunicipality(""))}
          options={MUNICIPALITIES}
          getOptionLabel={(option) => option?.name || ""}
          showError={false}
          right={<StyledIcon0 name={"arrowDown"} />}
          label="Savivaldybė"
          padding="0 0 16px 0 "
        />
        {isInspector ? (
          <>
            <StyledTextField
              onChange={(e) => {
                setInspectorFullName(e.target.value);
              }}
              label={"Inspektoriaus vardas pavardė"}
              value={inspectorFullNameModal}
              padding="0 0 16px 0 "
            />
            <StyledTextField
              onChange={(e) => {
                setFisherFullName(e.target.value);
              }}
              label={"Žvejo vardas pavardė"}
              value={fisherFullNameModal}
              padding="0 0 16px 0 "
            />
          </>
        ) : null}
        <StyledButton
          height={45}
          onClick={() => {
            updateFilters({
              bodyWaterNameModal,
              dateRangeFromModal,
              dateRangeToModal,
              inspectorFullNameModal,
              fisherFullNameModal,
              municipalityModal,
            });
            onSetClose(false);
          }}
          variant="primary"
          type="button"
        >
          Filtruoti
        </StyledButton>
      </Card>
    </>
  );
};
const StyledSelectField = styled(SelectField)`
  flex: 1;
  min-width: 150px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;
const StyledIcon0 = styled(Icon)`
  margin: auto 8px;
  cursor: pointer;
  font-size: 1.1rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;

const StyledIcon = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 3rem;
  margin: 10px 10px auto auto;
`;

const StyledButton = styled(Button)`
  width: 166px;
  margin: 40px 0 32px 0;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const BackButton = styled(Icon)`
  color: #121a55;
  font-size: 2.3rem;
`;

const ClearButton = styled.button`
  font: normal normal 600 1.6rem/22px Manrope;
  color: #121a55;
  cursor: pointer;
`;

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  width: 514px;
  position: relative;
  padding: 48px 32px 0px 32px;
  margin: auto;
  @media ${device.mobileL} {
    border-radius: 0;
    width: 100%;
  }
`;

const DateRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledTextField = styled(TextField)`
  flex: 1;
  min-width: 220px;
`;

const FilterHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
  width: 100%;
`;

const BackButtonContainer = styled.div`
  cursor: pointer;
`;

export default ProtocolFilterCard;

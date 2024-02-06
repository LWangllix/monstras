import { useMediaQuery } from "@material-ui/core";
import { debounce, isArray } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import api from "../../server/routers/api";
import { device } from "../../styles";
import { Location } from "../../types";
import { waterObjectType } from "../../utils/constants";
import Button from "../buttons/Button";
import AsyncAutoComplete from "../fields/AsyncAutoComplete";
import NumericTextField from "../fields/NumericTextField";
import SelectField from "../fields/SelectField";
import Icon from "../other/Icon";
import WaterBodyTypeSwitch from "../other/WaterBodyTypeSwitch";

interface EditCardProps {
  onSetClose: React.Dispatch<React.SetStateAction<boolean>>;
  onLocationSelect: React.Dispatch<React.SetStateAction<Location>>;
  options: any;
}

const EditCard = ({ onSetClose, options, onLocationSelect }: EditCardProps) => {
  const cardRef = useRef(null);
  const isMobile = useMediaQuery(device.mobileL);
  const isSmallMobile = useMediaQuery(device.mobileS);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [fishingArea, setFishingArea] = useState(null);
  const [riverOrLake, setRiverOrLake] = useState(null);
  const [error, setError] = useState(null);

  const [listOfRiversAndLakes, setlistOfRiversAndLakes] = useState([]);
  const [listOfFishingAreas, setListOfFishingAreas] = useState([]);
  const [waterType, setWaterType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (option) => {
    if (!isArray(option) && option?.id) {
      if (waterType.value === "baras") {
        setFishingArea(option);
      } else {
        setRiverOrLake(option);
      }
      setLng(null);
      setLat(null);
    } else {
      setFishingArea(null);
      setRiverOrLake(null);
    }
  };

  useEffect(() => {
    api.fishing.listOfFishingAreas({}).then((response) => {
      setListOfFishingAreas(response["fishingAreas"]);
    });
  }, []);

  const riversOrLakesSuggestions = (name: string) => {
    setLoading(true);
    api.fishing.getUETKObjectByName({ name }).then((response) => {
      setlistOfRiversAndLakes(response["waterObjects"]);
      setLoading(false);
    });
  };

  const riversOrLakesSuggestionsDebounce = debounce(
    riversOrLakesSuggestions,
    400
  );

  const handleClickOutside = (event) => {
    if (cardRef?.current && !cardRef.current.contains(event.target)) {
      onSetClose(false);
      setError(null);
    }
  };

  useEffect(() => {
    options && options[0] && setWaterType(options[0]);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [fishingArea, lat, lng]);

  const clearSelectFields = () => {
    fishingArea && setFishingArea(null);
    riverOrLake && setRiverOrLake(null);
  };

  const reset = () => {
    setLng(null);
    setLat(null);
    setFishingArea(null);
    setRiverOrLake(null);
    setError(null);
  };

  const handleSetLocation = () => {
    if (riverOrLake?.id && waterType.value === "other") {
      api.location
        .findLocation({ riversAndLakes: riverOrLake })
        .then((response) => {
          const location = response["location"];

          if (location) {
            location.edited = true;
            onLocationSelect(location);
            onSetClose(false);
            reset();
          } else {
            setError("Neteisingas vandens telkinio pavadinimas");
          }
        });
    } else if (fishingArea?.id && waterType.value === "baras") {
      api.location
        .findLocation({ fishingAreaId: fishingArea.id })
        .then((response) => {
          const location = response["location"];

          if (location) {
            location.edited = true;
            onLocationSelect(location);
            onSetClose(false);
            reset();
          } else {
            setError("Neteisingas baro nr.");
          }
        });
    } else if (lat && lng) {
      api.location
        .findLocation({ coordinates: { lat, lng } })
        .then((response) => {
          const location = response["location"];
          if (location) {
            location.edited = true;
            onLocationSelect(location);
            onSetClose(false);
            reset();
          } else {
            setError(
              "Nepavyko rasti vandens telkinio pagal nurodytas koordinates."
            );
          }
        });
    } else {
      setError(
        "Vandens telkinys nerastas. Turite užpildyti bent vieną iš paieškos laukų."
      );
    }
  };

  const handleCancel = () => {
    onSetClose(false);
    if (error) {
      setError(null);
    }
  };

  return (
    <>
      <Card ref={cardRef}>
        {isMobile ? (
          <BackButtonContainer onClick={handleCancel}>
            <BackButton name={"backMobile"} />
          </BackButtonContainer>
        ) : (
          <IconContainer onClick={handleCancel}>
            <StyledExitIcon name="close" />
          </IconContainer>
        )}

        <Title>Esate kitur?</Title>
        <Description>
          Prašome pasirinkti iš sąrašo telkinio pavadinimą arba baro numerį arba
          įrašykite koordinates.
        </Description>

        {options?.length > 1 && (
          <WaterBodyTypeSwitch
            onChange={(option) => {
              setWaterType(option);
            }}
            options={options}
            label={"Baras:"}
          />
        )}
        {waterType?.value === waterObjectType.baras.value && (
          <StyledSelect
            name={`fishingArea`}
            value={fishingArea}
            onChange={handleSearch}
            options={listOfFishingAreas}
            getOptionLabel={(option) => option?.name || ""}
            label="Baras"
            placeholder={"pasirinkite"}
            right={<StyledIcon name={"arrowDown"} />}
          />
        )}
        {waterType?.value === waterObjectType.other.value && (
          <StyledAsyncSelect
            loading={loading}
            name={`river_or_lake`}
            value={riverOrLake}
            onChange={handleSearch}
            label="Vandens telkinys"
            setSuggestionsFromApi={riversOrLakesSuggestionsDebounce}
            padding={isMobile ? "8px 0px" : "0"}
            options={listOfRiversAndLakes}
            getOptionLabel={(option) => option?.name || ""}
            getInputLabel={(option) => option?.name || ""}
            showError={false}
          />
        )}
        {(waterType?.value === waterObjectType.other.value ||
          waterType?.value === waterObjectType.baras.value) && (
          <OrRow>
            <Hr />
            <Or>ARBA</Or>
            <Hr />
          </OrRow>
        )}
        <CoordinatesRow>
          <StyledNumericTextField
            padding={
              isMobile
                ? isSmallMobile
                  ? "0 0 16px 0"
                  : "0 16px 16px 0"
                : "0 16px 0 0"
            }
            label={"ilguma"}
            wholeNumber={false}
            value={lng}
            onChange={(value) => {
              clearSelectFields();
              setLng(value);
            }}
          />
          <StyledNumericTextField
            wholeNumber={false}
            label={"platuma"}
            value={lat}
            onChange={(value) => {
              clearSelectFields();
              setLat(value);
            }}
          />
        </CoordinatesRow>
        <Error>{error}</Error>
        <ButtonRow>
          <StyledButton
            onClick={handleCancel}
            padding={
              isMobile
                ? isSmallMobile
                  ? "0 0 16px 0"
                  : "0 16px 16px 0"
                : "0 40px 0 0"
            }
            variant={"tertiary"}
          >
            Atšaukti
          </StyledButton>
          <StyledButton
            onClick={handleSetLocation}
            variant={"primary"}
            padding={isMobile ? "0 0 16px 0" : "0"}
          >
            Atlikta
          </StyledButton>
        </ButtonRow>
      </Card>
    </>
  );
};

const BackButton = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 2.3rem;
  margin: 24px auto auto 20px;
`;

const StyledAsyncSelect = styled(AsyncAutoComplete)``;

const IconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  z-index: 9;
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: pointer;
  z-index: 91;
`;

const StyledButton = styled(Button)``;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 40px;
  @media ${device.mobileS} {
    justify-content: center;
    flex-direction: column;
  }
`;

const StyledExitIcon = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 3.5rem;
  margin: 10px 10px auto auto;
`;

const CoordinatesRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media ${device.mobileS} {
    flex-direction: column;
  }
`;

const Or = styled.div`
  font: normal normal 600 1.6rem/40px Manrope;
  letter-spacing: 1.02px;
  color: #0b1f518f;
  margin: 0px 24px;
`;

const OrRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 35px 0px;
  width: 100%;
  @media ${device.mobileL} {
    margin: 6px 0px;
  }
`;

const Hr = styled.div`
  background-color: #121a553d;
  width: 100%;
  height: 1px;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin: auto 8px;
  font-size: 1.1rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;

const StyledNumericTextField = styled(NumericTextField)`
  width: 100%;
`;

const Card = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  width: 674px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  margin: auto;
  padding: 76px 64px 64px 64px;
  display: flex;
  margin: auto;
  flex-direction: column;
  @media ${device.mobileL} {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    padding: 76px 16px 0 16px;
  }
`;

const Title = styled.div`
  font: normal normal bold 3.2rem/44px Manrope;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
  text-align: center;
`;

const Description = styled.div`
  text-align: center;
  font: normal normal medium 1.6rem/26px Manrope;
  letter-spacing: 0px;
  color: #7a7e9f;
  margin-bottom: 40px;
`;
const StyledSelect = styled(SelectField)`
  @media ${device.mobileL} {
    margin-top: 16px;
  }
`;

const Error = styled.div`
  text-align: center;
  font-size: 1.4rem;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.error};
  width: 100%;
  /* text-align: left; */
`;

export default EditCard;

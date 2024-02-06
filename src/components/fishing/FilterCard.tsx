import { useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MUNICIPALITIES from "../../sav.json";
import FishFilter from "../fields/FishFilter";
import { device } from "../../styles";
import { UserContext } from "../../utils/AppContextProvider";
import Button from "../buttons/Button";
import FishingState from "../fields/FishingState";
import MultiSelectField from "../fields/MultiSelectField";
import RangeDatepickerFrom from "../fields/RangeDatepickerFrom";
import RangeDatepickerTo from "../fields/RangeDatePickerTo";
import TextField from "../fields/TextField";
import ToolsFilter from "../fields/ToolsFilter";
import Icon from "../other/Icon";
import AsyncAutoComplete from "../fields/AsyncAutoComplete";
import { debounce } from "lodash";
import api from "../../server/routers/api";
import SelectField from "../fields/SelectField";
import { ToolType } from "../../server/models/ToolType";
import { FishType } from "../../server/models/FishType";

interface updateFiltersProps {
  dateRangeFromModal?: Date;
  dateRangeToModal?: Date;
  toolsFilterModal?: Array<string>;
  fishFilterModal?: Array<string>;
  fishingStatusFilterModal?: Array<string>;
  companyNameModal?: string;
  selectMultipleMunicipalitiesModal?: Array<string>;
  fishingAreaModal?: string;
  riverOrLakeModal?: string;
}

interface FilterCardProps {
  fishFilter?: Array<string>;
  toolFilter?: Array<string>;
  riverOrLake?: string;
  fishingArea?: string;
  companyName?: string;
  dateRangeFrom?: Date;
  dateRangeTo?: Date;
  onSetClose?: React.Dispatch<React.SetStateAction<boolean>>;
  fishingStatusFilter?: Array<string>;
  updateFilters?: (props: updateFiltersProps) => void;
  handleMultipleSelect?: (props) => void;
  selectedMunicipalities?: Array<string>;
  toolTypes?: Array<ToolType>;
  fishTypes?: Array<FishType>;
}

const FilterCard = ({
  fishFilter,
  toolFilter,
  riverOrLake,
  fishingArea,
  companyName,
  dateRangeFrom,
  dateRangeTo,
  onSetClose,
  fishingStatusFilter,
  updateFilters,
  handleMultipleSelect,
  selectedMunicipalities,
  toolTypes,
  fishTypes,
}: FilterCardProps) => {
  const { isInspector } = useContext(UserContext);

  const cardRef = useRef(null);
  const [dateRangeFromModal, setDateRangeFrom] = useState(dateRangeFrom);
  const [dateRangeToModal, setDateRangeTo] = useState(dateRangeTo);
  const [fishFilterModal, setFishFilter] = useState(fishFilter);
  const [toolsFilterModal, setToolsFilter] = useState(toolFilter);
  const [fishingStatusFilterModal, setFishingStatusFilter] =
    useState(fishingStatusFilter);

  const [companyNameModal, setCompanyName] = useState(companyName);
  const [selectMultipleMunicipalitiesModal, setSelectMultipleMunicipalities] =
    useState(selectedMunicipalities || []);
  const [showMore, setShowMore] = useState(false);
  const [fishingAreaModal, setFishingArea] = useState(fishingArea);
  const [riverOrLakeModal, setRiverOrLake] = useState(riverOrLake);

  const [listOfRiversAndLakes, setlistOfRiversAndLakes] = useState([]);
  const [listOfFishingAreas, setListOfFishingAreas] = useState([]);
  const [loading, setLoading] = useState(false);

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
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const isMobile = useMediaQuery(device.mobileL);

  const companyFilter = () =>
    isInspector ? (
      <StyledTextFieldSmall
        onChange={(e) => {
          setCompanyName(e.target.value);
        }}
        value={companyNameModal}
        label={"Įmonės pavadinimas"}
        padding="16px 0 0 0"
      />
    ) : null;

  const clearFilters = () => {
    setDateRangeFrom(null);
    setDateRangeTo(null);
    setFishFilter([]);
    setToolsFilter([]);
    setFishingStatusFilter([]);
    setCompanyName("");
    setSelectMultipleMunicipalities([]);
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

        <StyledSelect
          name={`fishingArea`}
          value={fishingAreaModal}
          onChange={(e) => setFishingArea(e)}
          options={listOfFishingAreas}
          getOptionLabel={(option) => option?.name || ""}
          label="Baras"
          placeholder={"pasirinkite"}
          right={<ArrowDownIcon name={"arrowDown"} />}
        />
        <StyledAsyncSelect
          loading={loading}
          name={`river_or_lake`}
          value={riverOrLakeModal}
          onChange={(e) => setRiverOrLake(e)}
          label="Vandens telkinys"
          setSuggestionsFromApi={riversOrLakesSuggestionsDebounce}
          padding={isMobile ? "8px 0px" : "0"}
          options={listOfRiversAndLakes}
          getOptionLabel={(option) => option?.name || ""}
          getInputLabel={(option) => option?.name || ""}
          showError={false}
        />
        {companyFilter()}
        {isInspector ? (
          <MultiSelectField
            id="fish_stocking_multiple_location"
            value={selectMultipleMunicipalitiesModal}
            onSelectAll={() =>
              MUNICIPALITIES.length === selectMultipleMunicipalitiesModal.length
                ? setSelectMultipleMunicipalities([])
                : setSelectMultipleMunicipalities(
                    MUNICIPALITIES.map((m) => m.id)
                  )
            }
            onChange={(m) =>
              handleMultipleSelect({
                value: m.id,
                array: selectMultipleMunicipalitiesModal,
                onSetArray: setSelectMultipleMunicipalities,
              })
            }
            options={MUNICIPALITIES}
            getOptionLabel={(option) => option?.name || ""}
            showError={false}
            right={<ArrowDownIcon name={"arrowDown"} />}
            label="Savivaldybės"
            padding="16px 0px 16px 0px"
          />
        ) : null}
        <ShowMore
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Rodyti mažiau" : "Rodyti visus"}
        </ShowMore>
        {showMore ? (
          <>
            <ToolsFilter
              tools={toolsFilterModal}
              toolstypes={toolTypes}
              handleTools={handleMultipleSelect}
              onSetToolsFilter={setToolsFilter}
            />
            <FishFilter
              fishes={fishFilterModal}
              fishtypes={fishTypes}
              handlefishes={handleMultipleSelect}
              onSetFishFilter={setFishFilter}
            />

            <FishingState
              fishingStatusFilter={fishingStatusFilterModal}
              onSetFishingStatusFilter={setFishingStatusFilter}
              handleFishingStatusFilterSelect={handleMultipleSelect}
            />
          </>
        ) : null}
        <StyledButton
          height={45}
          onClick={() => {
            updateFilters({
              dateRangeFromModal,
              dateRangeToModal,
              toolsFilterModal,
              fishFilterModal,
              fishingStatusFilterModal,
              companyNameModal,
              selectMultipleMunicipalitiesModal,
              fishingAreaModal,
              riverOrLakeModal,
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

const StyledSelect = styled(SelectField)`
  margin-bottom: 16px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
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

const ShowMore = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
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
    min-height: 100%;
  }
`;

const DateRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledTextFieldSmall = styled(TextField)`
  flex: 1;
  min-width: 170px;
`;
const StyledAsyncSelect = styled(AsyncAutoComplete)`
  margin-bottom: 16px;
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
const ArrowDownIcon = styled(Icon)`
  margin: auto 8px;
  cursor: pointer;
  font-size: 1.1rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;

export default FilterCard;

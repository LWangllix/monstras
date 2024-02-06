import { format } from "date-fns";
import { find } from "lodash";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { Permissions } from "../../config";
import { FishType } from "../../server/models/FishType";
import { ToolType } from "../../server/models/ToolType";
import { UserContext } from "../../utils/AppContextProvider";
import { fishingStatesLabels } from "../../utils/constants";
import FilterButton from "../buttons/FilterButton";
import ToggleButton from "../buttons/ToggleButton";
import Icon from "../other/Icon";

interface FishingFilterProps {
  onSetShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showfilter: boolean;
  showClearButton: boolean;
  handleClearFilters: () => void;
  dateRangeFrom: Date;
  onSetDateRangeFrom: React.Dispatch<React.SetStateAction<Date>>;
  dateRangeTo: Date;
  onSetDateRangeTo: React.Dispatch<React.SetStateAction<Date>>;
  onSetCompanyName?: React.Dispatch<React.SetStateAction<string>>;
  companyName?: string;
  fishTypes: Array<FishType>;
  toolTypes: Array<ToolType>;
  handleMultipleSelect: (props) => void;
  showAllMunicipality?: boolean;
  onSetShowAllMunicipality?: React.Dispatch<React.SetStateAction<boolean>>;
  showCompanyFishings?: boolean;
  onSetShowCompanyFishings?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFishTypes: Array<string>;
  onSetFishFilter: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedTools: Array<string>;
  onSetSelectedTools: React.Dispatch<React.SetStateAction<Array<string>>>;
  fishingsStatus: Array<string>;
  onSetFishingsStatus: React.Dispatch<React.SetStateAction<Array<string>>>;
  showFilterButtons: boolean;
  riverOrLake: { name: string; id: string };
  fishingArea: { name: string; id: string };
  onSetRiverOrLake: React.Dispatch<
    React.SetStateAction<Array<{ name: string; id: string }>>
  >;
  onSetFishingArea: React.Dispatch<
    React.SetStateAction<Array<{ name: string; id: string }>>
  >;
}

const FishingFilters = ({
  riverOrLake,
  fishingArea,
  onSetRiverOrLake,
  onSetFishingArea,
  onSetShowFilter,
  showfilter,
  showFilterButtons,
  showClearButton,
  handleClearFilters,
  dateRangeFrom,
  onSetDateRangeFrom,
  dateRangeTo,
  toolTypes,
  onSetDateRangeTo,
  onSetCompanyName,
  companyName,
  fishTypes,
  handleMultipleSelect,
  showAllMunicipality,
  showCompanyFishings,
  onSetShowCompanyFishings = () => {},
  onSetShowAllMunicipality = () => {},
  selectedFishTypes,
  onSetFishFilter,
  selectedTools,
  onSetSelectedTools,
  fishingsStatus,
  onSetFishingsStatus,
}: FishingFilterProps) => {
  const router = useRouter();
  const { tenantUser, hasPermission, isInspector } = useContext(UserContext);
  const inspectoProfile = isInspector && router.pathname?.includes("/vidinis");
  const showUserSwitch = !(hasPermission([Permissions.User.id]) && !tenantUser);

  const renderFilters = () => {
    return (
      <>
        {showFilterButtons ? (
          <Toolbar>
            {inspectoProfile ? (
              <ToggleButton
                options={["Tik mano", "Visos savivaldybės"]}
                onChange={(index) =>
                  index === 0
                    ? onSetShowAllMunicipality(false)
                    : onSetShowAllMunicipality(true)
                }
                selected={showAllMunicipality ? 1 : 0}
              />
            ) : showUserSwitch ? (
              <ToggleButton
                options={["Tik mano", "Visos įmonės"]}
                onChange={(index) =>
                  index === 0
                    ? onSetShowCompanyFishings(false)
                    : onSetShowCompanyFishings(true)
                }
                selected={showCompanyFishings ? 1 : 0}
              />
            ) : (
              <div></div>
            )}
            <FilterButton
              onShowFilterSelect={() => {
                onSetShowFilter(!showfilter);
              }}
            />
          </Toolbar>
        ) : null}
        {showClearButton ? (
          <ClearRow>
            <ClearButton
              onClick={() => {
                handleClearFilters();
              }}
            >
              <StyledIcon name="close" />
              <ClearText>Išvalyti filtrus</ClearText>
            </ClearButton>

            {riverOrLake ? (
              <ClearButton
                onClick={() => {
                  onSetRiverOrLake(null);
                }}
              >
                <StyledIcon name="close" />
                <ClearText>Telkinio pavadinimas: {riverOrLake.name}</ClearText>
              </ClearButton>
            ) : null}
            {fishingArea ? (
              <ClearButton
                onClick={() => {
                  onSetFishingArea(null);
                }}
              >
                <StyledIcon name="close" />
                <ClearText>Baro pavadinimas: {fishingArea.name}</ClearText>
              </ClearButton>
            ) : null}

            {companyName ? (
              <ClearButton
                onClick={() => {
                  onSetCompanyName("");
                }}
              >
                <StyledIcon name="close" />
                <ClearText>Įmonės pavadinimas: {companyName}</ClearText>
              </ClearButton>
            ) : null}

            {selectedFishTypes.length > 0
              ? selectedFishTypes.map((f, index) => (
                  <ClearButton
                    key={`fish_types_btn_${index}`}
                    onClick={() => {
                      handleMultipleSelect({
                        array: selectedFishTypes,
                        value: f,
                        onSetArray: onSetFishFilter,
                      });
                    }}
                  >
                    <StyledIcon name="close" />
                    <ClearText>
                      {find(fishTypes, (fi) => fi?.id === f)?.label}
                    </ClearText>
                  </ClearButton>
                ))
              : null}

            {selectedTools.length > 0
              ? selectedTools.map((t, index) => (
                  <ClearButton
                    key={`tool_btn_${index}`}
                    onClick={() => {
                      handleMultipleSelect({
                        array: selectedTools,
                        value: t,
                        onSetArray: onSetSelectedTools,
                      });
                    }}
                  >
                    <StyledIcon name="close" />
                    <ClearText>
                      {find(toolTypes, (tt) => tt?.id === t)?.label}
                    </ClearText>
                  </ClearButton>
                ))
              : null}
            {fishingsStatus.length > 0
              ? fishingsStatus.map((status, index) => (
                  <ClearButton
                    key={`status_btn_${index}`}
                    onClick={() => {
                      handleMultipleSelect({
                        array: fishingsStatus,
                        value: status,
                        onSetArray: onSetFishingsStatus,
                      });
                    }}
                  >
                    <StyledIcon name="close" />
                    <ClearText>{fishingStatesLabels[status]}</ClearText>
                  </ClearButton>
                ))
              : null}

            {dateRangeFrom !== null ? (
              <ClearButton
                onClick={() => {
                  onSetDateRangeFrom(null);
                }}
              >
                <StyledIcon name="close" />
                <ClearText>
                  Data nuo: {format(new Date(dateRangeFrom), "yyyy-MM-dd")}
                </ClearText>
              </ClearButton>
            ) : null}
            {dateRangeTo !== null ? (
              <ClearButton
                onClick={() => {
                  onSetDateRangeTo(null);
                }}
              >
                <StyledIcon name="close" />
                <ClearText>
                  Data iki: {format(new Date(dateRangeTo), "yyyy-MM-dd")}
                </ClearText>
              </ClearButton>
            ) : null}
          </ClearRow>
        ) : null}
      </>
    );
  };

  return <>{renderFilters()}</>;
};

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 2rem;
`;

const ClearText = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: #121a55;
  margin-left: 8px;
`;

const ClearButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const ClearRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
`;
const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0px 0px;
`;

export default FishingFilters;

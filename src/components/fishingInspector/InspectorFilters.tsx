import { format } from "date-fns";

import React from "react";
import styled from "styled-components";
import MUNICIPALITIES from "../../components/../sav.json";

import Icon from "../other/Icon";

interface ProtocolFilterProps {
  dateRangeFrom: Date;
  onSetDateRangeFrom: React.Dispatch<React.SetStateAction<Date>>;
  dateRangeTo: Date;
  onSetDateRangeTo: React.Dispatch<React.SetStateAction<Date>>;
  tenantSearchName?: string;
  onSetTenantSearchName?: React.Dispatch<React.SetStateAction<string>>;
  waterBodyName: string;
  onSetWaterBodyName: React.Dispatch<React.SetStateAction<string>>;
  inspectorFullName?: string;
  onSetInspectorFullName?: React.Dispatch<React.SetStateAction<string>>;
  fisherFullName?: string;
  onSetFisherFullName?: React.Dispatch<React.SetStateAction<string>>;
  municipality: { id: string; name: string };
  onSetmunicipality: React.Dispatch<React.SetStateAction<string>>;
  showClearButton: boolean;
  handleClearFilters: () => void;
}

const ProtocolFilter = ({
  dateRangeFrom,
  onSetDateRangeFrom,
  dateRangeTo,
  onSetDateRangeTo,
  tenantSearchName,
  onSetTenantSearchName,
  waterBodyName,
  onSetWaterBodyName,
  inspectorFullName,
  onSetInspectorFullName,
  fisherFullName,
  onSetFisherFullName,
  municipality,
  onSetmunicipality,
  showClearButton,
  handleClearFilters,
}: ProtocolFilterProps) => {
  const renderFilters = () => {
    const municipalities = MUNICIPALITIES;
    return (
      <>
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

            {tenantSearchName ? (
              <ClearButton
                onClick={() => {
                  onSetTenantSearchName("");
                }}
              >
                <StyledIcon name="close" />
                <ClearText>Įmonės Pavadinimas: {tenantSearchName}</ClearText>
              </ClearButton>
            ) : null}

            {waterBodyName ? (
              <ClearButton
                onClick={() => {
                  onSetWaterBodyName("");
                }}
              >
                <StyledIcon name="close" />
                <ClearText>
                  Vandens telkinio pavadinimas: {waterBodyName}
                </ClearText>
              </ClearButton>
            ) : null}

            {inspectorFullName ? (
              <ClearButton
                onClick={() => {
                  onSetInspectorFullName("");
                }}
              >
                <StyledIcon name="close" />
                <ClearText>Inspektorius: {inspectorFullName}</ClearText>
              </ClearButton>
            ) : null}

            {fisherFullName ? (
              <ClearButton
                onClick={() => {
                  onSetFisherFullName("");
                }}
              >
                <StyledIcon name="close" />
                <ClearText>Žvejys: {fisherFullName}</ClearText>
              </ClearButton>
            ) : null}

            {municipality ? (
              <ClearButton
                onClick={() => {
                  onSetmunicipality("");
                }}
              >
                <StyledIcon name="close" />
                <ClearText>
                  Savivaldybė:{" "}
                  {municipalities?.find((m) => m.id === municipality.id)?.name}
                </ClearText>
              </ClearButton>
            ) : null}

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
  margin-bottom: 16px;
`;

export default ProtocolFilter;

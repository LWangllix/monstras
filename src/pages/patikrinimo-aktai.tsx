import { useMediaQuery } from "@material-ui/core";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FilterButton from "../components/buttons/FilterButton";
import TextField from "../components/fields/TextField";
import FisherHeader from "../components/fishing/FisherHeader";
import FishingEmptyState from "../components/fishing/FishingEmptyState";
import ProtocolFilter from "../components/fishingInspector/InspectorFilters";
import ProtocolCard from "../components/fishingInspector/ProtocolCard";
import ProtocolFilterCard from "../components/fishingInspector/ProtocolFilterCard";
import Modal from "../components/other/Modal";
import FormLayout from "../monoCommon/components/layouts/FormLayout";
import api from "../server/routers/api";
import { device } from "../styles";

const newTenant = () => {
  const [protocols, setProtocols] = useState([]);
  const isMobile = useMediaQuery(device.mobileL);
  const [dateRangeFrom, setDateRangeFrom] = useState(null);
  const [dateRangeTo, setDateRangeTo] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [waterBodyName, setWaterBodyName] = useState("");
  const [municipality, setmunicipality] = useState("");
  useEffect(() => {
    api.fishing
      .getProtocols({
        dateRangeFrom,
        dateRangeTo,
        waterBodyName,
        municipality,
      })
      .then((response) => {
        const protocols = response["protocols"];
        if (!!protocols) {
          setProtocols(protocols);
        }
      });
  }, [dateRangeFrom, dateRangeTo, waterBodyName, municipality]);

  const empty = isEmpty(protocols);
  const updateFilters = ({
    bodyWaterNameModal,
    dateRangeFromModal,
    dateRangeToModal,
    municipalityModal,
  }) => {
    setWaterBodyName(bodyWaterNameModal);
    setDateRangeFrom(dateRangeFromModal);
    setDateRangeTo(dateRangeToModal);
    setmunicipality(municipalityModal);
  };
  const handleClearFilters = () => {
    setWaterBodyName("");
    setDateRangeFrom(null);
    setDateRangeTo(null);
    setmunicipality("");
    setShowFilter(false);
  };

  const filterApplied =
    dateRangeFrom || dateRangeTo || waterBodyName || municipality;

  return (
    <FormLayout>
      <Container>
        <FisherHeader />
        <InnerContainer>
          <ToolBar>
            <Title>Patikrinimo aktai</Title>
            <Row>
              <InnerRow>
                {!empty || filterApplied ? (
                  <>
                    <StyledTextField
                      value={waterBodyName}
                      onChange={(e) => setWaterBodyName(e.target.value)}
                      padding={"0"}
                      placeholder="Telkinio pavadinimas"
                      isMobile={isMobile}
                    />

                    <FilterButton onShowFilterSelect={setShowFilter} />
                  </>
                ) : null}
              </InnerRow>
            </Row>
          </ToolBar>
          <ProtocolFilter
            dateRangeFrom={dateRangeFrom}
            onSetDateRangeFrom={setDateRangeFrom}
            dateRangeTo={dateRangeTo}
            onSetDateRangeTo={setDateRangeTo}
            waterBodyName={waterBodyName}
            onSetWaterBodyName={setWaterBodyName}
            municipality={{ id: municipality, name: "" }}
            onSetmunicipality={setmunicipality}
            showClearButton={filterApplied}
            handleClearFilters={handleClearFilters}
          />
          {!empty ? (
            (protocols || []).map((protocol, index) => (
              <ProtocolCard key={index} proctocol={protocol} />
            ))
          ) : filterApplied ? (
            <FishingEmptyState title="Niekas nerasta pagal paieškos filtrus" />
          ) : (
            <FishingEmptyState title="Dar nėra jokių patikrinimo aktų" />
          )}
        </InnerContainer>

        <Modal isOpen={showFilter} onBackdropPress={() => setShowFilter(false)}>
          <ProtocolFilterCard
            bodyWaterName={waterBodyName}
            dateRangeFrom={dateRangeFrom}
            dateRangeTo={dateRangeTo}
            onSetClose={setShowFilter}
            updateFilters={updateFilters}
            municipality={municipality}
          />
        </Modal>
      </Container>
    </FormLayout>
  );
};

const Row = styled.div`
  margin: 24px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${device.mobileL} {
    margin-top: 8px;

    flex-direction: column;
  }
`;

const InnerRow = styled.div`
  display: flex;
  align-items: center;
  @media ${device.mobileL} {
    justify-content: space-between;
    width: 100%;
  }
`;

const StyledTextField = styled(TextField)<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? "86%" : "309px")};
  margin-right: 19px;
`;

const ToolBar = styled.div`
  padding: 40px 0 24px 0;
`;

const Title = styled.div`
  font: normal normal bold 2.4rem/40px Manrope;
  color: #121a55;
`;

const InnerContainer = styled.div`
  margin: auto;
  width: 758px;
  display: flex;
  flex: 1;
  flex-direction: column;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const Container = styled.div`
  margin: 0 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media ${device.mobileL} {
    margin: 0 16px;
  }
`;

export default newTenant;

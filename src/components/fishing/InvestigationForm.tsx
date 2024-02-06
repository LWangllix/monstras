import { useMediaQuery } from "@material-ui/core";
import { FieldArray, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../buttons/Button";
import TextField from "../fields/TextField";
import Icon from "../other/Icon";
import { device } from "../../styles";
import { validateInvestigationForm } from "../../utils/validations";
import api from "../../server/routers/api";
import SelectField from "../fields/SelectField";
import NumericTextField from "../fields/NumericTextField";
import MUNICIPALITIES from "../../sav.json";
import { format } from "date-fns";
import AsyncAutoComplete from "../fields/AsyncAutoComplete";
import RangeDatepickerFrom from "../fields/RangeDatepickerFrom";
import RangeDatepickerTo from "../fields/RangeDatePickerTo";
import Datepicker from "../fields/Datepicker";
import SimpleButton from "../buttons/SimpleButton";
import InvestigationFishRow from "./InvestigationFishRow";
import CheckField from "../fields/CheckField";
import FileField from "../fields/FileField";
import { Investigation } from "../../server/models/Investigation";
import FileButton from "../buttons/FileButton";
import { useRouter } from "next/router";
import { UserContext } from "../../utils/AppContextProvider";
import { debounce } from "lodash";
import RadioOptions from "../buttons/RadioOptions";
import { AllowedFishFishing } from "../../utils/constants";

export interface InvestigationFormProps {
  investigation?: Investigation;
  onSubmit?: (values: any) => Promise<void>;
}

const InvestigationForm = ({
  onSubmit,
  investigation,
}: InvestigationFormProps) => {
  const isMobile = useMediaQuery(device.mobileL);
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{
          municipality: investigation?.location?.municipality || "",
          water_body: investigation?.location?.waterBody || {
            id: "",
            name: "",
          },
          water_body_code: investigation?.location?.waterBody?.id || "",
          water_body_area: investigation?.location?.waterBody?.area || "",
          date_from: investigation?.dateFrom
            ? new Date(investigation?.dateFrom)
            : null,
          date_to: investigation?.dateTo
            ? new Date(investigation?.dateTo)
            : null,
          previous_year_date: investigation?.previousYearDate
            ? new Date(investigation?.previousYearDate)
            : null,
          event_date: investigation?.eventDate
            ? new Date(investigation?.eventDate)
            : new Date(),
          total_fish_abundance: investigation?.totalFishAbundance || "",
          total_fish_biomass: investigation?.totalFishBiomass || "",
          fishes:
            investigation?.batches?.length > 0
              ? investigation.batches.map((f) => {
                  return {
                    type: f.fishType,
                    abundance: f.abundance,
                    total_abundance_percent: f.totalAbundancePercent,
                    biomass: f.biomass,
                    total_biomass_percent: f.totalBiomassPercent,
                  };
                })
              : [
                  {
                    type: "",
                    abundance: "",
                    total_abundance_percent: "",
                    biomass: "",
                    total_biomass_percent: "",
                  },
                ],
          predatory_fish_abundance: investigation?.predatoryFishAbundance || "",
          predatory_fish_biomass: investigation?.predatoryFishBiomass || "",
          average_individual_weight:
            investigation?.averageIndividualWeight || "",
          valuable_fish_biomass: investigation?.valuableFishBiomass || "",
          resources_index: investigation?.resourcesIndex || "",
          previous_year_date_resources_index:
            investigation?.previousYearDateResourcesIndex
              ? new Date(investigation?.previousYearDateResourcesIndex)
              : null,
          index: investigation?.index || "",
          is_bussiness_fish_fishing:
            investigation?.isBussinessFishFishing || false,
          allowed_fish_fishing: investigation?.allowedFishFishing
            ? AllowedFishFishing[investigation?.allowedFishFishing]
            : AllowedFishFishing.various,
          allowed_specialized_fish_type:
            investigation?.allowedSpecializedFishType || "",
          file: investigation?.file || null,
        }}
        onSubmit={onSubmit}
        validate={(values) => validateInvestigationForm(values)}
        validateOnChange={false}
      >
        {({ values, errors, handleSubmit, handleChange, setFieldValue }) => {
          const [fishTypes, setfishTypes] = useState(null);
          const [listOfRiversAndLakes, setlistOfRiversAndLakes] = useState([]);
          const [canEdit, setCanEdit] = useState(false);
          const [edit, setEdit] = useState(false);
          const { user } = useContext(UserContext);
          const [loading, setLoading] = useState(false);
          useEffect(() => {
            setCanEdit(investigation?.user?.id === user?.user?.id);
          }, [investigation]);
          const disabled = !!investigation && !edit;
          useEffect(() => {
            api.fishType.list({}).then((response) => {
              const result = response["result"];
              if (!!result) {
                setfishTypes(result);
              }
            });
          }, []);

          const riversOrLakesSuggestions = (name: string) => {
            setLoading(true);
            api.fishing.getUETKObjectByName({ name: name }).then((response) => {
              if (!!response) {
                setlistOfRiversAndLakes(response["waterObjects"]);
                setLoading(false);
              }
            });
          };

          const riversOrLakesSuggestionsDebounce = debounce(
            riversOrLakesSuggestions,
            400
          );

          return (
            <>
              <Title>Mokslinio tyrimo ataskaita</Title>
              <Time>
                {format(new Date(values.event_date), `yyyy-MM-dd H:mm`)}{" "}
              </Time>

              <StyledForm
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                tabIndex={0}
                onSubmit={handleSubmit}
              >
                {canEdit ? (
                  <div>
                    <SimpleButton type="button" onClick={() => setEdit(!edit)}>
                      redaguoti
                    </SimpleButton>
                  </div>
                ) : null}
                <Row margin="4px 0 16px">
                  <StyledAsyncSelect
                    loading={loading}
                    name={`water_body`}
                    value={values.water_body}
                    onChange={(e) => {
                      setFieldValue("water_body", e);
                      setFieldValue("water_body_code", e?.id);
                      setFieldValue(
                        "water_body_area",
                        e?.area ? (e?.area / 10000).toFixed(3) : ""
                      );
                      setFieldValue("municipality", e?.municipality);
                    }}
                    label="Vandens telkinys"
                    setSuggestionsFromApi={riversOrLakesSuggestionsDebounce}
                    padding={isMobile ? "8px 0px" : "0px 0px 0px 0px"}
                    error={errors.water_body as string}
                    options={listOfRiversAndLakes}
                    getOptionLabel={(option) =>
                      option?.id
                        ? `${option?.name || ""}, ${
                            option?.municipality?.name || ""
                          }`
                        : ""
                    }
                    getInputLabel={(option) => option?.name || ""}
                    showError={false}
                    disabled={disabled}
                  />
                  <StyledSelect
                    name={`municipality`}
                    id="fishing_municipality"
                    value={values.municipality}
                    options={MUNICIPALITIES}
                    onChange={(e) => setFieldValue("municipality", e)}
                    getOptionLabel={(option) => option?.name || ""}
                    showError={false}
                    error={errors.municipality as string}
                    right={<StyledIcon name={"arrowDown"} />}
                    label="Savivaldybė"
                    padding={isMobile ? "8px 0px" : "0px 0px 0px 16px"}
                    disabled={true}
                  />
                </Row>
                <Row margin="4px 0 24px">
                  <StyledNumericTextField
                    label="Vandens telkinio kodas"
                    name="water_body_code"
                    padding={isMobile ? "8px 0px" : "0px"}
                    value={values.water_body_code}
                    onChange={(e) => setFieldValue("water_body_code", e)}
                    showError={false}
                    wholeNumber={false}
                    error={errors.water_body_code as string}
                    disabled={disabled}
                  />
                  <StyledNumericTextField
                    label="Vandens telkinio plotas, ha"
                    name="water_body_area"
                    padding={isMobile ? "8px 0px" : "0px 0 0px 16px"}
                    value={values.water_body_area}
                    onChange={(e) => setFieldValue("water_body_area", e)}
                    wholeNumber={false}
                    showError={false}
                    error={errors.water_body_area as string}
                    disabled={disabled}
                  />
                </Row>
                <Subheader>MOKSLINIO TYRIMO ATLIKIMO LAIKOTARPIS</Subheader>
                <Row margin="4px 0 16px">
                  <RangeDatepickerFrom
                    value={values.date_from}
                    onChange={(e) => setFieldValue("date_from", e)}
                    dateTo={values.date_to}
                    error={errors.date_from}
                    disabled={disabled}
                  />
                  <RangeDatepickerTo
                    value={values.date_to}
                    onChange={(e) => setFieldValue("date_to", e)}
                    dateFrom={values.date_from}
                    error={errors.date_to}
                    disabled={disabled}
                  />
                </Row>
                <SecondHeader>Bendras žuvų gausumas ir biomasė</SecondHeader>
                <Description>
                  Laimikyje, perskaičiuotame standartizuotai žvejybos pastangai
                  vienu selektyviu tinklu
                </Description>
                <Row margin="4px 0 16px">
                  <StyledDatepicker
                    label={"Ankstesniais metais"}
                    value={values.previous_year_date}
                    onChange={(e) => setFieldValue("previous_year_date", e)}
                    disabled={disabled}
                  />
                </Row>
                <Row margin="4px 0 24px">
                  <StyledNumericTextField
                    name={`total_fish_abundance`}
                    value={values.total_fish_abundance}
                    onChange={(e) => setFieldValue("total_fish_abundance", e)}
                    label="Bendras žuvų gausumas (vnt)"
                    padding={isMobile ? "8px 0px" : "0px"}
                    error={errors?.total_fish_abundance}
                    showError={false}
                    disabled={disabled}
                    wholeNumber={false}
                  />
                  <StyledNumericTextField
                    name={`total_fish_biomass`}
                    value={values.total_fish_biomass}
                    wholeNumber={false}
                    onChange={(e) => setFieldValue("total_fish_biomass", e)}
                    label="Bendras žuvų biomasė (kg)"
                    padding={isMobile ? "8px 0px" : "0px 0 0px 16px"}
                    error={errors?.total_fish_biomass}
                    showError={false}
                    disabled={disabled}
                  />
                </Row>

                <Subheader>ATSKIRŲ ŽUVŲ RŪŠIŲ GAUSUMAS IR BIOMASĖ</Subheader>
                <FieldArray
                  name="fishes"
                  render={(arrayHelpers) => (
                    <div>
                      {values.fishes?.map((item, index) => {
                        const fishErrors = errors.fishes?.[index];
                        return fishTypes ? (
                          <InvestigationFishRow
                            key={`fishes_row_${index}`}
                            fishTypes={fishTypes}
                            values={values.fishes}
                            item={item}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            arrayHelpers={arrayHelpers}
                            showDelete={values.fishes.length > 1 && !disabled}
                            index={index}
                            errors={fishErrors}
                            disabled={disabled}
                          />
                        ) : null;
                      })}
                      {!disabled ? (
                        <AddFishContainer>
                          <SimpleButton
                            type="button"
                            onClick={() => {
                              arrayHelpers.push({
                                type: "",
                                abundance: "",
                                total_abundance_percent: "",
                                biomass: "",
                                total_biomass_percent: "",
                              });
                            }}
                          >
                            + Pridėti žuvį
                          </SimpleButton>
                        </AddFishContainer>
                      ) : null}
                    </div>
                  )}
                />

                <SecondHeader>Žuvų išteklių būklės indeksas</SecondHeader>
                <Row margin="4px 0 16px">
                  <StyledNumericTextField
                    name={`predatory_fish_abundance`}
                    value={values.predatory_fish_abundance}
                    onChange={(e) =>
                      setFieldValue("predatory_fish_abundance", e)
                    }
                    label="Plėšrių žuvų santykinis gausumas"
                    padding={isMobile ? "8px 0px" : "0px 0 0px 0px"}
                    error={errors?.predatory_fish_abundance}
                    showError={false}
                    disabled={disabled}
                    wholeNumber={false}
                  />
                  <StyledNumericTextField
                    label="Plėšrių žuvų santykinė biomasė"
                    name="predatory_fish_biomass"
                    padding={isMobile ? "8px 0px" : "0px 0 0px 16px"}
                    value={values.predatory_fish_biomass}
                    onChange={(e) => setFieldValue("predatory_fish_biomass", e)}
                    wholeNumber={false}
                    showError={false}
                    error={errors.predatory_fish_biomass as string}
                    disabled={disabled}
                  />
                </Row>
                <Row margin="4px 0 16px">
                  <StyledNumericTextField
                    name={`average_individual_weight`}
                    value={values.average_individual_weight}
                    onChange={(e) =>
                      setFieldValue("average_individual_weight", e)
                    }
                    label="Vidutinis individo svoris (gausumas/biomasė)(g)"
                    padding={isMobile ? "8px 0px" : "0px 0 0px 0px"}
                    error={errors?.average_individual_weight}
                    showError={false}
                    disabled={disabled}
                    wholeNumber={false}
                  />
                </Row>
                <Row margin="4px 0 16px">
                  <StyledNumericTextField
                    name={`valuable_fish_biomass`}
                    value={values.valuable_fish_biomass}
                    onChange={(e) => setFieldValue("valuable_fish_biomass", e)}
                    label="Vertingų, leidžiamo sužvejoti dydžio žuvų santykinė biomasė"
                    padding={isMobile ? "8px 0px" : "0px 0 0px 0px"}
                    error={errors?.valuable_fish_biomass}
                    showError={false}
                    disabled={disabled}
                    wholeNumber={false}
                  />
                </Row>
                <Row margin="4px 0 24px">
                  <StyledNumericTextField
                    name={`resources_index`}
                    value={values.resources_index}
                    onChange={(e) => setFieldValue("resources_index", e)}
                    label="Išteklių būklės indeksas"
                    padding={isMobile ? "8px 0px" : "0px 0 0px 0px"}
                    error={errors?.resources_index}
                    showError={false}
                    disabled={disabled}
                    wholeNumber={false}
                  />
                </Row>
                <Subheader>
                  ANKSTESNIAIS METAIS DARYTŲ MOKSLINIŲ TYRIMŲ METU NUSTATYTAS
                  IŠTEKLIŲ BŪKLĖS INDEKSAS
                </Subheader>
                <Row margin="4px 0 16px">
                  <StyledDatepicker
                    label={"Metai"}
                    value={values.previous_year_date_resources_index}
                    error={errors?.previous_year_date_resources_index}
                    onChange={(e) =>
                      setFieldValue("previous_year_date_resources_index", e)
                    }
                    disabled={disabled}
                  />

                  <StyledNumericTextField
                    name={`index`}
                    value={values.index}
                    onChange={(e) => setFieldValue("index", e)}
                    label="Indeksas"
                    padding={isMobile ? "8px 0px" : "0px 0px 0px 8px"}
                    error={errors?.index}
                    showError={false}
                    disabled={disabled}
                    wholeNumber={false}
                  />
                </Row>
                <SecondHeader>Verslinė žvejyba</SecondHeader>

                <Row margin="24px 0 0 0">
                  <CheckFieldContainer>
                    <CheckFieldTitle>
                      Ar verslinė žvejyba leidžiama?
                    </CheckFieldTitle>
                    <CheckFieldRow>
                      <CheckField
                        onChange={(e) =>
                          setFieldValue(`is_bussiness_fish_fishing`, !e)
                        }
                        value={values.is_bussiness_fish_fishing}
                        disabled={disabled}
                      />
                      <CheckFieldLabel>
                        {" "}
                        Taip, verslinė žvejyba leidžiama
                      </CheckFieldLabel>
                    </CheckFieldRow>
                  </CheckFieldContainer>

                  {values.is_bussiness_fish_fishing ? (
                    <RadioButtonContainer>
                      <CheckFieldTitle>
                        {" "}
                        Kokia žuvų žvejyba leidžiama?
                      </CheckFieldTitle>
                      <StyledRadioOptions
                        direction={"column"}
                        disabled={disabled}
                        options={Object.values(AllowedFishFishing)}
                        name="is_various_fish_fishing"
                        value={values.allowed_fish_fishing}
                        error={errors.allowed_fish_fishing as string}
                        onChange={(e) =>
                          setFieldValue("allowed_fish_fishing", e)
                        }
                      />
                    </RadioButtonContainer>
                  ) : null}
                </Row>
                {fishTypes?.length &&
                values?.allowed_fish_fishing?.value ===
                  AllowedFishFishing.specialized.value ? (
                  <Row margin="16px 0 0 0">
                    <EmptyContainer />
                    <StyledSelectSecond
                      name={`allowed_specialized_fish_type`}
                      value={values.allowed_specialized_fish_type}
                      onChange={(e) =>
                        setFieldValue(`allowed_specialized_fish_type`, e)
                      }
                      options={fishTypes}
                      getOptionLabel={(option) => option?.label || ""}
                      label="Leidžiama specializuota žuvų rūšiai"
                      padding={isMobile ? "8px 0px" : "0px 0px 0px 0px"}
                      error={errors?.allowed_specialized_fish_type}
                      showError={false}
                      editable={false}
                      id={`fallowed_specialized_fish_type`}
                      right={<StyledIcon name={"arrowDown"} />}
                      disabled={disabled}
                    />
                  </Row>
                ) : null}
                <Row margin="24px 0 16px 0">
                  {!disabled ? (
                    <>
                      <FileField
                        error={errors?.file}
                        onChange={(e) => setFieldValue("file", e[0])}
                      />

                      <FileFieldLabel>
                        {values.file
                          ? values.file.name
                          : "Nepasirinktas joks failas"}
                      </FileFieldLabel>
                      {values?.file ? (
                        <ClearContainer
                          onClick={() => setFieldValue("file", null)}
                        >
                          <ClearIcon name={"close"} />
                        </ClearContainer>
                      ) : null}
                    </>
                  ) : investigation?.file ? (
                    <FileButton
                      fileName={investigation.file.name}
                      fileUrl={investigation.file.url}
                    />
                  ) : null}
                </Row>

                {!disabled ? (
                  <ButtonRow>
                    <Button
                      variant="primary"
                      type="submit"
                      padding={isMobile ? "0px" : "0px 34px 0 0"}
                    >
                      Saugoti
                    </Button>
                    <Button
                      variant="tertiary"
                      type="button"
                      padding={isMobile ? "16px  0px" : "0px 34px 0 0"}
                      onClick={() => router.replace("/moksliniai-tyrimai")}
                    >
                      Atšaukti
                    </Button>
                  </ButtonRow>
                ) : null}
              </StyledForm>
            </>
          );
        }}
      </Formik>
    </>
  );
};

const StyledTextInput = styled(TextField)`
  flex: 1;
`;

const StyledDatepicker = styled(Datepicker)`
  width: 50%;
  @media ${device.mobileL} {
    width: 100%;
  }
`;
const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledRadioOptions = styled(RadioOptions)`
  padding: 0;
  label {
    padding-left: 0 !important;
    margin-left: 0;
  }
  div {
    margin: 0;
  }
`;

const CheckFieldLabel = styled.div`
  font: normal normal medium 16px/22px Manrope;
  color: #2c2760;
`;

const EmptyContainer = styled.div`
  flex: 1;
  margin-right: 16px;
  @media ${device.mobileL} {
    display: none;
  }
`;
const CheckFieldRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CheckFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-right: 16px;
  @media ${device.mobileL} {
    margin-right: 0px;
    width: 100%;
    margin-bottom: 16px;
  }
`;
const CheckFieldTitle = styled.div`
  font: normal normal 600 16px/40px Manrope;
  color: #0b1f51;
  margin-bottom: 8px;
`;

const Title = styled.div`
  font: normal normal bold 3.2rem/40px Manrope;
  color: #121a55;
`;

const FileFieldLabel = styled.div`
  font: normal normal 600 1.6rem/40px Manrope;
  color: #0b1f518f;
  margin-left: 16px;
  @media ${device.mobileL} {
    margin-left: 0px;
  }
`;

const SecondHeader = styled.div`
  font: normal normal bold 20px/40px Manrope;
  color: #121a55;
  margin-top: 24px;
`;

const Time = styled.div`
  font: normal normal medium 1.4rem/19px Manrope;
  color: #121a558f;
  margin-bottom: 32px;
`;

const StyledSelect = styled(SelectField)`
  flex: 1;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const StyledAsyncSelect = styled(AsyncAutoComplete)`
  flex: 1;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const StyledForm = styled(Form)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div<{ margin: string }>`
  display: flex;
  margin: ${({ margin }) => `${margin}`};
  @media ${device.mobileL} {
    flex-direction: column;
    width: 100%;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 16px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledNumericTextField = styled(NumericTextField)`
  flex: 1;
  @media ${device.mobileL} {
    max-width: 100%;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin: auto 8px;
  font-size: 1.1rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;

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

const StyledSelectSecond = styled(SelectField)`
  flex: 1;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const Description = styled.div`
  font: normal normal medium 16px/40px Manrope;
  color: #7e83a3;
`;
const AddFishContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 0;
`;

const Subheader = styled.div`
  font: normal normal bold 14px/19px Manrope;
  letter-spacing: 0.56px;
  color: #121a558f;
  text-transform: uppercase;
`;

export default InvestigationForm;

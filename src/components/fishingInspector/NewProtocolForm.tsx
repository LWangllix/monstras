import { useMediaQuery } from "@material-ui/core";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../buttons/Button";
import TextField from "../fields/TextField";
import Icon from "../other/Icon";
import { device } from "../../styles";
import SimpleButton from "../buttons/SimpleButton";
import { validateProtocol } from "../../utils/validations";
import api from "../../server/routers/api";
import ProtocolFishRow from "../fishing/ProtocolFishRow";
import RadioOptions from "../buttons/RadioOptions";
import SelectField from "../fields/SelectField";
import TextArea from "../fields/TextArea";
import NumericTextField from "../fields/NumericTextField";
import MUNICIPALITIES from "../../components/../sav.json";
import { format } from "date-fns";
import AsyncAutoComplete from "../fields/AsyncAutoComplete";
import {
  Check,
  DuringTheInspection,
  Infringement,
  PlaceOfInspection,
  waterObjectType,
} from "../../utils/constants";
import { Location } from "../../types";
import Loader from "../other/Loader";
import { Event } from "../../server/models/Event";
const NewProtocolForm = ({ onSubmit }) => {
  const isMobile = useMediaQuery(device.mobileL);
  const router = useRouter();

  const [event, setEvent] = useState<Event>(undefined);
  const [location, setLocation] = useState<Location>(undefined);

  useEffect(() => {
    if (!!router?.query?.ivykis?.toString()) {
      api.fishing
        .getEventById({ eventId: router?.query?.ivykis?.toString() })
        .then((response) => {
          const event = response["event"];
          if (typeof event !== "undefined") {
            setEvent(event);
          } else {
            setEvent(null);
          }
        });
    } else {
      setEvent(null);
    }
  }, [router?.query]);

  useEffect(() => {
    const showPosition = (position) => {
      api.location
        .findLocation({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        })
        .then((response) => {
          const location = response["location"];
          if (typeof location !== "undefined") {
            setLocation(location);
          } else {
            setLocation(null);
          }
        });
    };
    const showError = () => {
      setLocation(null);
    };
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }, []);
  return (
    <>
      {typeof event !== "undefined" && typeof location !== "undefined" ? (
        <Formik
          initialValues={{
            comment: "",
            municipality:
              event?.location?.municipality || location?.municipality || "",
            user: event
              ? {
                  id: event?.user?.id,
                  full_name: `${event?.user?.name} ${event?.user?.lastName} `,
                }
              : { id: "", full_name: "" },
            place_of_inspection: { label: "", value: "" },
            fishing_catch_check: { label: "", value: "" },
            water_object_type:
              event?.location?.waterBody?.type === "other"
                ? waterObjectType.other
                : location?.waterBody?.type === "other"
                ? waterObjectType.other
                : waterObjectType.baras,
            fishing_catch_infringement: { label: "", value: "" },
            during_the_inspection: { label: "", value: "" },
            tools_check: { label: "", value: "" },
            tools_infringement: { label: "", value: "" },
            documentation_check: { label: "", value: "" },
            side_fishes_catch_type: "",
            side_fishing_catch: "",
            census_location: location?.waterBody?.name || "",
            water_body:
              event?.location?.waterBody?.type === "baras"
                ? event?.location?.waterBody
                : location?.waterBody?.type === "baras"
                ? location?.waterBody
                : { id: "", name: "" },
            tenant: event?.tenant || { id: "", name: "" },
            river_or_lake:
              event?.location?.waterBody?.type === "other"
                ? event?.location?.waterBody
                : location?.waterBody?.type === "other"
                ? location?.waterBody
                : { id: "", name: "" },
            date: new Date(),

            fishes: [
              {
                type: "",
                business_size: "",
                amount: "",
                stored_fish_amount: "",
                side_fishing_catch: "",
              },
            ],
          }}
          onSubmit={onSubmit}
          validate={(values) => validateProtocol(values)}
          validateOnChange={false}
        >
          {({ values, errors, handleSubmit, handleChange, setFieldValue }) => {
            const [fishTypes, setfishTypes] = useState(null);
            const [listOfRiversAndLakes, setlistOfRiversAndLakes] = useState(
              []
            );
            const [tenants, setTenants] = useState([]);
            const [users, setUsers] = useState([]);
            const [listOfFishingAreas, setListOfFishingAreas] = useState([]);
            const [loading, setLoading] = useState(false);
            const TenantsSuggestion = (name: string) => {
              api.inspector.tenantSearch({ name }).then((response) => {
                setTenants(response["tenants"]);
              });
            };
            useEffect(() => {
              api.fishType.list({}).then((response) => {
                const result = response["result"];
                if (!!result) {
                  setfishTypes(result);
                }
              });
              api.fishing.listOfFishingAreas({}).then((response) => {
                setListOfFishingAreas(response["fishingAreas"]);
              });
            }, []);

            const riversOrLakesSuggestions = (name: string) => {
              setLoading(true);
              api.fishing
                .getUETKObjectByName({ name: name })
                .then((response) => {
                  setlistOfRiversAndLakes(response["waterObjects"]);
                  setLoading(false);
                });
            };

            const UsersSuggestion = (name: string) => {
              api.inspector
                .userSearch({
                  tenantId: values.tenant.id !== "" ? values.tenant.id : null,
                  fullName: name,
                })
                .then((response) => {
                  setUsers(response["users"]);
                });
            };
            return (
              <>
                <Title>Žvejybos patikrinimo aktas</Title>
                <Time>{format(new Date(values.date), `yyyy-MM-dd H:mm`)} </Time>

                <StyledForm
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  tabIndex={0}
                  onSubmit={handleSubmit}
                >
                  <RadioButtonContainer>
                    <RadioButtonLabel>Tipas:</RadioButtonLabel>
                    <StyledRadioOptions
                      options={Object.values(waterObjectType)}
                      name="water_object_type"
                      value={values.water_object_type}
                      error={errors.water_object_type as string}
                      onChange={(e) => setFieldValue("water_object_type", e)}
                    />
                  </RadioButtonContainer>
                  <Row margin="16px 0 0 0">
                    <StyledSelectFirst
                      name={`municipality`}
                      id="fishing_municipality"
                      value={values.municipality}
                      options={MUNICIPALITIES}
                      onChange={(e) => setFieldValue("municipality", e)}
                      getOptionLabel={(option) =>
                        option?.name || option?.label || ""
                      }
                      showError={false}
                      error={errors.municipality as string}
                      right={<StyledIcon0 name={"arrowDown"} />}
                      label="Savivaldybė"
                      padding={isMobile ? "8px 0px" : "8px 0 8px 0px"}
                    />

                    {values.water_object_type.value !== "other" ? (
                      <>
                        <StyledSelectFirst
                          name={`water_body`}
                          id="water_body"
                          label="Baras"
                          value={values.water_body}
                          onChange={(e) => setFieldValue("water_body", e)}
                          options={listOfFishingAreas}
                          getOptionLabel={(option) => option?.name || ""}
                          showError={false}
                          right={<StyledIcon0 name={"arrowDown"} />}
                          padding={isMobile ? "8px 0px" : "8px 16px"}
                        />
                      </>
                    ) : (
                      <StyledAsyncSelectSecond
                        loading={loading}
                        name={`river_or_lake`}
                        value={values.river_or_lake}
                        onChange={(e) => setFieldValue("river_or_lake", e)}
                        label="Vandens telkinys"
                        setSuggestionsFromApi={riversOrLakesSuggestions}
                        padding={isMobile ? "8px 0px" : "8px 16px"}
                        error={errors.river_or_lake as string}
                        options={listOfRiversAndLakes}
                        getOptionLabel={(option) => option?.name || ""}
                        getInputLabel={(option) => option?.name || ""}
                        showError={false}
                      />
                    )}

                    <StyledTextInput
                      label="Surašymo vieta"
                      name="census_location"
                      padding={"8px 0px"}
                      value={values.census_location}
                      onChange={handleChange}
                      error={errors.census_location as string}
                    />
                  </Row>
                  <Row margin="0px 0 32px 0">
                    <StyledAsyncAutoComplete
                      loading={loading}
                      name={`tenant`}
                      value={values.tenant}
                      onChange={(e) => setFieldValue("tenant", e)}
                      label="Įmonės pavadinimas"
                      setSuggestionsFromApi={TenantsSuggestion}
                      padding={isMobile ? "8px 0px" : "8px 16px 8px 0px"}
                      error={errors.tenant as string}
                      options={tenants}
                      getOptionLabel={(option) => option?.name || ""}
                      getInputLabel={(option) => option?.name || ""}
                      showError={false}
                    />
                    <StyledAsyncAutoComplete
                      loading={loading}
                      name={`user`}
                      value={values.user}
                      onChange={(e) => setFieldValue("user", e)}
                      label="Įmonės atstovo vardas ir pavardė"
                      setSuggestionsFromApi={UsersSuggestion}
                      padding={isMobile ? "8px 0px" : "8px 0 8px 0px"}
                      error={errors.user as string}
                      options={users}
                      getOptionLabel={(option) => option?.full_name || ""}
                      getInputLabel={(option) => option?.full_name || ""}
                      showError={false}
                    />
                  </Row>
                  <RadioButtonContainer>
                    <RadioButtonLabel>
                      Žvejybos tikrinimo vieta:
                    </RadioButtonLabel>
                    <StyledRadioOptions
                      options={Object.values(PlaceOfInspection)}
                      name="place_of_inspection"
                      value={values.place_of_inspection}
                      error={errors.place_of_inspection as string}
                      onChange={(e) => setFieldValue("place_of_inspection", e)}
                    />
                  </RadioButtonContainer>

                  <Description>
                    {" "}
                    ŽVEJYBOS DOKUMENTACIJOS TIKRINIMAS{" "}
                  </Description>
                  <RadioButtonContainer>
                    <RadioButtonLabel>Tikrinta:</RadioButtonLabel>
                    <StyledRadioOptions
                      options={Object.values(Check)}
                      name="documentation_check"
                      value={values.documentation_check}
                      error={errors.documentation_check as string}
                      onChange={(e) => setFieldValue("documentation_check", e)}
                    />
                  </RadioButtonContainer>
                  <Description> ŽVEJYBOS ĮRANKIŲ TIKRINIMAS</Description>
                  <RadioButtonContainer>
                    <RadioButtonLabel>Tikrinta:</RadioButtonLabel>
                    <StyledRadioOptions
                      options={Object.values(Check)}
                      name="tools_check"
                      value={values.tools_check}
                      error={errors.tools_check as string}
                      onChange={(e) => setFieldValue("tools_check", e)}
                    />
                  </RadioButtonContainer>
                  {values.tools_check.value === "true" ? (
                    <RadioButtonContainer>
                      <RadioButtonLabel>Nustatyta pažeidimų:</RadioButtonLabel>
                      <StyledRadioOptions
                        options={Object.values(Infringement)}
                        name="tools_infringement"
                        value={values.tools_infringement}
                        error={errors.tools_infringement as string}
                        onChange={(e) => setFieldValue("tools_infringement", e)}
                      />
                    </RadioButtonContainer>
                  ) : null}

                  <Description> ŽVEJYBOS LAIMIKIO TIKRINIMAS</Description>
                  <RadioButtonContainer>
                    <RadioButtonLabel>Tikrinta:</RadioButtonLabel>
                    <StyledRadioOptions
                      options={Object.values(Check)}
                      name="fishing_catch_check"
                      value={values.fishing_catch_check}
                      error={errors.fishing_catch_check as string}
                      onChange={(e) => setFieldValue("fishing_catch_check", e)}
                    />
                  </RadioButtonContainer>
                  {values.fishing_catch_check.value === "true" ? (
                    <>
                      <RadioButtonContainer>
                        <RadioButtonLabel>
                          Nustatyta pažeidimų:
                        </RadioButtonLabel>
                        <StyledRadioOptions
                          options={Object.values(Infringement)}
                          name="fishing_catch_infringement"
                          value={values.fishing_catch_infringement}
                          error={errors.fishing_catch_infringement as string}
                          onChange={(e) =>
                            setFieldValue("fishing_catch_infringement", e)
                          }
                        />
                      </RadioButtonContainer>
                      <div>
                        <Row margin="0px 0 16px 0">
                          <FieldArray
                            name="fishes"
                            render={(arrayHelpers) => (
                              <div>
                                {values.fishes?.map((item, index) => {
                                  const fishErrors = errors.fishes?.[index];
                                  return fishTypes ? (
                                    <ProtocolFishRow
                                      key={`fishes_row_${index}`}
                                      fishTypes={fishTypes}
                                      values={values.fishes}
                                      item={item}
                                      setFieldValue={setFieldValue}
                                      arrayHelpers={arrayHelpers}
                                      showDelete={values.fishes.length > 1}
                                      index={index}
                                      errors={fishErrors}
                                      disabled={false}
                                    />
                                  ) : null;
                                })}
                                <AddFishContainer>
                                  <SimpleButton
                                    type="button"
                                    onClick={() => {
                                      arrayHelpers.push({
                                        type: "",
                                        business_size: "",
                                        amount: "",
                                        stored_fish_amount: "",
                                        side_fishing_catch: "",
                                      });
                                    }}
                                  >
                                    + Pridėti žuvį
                                  </SimpleButton>
                                </AddFishContainer>
                              </div>
                            )}
                          />
                        </Row>
                      </div>
                      <SmallText>
                        *Šalutinis žvejybos laimikis skaičiuojamas tik tais
                        atvejais, kai, pareigūno nuomone, gali būti viršytas
                        saugomų žuvų šalutinis žvejybos laimikis.
                      </SmallText>
                      <RadioButtonLabel>
                        Tikrinimo metu bendras saugomų žuvų šalutinis žvejybos
                        laimikis:
                      </RadioButtonLabel>

                      <Row margin="16px 0">
                        {fishTypes.length > 0 ? (
                          <StyledSelect
                            name={`side_fishes_catch_type`}
                            value={values.side_fishes_catch_type}
                            onChange={(e) =>
                              setFieldValue(`side_fishes_catch_type`, e)
                            }
                            options={fishTypes}
                            getOptionLabel={(option) => option?.label || ""}
                            label="Žuvų rūšis"
                            padding={isMobile ? "8px 0px" : "8px 8px 8px 0px"}
                            error={errors?.side_fishes_catch_type}
                            showError={false}
                            editable={false}
                            id={`side_fishes_catch_type`}
                            right={<StyledIcon0 name={"arrowDown"} />}
                          />
                        ) : null}
                        <StyledNumericTextField
                          name={`side_fishing_catch`}
                          value={values.side_fishing_catch}
                          onChange={(e) =>
                            setFieldValue(`side_fishing_catch`, e)
                          }
                          label="Šalutinis žvejybos laimikis*"
                          padding={isMobile ? "8px 0px" : "8px 0 8px 8px"}
                          error={errors?.side_fishing_catch}
                          showError={false}
                          wholeNumber={false}
                          right={<InputInnerLabel>%</InputInnerLabel>}
                        />
                      </Row>
                    </>
                  ) : null}

                  <RadioButtonContainer>
                    <RadioButtonLabel>Patikrinimo metu::</RadioButtonLabel>
                    <StyledRadioOptions
                      options={Object.values(DuringTheInspection)}
                      name="during_the_inspection"
                      value={values.during_the_inspection}
                      error={errors.during_the_inspection as string}
                      onChange={(e) =>
                        setFieldValue("during_the_inspection", e)
                      }
                    />
                  </RadioButtonContainer>
                  {values.during_the_inspection.value === "true" ? (
                    <>
                      <SmallText>
                        Pažeisti Verslinės žvejybos vidaus vandenyse, įskaitant
                        bendrąja daline nuosavybės teise priklausančius
                        valstybei ir ūkio subjektams vandens telkinius, išskyrus
                        privačius vidaus vandenų telkinius ir akvakultūros
                        tvenkinius, tvarkos aprašo ar kito (-ų), verslinę
                        žvejybą reglamentuojančio teisės akto (-ų), punktas
                        (-ai):
                      </SmallText>
                      <StyledTextArea
                        name="comment"
                        placeholder="punktai"
                        value={values.comment}
                        error={errors.comment}
                        onChange={(e) => setFieldValue(`comment`, e)}
                        rows={4}
                      />
                    </>
                  ) : null}

                  <ButtonRow>
                    <Button
                      variant="primary"
                      type="submit"
                      padding={isMobile ? "0px" : "0px 34px 0 0"}
                    >
                      Testi
                    </Button>
                  </ButtonRow>
                </StyledForm>
              </>
            );
          }}
        </Formik>
      ) : (
        <Loader />
      )}
    </>
  );
};

const StyledTextInput = styled(TextField)`
  flex: 1;
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 16px;
  margin-bottom: 50px;
`;

const InputInnerLabel = styled.div`
  margin: auto 8px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary + "8F"};
`;

const Title = styled.div`
  font: normal normal bold 3.2rem/40px Manrope;
  color: #121a55;
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

const SmallText = styled.div`
  font: normal normal 600 1.2rem/18px Manrope;
  color: #0b1f51;
  margin: 16px 0px 20px 0px;
`;

const Description = styled.div`
  font: normal normal bold 1.4rem/19px Manrope;
  letter-spacing: 0.56px;
  color: #121a558f;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Time = styled.div`
  font: normal normal medium 1.4rem/19px Manrope;
  color: #121a558f;
  margin-bottom: 32px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;
const RadioButtonLabel = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  color: #0b1f51;
`;

const StyledSelect = styled(SelectField)`
  @media ${device.mobileL} {
    width: 100%;
  }
`;
const StyledSelectFirst = styled(SelectField)`
  width: 33% !important;
  @media ${device.mobileL} {
    width: 100% !important;
  }
`;

const StyledAsyncSelectSecond = styled(AsyncAutoComplete)`
  width: 33% !important;
  @media ${device.mobileL} {
    width: 100% !important;
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
    margin-top: 0px;
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
  min-width: 73px;
  max-width: 195px;
  @media ${device.mobileL} {
    max-width: 100%;
  }
`;

const StyledIcon0 = styled(Icon)`
  cursor: pointer;
  margin: auto 8px;
  font-size: 1.1rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;

const StyledAsyncAutoComplete = styled(AsyncAutoComplete)`
  flex: 1;
`;

const AddFishContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 0;
`;

export default NewProtocolForm;

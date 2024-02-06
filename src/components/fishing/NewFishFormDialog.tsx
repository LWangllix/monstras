import { useMediaQuery } from "@material-ui/core";
import { FieldArray, Form, Formik } from "formik";
import { keys } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tool } from "../../server/models/Tool";
import api from "../../server/routers/api";
import { device } from "../../styles";
import { validateFish } from "../../utils/validations";
import Button from "../buttons/Button";
import SimpleButton from "../buttons/SimpleButton";
import Icon from "../other/Icon";
import Modal from "../other/Modal";
import NewFishesOnShoreRow from "./NewFishesOnShoreRow";

interface NewFishFormDialogProps {
  visible: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (props) => void;
  tool: Tool;
  toolFish: any;
}

const NewFishFormDialog = ({
  visible,
  onClose,
  onSubmit,
  tool,
  toolFish,
}: NewFishFormDialogProps) => {
  const isMobile = useMediaQuery(device.mobileL);
  const [fishTypes, setfishTypes] = useState(null);

  useEffect(() => {
    api.fishType.list({}).then((response) => {
      const result = response["result"];
      if (!!result) {
        setfishTypes(result);
      }
    });
  }, []);

  const handleSubmit = (values) => {
    onClose(false);
    onSubmit(values.fishes);
  };

  const initializeToolFish = () => {
    if (keys(toolFish).includes(tool?.group_id?.toString())) {
      return toolFish[tool?.group_id];
    }
    return [
      {
        type: { label: "" },

        weight: "",
      },
    ];
  };

  return (
    <Modal isOpen={visible}>
      <Container>
        <Content>
          <Row>
            <StyledCloseButton fun={() => onClose(false)} name={"close"} />
          </Row>
          <ScrollableContainer>
            <Formik
              initialValues={{
                fishes: initializeToolFish(),
              }}
              onSubmit={handleSubmit}
              validate={(values) => validateFish(values)}
              validateOnChange={false}
            >
              {({ values, errors, handleSubmit, setFieldValue }) => {
                return (
                  <StyledForm
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    tabIndex={0}
                    onSubmit={handleSubmit}
                  >
                    <FieldArray
                      name="fishes"
                      render={() => (
                        <>
                          <Subheader>SUŽVEJOTAS LAIMIKIS</Subheader>
                          <FieldArray
                            name="fishes"
                            render={(arrayHelpers) => (
                              <>
                                {values.fishes?.map((item, index) => {
                                  const fishErrors = errors[item.type.id];
                                  return fishTypes ? (
                                    <NewFishesOnShoreRow
                                      key={`fishes_row_${index}`}
                                      fishTypes={fishTypes}
                                      values={values.fishes}
                                      item={item}
                                      setFieldValue={setFieldValue}
                                      arrayHelpers={arrayHelpers}
                                      showDelete={values.fishes.length >= 0}
                                      index={index}
                                      errors={fishErrors}
                                      disabled={false}
                                      rowName="fishes"
                                    />
                                  ) : null;
                                })}
                                <AddFishContainer>
                                  <SimpleButton
                                    type="button"
                                    onClick={() => {
                                      arrayHelpers.push({
                                        type: "",
                                        weight: "",
                                      });
                                    }}
                                  >
                                    + Pridėti žuvį
                                  </SimpleButton>
                                </AddFishContainer>
                              </>
                            )}
                          />
                        </>
                      )}
                    />
                    <ButtonRow>
                      <Button
                        variant="primary"
                        type="submit"
                        padding={isMobile ? "10px 0px 0px 0px" : "0px 34px 0 0"}
                      >
                        Atlikta
                      </Button>
                    </ButtonRow>
                  </StyledForm>
                );
              }}
            </Formik>
          </ScrollableContainer>
        </Content>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  margin: auto;
  margin: 0px auto;
  height: 100%;
  @media ${device.mobileL} {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  width: 600px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;

  @media ${device.mobileL} {
    width: 100%;
    margin: 0
    box-shadow: none;
    border-radius: 0;
    height: 100%;
  }
`;

const ScrollableContainer = styled.div`
  padding: 16px 32px;
  box-sizing: border-box;
  @media ${device.mobileL} {
    width: 100%;
    padding: 16px;
  }
`;

const StyledForm = styled(Form)`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  display: flex;
  margin-bottom: 32px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const Subheader = styled.h2`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.tertiary};
  margin-top: 16px;
  margin-bottom: 16px;
`;

const AddFishContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 0;
`;

const StyledCloseButton = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 3.2rem;
  margin: auto 0 auto auto;
  cursor: pointer;
  padding: 30px 30px 0 30px;
  @media ${device.mobileL} {
    padding: 16px 16px 0 16px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

export default NewFishFormDialog;

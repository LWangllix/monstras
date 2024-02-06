import { format } from "date-fns";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../utils/AppContextProvider";
import CheckField from "../fields/CheckField";
import Signature from "../fields/Signature";
import Icon from "../other/Icon";
import ProtocolFishTable from "./ProtocolFishTable";

const SignatureForm = ({
  values,
  signature,
  refuseSign,
  onSetSignature,
  onSetRefuseSign,
}) => {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const handleSignature = (isEmpty, signature) => {
    if (!isEmpty) {
      onSetSignature(signature);
    } else {
      onSetSignature(null);
    }
    setVisible(false);
  };
  return (
    <SignatureInnerContainer>
      <InnerContainer>
        <Title>Žvejybos patikrinimo aktas</Title>
        <Description>
          {format(new Date(values?.date), `yyyy-MM-dd H:mm`)},{" "}
          {values?.census_location}{" "}
        </Description>
        <FirstInnerContainer>
          <Column>
            <Tenant>{values?.tenant?.name || "Individuali veikla"}</Tenant>
            <Line>
              <StyledIcon name="Searchlocation" />
              <StyledText>{values?.municipality?.name}</StyledText>
            </Line>
            <Line>
              <StyledIcon name="water" />
              <StyledText>{values?.body_water}</StyledText>
            </Line>
            <Line>
              <StyledIcon name="user" />
              <StyledText>{values?.user?.full_name}</StyledText>
            </Line>
          </Column>
          <Line>
            <VerifiedIcon name="verified" />
            <StyledText>
              {user.user?.name} {user.user?.lastName}
            </StyledText>
          </Line>
        </FirstInnerContainer>
        <SecondLine>
          <Label>Žvejybos tikrinimo vieta:</Label>{" "}
          <OptionValue>{values?.place_of_inspection?.label}</OptionValue>{" "}
        </SecondLine>
        <SubTitle>A. ŽVEJYBOS DOKUMENTACIJOS TIKRINIMAS</SubTitle>
        <SecondLine>
          <Label>Nustatyta pažeidimų:</Label>{" "}
          <OptionValue>{values?.documentation_check?.label}</OptionValue>{" "}
        </SecondLine>
        <SubTitle>B. ŽVEJYBOS ĮRANKIŲ TIKRINIMAS</SubTitle>
        <SecondLine>
          <Label>Tikrinta:</Label>{" "}
          <OptionValue>{values?.tools_check?.label}</OptionValue>{" "}
        </SecondLine>
        {values?.tools_check?.value === "true" ? (
          <SecondLine>
            <Label>Nustatyta pažeidimų:</Label>{" "}
            <OptionValue>{values?.tools_infringement?.label}</OptionValue>{" "}
          </SecondLine>
        ) : null}
        <SubTitle>C. ŽVEJYBOS LAIMIKIO TIKRINIMAS</SubTitle>
        <SecondLine>
          <Label>Tikrinta:</Label>{" "}
          <OptionValue>{values?.tools_check?.label}</OptionValue>{" "}
        </SecondLine>
        {values?.fishing_catch_check?.value === "true" ? (
          <>
            <SecondLine>
              <Label>Nustatyta pažeidimų:</Label>{" "}
              <OptionValue>
                {values?.fishing_catch_infringement?.label}
              </OptionValue>{" "}
            </SecondLine>
            <ProtocolFishTable fishes={values.fishes} />
            {values?.fishing_catch_infringement?.value === "true" &&
            values?.side_fishing_catch ? (
              <>
                <SmallText>
                  *Šalutinis žvejybos laimikis skaičiuojamas tik tais atvejais,
                  kai, pareigūno nuomone, gali būti viršytas saugomų žuvų
                  šalutinis žvejybos laimikis.
                </SmallText>
                <SideCatchText>
                  Tikrinimo metu bendras saugomų žuvų{" "}
                  {<Bold>({values?.side_fishes_catch_type?.label})</Bold>}{" "}
                  šalutinis žvejybos laimikis yra{" "}
                  {<Bold>{values?.side_fishing_catch} %.</Bold>}
                </SideCatchText>
              </>
            ) : null}
          </>
        ) : null}
        <SecondLine>
          <Label>Patikrinimo metu:</Label>{" "}
          <OptionValue>{values?.during_the_inspection?.label}</OptionValue>{" "}
        </SecondLine>
        {values?.during_the_inspection?.value === "true" ? (
          <>
            <SmallText>
              Pažeisti Verslinės žvejybos vidaus vandenyse, įskaitant bendrąja
              daline nuosavybės teise priklausančius valstybei ir ūkio
              subjektams vandens telkinius, išskyrus privačius vidaus vandenų
              telkinius ir akvakultūros tvenkinius, tvarkos aprašo ar kito (-ų),
              verslinę žvejybą reglamentuojančio teisės akto (-ų), punktas
              (-ai):
            </SmallText>
            <DuringInspectionText>{values?.comment}</DuringInspectionText>
          </>
        ) : null}
        <SignatureRow>
          <SignedBy>{values?.user?.full_name}</SignedBy>
          <Signature
            onSubmit={handleSignature}
            signature={signature}
            onClose={() => setVisible(false)}
            onSetOpen={() => setVisible(true)}
            visible={visible}
          />
        </SignatureRow>
        <CheckBoxRow>
          <CheckField
            value={refuseSign}
            onChange={() => onSetRefuseSign(!refuseSign)}
          />
          <CheckBoxLabel>
            Juridinio asmens atstovas ar fizinis asmuo atsisako pasirašyti
            patikrinimo aktą
          </CheckBoxLabel>
        </CheckBoxRow>
      </InnerContainer>
    </SignatureInnerContainer>
  );
};

const InnerContainer = styled.div`
  padding: 0 32px;
`;

const StyledText = styled.span`
  font: normal normal medium 1.4rem/19px Manrope;
  color: #121a55;
`;

const CheckBoxLabel = styled.div`
  font: normal normal medium 1.4rem/19px Manrope;
  color: #121a55;
  margin-left: 10px;
`;

const CheckBoxRow = styled.div`
  display: flex;
  margin: 30px 0;
`;

const SmallText = styled.span`
  margin-top: 8px;
  font: normal normal 600 10px/14px Manrope;
  color: #0b1f51;
`;

const SignatureRow = styled.div`
  display: flex;
  margin: 30px 0;
`;

const SignedBy = styled.div`
  font: normal normal bold 1.4rem/19px Manrope;
  color: #121a55;
  margin-right: 47px;
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme?.colors?.secondary};
  vertical-align: middle;
  margin-right: 10px;
  font-size: 1.9rem;
`;

const VerifiedIcon = styled(Icon)`
  color: ${({ theme }) => theme?.colors?.approved};
  vertical-align: middle;
  margin-right: 10px;
  font-size: 1.9rem;
`;

const Line = styled.div`
  margin-bottom: 8px;
`;

const SignatureInnerContainer = styled.div``;
const Title = styled.div`
  font: normal normal bold 2.4rem/40px Manrope;
  color: #121a55;
  text-align: center;
`;

const FirstInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tenant = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  color: #0b1f51;
  margin-bottom: 16px;
`;

const SecondLine = styled.div`
  display: flex;
  justify-self: flex-start;
  margin-bottom: 8px;
`;
const Label = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  color: #0b1f51;
  width: 173px;
  margin-right: 13px;
`;

const Bold = styled.span`
  font: normal normal 800 1.4rem/40px Manrope;
  color: #0b1f51;
`;

const SideCatchText = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  color: #0b1f51;
`;

const DuringInspectionText = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  color: #0b1f51;
  margin-top: 16px;
  word-wrap: break-word;
`;

const OptionValue = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  color: #121a55;
`;

const SubTitle = styled.div`
  font: normal normal bold 1.4rem/19px Manrope;
  letter-spacing: 0.56px;
  color: #121a558f;
  text-transform: uppercase;
  margin: 32px 0 16px 0;
`;

const Description = styled.div`
  font: normal normal medium 1.4rem/19px Manrope;
  color: #121a558f;
  margin-bottom: 32px;
  text-align: center;
`;
export default SignatureForm;

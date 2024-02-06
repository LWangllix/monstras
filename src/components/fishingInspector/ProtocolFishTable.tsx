import { useMediaQuery } from "@material-ui/core";
import { map } from "lodash";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles";

export interface CaughtFishTableProps {
  fishes: Array<any>;
}

const ProtocolFishTable = ({ fishes }: CaughtFishTableProps) => {
  const isMobile = useMediaQuery(device.mobileL);

  return (
    <>
      {!isMobile ? (
        <Container>
          <InnerContainer>
            <HeaderLine>
              <HeaderText flex="1" first={true}>
                ŽUVŲ RŪŠIS
              </HeaderText>
              <HeaderText flex="1">Verslinis dydis,cm</HeaderText>
              <HeaderText flex="1">Kiekis, kg</HeaderText>
              <HeaderText flex="1.5">Saugomų žuvų kiekis, vnt./kg</HeaderText>
              <HeaderText flex="1.5">
                Šalutinis žvejybos laimikis, %*
              </HeaderText>
            </HeaderLine>
            {map(fishes, (fish, index) => (
              <ContentLine key={`fish_${index}`} index={index}>
                <ContentText flex="1" first={true}>
                  {fish?.type?.label}
                </ContentText>
                <ContentText flex="1">{fish?.business_size}</ContentText>
                <ContentText flex="1">{fish?.amount}</ContentText>
                <ContentText flex="1.5">{fish?.stored_fish_amount}</ContentText>
                <ContentText flex="1.5">{fish?.side_fishing_catch}</ContentText>
              </ContentLine>
            ))}
          </InnerContainer>
          <TotalLine>
            <TotalText flex="1"></TotalText>
            <TotalText flex="1">Iš viso:</TotalText>
            <TotalText flex="1">
              {fishes
                ?.map((f) => f.amount)
                ?.reduce(
                  (sum, current) => parseFloat(sum) + parseFloat(current)
                )}
            </TotalText>
            <TotalText flex="1.5">
              {fishes
                ?.map((f) => f.stored_fish_amount.split("/")[0])
                ?.reduce(
                  (sum, current) => parseFloat(sum) + parseFloat(current)
                )}
              /
              {fishes
                ?.map((f) => f.stored_fish_amount.split("/")[1])
                ?.reduce(
                  (sum, current) => parseFloat(sum) + parseFloat(current)
                )}
            </TotalText>
            <TotalText flex="1.5">
              {" "}
              {fishes
                ?.map((f) => f?.side_fishing_catch)
                ?.reduce(
                  (sum, current) => parseFloat(sum) + parseFloat(current)
                )}
            </TotalText>
          </TotalLine>
        </Container>
      ) : (
        <MobileContainer>
          {map(fishes, (fish, index) => (
            <div key={`fish_${index}`}>
              <ContentLine index={1}>
                <HeaderText flex="1" first={true}>
                  ŽUVŲ RŪŠIS:
                </HeaderText>
                <ContentText flex="1">{fish?.type?.label}</ContentText>
              </ContentLine>
              <ContentLine index={1}>
                <HeaderText first={true} flex="1">
                  Verslinis dydis,cm:
                </HeaderText>
                <ContentText flex="1">{fish?.business_size}</ContentText>
              </ContentLine>
              <ContentLine index={1}>
                <HeaderText first={true} flex="1">
                  Kiekis, kg:
                </HeaderText>

                <ContentText flex="1">{fish?.amount}</ContentText>
              </ContentLine>
              <ContentLine index={1}>
                <HeaderText first={true} flex="1">
                  Saugomų žuvų kiekis, vnt./kg:
                </HeaderText>

                <ContentText flex="1">{fish?.stored_fish_amount}</ContentText>
              </ContentLine>
              <ContentLine index={1}>
                <HeaderText first={true} flex="1">
                  Šalutinis žvejybos laimikis, %*:
                </HeaderText>
                <ContentText flex="1">{fish?.side_fishing_catch}</ContentText>
              </ContentLine>
              <HR />
            </div>
          ))}
          <ContentLine index={1}>
            <HeaderText first={true} flex="1">
              Iš viso:
            </HeaderText>
          </ContentLine>
          <ContentLine index={1}>
            <HeaderText first={true} flex="1">
              Kiekis, kg:
            </HeaderText>
            <ContentText flex="1">
              {fishes
                ?.map((f) => f.amount)
                ?.reduce(
                  (sum, current) => parseFloat(sum) + parseFloat(current)
                )}
            </ContentText>
          </ContentLine>
          <ContentLine index={1}>
            <HeaderText first={true} flex="1">
              Saugomų žuvų kiekis, vnt./kg:
            </HeaderText>
            <ContentText flex="1">
              {fishes
                ?.map((f) => f.stored_fish_amount.split("/")[0])
                ?.reduce(
                  (sum, current) => parseFloat(sum) + parseFloat(current)
                )}
              /
              {fishes
                ?.map((f) => f.stored_fish_amount.split("/")[1])
                ?.reduce(
                  (sum, current) => parseFloat(sum) + parseFloat(current)
                )}
            </ContentText>
          </ContentLine>
          <ContentLine index={1}>
            <HeaderText first={true} flex="1">
              Šalutinis žvejybos laimikis, %*:
            </HeaderText>
            <ContentText flex="1">
              {fishes
                ?.map((f) => f?.side_fishing_catch)
                ?.reduce(
                  (sum, current) => parseFloat(sum) + parseFloat(current)
                )}
            </ContentText>
          </ContentLine>
        </MobileContainer>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 33px 0 15px 0;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
`;

const MobileContainer = styled.div`
  margin: 22px 0;
`;

const HR = styled.div`
  border-bottom: 1px solid black;
`;

const InnerContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dbdbdd;
`;

const HeaderLine = styled.div`
  padding: 9px 10px;
  display: flex;
  white-space: nowrap;
  background: #121a5514 0% 0% no-repeat padding-box;
  border-radius: 3px 3px 0px 0px;
`;

const ContentLine = styled.div<{ index: number }>`
  display: flex;
  padding: 16px 0;
  padding: 7px 10px;
  background-color: ${({ index }) =>
    (index + 1) % 2 == 0 ? `#121a550a` : " #FFFFFF"};
  white-space: nowrap;
`;

const TotalLine = styled.div`
  display: flex;
  padding: 16px 0;
  padding: 8px 10px;
  white-space: nowrap;
`;

const TotalText = styled.div<{ first?: boolean; flex: string }>`
  font: normal normal 500 1.2rem/17px Manrope;
  color: #121a55;
  flex: ${({ flex }) => `${flex}`};
  text-align: end;
`;

const ContentText = styled.div<{ first?: boolean; flex: string }>`
  font: normal normal 500 1.2rem/17px Manrope;
  color: #121a55;
  flex: ${({ flex }) => `${flex}`};
  text-align: ${({ first }) => (first ? "start" : "end")};
`;

const HeaderText = styled.div<{ first?: boolean; flex: string }>`
  font: normal normal 600 1rem/14px Manrope;
  color: #121a55;
  flex: ${({ flex }) => `${flex}`};
  text-align: ${({ first }) => (first ? "start" : "end")};
`;

export default ProtocolFishTable;

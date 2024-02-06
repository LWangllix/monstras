import { useMediaQuery } from "@material-ui/core";
import { keys } from "lodash";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Button from "../buttons/Button";
import CaughtFishToolItem from "../tools/ToolItem/CaughtFishToolItem";
import ToolsList from "../tools/ToolsList";

const CaughtFishOnShoreToolsForm = ({
  tools,
  toolFish,
  onClickItem,
  onSumbit,
}) => {
  const isMobile = useMediaQuery(device.mobileL);

  const toolChecked = (tool) => {
    console.log(tool?.group_id);
    const checked =
      keys(toolFish).includes(tool?.group_id?.toString()) &&
      toolFish[tool.group_id].length > 0;
    return checked;
  };

  return (
    <>
      <Subheader>ŽVEJYBOS ĮRANKIAI VANDENYJE:</Subheader>
      <ToolsConatiner>
        <ToolsList
          tools={tools}
          renderItem={({ tool, type }) => (
            <CaughtFishToolItem
              key={tool.id}
              tool={tool}
              type={type}
              onClickItem={onClickItem}
              checked={toolChecked(tool)}
            />
          )}
        />
      </ToolsConatiner>
      <ButtonRow>
        <Button
          variant="primary"
          type="button"
          padding={isMobile ? "10px 0 0 0" : "0 34px 0 0"}
          onClick={onSumbit}
        >
          Saugoti
        </Button>
      </ButtonRow>
    </>
  );
};

const Subheader = styled.h2`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.tertiary};
  margin-top: 32px;
  margin-bottom: 16px;
`;

const ButtonRow = styled.div`
  display: flex;
  margin-bottom: 32px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const ToolsConatiner = styled.div`
  margin-bottom: 32px;
  @media ${device.mobileL} {
    margin-bottom: 0;
  }
`;

export default CaughtFishOnShoreToolsForm;

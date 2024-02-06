import React from "react";
import styled from "styled-components";
import { Tool } from "../../../server/models/Tool";
import { device } from "../../../styles";
import CustomTag from "../../other/CustomTag";
import ToolIcon from "../ToolIcon";

export interface EditToolItemProps {
  tool: any;
  onClickItem: (tool: Tool) => void;
  checked?: boolean;
  type?: "top" | "bottom" | "middle";
}

const CaughtFishToolItem = ({
  tool,
  type,
  checked,
  onClickItem,
}: EditToolItemProps) => {
  const top: string = !type || type === "top" ? "8px" : "0px";
  const bottom: string = !type || type === "bottom" ? "8px" : "0px";
  const brderBottom = type === "top" || type === "middle" ? "0px" : "1px";

  const toolChecked = checked || tool.eventTools?.caughtFishes?.length > 0;

  const waterBoby = tool.eventTools?.event?.location?.waterBody;

  return (
    <Container top={top} bottom={bottom} brderBottom={brderBottom}>
      <StatusContainer onClick={() => onClickItem(tool)}>
        <StyledFishingIcon
          status={toolChecked ? "checked" : "in_water"}
          label={waterBoby?.type === "baras" ? waterBoby.id : null}
        />
      </StatusContainer>
      <Content>
        <FirstColumn onClick={() => onClickItem(tool)}>
          <ToolName>{tool.toolType?.label}</ToolName>
          <Row>
            <StyledText>{`plombos numeris: ${tool?.seal_nr} `} </StyledText>
            <StyledText>
              {" "}
              {` akių dydis: ${tool?.eye_size} mm`}{" "}
            </StyledText>{" "}
            <StyledText>
              {` tinklo ilgis: ${parseInt(tool?.net_length.toString())} m`}
            </StyledText>
          </Row>
        </FirstColumn>
        {toolChecked ? (
          <CustomTag isEvent={true} color="#60b456" text={"Patvirtinta"} />
        ) : null}
      </Content>
    </Container>
  );
};

const Container = styled.div<{
  top: string;
  bottom: string;
  brderBottom: string;
}>`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 8px 16px #121a5514;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: ${({ brderBottom }) => brderBottom} solid
    ${({ theme }) => theme.colors.border};
  border-top-left-radius: ${({ top }) => top};
  border-top-right-radius: ${({ top }) => top};
  border-bottom-left-radius: ${({ bottom }) => bottom};
  border-bottom-right-radius: ${({ bottom }) => bottom};
  opacity: 1;
  width: 100%;
  display: flex;
  vertical-align: middle;
  padding: 8px 0;
  margin-bottom: ${({ bottom }) => bottom};
  margin-top: ${({ top }) => top};
  position: relative;
  min-width: 540px;
  @media ${device.mobileL} {
    min-width: 100%;
  }
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.colors.tertiary};
  vertical-align: middle;
  margin: auto 8px auto 0;
  white-space: nowrap;
  font-size: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StatusContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const StyledFishingIcon = styled(ToolIcon)`
  margin: auto 8px auto 10px;
  height: 40px;
  width: 40px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin: auto 0;
  overflow: hidden;
  justify-content: space-between;
  align-items: flex-start;
  padding-right: 16px;
`;

const FirstColumn = styled.div`
  flex-direction: column;
  align-items: flex-start;
  min-width: 100px;
  flex: 1;
`;

const ToolName = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 16px;
  line-height: 22px;
  width: 100%;
`;

export default CaughtFishToolItem;

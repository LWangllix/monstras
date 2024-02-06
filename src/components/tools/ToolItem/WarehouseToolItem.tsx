import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { Tool } from "../../../server/models/Tool";
import { device } from "../../../styles";
import { UserContext } from "../../../utils/AppContextProvider";
import Button from "../../buttons/Button";
import MenuButton from "../../buttons/MenuButton";
import ConnectToolButton from "../ConnectToolButton";
import ToolIcon from "../ToolIcon";
import ToolMenu from "../ToolMenu";
import ToolsAutoComplete from "../ToolsAutoComplete";

export interface FishStockerItemProps {
  tool: Tool;
  options: Array<Record<string, unknown>>;
  showConnect: boolean;
  onConnectTools: (tool: Tool, group: string) => void;
  onDisconnectTool: (tool: Tool) => void;
  onChangeToolLocation?: (location: any) => void;
  type?: "top" | "bottom" | "middle";
  group?: { tools: Array<Tool> };
}

const FishingToolItem = ({
  tool,
  options,
  onConnectTools,
  onDisconnectTool,
  onChangeToolLocation,
  type,
  showConnect,
  group,
}: FishStockerItemProps) => {
  const router = useRouter();

  const {
    isFreelancerSuspended,
    isTenantOwnerSuspended,
    isTenantWorkerSuspended,
    isTenantOwner,
    isFreelancer,
  } = React.useContext(UserContext);

  const [showToolPicker, setShowToolPicker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const top: string = !type || type === "top" ? "8px" : "0px";
  const bottom: string = !type || type === "bottom" ? "8px" : "0px";
  const brderBottom = type === "top" || type === "middle" ? "0px" : "1px";

  const getToolIngex = () => {
    const ids = group?.tools?.map((t) => t.id);
    return ids?.indexOf(tool.id);
  };

  const singleItem = group.tools.length === 1;
  const toolInWater = !!tool.eventTools?.id;

  const waterBoby = tool.eventTools?.event?.location?.waterBody;

  const showConnectButton = showConnect && !toolInWater;

  const showDiconnectButton = !singleItem && !toolInWater;

  const canOpenTool = isTenantOwner || isFreelancer;

  const disabled =
    isFreelancerSuspended || isTenantOwnerSuspended || isTenantWorkerSuspended;

  const handleOpenTool = () => {
    if (canOpenTool) {
      router.push(`/irankiai/${tool?.id}`);
    }
  };

  const showEditTool = toolInWater && (singleItem || getToolIngex() === 0);

  return (
    <Container
      canOpenTool={canOpenTool}
      top={top}
      bottom={bottom}
      brderBottom={brderBottom}
    >
      <StatusContainer onClick={handleOpenTool}>
        <StyledFishingIcon
          status={toolInWater ? "in_water" : "not_in_water"}
          label={waterBoby?.type === "baras" ? waterBoby.id : null}
        />
      </StatusContainer>
      <Content>
        <FirstColumn onClick={handleOpenTool}>
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
        <>
          <ButtonContainer>
            {showConnectButton ? (
              <ConnectToolButton disabled={disabled}>
                <ToolsAutoComplete
                  groupId={tool.group_id}
                  onChange={(group) => {
                    onConnectTools(tool, group);
                  }}
                  options={options}
                  inWarehouse={true}
                  onSearch={setInputValue}
                  serachVal={inputValue}
                  typeId={tool.toolType?.id}
                />
              </ConnectToolButton>
            ) : null}
            {showDiconnectButton ? (
              <Styledbutton
                variant="transparent"
                left={<StyledImg src="/icons/disconnect.svg" />}
                height={32}
                innerPadding="0 0 0 16px"
                onClick={() => onDisconnectTool(tool)}
                disabled={disabled}
              >
                ATSKIRTI
              </Styledbutton>
            ) : null}
            {showEditTool ? (
              <Styledbutton
                variant="tertiary"
                left={<StyledImg src="/icons/anchor.svg" />}
                height={32}
                innerPadding="0 16px"
                onClick={() =>
                  onChangeToolLocation(tool.eventTools.event.location)
                }
                disabled={disabled}
              >
                Pastačiau/Ištraukiau įrankį
              </Styledbutton>
            ) : null}
          </ButtonContainer>
          <MobileButtonContainer>
            <MenuButton
              menuOpen={menuOpen}
              setMenuOpen={(open) => {
                setMenuOpen(open);
                if (!open) {
                  setShowToolPicker(false);
                }
              }}
            >
              {showToolPicker ? (
                <ToolsAutoComplete
                  groupId={tool.group_id}
                  onChange={(group) => {
                    onConnectTools(tool, group);
                    setShowToolPicker(false);
                    setMenuOpen(false);
                  }}
                  options={options}
                  inWarehouse={true}
                  onSearch={setInputValue}
                  serachVal={inputValue}
                  typeId={tool.toolType?.id}
                />
              ) : (
                <ToolMenu
                  showConnectButton={showConnectButton}
                  showDisconnectButton={showDiconnectButton}
                  showRegisterToolEvent={toolInWater}
                  onConnect={() => {
                    setShowToolPicker(true);
                  }}
                  onDisconnect={() => {
                    onDisconnectTool(tool);
                    setMenuOpen(false);
                  }}
                  onRegisterToolEvent={() =>
                    onChangeToolLocation(tool.eventTools.event.location)
                  }
                />
              )}
            </MenuButton>
          </MobileButtonContainer>
        </>
      </Content>
    </Container>
  );
};

const Container = styled.div<{
  top: string;
  bottom: string;
  brderBottom: string;
  canOpenTool: boolean;
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
  cursor: ${({ canOpenTool }) => (canOpenTool ? "pointer" : "default")};
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

const MobileButtonContainer = styled.div`
  display: none;
  @media ${device.mobileL} {
    display: block;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  @media ${device.mobileL} {
    display: none;
  }
`;

const StyledImg = styled.img`
  height: 13.5px;
  width: 13.5px;
  margin-right: 6px;
`;

const Styledbutton = styled(Button)`
  min-width: 100px;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatusContainer = styled.div`
  display: flex;
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
  align-items: center;
  justify-content: space-between;
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
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 16px;
  line-height: 22px;
  width: 100%;
`;

export default FishingToolItem;

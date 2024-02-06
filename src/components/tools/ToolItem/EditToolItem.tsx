import { useMediaQuery } from "@material-ui/core";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Permissions } from "../../../config";
import { Tool } from "../../../server/models/Tool";
import { device } from "../../../styles";
import { UserContext } from "../../../utils/AppContextProvider";
import Button from "../../buttons/Button";
import MenuButton from "../../buttons/MenuButton";
import ConnectToolButton from "../ConnectToolButton";
import ToolIcon from "../ToolIcon";
import ToolMenu from "../ToolMenu";
import ToolsAutoComplete from "../ToolsAutoComplete";

export interface EditToolItemProps {
  tool: Tool;
  options: Array<Record<string, unknown>>;
  onConnectTools: (tool: Tool, group: string) => void;
  onDisconnectTool: (tool: Tool) => void;
  onReturnGroup: (groupId: string) => void;
  showConnect: boolean;
  type?: "top" | "bottom" | "middle";
  group: { tools: Array<Tool> };
  disabled?: boolean;
}

const EditToolItem = ({
  tool,
  options,
  onConnectTools,
  onDisconnectTool,
  onReturnGroup,
  type,
  showConnect,
  group,
  disabled,
}: EditToolItemProps) => {
  const isMobile = useMediaQuery(device.mobileL);

  const { hasPermission, isTenantOwner, isFreelancer } =
    useContext(UserContext);
  const isInspector = hasPermission(Permissions.Inspector.id);

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

  const singleItem = group?.tools?.length === 1;

  const toolInWater = !!tool.eventTools?.id;

  const waterBoby = tool.eventTools?.event?.location?.waterBody;

  const showConnectButton = isMobile ? true : showConnect;

  const showDiconnectButton = !singleItem;

  const showReturnButton = toolInWater && singleItem;

  const canOpenTool = isTenantOwner || isFreelancer;

  const showReturnAllButton =
    toolInWater && !singleItem && getToolIngex() === 0;

  return (
    <Container
      canOpenTool={canOpenTool}
      top={top}
      bottom={bottom}
      brderBottom={brderBottom}
    >
      <StatusContainer>
        <StyledFishingIcon
          status={toolInWater ? "in_water" : "not_in_water"}
          label={waterBoby?.type === "baras" ? waterBoby.id : null}
        />
      </StatusContainer>
      <Content>
        <FirstColumn>
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
        {!isInspector && (
          <>
            <ButtonContainer>
              <ButtonContainerInner>
                {showConnectButton ? (
                  <ConnectToolButton disabled={disabled}>
                    <ToolsAutoComplete
                      groupId={tool.group_id}
                      onChange={(group) => {
                        onConnectTools(tool, group);
                      }}
                      options={options}
                      inWarehouse={false}
                      onSearch={setInputValue}
                      serachVal={inputValue}
                      typeId={tool.toolType?.id}
                    />
                  </ConnectToolButton>
                ) : null}
                {showReturnButton ? (
                  <Styledbutton
                    variant="tertiary"
                    left={<StyledImg src="/icons/connect.svg" />}
                    height={32}
                    innerPadding="0 8px 0 10px"
                    padding="0 0 0 8px"
                    onClick={() => onReturnGroup(tool.group_id)}
                    disabled={disabled}
                  >
                    Sugrąžinti
                  </Styledbutton>
                ) : null}
                {showReturnAllButton ? (
                  <Styledbutton
                    variant="tertiary"
                    left={<StyledImg src="/icons/connect.svg" />}
                    height={32}
                    innerPadding="0 8px 0 10px"
                    padding="0 0 0 8px"
                    onClick={() => onReturnGroup(tool.group_id)}
                    disabled={disabled}
                  >
                    Sugrąžinti visus
                  </Styledbutton>
                ) : null}
              </ButtonContainerInner>
              {showDiconnectButton ? (
                <Styledbutton
                  variant="transparent"
                  left={<StyledImg src="/icons/disconnect.svg" />}
                  height={32}
                  innerPadding="0 8px 0 8px"
                  onClick={() => onDisconnectTool(tool)}
                  disabled={disabled}
                >
                  ATSKIRTI
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
                    inWarehouse={false}
                    onSearch={setInputValue}
                    serachVal={inputValue}
                    typeId={tool.toolType?.id}
                  />
                ) : (
                  <ToolMenu
                    showConnectButton={showConnectButton}
                    showDisconnectButton={showDiconnectButton}
                    showReturnButton={showReturnButton}
                    onConnect={() => {
                      setShowToolPicker(true);
                    }}
                    onDisconnect={() => {
                      onDisconnectTool(tool);
                      setMenuOpen(false);
                    }}
                    onReturn={() => {
                      onReturnGroup(tool.group_id);
                      setMenuOpen(false);
                    }}
                  />
                )}
              </MenuButton>
            </MobileButtonContainer>
          </>
        )}
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
  cursor: ${({ canOpenTool }) => (canOpenTool ? "pointer" : "default")};
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

const MobileButtonContainer = styled.div`
  display: none;
  @media ${device.mobileL} {
    display: block;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media ${device.mobileL} {
    display: none;
  }
`;

const ButtonContainerInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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
  justify-content: space-between;
  align-items: center;
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

export default EditToolItem;

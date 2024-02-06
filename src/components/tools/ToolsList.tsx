import { filter } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tool } from "../../server/models/Tool";
import ToolItem from "./ToolItem";

interface ToolsListProps {
  tools?: Array<any>;
  connectOptions?: Array<Tool>;
  onConnectTools?: (tool: any, group: any) => void;
  onDisconnectTool?: (props) => void;
  onReturnGroup?: (props) => void;
  onItemClick?: (props) => void;
  disabled?: boolean;
  renderItem?: (props) => void;
  className?: string;
}

const ToolsList = ({
  tools,
  connectOptions,
  onConnectTools,
  onDisconnectTool,
  onReturnGroup,
  onItemClick,
  disabled,
  renderItem,
  className,
}: ToolsListProps) => {
  const groupTools = (responseTools) => {
    const data = [];
    const groups = [];
    responseTools?.forEach((tool) => {
      if (!groups.includes(tool?.group_id)) {
        const toolsGroup = filter(responseTools, (t) => {
          if (t.group_id === tool.group_id) return t;
        });
        data.push({
          groupId: tool.group_id,
          tools: toolsGroup,
        });
        groups.push(tool.group_id);
      }
    });
    return data;
  };

  const [groupedTools, setGroupedTools] = useState([]);
  const [groupedConnectOption, setGroupedConnectOptions] = useState([]);

  useEffect(() => {
    setGroupedTools(groupTools(tools));
    setGroupedConnectOptions(groupTools(connectOptions));
  }, [tools]);

  const renderGroup = (group, index) => {
    return group.tools.map((tool, i) => {
      const type =
        i === 0 ? "top" : i === group.tools.length - 1 ? "bottom" : "middle";
      const finalType = group.tools.length > 1 ? type : undefined;
      {
        return renderItem ? (
          renderItem({
            tool,
            finalType,
            group,
            type: finalType,
            options: groupedConnectOption,
            showConnect: i === 0,
          })
        ) : (
          <ToolItem
            key={`fishing_group_${index}_tool_${i}`}
            tool={tool}
            options={groupedConnectOption}
            onConnectTools={onConnectTools}
            onDisconnectTool={onDisconnectTool}
            onReturnGroup={onReturnGroup}
            onItemClick={() => onItemClick(tool)}
            type={finalType}
            showConnect={i === 0}
            group={group}
            disabled={disabled}
          />
        );
      }
    });
  };

  return (
    <Container className={className}>
      {groupedTools?.map((group, index) => renderGroup(group, index))}
    </Container>
  );
};

const Container = styled.div``;

export default ToolsList;

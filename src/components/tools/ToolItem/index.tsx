import { useRouter } from "next/router";
import React from "react";
import { Tool } from "../../../server/models/Tool";
import { Location } from "../../../types";
import CaughtFishToolItem from "./CaughtFishToolItem";
import EditToolItem from "./EditToolItem";
import LogToolItem from "./LogToolItem";
import SimpleToolItem from "./SimpleToolItem";
import TenantToolItem from "./TenantToolItem";

export interface FishStockerItemProps {
  tool: Tool;
  options?: Array<Record<string, unknown>>;
  onConnectTools?: (tool: Tool, group: string) => void;
  onDisconnectTool?: (tool: Tool) => void;
  onReturnGroup?: (groupId: string) => void;
  onItemClick?: (item: Tool) => void;
  onChangeToolLocation?: (location: Location) => void;
  showConnect: boolean;
  type?: "top" | "bottom" | "middle";
  group?: { tools: Array<Tool> };
  disabled?: boolean;
}

const FishingToolItem = ({
  tool,
  options,
  onConnectTools,
  onDisconnectTool,
  onReturnGroup,
  onItemClick,
  type,
  showConnect,
  group,
  disabled,
}: FishStockerItemProps) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  if (currentRoute === "/irankiu-statymas") {
    return (
      <EditToolItem
        tool={tool}
        group={group}
        options={options}
        showConnect={showConnect}
        onConnectTools={onConnectTools}
        onDisconnectTool={onDisconnectTool}
        onReturnGroup={onReturnGroup}
        type={type}
        disabled={disabled}
      />
    );
  } else if (currentRoute === "/pagauta-zuvis-laive") {
    return (
      <CaughtFishToolItem tool={tool} type={type} onClickItem={onItemClick} />
    );
  } else if (currentRoute === "/pagauta-zuvis-krante") {
    return (
      <CaughtFishToolItem tool={tool} type={type} onClickItem={onItemClick} />
    );
  } else if (
    currentRoute === "/vidinis/zuvu-istekliu-naudotojai/[imone]/irankiai"
  ) {
    return <TenantToolItem tool={tool} type={type} />;
  } else if (currentRoute.includes("/zurnalas/")) {
    return <LogToolItem tool={tool} type={type} />;
  }
  return <SimpleToolItem tool={tool} type={type} />;
};

export default FishingToolItem;

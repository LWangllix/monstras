import React from "react";
import styled from "styled-components";
import { Permissions } from "../../config";
import { theme } from "../../styles";
import CustomTag from "../other/CustomTag";
import Icon from "../other/Icon";

export interface FishStockingTagProps {
  status: string;
  text: string;
  isEvent?: boolean;
}

const FishingTag = ({
  status,
  text,
  isEvent = false,
}: FishStockingTagProps) => {
  const ApproveIcon = status === Permissions.User.statuses.ENABLED && (
    <StyledIcon name={"verified"} />
  );
  return (
    <CustomTag
      isEvent={isEvent}
      color={theme.colors[status]}
      icon={ApproveIcon}
      text={text}
    />
  );
};

const StyledIcon = styled(Icon)`
  color: #60b456;
  font-size: 2rem;
  vertical-align: middle;
  display: inline-block;
`;

export default FishingTag;

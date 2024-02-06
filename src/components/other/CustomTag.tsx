import React from "react";
import styled from "styled-components";

export interface CustomTagProps {
  text: string;
  color?: string;
  icon?: JSX.Element;
  isFilter?: boolean;
  margin?: string;
  isPressed?: boolean;
  isEvent?: boolean;
}

const CustomTag = ({
  color = "#121A55",
  icon,
  text,
  isFilter,
  margin,
  isPressed,
  isEvent,
}: CustomTagProps) => {
  return (
    <Container margin={margin}>
      {icon}
      <LabelContainer
        isEvent={isEvent}
        isPressed={isPressed}
        isFilter={isFilter}
        color={color}
      >
        <Label isEvent={isEvent} isPressed={isPressed} color={color}>
          {text}
        </Label>
      </LabelContainer>
    </Container>
  );
};

const Container = styled.div<{ margin: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: ${({ margin }) => (margin ? margin : ` 0 2px`)};
`;

const LabelContainer = styled.div<{
  color: string;
  isPressed: boolean;
  isFilter: boolean;
  isEvent: boolean;
}>`
  height: ${({ isFilter }) => (isFilter ? `30px` : `17px`)};
  padding: 0 8px;
  border: 1px solid
    ${({ color, isEvent }) => (isEvent ? `${color}` : `${color}3D`)};
  background-color: ${({ color, isPressed, isFilter }) =>
    isPressed ? (isFilter ? " #121A55" : `${color}8F`) : `${color}14`};
  border-radius: 4px;
  margin: 2px;
  display: flex;
  align-items: center;
`;

const Label = styled.span<{
  color: string;
  isPressed: boolean;
  isEvent: boolean;
}>`
  color: ${({ color, isPressed, isEvent }) =>
    isPressed ? "white" : isEvent ? `${color}` : `${color}8F`};
  font-size: 1.2rem;
  vertical-align: middle;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 500;
`;

export default CustomTag;

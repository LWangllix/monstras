import React from "react";
import styled from "styled-components";

export interface FishingIconsProps {
  status: "not_in_water" | "in_water" | "checked";
  label?: string;
  className?: string;
}

const ToolIcon = ({
  status = "not_in_water",
  label,
  className,
}: FishingIconsProps) => {
  if (status === "not_in_water") {
    return (
      <Container className={className}>
        <Img src="/icons/new.png" />
      </Container>
    );
  } else if (status === "in_water") {
    return (
      <Container className={className}>
        {label ? (
          <Label>
            <Text>{label}</Text>
          </Label>
        ) : null}
        <Img src="/icons/pending.png" />
      </Container>
    );
  } else if (status === "checked") {
    return (
      <Container className={className}>
        {label ? (
          <Label>
            <Text>{label}</Text>
          </Label>
        ) : null}
        <Img src="/icons/completed.png" />
      </Container>
    );
  }
};

const Container = styled.div`
  position: relative;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const Label = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-self: center;
  font-weight: bold;
  top: 0;
  left: 0;
  display: flex;
`;

const Text = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: 1.9rem;
  margin: auto;
  color: ${({ theme }) => theme.colors.primary};
`;

export default ToolIcon;

import React from "react";
import styled from "styled-components";
import Icon from "../other/Icon";

interface AddButtonProps {
  onClick: () => void;
  text: string;
  disabled: boolean;
}

const AddButton = ({ onClick, text, disabled }: AddButtonProps) => {
  return (
    <Container onClick={disabled ? () => {} : onClick} disabled={disabled}>
      <BackIcon name="add" />
      <Text>{text}</Text>
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-top: 24px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const BackIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary};
  margin: auto 10px auto 0;
  font-size: 5.4rem;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 600;
`;

export default AddButton;

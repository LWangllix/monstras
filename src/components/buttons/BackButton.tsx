import React from "react";
import styled from "styled-components";
import Icon from "../../components/other/Icon";

interface BackButton {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButton) => {
  return (
    <Container onClick={onClick}>
      <BackIcon name="back" />
      <Text>Grįžti atgal</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 20px 0;
  cursor: pointer;
`;

const BackIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary};
  margin: auto 10px auto 0;
  font-size: 1.9rem;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.4rem;
`;

export default BackButton;

import React from "react";
import styled from "styled-components";

interface SignatureFieldProps {
  className?: string;
  padding?: string;
  onSetOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignatureField = ({
  className,
  padding,
  onSetOpen,
}: SignatureFieldProps) => {
  return (
    <Container
      className={className}
      padding={padding || "0"}
      onClick={() => onSetOpen(true)}
    >
      <Img src="/icons/signatureIcon.svg" />
      <Column>
        <TextInput />
        <Label>Dalyvavusio asmens parašas</Label>
      </Column>
    </Container>
  );
};

const Container = styled.div<{ padding: string }>`
  display: flex;
  align-items: first baseline;
  width: 100%;
  padding: ${({ padding }) => padding};
`;

const Column = styled.div`
  display: flex;
  width: 385px;
  flex-direction: column;
  margin-left: 13px;
`;

const Label = styled.div`
  margin-top: 5px;
  font-weight: 500;
  font-size: 1.2rem;
  color: #121a55;
  opacity: 0.64;
`;

const Img = styled.img`
  width: 18px;
  height: 18px;
`;

const TextInput = styled.div`
  width:100%
  height: 48px;
  border-bottom: 1px solid #13C9E7;
`;

export default SignatureField;

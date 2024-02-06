import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Icon from "../other/Icon";

export interface FileButtonProps {
  fileName: string;
  fileUrl: string;
}

const FileButton = ({ fileName, fileUrl }: FileButtonProps) => {
  const router = useRouter();
  return (
    <Link href={fileUrl}>
      <a target="_blank">
        <Container>
          <StyledIcon name="attachment" />
          <StyledText>{fileName}</StyledText>
        </Container>
      </a>
    </Link>
  );
};

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme?.colors?.primary};
  text-align: start;
  margin-right: 8px;
  margin-left: -6px;
  font-size: 2.9rem;
`;

const StyledText = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font: normal normal 600 1.6rem/40px Manrope;
`;
const Container = styled.div`
  display: flex;
  cursor: pointer;
`;

export default FileButton;

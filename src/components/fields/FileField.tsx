import { FormikErrors } from "formik";
import React from "react";
import styled from "styled-components";

export interface FileFieldProps {
  onChange: (props) => void;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
}

const FileField = ({ onChange, error }: FileFieldProps) => {
  return (
    <>
      <StyledButton error={!!error} type="button">
        <StyledInput
          onChange={(e) => onChange(Array.from(e.target.files))}
          type="file"
        />
        <StyledText>Pasirinkti failą</StyledText>
      </StyledButton>
    </>
  );
};

const StyledInput = styled.input``;
const StyledText = styled.div`
  color: ${({ theme }) => theme.colors.tertiary};
  font: normal normal 600 1.6rem/40px Manrope;
`;

const StyledButton = styled.button<{ error?: boolean }>`
  background: #f3f3f7 0% 0% no-repeat padding-box;
  height: 40px;
  width: 129px;
  position: relative;
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.error : "none")};
  input {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
    height: 40px;
    width: 129px;
  }
`;

export default FileField;

import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Loader from "../other/Loader";
export interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "transparent" | "delete";
  route?: string;
  children?: JSX.Element | string;
  height?: number;
  type?: string;
  loading?: boolean;
  padding?: string;
  signature?: boolean;
  right?: JSX.Element | string;
  left?: JSX.Element | string;
  innerPadding?: string;
}

const Button = ({
  variant = "primary",
  route,
  children,
  height,
  padding,
  type,
  loading = false,
  className,
  disabled,
  right,
  left,
  innerPadding,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  if (route) {
    return (
      <Wrapper
        className={className}
        padding={padding || "0"}
        disabled={disabled}
      >
        <Link href={route}>
          <StyledButton
            innerPadding={innerPadding}
            variant={variant}
            height={height}
            type={type}
            {...rest}
          >
            {!!left ? <InnerContainer>{left}</InnerContainer> : null}
            {loading ? <Loader color="white" /> : children}
            {!!right ? <InnerContainer>{right}</InnerContainer> : null}
          </StyledButton>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className} padding={padding || "0"} disabled={disabled}>
      <StyledButton
        innerPadding={innerPadding}
        variant={variant}
        height={height}
        type={type}
        disabled={disabled}
        {...rest}
      >
        {!!left ? <InnerContainer>{left}</InnerContainer> : null}
        {loading ? <Loader color="white" /> : children}
        {!!right ? <InnerContainer>{right}</InnerContainer> : null}
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  padding: string;
  signature?: boolean;
  disabled: boolean;
}>`
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  padding: ${({ padding }) => (padding ? padding : 0)};
  min-width: 160px;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button<{
  variant: string;
  height: number;
  innerPadding?: string;
}>`
  display: flex;
  justify-content: center;
  font-weight: ${({ variant }) =>
    variant === "transparent" ? "bold" : "none"};
  align-items: center;
  height: ${({ height }) => (height ? height + "px" : "48px")};
  border-radius: ${({ height }) => (height ? height / 2 + "px" : "27px")};
  padding: ${({ innerPadding }) =>
    !!innerPadding ? innerPadding : "0px 48px"};
  background-color: ${({ variant, theme }) =>
    variant === "primary" ||
    variant === "secondary" ||
    variant === "delete" ||
    variant === "transparent"
      ? theme.colors[variant]
      : theme.colors.tertiaryLight};
  color: ${({ variant, theme }) =>
    variant === "primary" || variant === "secondary" || variant === "delete"
      ? "white"
      : variant === "transparent"
      ? theme.colors.primary
      : theme.colors.tertiary};
  border: 1px solid
    ${({ variant, theme }) =>
      variant === "primary" ||
      variant === "secondary" ||
      variant === "delete" ||
      variant === "transparent"
        ? "transparent"
        : theme.colors.border};
  font-size: 1.6rem;
  :hover {
    background-color: ${({ variant, theme }) =>
      variant === "primary" ||
      variant === "secondary" ||
      variant === "delete" ||
      variant === "transparent"
        ? theme.colors.hover[variant]
        : theme.colors.tertiaryLight};
  }
  cursor: pointer;
  width: 100%;
`;

export default Button;

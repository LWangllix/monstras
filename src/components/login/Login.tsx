import React from "react";
import styled from "styled-components";
import LayoutWithImage, {
  H1,
  FormContainer,
  ActionsContainer,
  Input,
  Field,
  SmallText,
  ErrorContainer,
} from "../../monoCommon/components/layouts/LayoutWithImage";
import Button from "../../components/buttons/Button";
import Link from "next/link";

const EVartai = (props: { ticket?: { actionUrl: string; ticket: string } }) => {
  const ticket = props.ticket;
  if (ticket) {
    return (
      <>
        <OrContainer>
          <Or>
            <Separator />
            <SeparatorLabelContainer>
              <SeparatorLabel>arba</SeparatorLabel>
            </SeparatorLabelContainer>
          </Or>
        </OrContainer>
        <form name="REQUEST" method="post" action={ticket.actionUrl}>
          <input type="hidden" name="ticket" value={ticket.ticket} />
          <StyledButton variant="primary">
            Prisijungti per el. valdžios vartus
          </StyledButton>
        </form>
      </>
    );
  }
  return <React.Fragment />;
};

export const Login = (props: {
  ticket?: {
    ticket: string;
    actionUrl: string;
  };
  username?: string;
  password?: string;
  error?: string;
  onChangeUsername: (username: string) => void;
  onChangePassword: (password: string) => void;
  onLoginClick: () => void;
}) => {
  const ticket = props.ticket;
  const username = props.username;
  const password = props.password;
  const setUsername = props.onChangeUsername;
  const setPassword = props.onChangePassword;
  const onLoginClick = props.onLoginClick;
  const error = props.error;

  return (
    <LayoutWithImage>
      <FormContainer
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onLoginClick();
          }
        }}
      >
        <H1>Prisijungti</H1>

        <Field label="Vartotojas">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <Field label="Slaptažodis">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        <SmallText>
          <Link href="/password/reset">
            <a>Pamiršau slaptažodį</a>
          </Link>
        </SmallText>

        <ActionsContainer>
          {error && <ErrorContainer>{error}</ErrorContainer>}
          <StyledButton variant="primary" onClick={onLoginClick}>
            Prisijungti
          </StyledButton>
        </ActionsContainer>
        <EVartai ticket={ticket} />
      </FormContainer>
    </LayoutWithImage>
  );
};

const StyledButton = styled(Button)`
  width: 300px;

  margin: 10px 0;
`;

const OrContainer = styled.div`
  width: 100%;
`;

const Or = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;

const SeparatorLabelContainer = styled.div`
  font: normal normal 600 16px/40px Manrope;
  letter-spacing: 1.02px;
  color: #0b1f518f;
  position: absolute;
  max-width: 400px;
  width: 100%;
  text-align: center;
  opacity: 1;
`;

const SeparatorLabel = styled.span`
  font: normal normal 600 16px/40px Manrope;
  letter-spacing: 1.02px;
  color: #0b1f518f;
  background-color: white;
  padding: 0 8px;
  margin: 0 auto;
  vertical-align: middle;
  opacity: 1;
`;

const Separator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: auto 0;
  position: absolute;
  max-width: 400px;
  width: 100%;
  margin: 24px 0;
`;

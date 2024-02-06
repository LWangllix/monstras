import React, { useState } from "react";
import { useRouter } from "next/router";
import api from "../../server/routers/api";
import { Result } from "../../monoCommon/server/routers/passwordRecovery/api/recover/config";

import LayoutWithImage, {
  FormContainer,
  H1,
  Field,
  Input,
  ActionsContainer,
  Button,
  SmallText,
  ErrorContainer,
  SuccessContainer,
} from "../../monoCommon/components/layouts/LayoutWithImage";
import Link from "next/link";

const recover = () => {
  const route = useRouter();
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const handleNewPassword = () => {
    setError("");
    setSuccess(false);
    setDisabled(true);

    api.passwordRecovery
      .recover({
        recover: route.query.secret?.toString(),
        password: newPassword,
      })
      .then((response: Result) => {
        if (!response?.exist) {
          setError(response?.[0]?.msgs?.[0]);
          setDisabled(false);
        } else {
          setNewPassword("");
          setSuccess(true);
        }
      });
  };

  if (success) {
    return (
      <LayoutWithImage>
        <H1>Slaptažodžio atstatymas</H1>

        <ActionsContainer>
          <SuccessContainer>
            <div>Slaptažodis pakeistas.</div>
          </SuccessContainer>

          <Button onClick={() => route.push("/login")}>Prisijungti</Button>
        </ActionsContainer>
      </LayoutWithImage>
    );
  }

  return (
    <LayoutWithImage>
      <FormContainer
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            handleNewPassword();
          }
        }}
      >
        <H1>Slaptažodžio atstatymas</H1>

        <Field label="Naujas slaptažodis">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Field>

        <SmallText>
          <Link href="/login">
            <a>Prisijungti</a>
          </Link>
        </SmallText>

        <ActionsContainer>
          <Button disabled={disabled} onClick={handleNewPassword}>
            Atstatyti
          </Button>
          <ErrorContainer>{error && <div>{error}</div>}</ErrorContainer>
        </ActionsContainer>
      </FormContainer>
    </LayoutWithImage>
  );
};
export default recover;

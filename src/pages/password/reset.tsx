import Link from "next/link";
import React from "react";
import { Logged } from "../../components/login/Logged";
import LayoutWithImage, {
  ActionsContainer,
  Button,
  ErrorContainer,
  Field,
  FormContainer,
  H1,
  Input,
  SmallText,
  SuccessContainer,
} from "../../monoCommon/components/layouts/LayoutWithImage";
import { Result } from "../../monoCommon/server/routers/passwordRecovery/api/reset/config";
import api from "../../server/routers/api";
import { UserContext } from "../../utils/AppContextProvider";

const ResetPassword = () => {
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const reset = () => {
    setError("");
    setSuccess("");
    setDisabled(true);

    api.passwordRecovery.reset({ username }).then((response: Result) => {
      if (!response?.exist) {
        setError(response?.[0]?.msgs?.[0]);
        setDisabled(false);
      } else {
        setUsername("");
        setSuccess("Slaptažodžio atstatymo instrukcija išsiųsta el.paštu");
        setDisabled(false);
      }
    });
  };

  return (
    <LayoutWithImage>
      <FormContainer
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            reset();
          }
        }}
      >
        <H1>Priminti slaptažodį</H1>
        <Field label="Vartotojas">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <SmallText>
          <Link href="/login">
            <a>Prisijungti</a>
          </Link>
        </SmallText>

        <ActionsContainer>
          <Button disabled={disabled} onClick={reset}>
            Atstatyti
          </Button>
          <ErrorContainer>{error && <div>{error}</div>}</ErrorContainer>
          <SuccessContainer>{success && <div>{success}</div>}</SuccessContainer>
        </ActionsContainer>
      </FormContainer>
    </LayoutWithImage>
  );
};

const ResetPasswordController = () => {
  const { user } = React.useContext(UserContext);
  if (user.loading) {
    return <React.Fragment />;
  }
  if (user.user) {
    return <Logged />;
  }
  return <ResetPassword />;
};

export default ResetPasswordController;

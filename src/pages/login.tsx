import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Logged } from "../components/login/Logged";
import { Login as LoginComponent } from "../components/login/Login";
import api from "../server/routers/api";
import { Result } from "../monoCommon/server/routers/eVartai/api/getTicket/config";
import { UserContext } from "../utils/AppContextProvider";

const Login = () => {
  const router = useRouter();
  const originalUrl = (router.query?.originalUrl as string) || "/";
  const [ticket, setTicket] = React.useState<Result>();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState();

  useEffect(() => {
    setUserName(window.localStorage.getItem("username") as string);
    api.eVartai.getTicket({ originalUrl }).then((res: Result) => {
      if (Array.isArray(res)) {
        console.log("Error getting ticket");
      } else {
        setTicket(res);
      }
    });
  }, []);

  const login = () => {
    window.localStorage.setItem("username", username);
    axios
      .post("/api/login", { username, password })
      .then(() => {
        window.open(originalUrl, "_self");
      })
      .catch((e) => {
        setError(e.response.data.error);
      });
  };
  return (
    <LoginComponent
      username={username}
      password={password}
      onChangeUsername={setUserName}
      onChangePassword={setPassword}
      onLoginClick={login}
      error={error}
      ticket={ticket}
    />
  );
};

const LoginController = () => {
  const { user } = React.useContext(UserContext);
  if (user.loading) {
    return <React.Fragment />;
  }
  if (user.user) {
    return <Logged />;
  }
  return <Login />;
};

export default LoginController;

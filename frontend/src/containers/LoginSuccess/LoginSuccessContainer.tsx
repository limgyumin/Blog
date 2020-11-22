import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import LoginSuccess from "../../components/LoginSuccess";
import { useHistory } from "react-router-dom";
import useStore from "../../util/lib/hooks/useStore";
import useQuery from "../../util/lib/hooks/useQuery";
import { LoginResponse } from "../../util/types/Response";

interface LoginSuccessContainerProps {}

const LoginSuccessContainer = ({}: LoginSuccessContainerProps) => {
  const { store } = useStore();
  const { handleLogin } = store.UserStore;
  const history = useHistory();
  const query = useQuery();

  const handleLoginCallback = useCallback(async () => {
    const code = query.get("code");

    await handleLogin(String(code))
      .then((res: LoginResponse) => {
        localStorage.setItem("access_token", res.data.access_token);
        history.push("/");
      })
      .catch((err: Error) => {
        if (err.message.indexOf("400")) {
          history.push("/");
        }
      });
  }, []);

  useEffect(() => {
    handleLoginCallback();
  }, [handleLoginCallback]);

  return (
    <>
      <LoginSuccess />
    </>
  );
};

export default observer(LoginSuccessContainer);

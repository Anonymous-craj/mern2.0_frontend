import { useNavigate } from "react-router-dom";
import Form from "../Form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Status } from "../../../globals/types/types";
import type { UserLoginType } from "../types";
import { login, resetStatus } from "../../../store/authSlice";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);
  console.log("Current status:", status);
  console.log("Expected success:", Status.SUCCESS);
  const dispatch = useAppDispatch();
  const handleLogin = (data: UserLoginType) => {
    console.log(data);
    dispatch(login(data));
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/");
    }
  }, [status, navigate, dispatch]);
  return <Form type="Login" onSubmit={handleLogin} />;
};

export default Login;

import Form from "../Form";
import type { UserDataType } from "../types";
import { register, resetStatus } from "../../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import { Status } from "../../../globals/types/types";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);
  console.log("Current status:", status);
  console.log("Expected success:", Status.SUCCESS);
  const dispatch = useAppDispatch();
  const handleRegister = (data: UserDataType) => {
    console.log(data);
    dispatch(register(data));
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/login");
    }
  }, [status, navigate, dispatch]);
  return <Form type="Register" onSubmit={handleRegister} />;
};

export default Register;

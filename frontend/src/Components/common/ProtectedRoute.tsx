import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router";
import { authService } from "../../services/auth";
import { SigninMutation } from "../../generated";
import { Dispatch } from "@reduxjs/toolkit";
import { loginAction, logoutAction } from "../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { ApolloError } from "@apollo/client";
import { ErrorCode } from "../../constants/errors";
import Loading from "../Seller/Loading";

const actionDispatch = (dispatch: Dispatch) => ({
  logoutAction: () => dispatch(logoutAction()),
  loginAction: (user: SigninMutation["signin"]["user"]) =>
    dispatch(loginAction(user)),
});

const ProtectedRoute = () => {
  const { logoutAction, loginAction } = actionDispatch(useAppDispatch());
  const [user, setUser] = useState<SigninMutation["signin"]["user"] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        console.log(response);
        if (response.data.currentUser) {
          setUser(response.data.currentUser);
          loginAction(response.data.currentUser);
        }
      } catch (e) {
        logoutAction();
        const error = e as ApolloError;
        if (error.graphQLErrors[0].extensions?.code === ErrorCode.NOT_FOUND) {
          setError(error.graphQLErrors[0].message);
        } else {
          navigate(
            "/Error/" +
              error.graphQLErrors[0].extensions?.code +
              "/" +
              error.graphQLErrors[0].message
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [loginAction, logoutAction, navigate]);
  if (loading) return <Loading />;

  if (error || !user) {
    if (error) alert(error);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

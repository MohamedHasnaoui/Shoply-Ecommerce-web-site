import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import { authService } from '../../services/auth';
import { SigninMutation } from '../../generated';
import { Dispatch } from '@reduxjs/toolkit';
import { loginAction, logoutAction } from '../../redux/slices/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';

const actionDispatch = (dispatch: Dispatch) => ({
  logoutAction: () => dispatch(logoutAction()),
  loginAction: (user: SigninMutation["signin"]["user"]) => dispatch(loginAction(user))
});

const ProtectedRoute = () => {
  const { logoutAction, loginAction } = actionDispatch(useAppDispatch());
  const [user, setUser] = useState<SigninMutation["signin"]["user"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response.data.currentUser) {
          setUser(response.data.currentUser);
          loginAction(response.data.currentUser); // Dispatch loginAction here
        } else {
          setError("Internal server error");
          logoutAction();
        }
      } catch (err) {
        setError((err as Error).message);
        console.log("error", err);
        logoutAction();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [loginAction, logoutAction]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  if (error || !user) {
    console.log("NULL USER", user);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
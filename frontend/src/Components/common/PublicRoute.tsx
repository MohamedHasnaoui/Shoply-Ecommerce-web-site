import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { authService } from '../../services/auth';
import { Role, SigninMutation } from '../../generated';
import { Dispatch } from '@reduxjs/toolkit';
import { loginAction } from '../../redux/slices/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { ApolloError } from '@apollo/client';
import { ErrorCode } from '../../constants/errors';
import Loading from '../Seller/Loading';

const actionDispatch = (dispatch: Dispatch) => ({
  loginAction: (user: SigninMutation["signin"]["user"]) => dispatch(loginAction(user))
});

const PublicRoute = () => {
  const { loginAction } = actionDispatch(useAppDispatch());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        const currentUser = response.data.currentUser;
        if (currentUser) {
          loginAction(currentUser);
          if(currentUser.role === Role.Buyer) navigate("/");
          if(currentUser.role === Role.Seller) navigate("/seller/home");
          if(currentUser.role === Role.Admin) navigate("/admin");
        } 
      } catch (e) {
        const error = e as ApolloError;
        if(error.graphQLErrors[0].extensions?.code === ErrorCode.NOT_FOUND){
            setError(error.graphQLErrors[0].message);
        }else{
            navigate("/Error/"+error.graphQLErrors[0].extensions?.code+"/"+error.graphQLErrors[0].message)
        }
      }
    setLoading(false);
    };

    fetchUser();
  }, [loginAction,navigate]);
  if(error) return <div className='alert alert-danger'>{error}</div>
  if(loading) return <Loading />
  return <Outlet />;
};

export default PublicRoute;
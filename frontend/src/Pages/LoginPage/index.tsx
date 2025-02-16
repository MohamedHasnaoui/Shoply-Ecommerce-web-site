import {  useState } from "react";
import {Link} from 'react-router'
import {authService} from "../../services/auth"
import { SignInInput, SigninMutation } from "../../generated";
import { Dispatch } from "@reduxjs/toolkit";
import { loginAction } from "../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const actionDispatch = (dispatch:Dispatch)=>({
  loginUser:(auth:SigninMutation["signin"]["user"])=>dispatch(loginAction(auth))
})
const Login = () => {
  const {loginUser} = actionDispatch(useAppDispatch());
  
  const [formState, setFormState] = useState<SignInInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SigninMutation["signin"] | null>(null); 
  const [submitError, setsubmitError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setsubmitError(null);
    setData(null);
    try {
      const response = await authService.login(formState);
      if(response.errors) setsubmitError(response.errors[0].message);
      if(response.data){
         setData(response.data.signin);
         loginUser(response.data.signin.user);
         localStorage.setItem("jwt",response.data.signin.jwt)
      }
    } catch (err) {
      setsubmitError((err as Error).message);
    }finally {
      setLoading(false);
    }
  };

  return (
    <section className="account py-80 ">
      <div className="container container-sm" style={{maxWidth:700}}>
        {data && <h5>hi {data.user.firstName}</h5>}
        <form onSubmit={handleSubmit}>
              <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                <h6 className="text-xl mb-32">Login</h6>
                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    Email address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="common-input"
                    name="email"
                    placeholder="Enter Email Address"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="common-input"
                    name="password"
                    placeholder="Enter Password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
                {submitError && <p className="text-danger">Error: {submitError}</p>}
                <div className="mt-48">
                  <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
                    {loading ? "wait..." : "Loging"}
                  </button>
                </div>
                <div className="mt-28">
                  <Link to="/register"
                      className="text-main-600 text-sm fw-semibold hover-text-decoration-underline"
                  >
                      Create account?
                  </Link>
                </div>
                <div className="mt-18">
                  <button type="button"
                      className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                  >
                      Forgot your password?
                  </button>
                </div>
              </div>
        </form>
      </div>
    </section>
  );
};

export default Login;

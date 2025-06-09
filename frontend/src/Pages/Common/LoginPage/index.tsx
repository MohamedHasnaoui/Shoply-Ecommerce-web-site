import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { authService } from "../../../services/auth";
import { Role, SignInInput, SigninMutation } from "../../../generated";
import { Dispatch } from "@reduxjs/toolkit";
import { loginAction } from "../../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { client } from "../../../graphqlProvider";
import { wishListService } from "../../../services/wishlist";
import { setWishlist } from "../../../redux/slices/wishlistSlice/wishlistSlice";

const actionDispatch = (dispatch: Dispatch) => ({
  loginUser: (auth: SigninMutation["signin"]["user"]) =>
    dispatch(loginAction(auth)),
});
const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = actionDispatch(useAppDispatch());

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
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setsubmitError(null);
    setData(null);
    try {
      const response = await authService.login(formState);
      console.log("res",response);
      if (response.data) {
        const data = response.data.signin;
        setData(data);
        loginUser(data.user);
        localStorage.setItem("jwt", data.jwt);
        await client.resetStore();
        if(data.user.role === Role.Seller) navigate("/seller/home");
        if(data.user.role === Role.Admin) navigate("/admin");
        const res = await wishListService.getWishList();
        dispatch(setWishlist(res ?? null));

      }
    } catch (err) {
      setsubmitError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="account py-80 ">
      <div className="container container-sm" style={{ maxWidth: 700 }}>
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
              <button
                type="submit"
                className="btn btn-main py-18 px-40"
                disabled={loading}
              >
                {loading ? "wait..." : "Loging"}
              </button>
            </div>
            <div className="mt-28">
              <Link
                to="/register"
                className="text-main-600 text-sm fw-semibold hover-text-decoration-underline"
              >
                Create account?
              </Link>
            </div>
            <div className="mt-18">
              <button
                type="button"
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

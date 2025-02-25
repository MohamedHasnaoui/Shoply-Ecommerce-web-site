import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SignupMutationVariables, Role } from "../../../generated";
import { authService } from "../../../services/auth";
import $ from 'jquery'
import select2 from 'select2';
import { Dispatch } from "@reduxjs/toolkit";
import { setSignupEmail } from "../../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
const actionDispatch = (dispatch:Dispatch)=>({
  setSignUpEmail:(email:string)=>dispatch(setSignupEmail(email))
})
const Register = () => {
  useEffect(() => {
    select2($);
    const selectElement = $('.js-example-basic-single'); // Select element
    selectElement.select2(); // Initialize Select2

    return () => {
        if (selectElement.data('select2')) {
            selectElement.select2('destroy'); // Cleanup on unmount
        }
    };
}, []);
  const navigate = useNavigate();
  const {setSignUpEmail} = actionDispatch(useAppDispatch());
  const [formState, setFormState] = useState<SignupMutationVariables["input"]>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: Role.Buyer,
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setsubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value as string,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.firstName) newErrors.firstName = "First name is required";
    if (!formState.lastName) newErrors.lastName = "Last name is required";
    if (!formState.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      newErrors.email = "Invalid email format";
    if (!formState.password) newErrors.password = "Password is required";
    else if (formState.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    if (!formState.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmitError(null);
    if (validate()) {
      try{
      setLoading(true); 
      const response = await authService.register(formState);
      setSignUpEmail(formState.email);
      navigate("/verify-email");
      console.log(response.data?.signup);
      } catch (err) {
        setsubmitError((err as Error).message);
      }finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="account py-80 ">
      <div className="container container-sm" style={{ maxWidth: 800 }}>
        <form onSubmit={handleSubmit}>
          <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
            <h6 className="text-xl mb-32">Register</h6>

            <div className="mb-24">
              <label className="text-neutral-900 text-lg mb-8 fw-medium">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="common-input"
                name="firstName"
                placeholder="Enter First Name"
                value={formState.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
            </div>

            <div className="mb-24">
              <label className="text-neutral-900 text-lg mb-8 fw-medium">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="common-input"
                name="lastName"
                placeholder="Enter Last Name"
                value={formState.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
            </div>

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
              {errors.email && <p className="text-danger">{errors.email}</p>}
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
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

            {/* Role Selection */}
            <div className="my-28 d-flex text-lg fw-medium" style={{height:50}}>
                <select
                  className="js-example-basic-single border border-geen-700 border-end-0 select2-hidden-accessible"
                  name="role"
                  value={formState.role}
                  onChange={handleChange}
                  style={{width: 200}}
                >
                  <option selected value={Role.Buyer}>{Role.Buyer}</option>
                  <option value={Role.Seller}>{Role.Seller}</option>
                </select>
              {errors.role && <p className="text-danger">{errors.role}</p>}
            </div>

            <div className="my-48">
              <p className="text-gray-500">
                Your personal data will be used to process your order, support your experience
                throughout this website, and for other purposes described in our&nbsp;
                <a href="#" className="text-main-600 text-decoration-underline">
                  privacy policy
                </a>
                .
              </p>
            </div>
            {submitError && <p className="text-danger">Error: {submitError}</p>}
                <div className="mt-48">
                  <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
                    {loading ? "wait..." : "Loging"}
                  </button>
                </div>
            <div className="mt-28">
              <Link to="/login" className="text-main-600 text-sm fw-semibold hover-text-decoration-underline">
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { RootState } from "../../../redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { deleteSignupEmail } from "../../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { authService } from "../../../services/auth";
const actionDispatch = (dispatch:Dispatch)=>({
  deleteSignupEmail:()=>dispatch(deleteSignupEmail())
})
const OTPVerification = () => {
  const navigate = useNavigate();
  const {deleteSignupEmail} = actionDispatch(useAppDispatch());
  const email = useSelector((state:RootState)=>state.auth.signupEmail);
  console.log(email,"e");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to previous input on backspace if current input is empty
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const otpString = otp.join("");
      console.log("Verifying OTP:", otpString);
      console.log(email!,otpString);
      await authService.verifyEmail(email!,otpString);
      deleteSignupEmail();
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await authService.verifyEmailRequest(email!);
      alert("New OTP has been sent to your email");
    } catch (err) {
      setError((err as Error).message || "Failed to resend OTP");
    }
  };
  if(!email){
    return(
      <Navigate to="/register" />
    )
  }
  return (
    <section className="account py-5 mt-48">
      <div className="container p-16" style={{ maxWidth: 800 }}>
        <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
          <h6 className="fs-4 mb-24">Verify Your Email</h6>

          <div className="text-center mb-24">
            <p className="text-muted">
              We've sent a verification code to
              <br />
              <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center gap-2 mb-24">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className=" green-focus form-control text-center fw-bold fs-4"
                  style={{ width: "50px", height: "50px",}}
                />
              ))}
            </div>

            {error && (
              <p className="text-danger text-center">
                {error}
              </p>
            )}

            <div className="text-center mb-28">
              <button
                type="submit"
                className="btn btn-success px-16 py-14"
                disabled={loading || otp.some((digit) => digit === "")}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-muted mb-4">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResendOTP}
                className="btn btn-link text-main text-decoration-none"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OTPVerification;

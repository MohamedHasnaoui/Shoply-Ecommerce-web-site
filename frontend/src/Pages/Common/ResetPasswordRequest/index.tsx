import { useState } from "react";
import { useNavigate } from "react-router"
import { authService } from "../../../services/auth";
import { toast } from "react-toastify";

const ResetPasswordRequest = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();
    try {
      setLoading(true);
      await authService.addResetPasswordRequest(email);
      toast.success("Reset password email was sent successfully");
    }catch(e){
      toast.error((e as Error).message);
    }finally {
      setLoading(false);
    }
  }
  return (
    <section className="account py-80 ">
      <div className="container container-sm" style={{ maxWidth: 700 }}>
        <form onSubmit={handleSubmit}>
          <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
            <h6 className="text-xl mb-32">Reset Password</h6>
            <div className="mb-24">
              <label className="text-neutral-900 text-lg mb-8 fw-medium">
                Email address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="common-input"
                name="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}
              />
            </div>
            <div className="mt-48">
              <button
                type="submit"
                className="btn btn-main py-18 px-40"
                disabled={loading}
              >
                {loading ? "wait..." : "Reset Password"}
              </button>
            </div>
            <div className="mt-18">
              <button
                type="button"
                className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                onClick={()=>{navigate("/login")}}
              >
                Back to login
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ResetPasswordRequest

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UpdateUserMutationVariables, Gender } from "../../../generated";
import { authService } from "../../../services/auth";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserAction } from "../../../redux/slices/auth/authSlice";
import $ from "jquery";
import select2 from "select2";
import { toast, ToastContainer } from "react-toastify";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();

  // Récupérer les informations de l'utilisateur à partir du store Redux
  const user = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    select2($);
    const selectElement = $(".js-example-basic-single");
    selectElement.select2();

    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);

  const [formState, setFormState] = useState<
    UpdateUserMutationVariables["input"]
  >({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    city: user?.city || "",
    birthDay: user?.birthDay || "",
    country: user?.country || "",
    postalCode: user?.postalCode || "",
    phoneNumber: user?.phoneNumber || "",
    street: user?.street || "",
    gender: user?.gender || Gender.Male,
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setsubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "gender" ? (value as Gender) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmitError(null);

    try {
      setLoading(true);

      const updateData = {
        ...formState,
      };

      const response = await authService.updateUserInput(updateData);

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (response.data?.updateUser) {
        dispatch(updateUserAction(response.data.updateUser));
        toast.success("Profile updated successfully!", {
          position: "top-center",
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      setsubmitError(
        (err as Error).message || "An error occurred during update"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="account py-80">
      <ToastContainer />
      <div className="container container-sm" style={{ maxWidth: 700 }}>
        <h6 className="text-xl mb-32 container container-sm">
          {" "}
          Hello {user?.firstName} {user?.lastName}, we hope you are doing well!
        </h6>
      </div>
      <div className="container container-sm" style={{ maxWidth: 800 }}>
        <form onSubmit={handleSubmit}>
          <div className="border border-gray-100 rounded-16 px-24 py-40">
            <h6 className="text-xl mb-32">Update Profile</h6>

            {/* First Name */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">First Name *</label>
              <input
                type="text"
                className="common-input"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                placeholder={user?.firstName || "Enter First Name"}
              />
            </div>

            {/* Last Name */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">Last Name *</label>
              <input
                type="text"
                className="common-input"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                placeholder={user?.lastName || "Enter Last Name"}
              />
            </div>

            {/* Address */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">Address</label>
              <input
                type="text"
                className="common-input"
                name="street"
                value={formState.street}
                onChange={handleChange}
                placeholder={user?.street || "Enter Address"}
              />
            </div>

            {/* City */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">City</label>
              <input
                type="text"
                className="common-input"
                name="city"
                value={formState.city}
                onChange={handleChange}
                placeholder={user?.city || "Enter City"}
              />
            </div>

            {/* Country */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">Country</label>
              <input
                type="text"
                className="common-input"
                name="country"
                value={formState.country}
                onChange={handleChange}
                placeholder={user?.country || "Enter Country"}
              />
            </div>

            {/* Postal Code */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">Postal Code</label>
              <input
                type="text"
                className="common-input"
                name="postalCode"
                value={formState.postalCode}
                onChange={handleChange}
                placeholder={user?.postalCode || "Enter Postal Code"}
              />
            </div>

            {/* Phone Number */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">Phone Number</label>
              <input
                type="tel"
                className="common-input"
                name="phoneNumber"
                value={formState.phoneNumber}
                onChange={handleChange}
                placeholder={user?.phoneNumber || "Enter Phone Number"}
              />
            </div>

            {/* Birth Day */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">Birth Date</label>
              <input
                type="date"
                className="common-input"
                name="birthDay"
                value={formState.birthDay || ""}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="mb-24">
              <label className="text-lg mb-8 fw-medium">Gender</label>
              <select
                name="gender"
                className="common-input js-example-basic-single"
                value={formState.gender}
                onChange={handleChange}
              >
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
              </select>
            </div>
            {submitError && (
              <p className="text-danger mt-3">Error: {submitError}</p>
            )}

            <div className="mt-48">
              <button
                type="submit"
                className="btn btn-main py-18 px-40"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;

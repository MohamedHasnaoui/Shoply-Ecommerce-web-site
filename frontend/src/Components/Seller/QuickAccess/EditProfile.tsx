
import { useDropzone } from "React-dropzone";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { ApolloError } from "@apollo/client";
import { ErrorCode } from "../../../constants/errors";
import { useNavigate } from "react-router";
import { uploadCloudService } from "../../../services/uploadCloud";
import { UpdateUserInput, User } from "../../../generated";
import { authService } from "../../../services/auth";
import { loginAction } from "../../../redux/slices/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../redux/hooks";
const actionDispatch = (dispatch:Dispatch)=>({
  updateUser:(auth:User)=>dispatch(loginAction(auth))
})
const EditProfile = () => {
    const {updateUser} = actionDispatch(useAppDispatch());
    const navigate = useNavigate();
    const user = useSelector((state:RootState)=>state.auth.currentUser);
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        maxFiles: 1,
        multiple: false
    });
    interface FormState {
        firstName:string;
        lastName:string; 
        password: string;
        confirmPassword: string;
        profileImage:string
    }
    const [formState, setFormState] = useState<FormState>({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "", 
        password: "",
        confirmPassword: "",
        profileImage: user?.profileImg || ""
      });
    const ProfileImage = acceptedFiles.map((image) => {
        if(image.type.includes("image")){
            return <img alt="product" width={200} src={URL.createObjectURL(image)} style={{margin:5}} />
        }   
    }
    );
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitError,setSubmitError] = useState("");
    const [updateProfileLoading,setUpdateProfileLoading] = useState(false);
      const validate = ()=>{
        console.log("Validating form state", formState);
        const newErrors: { [key: string]: string } = {};
        if (!formState?.firstName) newErrors.firstName = "First name is required";
        if (!formState?.lastName) newErrors.lastName = "Last name is required";
        if (formState?.password) {
            if( formState?.password.length < 6){
                newErrors.password = "Password must be at least 6 characters";
            }
            if(formState?.password !== formState?.confirmPassword){
                newErrors.confirmPassword = "Passwords do not match";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      }
      console.log("errors", errors);
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setSubmitError("");
        if(validate()){
          setUpdateProfileLoading(true);
            try {
               const updateInput : UpdateUserInput = {
                firstName: formState.firstName,
                lastName: formState.lastName,
                password: formState.password
               }
              if(acceptedFiles.length > 0) {
                const Urls = await uploadCloudService.uploadImages(acceptedFiles, "profile");
                updateInput.profileImg = Urls[0];
              }
              console.log("response: ");
              const response = await authService.updateUserInput(updateInput)
              console.log("response: ", response);
              updateUser(response.data?.updateUser as User);
            }catch(e){
              const err = e as ApolloError;
              console.error("Error updating profile: ", err);
              if(err.graphQLErrors[0]?.extensions?.code){
                if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                    setSubmitError(err.graphQLErrors[0].message);
                }else {
                    navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
                }
              }else{
                setSubmitError((err as Error).message);
            }
            }finally {
                setUpdateProfileLoading(false);
            }
        }
    }
  return (
    <div className="block pull-x">
        <div className="block-header bg-body-light">
            <h3 className="block-title">
            <i className="fa fa-fw fa-pencil-alt opacity-50 me-1"></i> Profile
            </h3>
            <div className="block-options">
            <button type="button" className="btn-block-option" data-toggle="block-option" data-action="content_toggle" title="Toggle Content"></button>
            </div>
        </div>
        <div className="block-content block-content-full">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="side-overlay-profile-name">First Name</label>
                <div className="input-group">
                <input type="text" className="form-control" placeholder="Your firstName.." value={formState.firstName} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormState({...formState,firstName:e.target.value})} />
                <span className="input-group-text">
                    <i className="fa fa-user"></i>
                </span>
                </div>
                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="side-overlay-profile-email">Last Name</label>
                <div className="input-group">
                <input type="text" className="form-control"  placeholder="Your lastName.." value={formState.lastName} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormState({...formState,lastName:e.target.value})}/>
                <span className="input-group-text">
                    <i className="fa fa-user"></i>
                </span>
                </div>
                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="side-overlay-profile-password">New Password</label>
                <div className="input-group">
                <input type="password" className="form-control" id="side-overlay-profile-password" name="side-overlay-profile-password" placeholder="New Password.." onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormState({...formState,password:e.target.value})} />
                <span className="input-group-text">
                    <i className="fa fa-asterisk"></i>
                </span>
                </div>
                {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="side-overlay-profile-password-confirm">Confirm New Password</label>
                <div className="input-group">
                <input type="password" className="form-control" id="side-overlay-profile-password-confirm" name="side-overlay-profile-password-confirm" placeholder="Confirm New Password.." onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormState({...formState,confirmPassword:e.target.value})} />
                <span className="input-group-text">
                    <i className="fa fa-asterisk"></i>
                </span>
                </div>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
            </div>
            {/* <!-- Images --> */}
            <div className="block block-rounded">
                <div className="block-header block-header-default">
                <h3 className="block-title">Profile Image</h3>
                </div>
                <div {...getRootProps({ className: "dropzone" })}>
                    <input className="input-zone" {...getInputProps()} accept="image/*" />
                    <div className="text-center">
                        <p className="fs-24 fw-semibold dropzone-content">
                        Drag and drop your profile image here, or click to select files
                        </p>
                    </div>
                    <div style={{display:"flex",alignItems:'center',justifyContent:"space-around",flexWrap:"wrap"}}>
                    {ProfileImage}
                    </div>
                </div> 
            </div>
            {/* <!-- END Images --> */}
            <div className="row">
                <div className="col-6">
                <button type="submit" className="btn btn-alt-primary"  disabled={updateProfileLoading}>
                    <i className={`${updateProfileLoading ? "fa fa-fw fa-sync fa-spin" : "fa fa-sync opacity-50 me-1" }`}></i> Update
                </button>
                </div>
            </div>
            {submitError && <p className="text-danger mt-2">{submitError}</p>}
            </form>
        </div>
    </div>
  )
}

export default EditProfile

import { Dispatch } from "@reduxjs/toolkit";
import { useState } from "react"
import { logoutAction } from "../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Navigate, useNavigate } from "react-router";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

interface propsType {
  toggleSideBar: () => void;
  openQuickAccess: () => void;
}
const actionDispatch = (dispatch: Dispatch) => ({
  logoutAction: () => dispatch(logoutAction()),
});
export default function Header(props:propsType) {
const [isInfoMenuOpen, setIsInfoMenuOpen] = useState(false)
const { logoutAction } = actionDispatch(useAppDispatch());
const navigate = useNavigate();
const user = useSelector((state:RootState)=>state.auth.currentUser);
const logout = async () => {
  logoutAction();
  navigate("/login");
}
if(!user) return <Navigate to={"/login"} />
return (
    <header className="position-absolute w-100" style={{zIndex:1000}}>
        {/* <!-- Header Content --> */}
        <div className="d-flex justify-content-between align-items-center p-4">
          {/* <!-- Left Section --> */}
          <div className="space-x-1">
            {/* <!-- Toggle Sidebar --> */}
            {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
            <button type="button" className="btn btn-sm btn-alt-secondary" onClick={props.toggleSideBar} title="Toggle Sidebar">
              <i className="fa fa-fw fa-bars"></i>
            </button>
            {/* <!-- END Toggle Sidebar --> */}
 
          </div>
          {/* <!-- END Left Section --> */}

          {/* <!-- Right Section --> */}
          <div className="space-x-1">
            {/* <!-- User Dropdown --> */}
            <div className="dropdown d-inline-block">
              <button type="button" className={`btn btn-sm btn-alt-secondary ${isInfoMenuOpen? "show":""}`} id="page-header-user-dropdown" onClick={()=>{setIsInfoMenuOpen(!isInfoMenuOpen)}}>
                <i className="fa fa-user d-sm-none"></i>
                <span className="d-none d-sm-inline-block fw-semibold">{user.firstName ? user.firstName.charAt(0).toUpperCase() +". "+ (user.lastName ? user.lastName : '') : ''}</span>
                <i className="fa fa-angle-down opacity-50 ms-1"></i>
              </button>
              <div className={`dropdown-menu dropdown-menu-md dropdown-menu-end p-0 ${isInfoMenuOpen? "show":""}`} style={isInfoMenuOpen ? {position:"absolute",inset:"0px 0px auto auto",margin:0,transform:"translate3d(0px, 32.8889px, 0px)"}:{}}>
                <div className="px-2 py-3 bg-body-light rounded-top">
                  <h5 className="h6 text-center mb-0">
                    {user.firstName ? user.firstName +" "+ (user.lastName ? user.lastName : '') : ''}
                  </h5>
                </div>
                <div className="p-2">
                  <button title="Sign Out" className="dropdown-item d-flex align-items-center justify-content-between space-x-1 btn" onClick={logout}>
                    <span>Sign Out</span>
                    <i className="fa fa-fw fa-sign-out-alt opacity-25"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- END User Dropdown --> */}
          </div>
          {/* <!-- END Right Section --> */}
        </div>
        {/* <!-- END Header Content --> */}
 
 
      </header>
  )
}

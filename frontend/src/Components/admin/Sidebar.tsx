import { useState } from "react"
import avatar from "../../assets/sellerAssets/media/avatars/avatar15.jpg"
import { Link, Navigate, useNavigate } from "react-router"
import { useAppDispatch } from "../../redux/hooks"
import { logoutAction } from "../../redux/slices/auth/authSlice"
import { Dispatch } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { client } from "../../graphqlProvider"
interface propsType  {
  closeSidebar: ()=> void
}
const actionDispatch = (dispatch: Dispatch) => ({
  logoutAction: () => dispatch(logoutAction()),
});
export default function Sidebar(props:propsType) {
  const user = useSelector((state:RootState)=>state.auth.currentUser);
  const [isOpenManageMenu, setIsOpenManageMenu] = useState(false)
  const { logoutAction } = actionDispatch(useAppDispatch());
  const navigate = useNavigate();
  const logout =async () => {
    logoutAction();
    await client.resetStore();
    navigate("/login");
  }
  if(!user) return <Navigate to={"/login"} />
  return (
      <nav id="sidebar">
          {/* <!-- Sidebar Content --> */}
          <div className="sidebar-content">
            {/* <!-- Side Header --> */}
            <div className="content-header justify-content-lg-center">
              {/* <!-- Logo --> */}
              <div>
                <span className="smini-visible fw-bold tracking-wide fs-lg">
                  c<span className="text-primary">b</span>
                </span>
                <Link className="link-fx fw-bold tracking-wide mx-auto" to={"/seller/home"}>
                  <span className="smini-hidden">
                    <i className="fa fa-fire text-primary"></i>
                    <span className="fs-4 text-dual"> Sho</span><span className="fs-4 text-primary">ply</span>
                  </span>
                </Link>
              </div>
              {/* <!-- END Logo --> */}
              {/* <!-- Options --> */}
              <div>
                {/* <!-- Close Sidebar, Visible only on mobile screens --> */}
                {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
                <button title="Close Sidebar" type="button" className="btn btn-sm btn-alt-danger d-lg-none" onClick={props.closeSidebar}>
                  <i className="fa fa-fw fa-times"></i>
                </button>
                {/* <!-- END Close Sidebar --> */}
              </div>
              {/* <!-- END Options --> */}
            </div>
            {/* <!-- END Side Header --> */}

            {/* <!-- Sidebar Scrolling --> */}
            <div className="js-sidebar-scroll">
              {/* <!-- Side User --> */}
              <div className="content-side content-side-user px-0 py-0">
                {/* <!-- Visible only in mini mode --> */}
                <div className="smini-visible-block animated fadeIn px-3">
                  <img className="img-avatar img-avatar32" src={user.profileImg ?? avatar} alt="" />
                </div>
                {/* <!-- END Visible only in mini mode --> */}

                {/* <!-- Visible only in normal mode --> */}
                <div className="smini-hidden text-center mx-auto">
                  <button type="button" title="Profile" className="img-link btn">
                    <img className="img-avatar" src={user.profileImg ?? avatar} alt="" />
                  </button>
                  <ul className="list-inline mt-3 mb-0">
                    <li className="list-inline-item">
                      <h3 className="link-fx text-dual fs-sm fw-semibold text-uppercase">{user.firstName ? user.firstName.charAt(0).toUpperCase() +". "+ (user.lastName ? user.lastName : '') : ''}</h3>
                    </li>
                    <li className="list-inline-item">
                      {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
                    </li>
                    <li className="list-inline-item">
                      <button type="button" title="Logout" className="link-fx text-dual btn btn-sm btn-alt-secondary" onClick={logout}>
                        <i className="fa fa-sign-out-alt"></i>
                      </button>
                    </li>
                  </ul>
                </div>
                {/* <!-- END Visible only in normal mode --> */}
              </div>
              {/* <!-- END Side User --> */}

              {/* <!-- Side Navigation --> */}
              <div className="content-side content-side-full">
                <ul className="nav-main">
                  <li className="nav-main-item">
                    <Link to={"/admin"} className="nav-main-link active">
                      <i className="nav-main-link-icon fa fa-house-user"></i>
                      <span className="nav-main-link-name">Dashboard</span>
                    </Link>
                  </li>
                  <li className={`nav-main-item ${isOpenManageMenu ? "open":""}`}>
                        <div role="button" className="nav-main-link nav-main-link-submenu" onClick={()=>setIsOpenManageMenu(!isOpenManageMenu)}>
                        <i className="nav-main-link-icon fa fa-shopping-bag"></i>
                          <span className="nav-main-link-name">admin</span>
                        </div>
                        <ul className="nav-main-submenu"> 
                          <li className="nav-main-item">
                            <Link to={"/admin/manageUsersAndProducts"} className="nav-main-link">
                              <span className="nav-main-link-name">Manage Users And Products</span>
                            </Link>
                          </li>
                        </ul>
                  </li>          
                </ul>
              </div>
            </div>
          </div>
      </nav>
  )
}

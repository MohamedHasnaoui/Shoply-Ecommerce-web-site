import { useState } from "react"
import avatar from "../../assets/sellerAssets/media/avatars/avatar15.jpg"
interface propsType  {
  closeSidebar: ()=> void
}
export default function Sidebar(props:propsType) {
  const [isOpenManageMenu, setIsOpenManageMenu] = useState(false)
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
                <a className="link-fx fw-bold tracking-wide mx-auto" href="index.html">
                  <span className="smini-hidden">
                    <i className="fa fa-fire text-primary"></i>
                    <span className="fs-4 text-dual"> Sho</span><span className="fs-4 text-primary">ply</span>
                  </span>
                </a>
              </div>
              {/* <!-- END Logo --> */}

              {/* <!-- Options --> */}
              <div>
                {/* <!-- Close Sidebar, Visible only on mobile screens --> */}
                {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
                <button type="button" className="btn btn-sm btn-alt-danger d-lg-none" onClick={props.closeSidebar}>
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
                  <img className="img-avatar img-avatar32" src={avatar} alt="" />
                </div>
                {/* <!-- END Visible only in mini mode --> */}

                {/* <!-- Visible only in normal mode --> */}
                <div className="smini-hidden text-center mx-auto">
                  <a className="img-link" href="be_pages_generic_profile.html">
                    <img className="img-avatar" src={avatar} alt="" />
                  </a>
                  <ul className="list-inline mt-3 mb-0">
                    <li className="list-inline-item">
                      <a className="link-fx text-dual fs-sm fw-semibold text-uppercase" href="be_pages_generic_profile.html">J. Smith</a>
                    </li>
                    <li className="list-inline-item">
                      {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
                      <a className="link-fx text-dual" data-toggle="layout" data-action="dark_mode_toggle" href="javascript:void(0)">
                        <i className="far fa-fw fa-moon" data-dark-mode-icon></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="link-fx text-dual" href="op_auth_signin.html">
                        <i className="fa fa-sign-out-alt"></i>
                      </a>
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
                    <a className="nav-main-link active" href="be_pages_dashboard.html">
                      <i className="nav-main-link-icon fa fa-house-user"></i>
                      <span className="nav-main-link-name">Dashboard</span>
                    </a>
                  </li>
                  <li className={`nav-main-item ${isOpenManageMenu ? "open":""}`}>
                        <div role="button" className="nav-main-link nav-main-link-submenu" onClick={()=>setIsOpenManageMenu(!isOpenManageMenu)}>
                        <i className="nav-main-link-icon fa fa-shopping-bag"></i>
                          <span className="nav-main-link-name">e-Commerce</span>
                        </div>
                        <ul className="nav-main-submenu">
                          <li className="nav-main-item">
                            <a className="nav-main-link" href="be_pages_ecom_dashboard.html">
                              <span className="nav-main-link-name">Dashboard</span>
                            </a>
                          </li>
                          <li className="nav-main-item">
                            <a className="nav-main-link" href="be_pages_ecom_orders.html">
                              <span className="nav-main-link-name">Orders</span>
                            </a>
                          </li>
                          <li className="nav-main-item">
                            <a className="nav-main-link" href="be_pages_ecom_order.html">
                              <span className="nav-main-link-name">Order</span>
                            </a>
                          </li>
                          <li className="nav-main-item">
                            <a className="nav-main-link" href="be_pages_ecom_products.html">
                              <span className="nav-main-link-name">Products</span>
                            </a>
                          </li>
                          <li className="nav-main-item">
                            <a className="nav-main-link" href="be_pages_ecom_product_edit.html">
                              <span className="nav-main-link-name">Product Edit</span>
                            </a>
                          </li>
                          <li className="nav-main-item">
                            <a className="nav-main-link" href="be_pages_ecom_customer.html">
                              <span className="nav-main-link-name">Customer</span>
                            </a>
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

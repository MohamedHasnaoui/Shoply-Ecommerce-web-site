import { useState } from "react"

interface propsType  {
  toggleSideBar: ()=> void
}
export default function Header(props:propsType) {
const [isInfoMenuOpen, setIsInfoMenuOpen] = useState(false)
return (
    <header id="page-header">
        {/* <!-- Header Content --> */}
        <div className="content-header">
          {/* <!-- Left Section --> */}
          <div className="space-x-1">
            {/* <!-- Toggle Sidebar --> */}
            {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
            <button type="button" className="btn btn-sm btn-alt-secondary" onClick={props.toggleSideBar}>
              <i className="fa fa-fw fa-bars"></i>
            </button>
            {/* <!-- END Toggle Sidebar --> */}

            {/* <!-- Open Search Section --> */}
            {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
            <button type="button" className="btn btn-sm btn-alt-secondary" data-toggle="layout" data-action="header_search_on">
              <i className="fa fa-fw fa-search"></i>
            </button>
            {/* <!-- END Open Search Section --> */}

            {/* <!-- Color Themes --> */}
            <div className="dropdown d-inline-block">
              <button type="button" className="btn btn-sm btn-alt-secondary" id="page-header-themes-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-fw fa-brush"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-lg p-0" aria-labelledby="page-header-themes-dropdown">
                <div className="px-3 py-2 bg-body-light rounded-top">
                  <h5 className="fs-sm text-center mb-0">
                    Color Themes
                  </h5>
                </div>
                <div className="p-3">
                  <div className="row g-0 text-center">
                    <div className="col-2">
                      <a className="text-default" data-toggle="theme" data-theme="default" href="javascript:void(0)">
                        <i className="fa fa-2x fa-circle"></i>
                      </a>
                    </div>
                    <div className="col-2">
                      <a className="text-elegance" data-toggle="theme" data-theme="assets/css/themes/elegance.min.css" href="javascript:void(0)">
                        <i className="fa fa-2x fa-circle"></i>
                      </a>
                    </div>
                    <div className="col-2">
                      <a className="text-pulse" data-toggle="theme" data-theme="assets/css/themes/pulse.min.css" href="javascript:void(0)">
                        <i className="fa fa-2x fa-circle"></i>
                      </a>
                    </div>
                    <div className="col-2">
                      <a className="text-flat" data-toggle="theme" data-theme="assets/css/themes/flat.min.css" href="javascript:void(0)">
                        <i className="fa fa-2x fa-circle"></i>
                      </a>
                    </div>
                    <div className="col-2">
                      <a className="text-corporate" data-toggle="theme" data-theme="assets/css/themes/corporate.min.css" href="javascript:void(0)">
                        <i className="fa fa-2x fa-circle"></i>
                      </a>
                    </div>
                    <div className="col-2">
                      <a className="text-earth" data-toggle="theme" data-theme="assets/css/themes/earth.min.css" href="javascript:void(0)">
                        <i className="fa fa-2x fa-circle"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 bg-body-light rounded-top">
                  <h5 className="fs-sm text-center mb-0">
                    Dark Mode
                  </h5>
                </div>
                <div className="px-2 py-3">
                  <div className="row g-1 text-center">
                    <div className="col-4">
                      <button type="button" className="dropdown-item mb-0 d-flex align-items-center gap-2" data-toggle="layout" data-action="dark_mode_off" data-dark-mode="off">
                        <i className="far fa-sun fa-fw opacity-50"></i>
                        <span className="fs-sm fw-medium">Light</span>
                      </button>
                    </div>
                    <div className="col-4">
                      <button type="button" className="dropdown-item mb-0 d-flex align-items-center gap-2" data-toggle="layout" data-action="dark_mode_on" data-dark-mode="on">
                        <i className="fa fa-moon fa-fw opacity-50"></i>
                        <span className="fs-sm fw-medium">Dark</span>
                      </button>
                    </div>
                    <div className="col-4">
                      <button type="button" className="dropdown-item mb-0 d-flex align-items-center gap-2" data-toggle="layout" data-action="dark_mode_system" data-dark-mode="system">
                        <i className="fa fa-desktop fa-fw opacity-50"></i>
                        <span className="fs-sm fw-medium">System</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-body-light rounded-bottom">
                  <div className="row g-sm text-center">
                    <div className="col-6">
                      <a className="dropdown-item fs-sm fw-medium mb-0" href="be_layout_api.html">
                        <i className="fa fa-flask opacity-50 me-1"></i> Layout API
                      </a>
                    </div>
                    <div className="col-6">
                      <a className="dropdown-item fs-sm fw-medium mb-0" href="be_ui_color_themes.html">
                        <i className="fa fa-paint-brush opacity-50 me-1"></i> Themes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- END Color Themes --> */}
          </div>
          {/* <!-- END Left Section --> */}

          {/* <!-- Right Section --> */}
          <div className="space-x-1">
            {/* <!-- User Dropdown --> */}
            <div className="dropdown d-inline-block">
              <button type="button" className={`btn btn-sm btn-alt-secondary ${isInfoMenuOpen? "show":""}`} id="page-header-user-dropdown" onClick={()=>setIsInfoMenuOpen(!isInfoMenuOpen)}>
                <i className="fa fa-user d-sm-none"></i>
                <span className="d-none d-sm-inline-block fw-semibold">J. Smith</span>
                <i className="fa fa-angle-down opacity-50 ms-1"></i>
              </button>
              <div className={`dropdown-menu dropdown-menu-md dropdown-menu-end p-0 ${isInfoMenuOpen? "show":""}`} style={isInfoMenuOpen ? {position:"absolute",inset:"0px 0px auto auto",margin:0,transform:"translate3d(0px, 32.8889px, 0px)"}:{}}>
                <div className="px-2 py-3 bg-body-light rounded-top">
                  <h5 className="h6 text-center mb-0">
                    John Smith
                  </h5>
                </div>
                <div className="p-2">
                  <a className="dropdown-item d-flex align-items-center justify-content-between space-x-1" href="be_pages_generic_profile.html">
                    <span>Profile</span>
                    <i className="fa fa-fw fa-user opacity-25"></i>
                  </a>
                  <a className="dropdown-item d-flex align-items-center justify-content-between" href="be_pages_generic_inbox.html">
                    <span>Inbox</span>
                    <i className="fa fa-fw fa-envelope-open opacity-25"></i>
                  </a>
                  <a className="dropdown-item d-flex align-items-center justify-content-between space-x-1" href="be_pages_generic_invoice.html">
                    <span>Invoices</span>
                    <i className="fa fa-fw fa-file opacity-25"></i>
                  </a>
                  <div className="dropdown-divider"></div>

                  {/* <!-- Toggle Side Overlay --> */}
                  {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
                  <a className="dropdown-item d-flex align-items-center justify-content-between space-x-1" href="javascript:void(0)" data-toggle="layout" data-action="side_overlay_toggle">
                    <span>Settings</span>
                    <i className="fa fa-fw fa-wrench opacity-25"></i>
                  </a>
                  {/* <!-- END Side Overlay --> */}

                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item d-flex align-items-center justify-content-between space-x-1" href="op_auth_signin.html">
                    <span>Sign Out</span>
                    <i className="fa fa-fw fa-sign-out-alt opacity-25"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- END User Dropdown --> */}

            {/* <!-- Notifications --> */}
            <div className="dropdown d-inline-block">
              <button type="button" className="btn btn-sm btn-alt-secondary" id="page-header-notifications" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-flag"></i>
                <span className="text-primary">&bull;</span>
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications">
                <div className="px-2 py-3 bg-body-light rounded-top">
                  <h5 className="h6 text-center mb-0">
                    Notifications
                  </h5>
                </div>
                <ul className="nav-items my-2 fs-sm">
                  <li>
                    <a className="text-dark d-flex py-2" href="javascript:void(0)">
                      <div className="flex-shrink-0 me-2 ms-3">
                        <i className="fa fa-fw fa-check text-success"></i>
                      </div>
                      <div className="flex-grow-1 pe-2">
                        <p className="fw-medium mb-1">You’ve upgraded to a VIP account successfully!</p>
                        <div className="text-muted">15 min ago</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="text-dark d-flex py-2" href="javascript:void(0)">
                      <div className="flex-shrink-0 me-2 ms-3">
                        <i className="fa fa-fw fa-exclamation-triangle text-warning"></i>
                      </div>
                      <div className="flex-grow-1 pe-2">
                        <p className="fw-medium mb-1">Please check your payment info since we can’t validate them!</p>
                        <div className="text-muted">50 min ago</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="text-dark d-flex py-2" href="javascript:void(0)">
                      <div className="flex-shrink-0 me-2 ms-3">
                        <i className="fa fa-fw fa-times text-danger"></i>
                      </div>
                      <div className="flex-grow-1 pe-2">
                        <p className="fw-medium mb-1">Web server stopped responding and it was automatically restarted!</p>
                        <div className="text-muted">4 hours ago</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="text-dark d-flex py-2" href="javascript:void(0)">
                      <div className="flex-shrink-0 me-2 ms-3">
                        <i className="fa fa-fw fa-exclamation-triangle text-warning"></i>
                      </div>
                      <div className="flex-grow-1 pe-2">
                        <p className="fw-medium mb-1">Please consider upgrading your plan. You are running out of space.</p>
                        <div className="text-muted">16 hours ago</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="text-dark d-flex py-2" href="javascript:void(0)">
                      <div className="flex-shrink-0 me-2 ms-3">
                        <i className="fa fa-fw fa-plus text-primary"></i>
                      </div>
                      <div className="flex-grow-1 pe-2">
                        <p className="fw-medium mb-1">New purchases! +$250</p>
                        <div className="text-muted">1 day ago</div>
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="p-2 bg-body-light rounded-bottom">
                  <a className="dropdown-item text-center mb-0" href="javascript:void(0)">
                    <i className="fa fa-fw fa-flag opacity-50 me-1"></i> View All
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- END Notifications --> */}

            {/* <!-- Toggle Side Overlay --> */}
            {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
            <button type="button" className="btn btn-sm btn-alt-secondary" data-toggle="layout" data-action="side_overlay_toggle">
              <i className="fa fa-fw fa-stream"></i>
            </button>
            {/* <!-- END Toggle Side Overlay --> */}
          </div>
          {/* <!-- END Right Section --> */}
        </div>
        {/* <!-- END Header Content --> */}

        {/* <!-- Header Search --> */}
        <div id="page-header-search" className="overlay-header bg-body-extra-light">
          <div className="content-header">
            <form className="w-100" action="be_pages_generic_search.html" method="POST">
              <div className="input-group">
                {/* <!-- Close Search Section --> */}
                {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
                <button type="button" className="btn btn-secondary" data-toggle="layout" data-action="header_search_off">
                  <i className="fa fa-fw fa-times"></i>
                </button>
                {/* <!-- END Close Search Section --> */}
                <input type="text" className="form-control" placeholder="Search or hit ESC.." id="page-header-search-input" name="page-header-search-input" />
                <button type="submit" className="btn btn-secondary">
                  <i className="fa fa-fw fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- END Header Search --> */}

        {/* <!-- Header Loader --> */}
        {/* <!-- Please check out the Activity page under Elements category to see examples of showing/hiding it --> */}
        <div id="page-header-loader" className="overlay-header bg-primary">
          <div className="content-header">
            <div className="w-100 text-center">
              <i className="far fa-sun fa-spin text-white"></i>
            </div>
          </div>
        </div>
        {/* <!-- END Header Loader --> */}
      </header>
  )
}

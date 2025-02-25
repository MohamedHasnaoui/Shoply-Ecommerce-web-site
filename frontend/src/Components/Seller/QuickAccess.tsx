import avatar1 from "../../assets/sellerAssets/media/avatars/avatar1.jpg"
import avatar3 from "../../assets/sellerAssets/media/avatars/avatar3.jpg"
import avatar15 from "../../assets/sellerAssets/media/avatars/avatar15.jpg"
import avatar16 from "../../assets/sellerAssets/media/avatars/avatar16.jpg"
import SimpleBar from "simplebar-react"
interface propsType  {
    closeQuickAccess: ()=>void;
  }
export default function QuickAccess(props:propsType) {
  return (
    <SimpleBar id="side-overlay">
        {/* <!-- Side Header --> */}
        <div className="content-header">
          {/* <!-- User Avatar --> */}
          <a className="img-link me-2" href="be_pages_generic_profile.html">
            <img className="img-avatar img-avatar32" src={avatar15} alt="" />
          </a>
          {/* <!-- END User Avatar --> */}

          {/* <!-- User Info --> */}
          <a className="link-fx text-body-color-dark fw-semibold fs-sm" href="be_pages_generic_profile.html">
            John Smith
          </a>
          {/* <!-- END User Info --> */}

          {/* <!-- Close Side Overlay --> */}
          {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
          <button type="button" className="btn btn-sm btn-alt-danger ms-auto" onClick={props.closeQuickAccess}>
            <i className="fa fa-fw fa-times"></i>
          </button>
          {/* <!-- END Close Side Overlay --> */}
        </div>
        {/* <!-- END Side Header --> */}

        {/* <!-- Side Content --> */}
        <div className="content-side">
          {/* <!-- Search --> */}
          <div className="block pull-t pull-x">
            <div className="block-content block-content-full block-content-sm bg-body-light">
              <form action="be_pages_generic_search.html" method="POST">
                <div className="input-group">
                  <input type="text" className="form-control" id="side-overlay-search" name="side-overlay-search" placeholder="Search.." />
                  <button type="submit" className="btn btn-secondary">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- END Search --> */}

          {/* <!-- Mini Stats --> */}
          <div className="block pull-x">
            <div className="block-content block-content-full block-content-sm bg-body-light">
              <div className="row text-center">
                <div className="col-4">
                  <div className="fs-sm fw-semibold text-uppercase text-muted">Clients</div>
                  <div className="fs-4">460</div>
                </div>
                <div className="col-4">
                  <div className="fs-sm fw-semibold text-uppercase text-muted">Sales</div>
                  <div className="fs-4">728</div>
                </div>
                <div className="col-4">
                  <div className="fs-sm fw-semibold text-uppercase text-muted">Earnings</div>
                  <div className="fs-4">$7,860</div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- END Mini Stats --> */}

          {/* <!-- Friends --> */}
          <div className="block pull-x">
            <div className="block-header bg-body-light">
              <h3 className="block-title">
                <i className="fa fa-fw fa-users opacity-50 me-1"></i> Friends
              </h3>
              <div className="block-options">
                <button type="button" className="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
                  <i className="si si-refresh"></i>
                </button>
                <button type="button" className="btn-block-option" data-toggle="block-option" data-action="content_toggle"></button>
              </div>
            </div>
            <div className="block-content">
              <ul className="nav-users">
                <li>
                  <a href="be_pages_generic_profile.html">
                    <img className="img-avatar" src={avatar3} alt="" />
                    <i className="fa fa-circle text-success"></i>
                    <div>Laura Carr</div>
                    <div className="fw-normal fs-xs text-muted">Photographer</div>
                  </a>
                </li>
                <li>
                  <a href="be_pages_generic_profile.html">
                    <img className="img-avatar" src={avatar15} alt="" />
                    <i className="fa fa-circle text-success"></i>
                    <div>Ralph Murray</div>
                    <div className="fw-normal fs-xs text-muted">Web Designer</div>
                  </a>
                </li>
                <li>
                  <a href="be_pages_generic_profile.html">
                    <img className="img-avatar" src={avatar1} alt="" />
                    <i className="fa fa-circle text-warning"></i>
                    <div>Andrea Gardner</div>
                    <div className="fw-normal fs-xs text-muted">UI Designer</div>
                  </a>
                </li>
                <li>
                  <a href="be_pages_generic_profile.html">
                    <img className="img-avatar" src={avatar16} alt="" />
                    <div>Thomas Riley</div>
                    <div className="fw-normal fs-xs text-muted">Copywriter</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- END Friends --> */}

          {/* <!-- Activity --> */}
          <div className="block pull-x">
            <div className="block-header bg-body-light">
              <h3 className="block-title">
                <i className="far fa-fw fa-clock opacity-50 me-1"></i> Activity
              </h3>
              <div className="block-options">
                <button type="button" className="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
                  <i className="si si-refresh"></i>
                </button>
                <button type="button" className="btn-block-option" data-toggle="block-option" data-action="content_toggle"></button>
              </div>
            </div>
            <div className="block-content">
              <ul className="list list-activity mb-0">
                <li>
                  <i className="si si-wallet text-success"></i>
                  <div className="fs-sm fw-semibold">+$29 New sale</div>
                  <div className="fs-sm">
                    <a href="javascript:void(0)">Admin Template</a>
                  </div>
                  <div className="fs-xs text-muted">5 min ago</div>
                </li>
                <li>
                  <i className="si si-close text-danger"></i>
                  <div className="fs-sm fw-semibold">Project removed</div>
                  <div className="fs-sm">
                    <a href="javascript:void(0)">Best Icon Set</a>
                  </div>
                  <div className="fs-xs text-muted">26 min ago</div>
                </li>
                <li>
                  <i className="si si-pencil text-info"></i>
                  <div className="fs-sm fw-semibold">You edited the file</div>
                  <div className="fs-sm">
                    <a href="javascript:void(0)">
                      <i className="fa fa-file-alt"></i> Docs.doc
                    </a>
                  </div>
                  <div className="fs-xs text-muted">3 hours ago</div>
                </li>
                <li>
                  <i className="si si-plus text-success"></i>
                  <div className="fs-sm fw-semibold">New user</div>
                  <div className="fs-sm">
                    <a href="javascript:void(0)">StudioWeb - View Profile</a>
                  </div>
                  <div className="fs-xs text-muted">5 hours ago</div>
                </li>
                <li>
                  <i className="si si-wrench text-warning"></i>
                  <div className="fs-sm fw-semibold">App v5.5 is available</div>
                  <div className="fs-sm">
                    <a href="javascript:void(0)">Update now</a>
                  </div>
                  <div className="fs-xs text-muted">8 hours ago</div>
                </li>
                <li>
                  <i className="si si-user-follow text-pulse"></i>
                  <div className="fs-sm fw-semibold">+1 Friend Request</div>
                  <div className="fs-sm">
                    <a href="javascript:void(0)">Accept</a>
                  </div>
                  <div className="fs-xs text-muted">1 day ago</div>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- END Activity --> */}

          {/* <!-- Profile --> */}
          <div className="block pull-x">
            <div className="block-header bg-body-light">
              <h3 className="block-title">
                <i className="fa fa-fw fa-pencil-alt opacity-50 me-1"></i> Profile
              </h3>
              <div className="block-options">
                <button type="button" className="btn-block-option" data-toggle="block-option" data-action="content_toggle"></button>
              </div>
            </div>
            <div className="block-content block-content-full">
              <form >
                <div className="mb-3">
                  <label className="form-label" htmlFor="side-overlay-profile-name">Name</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="side-overlay-profile-name" name="side-overlay-profile-name" placeholder="Your name.." value="John Smith" />
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="side-overlay-profile-email">Email</label>
                  <div className="input-group">
                    <input type="email" className="form-control" id="side-overlay-profile-email" name="side-overlay-profile-email" placeholder="Your email.." value="john.smith@example.com" />
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="side-overlay-profile-password">New Password</label>
                  <div className="input-group">
                    <input type="password" className="form-control" id="side-overlay-profile-password" name="side-overlay-profile-password" placeholder="New Password.." />
                    <span className="input-group-text">
                      <i className="fa fa-asterisk"></i>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="side-overlay-profile-password-confirm">Confirm New Password</label>
                  <div className="input-group">
                    <input type="password" className="form-control" id="side-overlay-profile-password-confirm" name="side-overlay-profile-password-confirm" placeholder="Confirm New Password.." />
                    <span className="input-group-text">
                      <i className="fa fa-asterisk"></i>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <button type="submit" className="btn btn-alt-primary">
                      <i className="fa fa-sync opacity-50 me-1"></i> Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- END Profile --> */}

          {/* <!-- Settings --> */}
          <div className="block pull-x">
            <div className="block-header bg-body-light">
              <h3 className="block-title">
                <i className="fa fa-fw fa-wrench opacity-50 me-1"></i> Settings
              </h3>
              <div className="block-options">
                <button type="button" className="btn-block-option" data-toggle="block-option" data-action="content_toggle"></button>
              </div>
            </div>
            <div className="block-content block-content-full">
              <div className="mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="side-overlay-settings-security-status" name="side-overlay-settings-security-status" checked />
                  <label className="form-check-label fw-medium" htmlFor="side-overlay-settings-security-status">Online Status</label>
                  <div className="fs-sm text-muted">Show your status to all</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="side-overlay-settings-security-verify" name="side-overlay-settings-security-verify" />
                  <label className="form-check-label fw-medium" htmlFor="side-overlay-settings-security-verify">Verify on Login</label>
                  <div className="fs-sm text-muted">Most secure option</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="side-overlay-settings-security-updates" name="side-overlay-settings-security-updates" checked />
                  <label className="form-check-label fw-medium" htmlFor="side-overlay-settings-security-updates">Auto Updates</label>
                  <div className="fs-sm text-muted">Keep app updated</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="side-overlay-settings-security-notifications" name="side-overlay-settings-security-notifications" checked />
                  <label className="form-check-label fw-medium" htmlFor="side-overlay-settings-security-notifications">Notifications</label>
                  <div className="fs-sm text-muted">For every transaction</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="side-overlay-settings-security-api" name="side-overlay-settings-security-api" checked />
                  <label className="form-check-label fw-medium" htmlFor="side-overlay-settings-security-api">API Access</label>
                  <div className="fs-sm text-muted">Enable access from third party apps</div>
                </div>
              </div>
              <div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="side-overlay-settings-security-2fa" name="side-overlay-settings-security-2fa" />
                  <label className="form-check-label fw-medium" htmlFor="side-overlay-settings-security-2fa">Two Factor Auth</label>
                  <div className="fs-sm text-muted">Using an authenticator</div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- END Settings --> */}
        </div>
        {/* <!-- END Side Content --> */}
      </SimpleBar>
  )
}

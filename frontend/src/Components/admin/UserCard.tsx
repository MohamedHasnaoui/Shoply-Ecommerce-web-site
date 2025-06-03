const UserCard = () => {
  return (
    <div className="col-md-6 col-xl-3">
              <div className="block block-rounded block-themed text-center">
                <div className="block-content block-content-full block-sticky-options pt-4 bg-primary-dark">
                  <div className="block-options">
                    <div className="dropdown">
                      <button type="button" className="btn-block-option" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-fw fa-ellipsis-v"></i>
                      </button>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="fa fa-fw fa-plus opacity-50 me-1"></i>
                          <span>Add friend</span>
                        </a>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="fa fa-fw fa-user opacity-50 me-1"></i>
                          <span>Check out profile</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="fa fa-fw fa-envelope opacity-50 me-1"></i>
                          <span>Send a message</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <img className="img-avatar img-avatar-thumb" src="assets/media/avatars/avatar16.jpg" alt="" />
                </div>
                <div className="block-content block-content-full block-content-sm bg-primary">
                  <div className="fw-semibold text-white mb-1">Jose Mills</div>
                  <div className="fs-sm text-white-75">Web Developer</div>
                </div>
                <div className="block-content">
                  <div className="row items-push">
                    <div className="col-6">
                      <div className="mb-1"><i className="si si-notebook fa-2x"></i></div>
                      <div className="fs-sm text-muted">4 Notes</div>
                    </div>
                    <div className="col-6">
                      <div className="mb-1"><i className="si si-camera fa-2x"></i></div>
                      <div className="fs-sm text-muted">14 Photos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default UserCard

interface PropsType {
  message?:string
}
const InternalServerError = ({message}:PropsType) => {
  return (
    <main id="main-container">
        {/* <!-- Page Content --> */}
        <div className="hero bg-body-extra-light">
          <div className="hero-inner">
            <div className="content content-full">
              <div className="py-4 text-center">
                <div className="display-1 fw-bold text-flat">
                  <i className="far fa-times-circle opacity-50 me-1"></i> 500
                </div>
                <h1 className="fw-bold mt-5 mb-2">Oops.. You just found an error page..</h1>
                <h2 className="fs-4 fw-medium text-muted mb-5">We are sorry but your request cannot be fulfilled..</h2>
                <h2 className="fs-4 fw-medium text-muted mb-5">{message}</h2>
                <a className="btn btn-lg btn-alt-secondary" href="be_pages_error_all.html">
                  <i className="fa fa-arrow-left opacity-50 me-1"></i> Back to all Errors
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* END Page Content */}
      </main>
  )
}

export default InternalServerError

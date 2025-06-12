interface PropsType {
  message?:string
}
const Unauthorized = ({message}:PropsType) => {
  return (
    <main id="main-container">
    {/* <!-- Page Content --> */}
    <div className="hero bg-body-extra-light">
      <div className="hero-inner">
        <div className="content content-full">
          <div className="py-4 text-center">
            <div className="display-1 fw-bold text-info">
              <i className="fa fa-lock opacity-50 me-1"></i> 401
            </div>
            <h1 className="fw-bold mt-5 mb-2">Oops.. You just found an error page..</h1>
            <h2 className="fs-4 fw-medium text-muted mb-5">We are sorry but you are not authorized to access this page..</h2>
            <h2 className="fs-4 fw-medium text-muted mb-5">{message}</h2>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- END Page Content --> */}  
  </main>
  )
}

export default Unauthorized

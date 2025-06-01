import { User } from "../../generated"
interface PropsType {
    customer:User
}
const CustomerAdresses = (props:PropsType) => {
  return (
    <>
    <h2 className="content-heading">Addresses</h2>
      <div className="row">
        {/* <!-- Billing Address --> */}
        <div className="col-md-6">
          <div className="block block-rounded">
            <div className="block-header block-header-default">
              <h3 className="block-title">Billing Address</h3>
            </div>
            <div className="block-content">
              <div className="fs-lg mb-1">{props.customer?.firstName} {props.customer?.lastName}</div>
              <address>
                {props.customer.street}<br/>
               {props.customer.city} {props.customer.postalCode}<br/>
                {props.customer.country}<br/><br/>
                <i className="fa fa-phone me-1"></i>{props.customer.phoneNumber}<br/>
                <i className="far fa-envelope me-1"></i> <a href={`mailto:${props.customer.email}`}>{props.customer.email}</a>
              </address>
            </div>
          </div>
        </div>
        {/* <!-- END Billing Address --> */}

        {/* <!-- Shipping Address --> */}
        <div className="col-md-6">
          <div className="block block-rounded">
            <div className="block-header block-header-default">
              <h3 className="block-title">Shipping Address</h3>
            </div>
            <div className="block-content">
              <div className="fs-lg mb-1">{props.customer?.firstName} {props.customer?.lastName}</div>
              <address>
                {props.customer.street}<br/>
               {props.customer.city} {props.customer.postalCode}<br/>
                {props.customer.country}<br/><br/>
                <i className="fa fa-phone me-1"></i>{props.customer.phoneNumber}<br/>
                <i className="far fa-envelope me-1"></i> <a href={`mailto:${props.customer.email}`}>{props.customer.email}</a>
              </address>
            </div>
          </div>
        </div>
        {/* <!-- END Shipping Address --> */}
      </div>
      </>
  )
}

export default CustomerAdresses

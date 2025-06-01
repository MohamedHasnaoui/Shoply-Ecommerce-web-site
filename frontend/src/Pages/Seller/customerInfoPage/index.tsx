import { Link, useNavigate, useParams } from "react-router"
import profileImg from "../../../assets/sellerAssets/media/avatars/avatar15.jpg"
import CustomerAdresses from "../../../Components/Seller/CustomerAdresses"
import { useEffect, useState   } from "react";
import { sellerService } from "../../../services/seller";
import { User } from "../../../generated";
import Loading from "../../../Components/Seller/Loading";
import  CustomerPastOrders from "../../../Components/Seller/CustomerPastOrders";
import { ErrorCode } from "../../../constants/errors";
import { ApolloError } from "@apollo/client";
const CustomerInfoPage = () => {
  const [nbOrders,setNbOrders] = useState<number>(0);
  const {customerId} = useParams();
  const [customer,setCustomer] = useState<User |null>(null);
  const [globalError,setGlobalError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await sellerService.getCustomerInfos(Number(customerId));
        if(response.data.getUserById) {
          setCustomer(response.data.getUserById);
        }
      } catch (e) {
        const error = e as ApolloError;
        if(error.graphQLErrors[0].extensions?.code === ErrorCode.NOT_FOUND){
            setGlobalError(error.graphQLErrors[0].message);
        }else{
            navigate("/Error/"+error.graphQLErrors[0].extensions?.code+"/"+error.graphQLErrors[0].message)
        }
      }
    };
    fetchCustomerData();
  }, [customerId,navigate])
  if(globalError) return <div className="alert alert-danger">{globalError}</div>
  if(!customer) return (<Loading/>)
  return (
    <main id="main-container">
    {/* <!-- Hero --> */}
    <div className="bg-gd-dusk">
      <div className="bg-black-25">
        <div className="content content-top content-full text-center">
          <div className="mb-3">
            <div  className="img-link" style={{cursor:"pointer"}} >
              <img className="img-avatar img-avatar-thumb" src={customer?.coverImg?? profileImg} alt="" />
            </div>
          </div>
          <h1 className="h3 text-white fw-bold mb-2">
            {customer?.firstName} {customer?.lastName} <i className="fa fa-star text-white-75 ms-1"></i>
          </h1>
          <h2 className="h5 text-white-75">
            Customer with <a className="text-primary-lighter link-fx" href="#orders">{nbOrders} Orders</a>
          </h2>
        </div>
      </div>
    </div>
    {/* <!-- END Hero --> */}

    {/* <!-- Breadcrumb --> */}
    <div className="bg-body-light border-bottom">
      <div className="content py-1 text-center">
        <nav className="breadcrumb bg-body-light py-2 mb-0">
          <Link className="breadcrumb-item" to="/seller/home">e-Commerce</Link>
          <p className="breadcrumb-item">Customers</p>
          <span className="breadcrumb-item active">{customer?.firstName} {customer?.lastName}</span>
        </nav>
      </div>
    </div>
    {/* <!-- END Breadcrumb --> */}

    {/* <!-- Page Content --> */}
    <div className="content">
      {/* <!-- Addresses --> */}
      <CustomerAdresses customer={customer} />
      {/* <!-- END Addresses --> */}

      {/* <!-- Past Orders --> */}
     <CustomerPastOrders setNbOrders={setNbOrders} customerId={Number(customerId)}/>
      {/* <!-- END Past Orders --> */}

    </div>
    {/* <!-- END Page Content --> */}
  </main>
  )
}

export default CustomerInfoPage

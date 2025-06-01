import { useEffect, useState } from "react";
import { OrderItem } from "../../generated";
import { sellerService } from "../../services/seller";
import { StatusColor } from "../../constants/orderStatus";
import { Link, useNavigate   } from "react-router";
import { ApolloError } from "@apollo/client";
import { ErrorCode } from "../../constants/errors";
import Loading from "./Loading";
interface PropsType {
    customerId:number
    setNbOrders : (nbOrders:number) => void
}

const CustomerPastOrders = (props:PropsType) => {
    const [pastOrderItems,setPastOrderItems] = useState<OrderItem[]>([]);
    const [globalError,setGlobalError] = useState("");
    const [loadingCustomer,setLoadingCustomer] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPastOrderItems = async () => {
            const response = await sellerService.getCustomerPastOrders(props.customerId);
            if(response.data.getCustomerPastOrderItems)
                setPastOrderItems(response.data.getCustomerPastOrderItems);
        };
        try{
            setLoadingCustomer(true);
            fetchPastOrderItems();
            props.setNbOrders(pastOrderItems.length);
        }catch(e){
            const error = e as ApolloError;
            if(error.graphQLErrors[0].extensions?.code === ErrorCode.NOT_FOUND){
                setGlobalError(error.graphQLErrors[0].message);
            }else{
                navigate("/Error/"+error.graphQLErrors[0].extensions?.code+"/"+error.graphQLErrors[0].message)
            }
        }finally{
            setLoadingCustomer(false);
        }
    }, [props.setNbOrders,props.customerId,pastOrderItems.length,props,navigate]);
    if(loadingCustomer) return <Loading/>
    if(globalError) return <div className="alert alert-danger">{globalError}</div>
    if(loadingCustomer) return <Loading/>
    return (
    <>
      <h2 className="content-heading">Past Orders</h2>
      <div id="orders" className="block block-rounded">
        <div className="block-content block-content-full">
          {/* <!-- Orders Table --> */}
          <table className="table table-borderless table-striped mb-0">
            <thead>
              <tr>
                <th style={{width:100}}>ID</th>
                <th style={{width:120}}>Status</th>
                <th className="d-none d-sm-table-cell" style={{width:120}}>Submitted</th>
                <th className="d-none d-sm-table-cell">Product</th>
                <th className="d-none d-sm-table-cell text-end">Value</th>
              </tr>
            </thead>
            <tbody>
                {pastOrderItems.map((orderItem) => (
                    <tr>
                        <td>
                            <span className="fw-semibold">ORD.{orderItem.id}</span>
                            </td>
                            <td>
                            <span className={`badge ${StatusColor[orderItem.status].bgcolor}`}>{orderItem.status}</span>
                            </td>
                            <td className="d-none d-sm-table-cell">
                            {new Date(orderItem.createdAt).toLocaleDateString("fr-FR")}           
                            </td>
                            <td className="d-none d-sm-table-cell">
                            <Link to={`/seller/edit-product/${orderItem.product?.id}`}>{orderItem.product?.name}</Link>
                            </td>
                            <td className="d-none d-sm-table-cell text-end">{orderItem.price}</td>
                     </tr>
                ))}
            </tbody>
          </table>
          {/* <!-- END Orders Table --> */}
        </div>
      </div>
    </>
  )
}

export default CustomerPastOrders

import { useEffect, useState } from "react";
import { OrderItem } from "../../generated";
import { orderItemService } from "../../services/orderItem";
import { StatusColor } from "../../constants/orderStatus";
import { Link } from "react-router";

const LatestOrders = () => {
     const [orderItems , setOrderItems] = useState<OrderItem[] | null>(null);
     
    useEffect(() => {
        const fetch = async ()=> {
            const response = await orderItemService.getSellerOrderItems({});
            if(response.data.getOrderItemsForSeller.orderItems){
               const orders = response.data.getOrderItemsForSeller.orderItems;
               setOrderItems(orders);
            }
        }
        fetch();
    },[])
  return (
    <div className="block block-rounded">
        <div className="block-content block-content-full">
            <table className="table table-borderless table-striped mb-0">
                <thead>
                    <tr>
                        <th style={{width: 100}}>ID</th>
                        <th>Status</th>
                        <th className="d-none d-sm-table-cell">Customer</th>
                        <th className="d-none d-sm-table-cell text-end">Value</th>
                    </tr>
                </thead>
                <tbody>
                    { orderItems && orderItems.map((orderItem) => (
                    <tr>
                        <td>
                            <button type="button" className="fw-semibold border-0 bg-transparent">ORD.{orderItem.id}</button>
                        </td>
                        <td>
                            <span className={`badge ${StatusColor[orderItem.status].bgcolor}`}>{orderItem.status}</span>
                        </td>
                        <td className="d-none d-sm-table-cell">
                            <Link to={`/seller/customer/${orderItem.order?.buyer?.id}`}>{orderItem.order?.buyer?.firstName +" "+orderItem.order?.buyer?.lastName}</Link>
                        </td>
                        <td className="d-none d-sm-table-cell text-end">{orderItem.price} DH</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default LatestOrders

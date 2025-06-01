import { useEffect, useState } from 'react'
import { orderItemService } from '../../../services/orderItem';
import { OrderItemStatistics } from '../../../generated';

const ShortStatistics = () => {
    const [generalStatistics,setGeneralStatistics] = useState<OrderItemStatistics | null>(null);
    useEffect(() => {
        const fetchGeneralStatistics = async () => {
            const response = await orderItemService.getGeneralStatistics(undefined);
            setGeneralStatistics(response.data.getRecievedOrderItemsStatistics);
        };
        fetchGeneralStatistics();
    },[])
  return (
    <div className="block pull-x">
        <div className="block-content block-content-full block-content-sm bg-body-light">
            <div className="row text-center">
            <div className="col-4">
                <div className="fs-sm fw-semibold text-uppercase text-muted">Clients</div>
                <div className="fs-4">{generalStatistics?.totalNewCustomers}</div>
            </div>
            <div className="col-4">
                <div className="fs-sm fw-semibold text-uppercase text-muted">Sales</div>
                <div className="fs-4">{generalStatistics?.countDelivered}</div>
            </div>
            <div className="col-4">
                <div className="fs-sm fw-semibold text-uppercase text-muted">Earnings</div>
                <div className="fs-4">{generalStatistics?.totalEarnings} DH</div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ShortStatistics;

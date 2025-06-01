
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { OrderItemStatistics, PeriodFilter } from '../../../generated';
import { useEffect, useState } from 'react';
import { orderItemService } from '../../../services/orderItem';
import { client } from '../../../graphqlProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
ChartJS.defaults.color = '#818d96';
ChartJS.defaults.scale.grid.color = "transparent";
ChartJS.defaults.elements.line.borderWidth = 2;
ChartJS.defaults.elements.point.radius = 5;
ChartJS.defaults.elements.point.hoverRadius = 7;
ChartJS.defaults.plugins.tooltip.cornerRadius = 3;
ChartJS.defaults.plugins.legend.display = false;

interface propsType {
  period : PeriodFilter
}
const OrdersChart = (props:propsType) => {
    const [ordersData, setOrdersData] = useState<Array<number> >([]);
    const [orderStatistics,setOrderStatistics] = useState<OrderItemStatistics | null>(null);
    const [loading, setLoading] = useState(false);
    const fetchOrdersData = async () => {
      setLoading(true);
      const countOrders = await orderItemService.getCountOrdersByPeriod(props.period);
      const orderStat = await orderItemService.getRecievedOrderItemsStatistics(props.period);
      setOrdersData(countOrders.data.getOrdersByPeriod)
      setOrderStatistics(orderStat.data.getRecievedOrderItemsStatistics);
      setLoading(false);
    };
    useEffect(()=>{
      fetchOrdersData();
    })
    const Labels: Record<PeriodFilter, Array<string | number>> = {
      [PeriodFilter.Week] : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      [PeriodFilter.Year] : Array.from({length: ordersData.length}, (_, i) => i + 1),
      [PeriodFilter.Month] : Array.from({length: ordersData.length}, (_, i) => i + 1),
      [PeriodFilter.Day] : ["Today"]
    }
    const data = {
      datasets:
      [
        {
          label: 'Orders',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(112,178,156,.25)',
          borderColor: 'rgba(112,178,156,1)',
          pointBackgroundColor: 'rgba(112,178,156,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(112,178,156,1)',
          data: ordersData
        }
      ],
      labels: Labels[props.period]}
      const options = {
        responsive: true,
        scales: {
          x: {
            display: true, // ❌ cacher l'axe X
            grid: {
              display: true, // ❌ cacher les lignes de grille
            },
          },
          y: {
            display: false, // ❌ cacher l'axe Y
            grid: {
              display: false, // ❌ cacher les lignes de grille
            },
            beginAtZero: true,
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            radius: 3,
            boxPadding: 5
          }
        }
    };
    const refresh  = async ()=>{
      client.clearStore();
      await fetchOrdersData();

    }
  return (
      <div className={`pb-2 block block-rounded block-mode-loading-refresh ${loading ? "block-mode-loading" : ""}`}>
        <div className="block-header">
          <h3 className="block-title">
            Orders
          </h3>
          <div className="block-options">
            <button type="button" className="btn-block-option" onClick={async ()=>{await refresh()}}>
              <i className="si si-refresh"></i>
            </button>
          </div>
        </div>
        <div className="block-content block-content-full bg-body-light text-center">
          <div className="row g-sm">
          <div className="col-4">
            <div className="fs-sm fw-semibold text-uppercase text-muted">All</div>
            <div className="fs-3 fw-semibold">{orderStatistics?.all}</div>
        </div>
        <div className="col-4">
            <div className="fs-sm fw-semibold text-uppercase text-muted">Completed</div>
            <div className="fs-3 fw-semibold text-success">{orderStatistics?.countDelivered}</div>
        </div>
        <div className="col-4">
            <div className="fs-sm fw-semibold text-uppercase text-muted">Canceled-Failed</div>
            <div className="fs-3 fw-semibold text-danger">{orderStatistics?.countCanceledOrFailed}</div>
        </div>
          </div>
        </div>
        <div className="block-content block-content-full">
          <div className="pull">
            {/* <!-- Orderss Chart Container --> */}
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
  )
}

export default OrdersChart


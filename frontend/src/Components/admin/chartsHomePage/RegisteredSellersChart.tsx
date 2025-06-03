import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { PeriodFilter, Role } from '../../../generated';
import { useEffect, useState } from 'react';
import { client } from '../../../graphqlProvider';
import { adminService } from '../../../services/admin';
import { ErrorCode } from '../../../constants/errors';
import { ApolloError } from '@apollo/client';
import { useNavigate } from 'react-router';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
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
const RegisteredSellersChart = (props:propsType) => {
    const [registeredSellers, setRegisteredSellers] = useState<Array<number> >([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const fetchregisteredSellers = async () => {
      try{
        setLoading(true);
        const response = await adminService.getRegisteredUsersByPeriod(Role.Seller,props.period)
        const data = response.data.getRegisteredUsersByPeriod
        setRegisteredSellers(data);
      }catch (e) {
        const err = e as ApolloError;
        if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
          setError(err.graphQLErrors[0].message);
        }else {
          navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
        }
      }finally {
        setLoading(false);
      }
    };
    
    useEffect(()=>{
      fetchregisteredSellers();
    });
    const Labels: Record<PeriodFilter, Array<string | number>> = {
      [PeriodFilter.Week] : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      [PeriodFilter.Year] : Array.from({length: registeredSellers.length}, (_, i) => i + 1),
      [PeriodFilter.Month] : Array.from({length: registeredSellers.length}, (_, i) => i + 1),
      [PeriodFilter.Day] : ["Today"]
    }
    const data = {
      datasets:
      [
        {
          label: 'Registered Sellers',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(188,38,211,.25)',
          borderColor: 'rgba(188,38,211,1)',
          pointBackgroundColor: 'rgba(188,38,211,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(188,38,211,1)',
          data: registeredSellers
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
      await fetchregisteredSellers();

    }
  return (
      <div className={`pb-2 block block-rounded block-mode-loading-refresh ${loading ? "block-mode-loading" : ""}`}>
        <div className="block-header">
          <h3 className="block-title">
            Registered Sellers
          </h3>
          <div className="block-options">
            <button type="button" className="btn-block-option" onClick={async ()=>{await refresh()}}>
              <i className="si si-refresh"></i>
            </button>
          </div>
        </div>
        <div className="block-content block-content-full bg-body-light text-center">
          <div className="row g-sm">
            <div className="col-12">
              <div className="fs-sm fw-semibold text-uppercase text-muted">Total</div>
              <div className="fs-3 fw-semibold text-success">{registeredSellers.reduce((acc, val) => acc + val, 0)}</div>
            </div>
          </div>
        </div>
        <div className="block-content block-content-full">
          <div className="pull">
            {/* <!-- Earnings Chart Container --> */}
            <Bar options={options} data={data} />
          </div>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
  )
}

export default RegisteredSellersChart

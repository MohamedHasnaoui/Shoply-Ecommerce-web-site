
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
import { PeriodFilter } from '../../../generated';
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
const EarningChart = (props:propsType) => {
    const [earningData, setEarningData] = useState<Array<number> >([]);
    const [loading, setLoading] = useState(false);
    const fetchEarningData = async () => {
      setLoading(true);
      const response = await orderItemService.getEarningByPeriod(props.period)
      const data = response.data.getEarningByPeriod
      setEarningData(data);
      setLoading(false);
    };
    useEffect(()=>{
      fetchEarningData();
    })
    const Labels: Record<PeriodFilter, Array<string | number>> = {
      [PeriodFilter.Week] : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      [PeriodFilter.Year] : Array.from({length: earningData.length}, (_, i) => i + 1),
      [PeriodFilter.Month] : Array.from({length: earningData.length}, (_, i) => i + 1),
      [PeriodFilter.Day] : ["Today"]
    }
    const data = {
      datasets:
      [
        {
          label: 'Earnings',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(188,38,211,.25)',
          borderColor: 'rgba(188,38,211,1)',
          pointBackgroundColor: 'rgba(188,38,211,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(188,38,211,1)',
          data: earningData
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
      await fetchEarningData();

    }
  return (
      <div className={`pb-2 block block-rounded block-mode-loading-refresh ${loading ? "block-mode-loading" : ""}`}>
        <div className="block-header">
          <h3 className="block-title">
            Earnings
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
              <div className="fs-sm fw-semibold text-uppercase text-muted">Profit</div>
              <div className="fs-3 fw-semibold text-success">{earningData.reduce((acc, val) => acc + val, 0)} DH</div>
            </div>
          </div>
        </div>
        <div className="block-content block-content-full">
          <div className="pull">
            {/* <!-- Earnings Chart Container --> */}
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
  )
}

export default EarningChart

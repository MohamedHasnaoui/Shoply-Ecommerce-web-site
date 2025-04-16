import React, { useState } from "react";
import { PeriodFilter } from "../../../generated";
import EarningChart from "./EarningChart"
import OrdersChart from "./OrdersChart";

const ChartsHomePage = () => {
    const Periods : Array<Period>  = [
        {period : "This Week",periodFilter:PeriodFilter.Week},
        {period : "This Month",periodFilter:PeriodFilter.Month},
        {period : "This Year",periodFilter:PeriodFilter.Year}
    ]
    const [isPeriodFilterOpen, setIsPeriodFilterOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<Period>(Periods[0]);
    const handlePeriodFilterToggle = ()=>{
    setIsPeriodFilterOpen(!isPeriodFilterOpen);
    }
    interface Period {
        period:string,
        periodFilter: PeriodFilter
    }
    const handlePeriodFilterChange = (period:Period)=>{
        setSelectedPeriod(period);
        setIsPeriodFilterOpen(false);
    }
  return (
    <div>
        <div className="content-heading d-flex justify-content-between align-items-center">
            <span>
                Orders <small className="d-none d-sm-inline">Overview</small>
            </span>
            <div className="dropdown">
                <button type="button" className="btn btn-sm btn-alt-secondary" onClick={handlePeriodFilterToggle}>
                <span>{selectedPeriod ? selectedPeriod.period : "All Time"}</span>
                    <i className="fa fa-angle-down ms-1 opacity-50"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-end ${isPeriodFilterOpen? "show":""}`} >
                    {Object.values(Periods).map((P,index)=>{
                        return (
                            <React.Fragment key={index}>
                            <button type="button" className={`dropdown-item ${P.period===selectedPeriod?.period? "active" : ""}`} onClick={()=>handlePeriodFilterChange(P)}>
                                <i className="fa fa-fw fa-calendar-alt opacity-50 me-1"></i> {P.period}
                            </button>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>

      {/* <!-- Chart.js Chart functionality is initialized in js/pages/be_pages_ecom_dashboard.min.js which was auto compiled from _js/pages/be_pages_ecom_dashboard.js --> */}
      {/* <!-- For more info and examples you can check out http://www.chartjs.org/docs/ --> */}
      <div className="row">
        {/* <!-- Orders Earnings Chart --> */}
        <div className="col-md-6">
        <EarningChart period={selectedPeriod.periodFilter} />
        </div>
        {/* <!-- END Orders Earnings Chart --> */}

        {/* <!-- Orders Volume Chart --> */}
        <div className="col-md-6">
          <OrdersChart period={selectedPeriod.periodFilter} />
        </div>
        {/* <!-- END Orders Volume Chart --> */}
      </div>
      {/* <!-- END Orders Overview --> */}
    </div>
  )
}

export default ChartsHomePage

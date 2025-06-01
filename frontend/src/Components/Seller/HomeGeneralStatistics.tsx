import React, { useEffect, useState } from "react";
import { OrderItemStatistics, PeriodFilter } from "../../generated";
import { orderItemService } from "../../services/orderItem";

const HomeGeneralStatistics = () => {
    const [generalStatistics,setGeneralStatistics] = useState<OrderItemStatistics | null>(null);
    const [isPeriodFilterOpen, setIsPeriodFilterOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<Period | undefined>(undefined);
    const handlePeriodFilterToggle = ()=>{
    setIsPeriodFilterOpen(!isPeriodFilterOpen);
    }
    interface Period {
        period:string,
        periodFilter: PeriodFilter
    }
    const Periods : Array<Period>  = [
        {period : "Today",periodFilter:PeriodFilter.Day},
        {period : "This Week",periodFilter:PeriodFilter.Week},
        {period : "This Month",periodFilter:PeriodFilter.Month},
        {period : "This Year",periodFilter:PeriodFilter.Year}
      ]
    const handlePeriodFilterChange = (period:Period | undefined)=>{
        setSelectedPeriod(period);
        setIsPeriodFilterOpen(false);
    }
    useEffect(() => {
        const fetchGeneralStatistics = async () => {
            const response = await orderItemService.getGeneralStatistics(selectedPeriod?.periodFilter);
            setGeneralStatistics(response.data.getRecievedOrderItemsStatistics);
            console.log(response);
        };
        fetchGeneralStatistics();
    },[selectedPeriod])
  return (
    <>
    <div className="content-heading d-flex justify-content-between align-items-center">
        <span>
          Statistics <small className="d-none d-sm-inline">Awesome!</small>
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
            <div className="dropdown-divider"></div>
                <button type="button" className={`dropdown-item ${selectedPeriod===undefined? "active" : ""}`} onClick={()=>handlePeriodFilterChange(undefined)}>
                <i className="fa fa-fw fa-calendar-alt opacity-50 me-1"></i> All Time
            </button>
          </div>
        </div>
    </div>
    <div className="row">
        {/* <!-- Earnings --> */}
        <div className="col-md-6 col-xl-3">
          <div style={{cursor:"pointer"}} className="block block-rounded block-transparent bg-gd-elegance" >
            <div className="block-content block-content-full block-sticky-options">
              <div className="block-options">
                <div className="block-options-item">
                  <i className="fa fa-chart-area text-white-75"></i>
                </div>
              </div>
              <div className="py-3 text-center">
                <div className="fs-2 fw-bold mb-0 text-white">{generalStatistics?.totalEarnings?? "..."} DH</div>
                <div className="fs-sm fw-semibold text-uppercase text-white-75">Earnings</div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END Earnings --> */}

        {/* <!-- Orders --> */}
        <div className="col-md-6 col-xl-3">
          <div style={{cursor:"pointer"}} className="block block-rounded block-transparent bg-gd-dusk">
            <div className="block-content block-content-full block-sticky-options">
              <div className="block-options">
                <div className="block-options-item">
                  <i className="fa fa-archive text-white-75"></i>
                </div>
              </div>
              <div className="py-3 text-center">
                <div className="fs-2 fw-bold mb-0 text-white">{generalStatistics?.all?? "..."}</div>
                <div className="fs-sm fw-semibold text-uppercase text-white-75">Recieved Orders</div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END Orders --> */}

        {/* <!-- New Customers --> */}
        <div className="col-md-6 col-xl-3">
          <div style={{cursor:"pointer"}} className="block block-rounded block-transparent bg-gd-sea">
            <div className="block-content block-content-full block-sticky-options">
              <div className="block-options">
                <div className="block-options-item">
                  <i className="fa fa-users text-white-75"></i>
                </div>
              </div>
              <div className="py-3 text-center">
                <div className="fs-2 fw-bold mb-0 text-white">{generalStatistics?.totalNewCustomers?? "..."}</div>
                <div className="fs-sm fw-semibold text-uppercase text-white-75">New Customers</div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END New Customers --> */}

        {/* <!-- Conversion Rate --> */}
        <div className="col-md-6 col-xl-3">
          <div style={{cursor:"pointer"}} className="block block-rounded block-transparent bg-gd-aqua">
            <div className="block-content block-content-full block-sticky-options">
              <div className="block-options">
                <div className="block-options-item">
                  <i className="fa fa-cart-arrow-down text-white-75"></i>
                </div>
              </div>
              <div className="py-3 text-center">
                <div className="fs-2 fw-bold mb-0 text-white">{generalStatistics?.countDelivered?? "..."}</div>
                <div className="fs-sm fw-semibold text-uppercase text-white-75">Completed Orders</div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END Conversion Rate --> */}
      </div>
    </>
  )
}

export default HomeGeneralStatistics

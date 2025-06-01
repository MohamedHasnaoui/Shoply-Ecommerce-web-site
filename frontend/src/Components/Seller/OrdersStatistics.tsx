import React, { useEffect, useState } from "react";
import { OrderItemStatistics, PeriodFilter } from "../../generated";

interface propsType {
  orderStatistics:OrderItemStatistics | null,
  fetchOrderStatistics : (priod:PeriodFilter | undefined) => void
}
const OrdersStatistics = (props:propsType) => {
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
  const [isPeriodFilterOpen, setIsPeriodFilterOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<Period | undefined>(undefined);
    const handlePeriodFilterToggle = ()=>{
      setIsPeriodFilterOpen(!isPeriodFilterOpen);
    }
    const handlePeriodFilterChange = (period:Period | undefined)=>{
      setSelectedPeriod(period);
      setIsPeriodFilterOpen(false);
    }
  useEffect(()=>{
      props.fetchOrderStatistics(selectedPeriod?.periodFilter);
    },[selectedPeriod?.periodFilter,props])
  return (
    <>
     <div className="content-heading d-flex justify-content-between align-items-center">
     <span>
       Statistics <small className="d-none d-sm-inline">Looking good!</small>
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
     {/* <!-- Pending --> */}
     <div className="col-md-6 col-xl-3">
       <button className="block block-rounded block-transparent bg-gd-sun btn w-100">
         <div className="block-content block-content-full block-sticky-options">
           <div className="block-options">
             <div className="block-options-item">
               <i className="fa fa-spinner fa-spin text-white-75"></i>
             </div>
           </div>
           <div className="py-3 text-center">
             <div className="fs-2 fw-bold mb-0 text-white">{props.orderStatistics?.countPending}</div>
             <div className="fs-sm fw-semibold text-uppercase text-white-75">Pending</div>
           </div>
         </div>
       </button>
     </div>
     {/* <!-- END Pending --> */}

     {/* <!-- Canceled --> */}
     <div className="col-md-6 col-xl-3">
       <button className="block block-rounded block-transparent bg-gd-cherry btn w-100">
         <div className="block-content block-content-full block-sticky-options">
           <div className="block-options">
             <div className="block-options-item">
               <i className="fa fa-times text-white-75"></i>
             </div>
           </div>
           <div className="py-3 text-center">
             <div className="fs-2 fw-bold mb-0 text-white">{props.orderStatistics?.countCanceledOrFailed}</div>
             <div className="fs-sm fw-semibold text-uppercase text-white-75">Canceled Or Failed</div>
           </div>
         </div>
       </button>
     </div>
     {/* <!-- END Canceled --> */}

     {/* <!-- Completed --> */}
     <div className="col-md-6 col-xl-3">
        <button className="block block-rounded block-transparent bg-gd-cherry btn w-100">         <div className="block-content block-content-full block-sticky-options">
           <div className="block-options">
             <div className="block-options-item">
               <i className="fa fa-check text-white-75"></i>
             </div>
           </div>
           <div className="py-3 text-center">
             <div className="fs-2 fw-bold mb-0 text-white">{props.orderStatistics?.countDelivered}</div>
             <div className="fs-sm fw-semibold text-uppercase text-white-75">Delivered</div>
           </div>
         </div>
       </button>
     </div>
     {/* <!-- END Completed --> */}

     {/* <!-- All --> */}
     <div className="col-md-6 col-xl-3">
       <button className="block block-rounded block-transparent bg-gd-dusk btn w-100">
         <div className="block-content block-content-full block-sticky-options">
           <div className="block-options">
             <div className="block-options-item">
               <i className="fa fa-archive text-white-75"></i>
             </div>
           </div>
           <div className="py-3 text-center">
             <div className="fs-2 fw-bold mb-0 text-white">{props.orderStatistics?.all}</div>
             <div className="fs-sm fw-semibold text-uppercase text-white-75">All</div>
           </div>
         </div>
       </button>
     </div>
     </div>
     </>
  )
}

export default OrdersStatistics;

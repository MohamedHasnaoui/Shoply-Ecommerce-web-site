import React, { useEffect, useState } from "react";
import { FrequentBuyersInfo, PeriodFilter } from "../../generated";
import { adminService } from "../../services/admin";

const FrequentBuyers = () => {
    const [frequentBuyers, setFrequentBuyers] = useState<FrequentBuyersInfo[]>([]);
   
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
        useEffect(()=>{
        const fetch = async ()=>{
        const response = await adminService.getFrequentBuyers(selectedPeriod.periodFilter);
        if(response.data.getFrequentBuyers)
            setFrequentBuyers(response.data?.getFrequentBuyers)
        }
        fetch()
    },[selectedPeriod.periodFilter])
  return (
    <div className="col-xl-6">
    <div className="d-flex justify-content-between align-items-center">
    <h2 className="content-heading">Frequent Purchasers</h2>
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
    <div className="block block-rounded">
       
        <div className="block-content block-content-full">
            <table className="table table-borderless table-striped mb-0">
            <thead>
                <tr>
                    <th className="d-none d-sm-table-cell" style={{width: 100}}>ID</th>
                    <th>Customer</th>
                    <th className="text-center">Qty Purchased</th>
                    <th className="text-center">Placed Orders</th>
                </tr>
            </thead>
            <tbody>
                { frequentBuyers.map((Elm,key)=>{
                    return(
                        <tr key={key}>
                        <td className="d-none d-sm-table-cell">
                            <button type="button" className="fw-semibold border-0 bg-transparent">PID.{Elm.id}</button>
                        </td>
                        <td>    
                            <a href="#" className="border-0 bg-transparent">{Elm.firstName} {Elm.lastName}</a>
                        </td>
                        <td className="text-center">
                            <span className="text-gray-dark" >{Elm.nbPlacedOrders}</span>
                        </td>
                         <td className="text-center">
                            <span className="text-gray-dark" >{Elm.nbPurchasedProducts}</span>
                        </td>
                        </tr>
                    )
                })}
                
            </tbody>
            </table>
        </div>
        </div>
        </div>
  )
}

export default FrequentBuyers

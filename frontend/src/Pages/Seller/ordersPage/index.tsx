import React, { useEffect, useRef, useState } from "react"
import backgroundimg from "../../../assets/sellerAssets/media/photos/photo26@2x.jpg"
import OrdersStatistics from "../../../Components/Seller/OrdersStatistics";
import { OrderItem, OrderItemStatistics, OrderItemStatus, PeriodFilter } from "../../../generated";
import { orderItemService } from "../../../services/OrderItem";
import { Link } from "react-router";
import { BasicModal, BasicModalRef } from "../../../Components/common/modal";
import  Select  from "react-select";
import {Bounce, ToastContainer,toast} from "react-toastify"
import { client } from "../../../graphqlProvider";

const OrdersSellerPage = () => {
  const [globalLoading, setGlobalLoding] = useState(false);
  const [pageNb,setPageNb] = useState(1);
  const [pageSize,setPageSize] = useState(10);  
  const [countFilteredOrders,setCountFilteredOrders] = useState(0);
  const [orderItems , setOrderItems] = useState<OrderItem[] | null>(null);
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
  interface OrdersStatusIconsType {
    status : OrderItemStatus,
    icon : string
  }
  const StatusAndIcons : OrdersStatusIconsType[] = [
    {status:OrderItemStatus.Pending,icon: "fa-sync fa-spin"},
    { status: OrderItemStatus.Confirmed, icon: "fa-check-circle text-primary" },  
    { status: OrderItemStatus.Shipped, icon: "fa-truck text-info" }, 
    { status: OrderItemStatus.Delivered, icon: "fa-box-open text-success" },  
    { status: OrderItemStatus.Cancelled, icon: "fa-times-circle text-danger" },  
    { status: OrderItemStatus.Failed, icon: "fa-exclamation-triangle text-danger" },
    { status: OrderItemStatus.Refunded, icon: "fa-undo text-secondary" } 
  ]
  const StatusColorAndNextStatus: Record<OrderItemStatus, { bgcolor: string; nextStatus: OrderItemStatus[] }> = {
    [OrderItemStatus.Pending]: { bgcolor: "bg-warning", nextStatus: [OrderItemStatus.Confirmed,OrderItemStatus.Shipped,OrderItemStatus.Delivered,OrderItemStatus.Failed] },
    [OrderItemStatus.Confirmed]: { bgcolor: "bg-primary", nextStatus: [OrderItemStatus.Shipped,OrderItemStatus.Delivered,OrderItemStatus.Failed] },
    [OrderItemStatus.Shipped]: { bgcolor: "bg-info", nextStatus: [OrderItemStatus.Delivered,OrderItemStatus.Failed] },
    [OrderItemStatus.Delivered]: { bgcolor: "bg-success", nextStatus: [] },
    [OrderItemStatus.Cancelled]: { bgcolor: "bg-danger", nextStatus: [] },
    [OrderItemStatus.Failed]: { bgcolor: "bg-danger", nextStatus: [] },
    [OrderItemStatus.Refunded]: { bgcolor: "bg-secondary", nextStatus: [] }
  } ;
  const [isPeriodFilterOpen, setIsPeriodFilterOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | undefined>(undefined);
  const handlePeriodFilterToggle = ()=>{
    setIsPeriodFilterOpen(!isPeriodFilterOpen);
    setIsStatusFilterOpen(false);
  }
  const handlePeriodFilterChange = (period:Period | undefined)=>{
    setSelectedPeriod(period);
    setIsPeriodFilterOpen(false);
  }
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderItemStatus | undefined>(undefined);
  const handlStatusFilterToggle = ()=>{
    setIsStatusFilterOpen(!isStatusFilterOpen);
    setIsPeriodFilterOpen(false);
  }
  const handlePeriodStatusChange = (status:OrderItemStatus | undefined)=>{
    setSelectedStatus(status);
    setIsStatusFilterOpen(false);
  }
  const incrementPageNb = ()=>{
    const totalPages = Math.ceil((countFilteredOrders)/pageSize);
      if(pageNb < totalPages) setPageNb(pageNb+1);
   } 
   const decremnetPageNb = () => {
    if(pageNb > 1) setPageNb(pageNb-1);
   }
   const [orderStatistics, setOrderStatistics] = useState<OrderItemStatistics | null>(null)
   const fetchOrderStatistics = async (period:PeriodFilter | undefined)=> {
      const response = await orderItemService.getRecievedOrderItemsStatistics(period);
      if(response.data.getRecievedOrderItemsStatistics){
        setOrderStatistics(response.data.getRecievedOrderItemsStatistics);
      }
    }
  useEffect(()=>{
    const fetch = async ()=> {
      const response = await orderItemService.getSellerOrderItems({status:selectedStatus,period:selectedPeriod?.periodFilter,pageNb,pageSize})
      if(response.data.getOrderItemsForSeller.orderItems){
        setOrderItems(response.data.getOrderItemsForSeller.orderItems);
        setCountFilteredOrders(response.data.getOrderItemsForSeller.count);
      }
    }
    fetch();
  },[selectedStatus,selectedPeriod?.periodFilter,pageNb,pageSize])
  
  const ModalRef = useRef<BasicModalRef>(null); 
  const [modalInfo,setModalInfo]  = useState<{statusOptions:{ value:OrderItemStatus, label:string}[],orderId:number}>({statusOptions:[],orderId:-1})
  const [selectedStatusOption, setselectedStatusOption] = useState<{value:OrderItemStatus, label:string}|null>(); 
  const handleSubmitOrderStatusChange = async (orderId:number) => {
    if(selectedStatusOption){
      try {
        setGlobalLoding(true);
        const response = await orderItemService.updateOrderItemStatus(orderId,selectedStatusOption.value);
        if(response.data?.updateOrderItemStatus){
          const updatedOrderItems = orderItems?.map(value => value.id === orderId ? {...value,status:selectedStatusOption.value} : value);
          if(updatedOrderItems) setOrderItems(updatedOrderItems);
          client.clearStore();
        }
        setOrderStatistics(null);
        toast.success('Status Updated Successfully');
    }catch(err){
      toast.error((err as Error).message);
    }finally {
      setGlobalLoding(false);
    }
    }
    ModalRef.current?.closeModal();
  }
  const modalBody = 
    <div className="d-flex flex-column gap-3">
      <div className="text-center fw-bold">Order ID: {modalInfo.orderId}</div>
      <Select options={modalInfo.statusOptions} onChange={setselectedStatusOption} className="w-100" />
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary col-5" onClickCapture={ModalRef.current?.closeModal} disabled={globalLoading}>
          Cancel
        </button>
        <button onClick={()=>handleSubmitOrderStatusChange(modalInfo.orderId)} className="btn btn-primary col-5" disabled={globalLoading}>
          Confirm
        </button>
      </div>
    </div>
  const displayModalChangeStatus = (order:OrderItem)=>{
    if(StatusColorAndNextStatus[order.status].nextStatus.length === 0) return;
    setselectedStatusOption(null);
    const options: { value:OrderItemStatus, label:string}[] = StatusColorAndNextStatus[order.status].nextStatus.map((value)=>{
      return {label:value,value}
    })
    setModalInfo({statusOptions:options,orderId:order.id});
    ModalRef.current?.openModal();
  }
  const displayOrders = orderItems?.map((order,key)=>{
    return (
      <tr key={key}>
        <td>
          <button className="fw-semibold border-0"style={{background:"none"}}>ORD.{order.id}</button>
        </td>
        <td>
          <button onClick={()=>displayModalChangeStatus(order)} className={`badge ${StatusColorAndNextStatus[order.status].bgcolor} border-0 p-2  `}>{order.status}</button>
        </td>
        <td className="d-none d-sm-table-cell">
          {new Date(order.createdAt).toLocaleDateString("fr-FR")}
        </td>
        <td className="d-none d-sm-table-cell">
          {new Date(order.updatedAt).toLocaleDateString("fr-FR")}
        </td>
        <td className="d-none d-sm-table-cell">
          <Link to={"/edit-product/" + order.product?.id}>{order.product?.name}</Link>
        </td>
        <td className="d-none d-sm-table-cell">
          <a>{order.quantity}</a>
        </td>
        <td className="d-none d-sm-table-cell text-end">{order.price} DH</td>
      </tr>
    )
  })
return (
    <main id="main-container">
    {/* <!-- Hero --> */}
    <div className="bg-image" style={{backgroundImage:`url(${backgroundimg})`}}>
      <div className="bg-black-75">
        <div className="content content-top content-full text-center">
          <div className="py-3">
            <h1 className="h2 fw-bold text-white mb-2">Orders</h1>
            <h2 className="h4 fw-normal text-white-75 mb-0">You are doing great, keep it up!</h2>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- END Hero --> */}

    {/* <!-- Breadcrumb --> */}
    <div className="bg-body-light border-bottom">
      <div className="content py-1 text-center">
        <nav className="breadcrumb bg-body-light py-2 mb-0">
          <a className="breadcrumb-item" href="be_pages_ecom_dashboard.html">e-Commerce</a>
          <span className="breadcrumb-item active">Orders</span>
        </nav>
      </div>
    </div>
    {/* <!-- END Breadcrumb --> */}

    {/* <!-- Page Content --> */}
        <div className="content">
          <OrdersStatistics orderStatistics={orderStatistics} fetchOrderStatistics={fetchOrderStatistics} />
          {/* <!-- Orders --> */}
          <div className="content-heading d-flex justify-content-between align-items-center">
            <span>
              Orders <small className="d-none d-sm-inline">({countFilteredOrders})</small>
            </span>
            <div className="space-x-1">
              <div className="dropdown d-inline-block">
                <button type="button" className="btn btn-sm btn-alt-secondary" onClick={handlStatusFilterToggle}>
                  <span>{selectedStatus===undefined ? "All": selectedStatus}</span>
                  <i className="fa fa-angle-down ms-1 opacity-50"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-end ${isStatusFilterOpen? "show":""}`} aria-labelledby="ecom-orders-filter-drop">
                  {
                    StatusAndIcons.map((statusIcon,index)=>{
                      return (
                        <React.Fragment key={index}>
                          <button type="button" className={`dropdown-item ${statusIcon.status===selectedStatus? "active" : ""}`} onClick={()=>handlePeriodStatusChange(statusIcon.status)}>
                            <i className={`fa fa-fw ${statusIcon.icon} text-warning me-1`}></i> {statusIcon.status}
                          </button>
                        </React.Fragment>
                      )
                    })
                  }
                  <div className="dropdown-divider"></div>
                  <button type="button" className={`dropdown-item ${selectedStatus===undefined? "active" : ""}`} onClick={()=>handlePeriodStatusChange(undefined)}>
                    <i className="far fa-fw fa-circle me-1"></i> All
                  </button>
                </div>
              </div>
              <div className="dropdown d-inline-block">
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
          </div>
          <div className="block block-rounded">
            <div className="block-content block-content-full">
              {/* <!-- Orders Table --> */}
              <table className="table table-borderless table-striped">
                <thead>
                  <tr>
                    <th style={{width: "100px"}}>ID</th>
                    <th>Status</th>
                    <th className="d-none d-sm-table-cell">Submitted</th>
                    <th className="d-none d-sm-table-cell">Updated</th>
                    <th className="d-none d-sm-table-cell">Product</th>
                    <th className="d-none d-sm-table-cell">Quantity</th>
                    <th className="d-none d-sm-table-cell text-end">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {displayOrders}
                </tbody>
              </table>
              {/* <!-- END Orders Table --> */}
    
              {/* <!-- Navigation --> */}
              <nav aria-label="Orders navigation">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <button className="page-link" onClick={decremnetPageNb}>
                      <span aria-hidden="true">
                        <i className="fa fa-angle-left"></i>
                      </span>
                      <span className="sr-only">Previous</span>
                    </button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link">{pageNb}</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link" onClick={incrementPageNb} >
                      <span aria-hidden="true">
                        <i className="fa fa-angle-right"></i>
                      </span>
                      <span className="sr-only">Next</span>
                    </button>
                  </li>
                </ul>
              </nav>
              {/* <!-- END Navigation --> */}
            </div>
          </div>
          {/* <!-- END Orders --> */}
        </div>
        {/* <!-- END Page Content --> */}
        <BasicModal body={modalBody} title="Change The Order Status" ref={ModalRef} />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}/>
      </main>
      )
    }
    
    export default OrdersSellerPage

 
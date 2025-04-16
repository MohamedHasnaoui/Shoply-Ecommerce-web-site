import backgroundImg from "../../../assets/sellerAssets/media/photos/photo26@2x.jpg"
import ChartsHomePage from "../../../Components/Seller/chartsHomePage/ChartsHomePage"
import HomeGeneralStatistics from "../../../Components/Seller/HomeGeneralStatistics"
import LatestOrders from "../../../Components/Seller/LatestOrders"
import TopProduct from "../../../Components/Seller/TopProduct"

const SellerHomePage = () => {
  
  return (
    <main id="main-container">
    {/* <!-- Hero --> */}
    <div className="bg-image" style={{backgroundImage:  `url(${backgroundImg})`}}>
      <div className="bg-black-75">
        <div className="content content-top content-full text-center">
          <div className="py-3">
            <h1 className="h2 fw-bold text-white mb-2">e-Commerce Dashboard</h1>
            <h2 className="h4 fw-normal text-white-75 mb-0">Welcome Admin, you have <a className="text-primary-light link-fx" href="be_pages_ecom_orders.html">12 pending orders</a>.</h2>
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
          <span className="breadcrumb-item active">Dashboard</span>
        </nav>
      </div>
    </div>
    {/* <!-- END Breadcrumb --> */}

    {/* <!-- Page Content --> */}
    <div className="content">
      {/* <!-- Statistics --> */}
      <HomeGeneralStatistics />
      
      {/* <!-- END Statistics --> */}

      {/* <!-- Orders Overview --> */}
      <ChartsHomePage />

      {/* <!-- Latest Orders and Top Products --> */}
      <div className="row">
        {/* <!-- Latest Orders --> */}
        <div className="col-xl-6">
          <h2 className="content-heading">Latest Orders</h2>
          <LatestOrders />
        </div>
        {/* <!-- END Latest Orders --> */}

        {/* <!-- Top Products --> */}
        <div className="col-xl-6">
          <h2 className="content-heading">Top Products</h2>
          <TopProduct />
        </div>
        {/* <!-- END Top Products --> */}
      </div>
      {/* <!-- END Latest Orders and Top Products --> */}
    </div>
    {/* <!-- END Page Content --> */}
  </main>
  )
}

export default SellerHomePage

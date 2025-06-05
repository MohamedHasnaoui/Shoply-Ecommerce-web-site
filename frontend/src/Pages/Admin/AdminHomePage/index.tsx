import backgroundImg from "../../../assets/sellerAssets/media/photos/photo26@2x.jpg"
import ChartsHomePage from "../../../Components/admin/chartsHomePage/ChartsHomePage"
import FrequentBuyers from "../../../Components/admin/FrequentBuyers"
import HomeGeneralStatistics from "../../../Components/admin/HomeGeneralStatistics"
import TopSellers from "../../../Components/admin/TopSellers"

const AdminHomePage = () => {
  
  return (
    <main id="main-container">
    {/* <!-- Hero --> */}
    <div className="bg-image" style={{backgroundImage:  `url(${backgroundImg})`}}>
      <div className="bg-black-75">
        <div className="content content-top content-full text-center">
          <div className="py-3">
            <h1 className="h2 fw-bold text-white mb-2">Admin Dashboard</h1>
            <h2 className="h4 fw-normal text-white-75 mb-0">Welcome Admin, You <a href="#" className="text-primary-light link-fx">Are Looking Great</a>.</h2>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- END Hero --> */}

    {/* <!-- Breadcrumb --> */}
    <div className="bg-body-light border-bottom">
      <div className="content py-1 text-center">
        <nav className="breadcrumb bg-body-light py-2 mb-0">
          <div className="breadcrumb-item">Admin</div>
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
          <TopSellers />
        {/* <!-- END Latest Orders --> */}

        {/* <!-- Top Products --> */} 
          <FrequentBuyers/>
        {/* <!-- END Top Products --> */}
      </div>
      {/* <!-- END Latest Orders and Top Products --> */}
    </div>
    {/* <!-- END Page Content --> */}
  </main>
  )
}

export default AdminHomePage

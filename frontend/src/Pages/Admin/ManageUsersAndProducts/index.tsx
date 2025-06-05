import { Link } from "react-router"
import backgroundimg from "../../../assets/sellerAssets/media/photos/photo26@2x.jpg"
import UsersTable from "../../../Components/admin/UsersTable"
import ProductsTable from "../../../Components/admin/ProductsTable"


const ManageUsersAndProducts = () => {
  return (
    <main id="main-container">
    {/* <!-- Hero --> */}
    <div className="bg-image" style={{backgroundImage:`url(${backgroundimg})`}}>
      <div className="bg-black-75">
        <div className="content content-top content-full text-center">
          <div className="py-3">
            <h1 className="h2 fw-bold text-white mb-2">Users & Products</h1>
            <h2 className="h4 fw-normal text-white-75 mb-0">Keep things organized, Manage Users And Products!</h2>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Breadcrumb --> */}
    <div className="bg-body-light border-bottom">
        <div className="content py-1 text-center">
        <nav className="breadcrumb bg-body-light py-2 mb-0">
            <Link className="breadcrumb-item" to="/admin">Admin</Link>
            <span className="breadcrumb-item active">Manage Users And Products</span>
        </nav>
        </div>
    </div>
    {/* <!-- END Breadcrumb --> */}
    <div className="content">
    <UsersTable />
    <ProductsTable />
    </div>
    </main>
  )
}

export default ManageUsersAndProducts

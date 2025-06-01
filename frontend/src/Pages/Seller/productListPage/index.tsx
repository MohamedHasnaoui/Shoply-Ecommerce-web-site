import { useEffect, useState } from "react"
import backgroundimg from "../../../assets/sellerAssets/media/photos/photo26@2x.jpg"
import { productService } from "../../../services/product"
import { Category, Product } from "../../../generated"
import { Link, useNavigate } from "react-router"
import { ErrorCode } from "../../../constants/errors"
import { ApolloError } from "@apollo/client"

const ProductListPage = () => {
  const [availableProductsCount,setAvailableProductsCount] = useState(0); 
  const [outOfStockProductsCount,setOutOfStockProductsCount] = useState(0); 
  const [pageNb,setPageNb] = useState(1);
  const [pageSz,setPageSz] = useState(10);  
  const [myProducts, setMyProducts] = useState<Product[]>([])
  const [countFilteredProducts,setCountFilteredProducts] = useState(0);
  const [productCategories,setProductCategories] = useState<Array<Category | null>>([]);
  enum productStatus {
    AVAILABLE = "Available",
    OUT_OF_STOCK = "Out of Stock"
  }
  const [selectedStatus,setSelectedStatus] = useState<productStatus | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [productNameFilter,setProductNameFilter] = useState<string|undefined>(undefined)
  const navigate = useNavigate();
  const [globalError,setGlobalError] = useState("");

  useEffect(() => {
    const fetchMyProducts = async () => {
      try{
        const response = await productService.getMyProducts(
          {
            name: productNameFilter,
            available: selectedStatus ? (selectedStatus===productStatus.AVAILABLE) : undefined,
            categoryId: selectedCategory?.id,
            pageNb,
            pageSize:pageSz
          }
        );
      if(response.data?.getAllMyProducts){
        setMyProducts(response.data.getAllMyProducts.products as Array<Product>);
        setCountFilteredProducts(response.data.getAllMyProducts.count);
      } 
      }catch(e){
        const err = e as ApolloError;
        if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
          setGlobalError(err.graphQLErrors[0].message);
        }else {
          navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
        }
      }
  }
    fetchMyProducts();
  }
  ,[selectedCategory,selectedStatus,pageNb,pageSz,productStatus,productNameFilter,navigate])
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const response = await productService.getCatgories();
      if(response.data.getAllCategories){
      setProductCategories(response.data.getAllCategories);  
      }
    }
    const fetchProductStockCounts = async () => {
      const response = await productService.getProductStockCounts();
      if(response.data.getMyProductsStatistics){
        setAvailableProductsCount(response.data.getMyProductsStatistics.countAvailable);
        setOutOfStockProductsCount(response.data.getMyProductsStatistics.countOutOfStock);
      }
    }
    try{
      fetchProductStockCounts();
      fetchCategoryProducts();
    }catch(e){
      const err = e as ApolloError;
      if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
        setGlobalError(err.graphQLErrors[0].message);
      }else {
        navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
      }
    }
  },[navigate])
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isSatusFilterOpen, setIsSatusFilterOpen] = useState(false);

  const handleClickCategoryFilter = () => {
    setIsCategoryFilterOpen(!isCategoryFilterOpen);
    setIsSatusFilterOpen(false);
  }
  const handleClickStatusFilter = () => {
    setIsSatusFilterOpen(!isSatusFilterOpen);
    setIsCategoryFilterOpen(false);
  }
  const handleSelectedCategoryChange = async (category: Category | undefined) => {
    setPageNb(1);
    setSelectedCategory(category);
    setIsCategoryFilterOpen(false);
  }
  
  const handleSelectedStatusChange = async (status: productStatus | undefined) => { 
    setPageNb(1);
    setSelectedStatus(status);
    setIsSatusFilterOpen(false);
   }
   const handleProductEditLink = (productId:number) => {
    navigate("/edit-product/"+productId)
   }
   const incrementPageNb = ()=>{
    const totalPages = Math.ceil((countFilteredProducts)/pageSz);
      if(pageNb < totalPages) setPageNb(pageNb+1);
   } 
   const decremnetPageNb = () => {
    if(pageNb > 1) setPageNb(pageNb-1);
   }
   const [searchString, setSearchString] = useState<string>("");
   const handleSearchSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProductNameFilter(searchString);
    setPageNb(1);
   }
  const displayProducts = myProducts.map((product,index) => {
    return (
      <tr key={index}>
        <td>
          <button className="fw-semibold btn btn-link" onClick={()=>handleProductEditLink(product.id)}>PID.{product.id}</button>
        </td>
        <td className="text-center">
          <button className="fw-semibold " style={{border:"none",background:"none"}}>{product.name}</button>
        </td>
        <td className="d-none d-md-table-cell text-center">
          <p >{product.category?.name}</p>
        </td>
        <td className="d-none d-sm-table-cell text-center">
          {new Date(product.createdAt).toLocaleDateString("fr-FR") }
        </td>
        <td style={{fontSize:18}} className="d-none d-sm-table-cell text-center">
          {product.quantity ? <span className="badge bg-success">{productStatus.AVAILABLE}</span>:<span className="badge bg-danger">{productStatus.OUT_OF_STOCK}</span> }
        </td>
        <td className="text-center">{product.totalOrders}</td>
        <td className="text-center">{product.rating?.toFixed(1)}</td>
        <td className="text-end">{product.price} DH</td>
      </tr>
    )
  })
  const categoriesJSX = productCategories.map((category,index) => {
    return (
      <button key={index} className={`dropdown-item ${category?.name === selectedCategory?.name ? "active":""}`} onClick={()=>handleSelectedCategoryChange(category!)}>
        <i className="fa fa-fw fa-gamepad opacity-50 me-1"></i> {category?.name}
      </button>
    )
  }) 
  if(globalError) return( <div className="alert alert-danger">{globalError}</div>)
  return (
    <main id="main-container">
        {/* <!-- Hero --> */}
        <div className="bg-image" style={{backgroundImage: `url('${backgroundimg}')`}}>
          <div className="bg-black-75">
            <div className="content content-top content-full text-center">
              <div className="py-3">
                <h1 className="h2 fw-bold text-white mb-2">Products</h1>
                <h2 className="h4 fw-normal text-white-75 mb-0">You currently have 4,360 in the catalog!</h2>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END Hero --> */}

        {/* <!-- Breadcrumb --> */}
        <div className="bg-body-light border-bottom">
          <div className="content py-1 text-center">
            <nav className="breadcrumb bg-body-light py-2 mb-0">
              <Link to={"/seller/home"} className="breadcrumb-item">e-Commerce</Link>
              <span className="breadcrumb-item active">My Products</span>
            </nav>
          </div>
        </div>
        {/* <!-- END Breadcrumb --> */}

        {/* <!-- Page Content --> */}
        <div className="content">
          {/* <!-- Overview --> */}
          <h2 className="content-heading">Overview</h2>
          <div className="row">
            {/* <!-- All Products --> */}
            <div className="col-md-6 col-xl-3">
              <div className="block block-rounded block-link-shadow">
                <div className="block-content block-content-full block-sticky-options">
                  <div className="block-options">
                    <div className="block-options-item">
                      <i className="far fa-circle fa-2x text-info-light"></i>
                    </div>
                  </div>
                  <div className="py-3 text-center">
                    <div className="fs-2 fw-bold mb-0 text-info">{availableProductsCount + outOfStockProductsCount}</div>
                    <div className="fs-sm fw-semibold text-uppercase text-muted">All Products</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- END All Products --> */}

            {/* <!-- Top Sellers --> */}
            <div className="col-md-6 col-xl-3">
              <div className="block block-rounded block-link-shadow">
                <div className="block-content block-content-full block-sticky-options">
                  <div className="block-options">
                    <div className="block-options-item">
                      <i className="fa fa-star fa-2x text-warning-light"></i>
                    </div>
                  </div>
                  <div className="py-3 text-center">
                    <div className="fs-2 fw-bold mb-0 text-warning">{availableProductsCount}</div>
                    <div className="fs-sm fw-semibold text-uppercase text-muted">{productStatus.AVAILABLE}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- END Top Sellers --> */}

            {/* <!-- Out of Stock --> */}
            <div className="col-md-6 col-xl-3">
              <div className="block block-rounded block-link-shadow">
                <div className="block-content block-content-full block-sticky-options">
                  <div className="block-options">
                    <div className="block-options-item">
                      <i className="fa fa-exclamation-triangle fa-2x text-danger-light"></i>
                    </div>
                  </div>
                  <div className="py-3 text-center">
                    <div className="fs-2 fw-bold mb-0 text-danger">{outOfStockProductsCount}</div>
                    <div className="fs-sm fw-semibold text-uppercase text-muted">Out of Stock</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- END Out of Stock --> */}

            {/* <!-- Add Product --> */}
            <div className="col-md-6 col-xl-3">
              <Link to="/seller/add-product" className="block block-rounded block-link-shadow">
                <div className="block-content block-content-full block-sticky-options">
                  <div className="block-options">
                    <div className="block-options-item">
                      <i className="fa fa-archive fa-2x text-success-light"></i>
                    </div>
                  </div>
                  <div className="py-3 text-center">
                    <div className="fs-2 fw-bold mb-0 text-success">
                      <i className="fa fa-plus"></i>
                    </div>
                    <div className="fs-sm fw-semibold text-uppercase text-muted">New Product</div>
                  </div>
                </div>
              </Link>
            </div>
            {/* <!-- END Add Product --> */}
          </div>
          {/* <!-- END Overview --> */}

          {/* <!-- Products --> */}
          <div className="content-heading d-flex justify-content-between align-items-center">
            <span>
              Products <small>({countFilteredProducts})</small>
            </span>
            <div className="space-x-1">
              <div className="dropdown d-inline-block">
                <button type="button" className="btn btn-sm btn-alt-secondary" onClick={handleClickCategoryFilter}>
                  <span>Category ({selectedCategory ? selectedCategory.name : "All"})</span>
                  <i className="fa fa-angle-down opacity-50 ms-1"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-end ${isCategoryFilterOpen ? "show" : ""}`} >
                  {categoriesJSX}
                  <div className="dropdown-divider"></div>
                  <button className={`dropdown-item ${selectedCategory=== undefined? "active":""}`} onClick={()=>handleSelectedCategoryChange(undefined)}>
                    <i className="far fa-fw fa-circle text-info opacity-50 me-1"></i> All
                  </button>
                </div>
              </div>
              <div className="dropdown d-inline-block">
                <button type="button" className="btn btn-sm btn-alt-secondary" onClick={handleClickStatusFilter}>
                  <span>{selectedStatus ? selectedStatus : "All"}</span>
                  <i className="fa fa-angle-down opacity-50 ms-1"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-end ${isSatusFilterOpen ? "show" : ""}`} >
                  <button className={`dropdown-item ${selectedStatus===productStatus.AVAILABLE? "active":""}`} onClick={()=>handleSelectedStatusChange(productStatus.AVAILABLE)}>
                    <i className="fa fa-fw fa-star text-warning me-1"></i> available
                  </button>
                  <button className={`dropdown-item ${selectedStatus===productStatus.OUT_OF_STOCK? "active":""}`} onClick={()=>handleSelectedStatusChange(productStatus.OUT_OF_STOCK)}>
                    <i className="fa fa-fw fa-exclamation-triangle text-danger me-1"></i> Out of Stock
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className={`dropdown-item ${selectedStatus===undefined? "active":""}`} onClick={()=>handleSelectedStatusChange(undefined)}>
                    <i className="far fa-fw fa-circle text-info opacity-50 me-1"></i> All
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="block block-rounded">
            <div className="block-content bg-body-light">
              {/* <!-- Search --> */}
              <form onSubmit={handleSearchSubmit}>
                <div className="mb-4">
                  <div className="input-group">
                    <input type="text" className="form-control" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)} value={searchString} placeholder="Search products.." />
                    <button title="Search" type="submit" className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              {/* <!-- END Search --> */}
            </div>
            <div className="block-content block-content-full">
              {/* <!-- Products Table --> */}
              <table className="table table-borderless table-striped">
                <thead>
                  <tr>
                    <th style={{width:100}}>ID</th>
                    <th className="d-none d-sm-table-cell text-center">Name</th>
                    <th className="d-none d-sm-table-cell text-center">Category</th>
                    <th className="text-center">Submitted</th>
                    <th className="d-none d-md-table-cell text-center">Status</th>
                    <th className="text-center">Total Sales</th>
                    <th className="text-center">rating</th>
                    <th className="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                {displayProducts}
                </tbody>
              </table>
              {/* <!-- END Products Table --> */}

              {/* <!-- Navigation --> */}
              <nav aria-label="Products navigation">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <button className={`page-link ${pageNb===1 ? "disabled":""}`}  onClick={decremnetPageNb}>
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
                    <button className={`page-link ${pageNb===Math.ceil((countFilteredProducts)/pageSz) ? "disabled":""}`} onClick={incrementPageNb}>
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
          {/* <!-- END Products --> */}
        </div>
        {/* <!-- END Page Content --> */}
      </main>
  )
}

export default ProductListPage

import { useEffect, useState } from "react";
import { Category, Product } from "../../generated";
import { useNavigate } from "react-router";
import { ApolloError } from "@apollo/client";
import { ErrorCode } from "../../constants/errors";
import { productService } from "../../services/product";
import { adminService } from "../../services/admin";
import { client } from "../../graphqlProvider";

const ProductsTable = () => {
    const [pageNb, setPageNb] = useState(1);
    const [pageSz, setPageSz] = useState(5);
    const [products, setProducts] = useState<Product[]>([]);
    const [countFilteredProducts, setCountFilteredProducts] = useState(0);
    const [productCategories, setProductCategories] = useState<
        Array<Category | null>
    >([]);
    
    //? avalaibilty
    enum productAvailability {
        AVAILABLE = "Available",
        OUT_OF_STOCK = "Out of Stock",
    }
    const [selectedAvailability, setSelectedAvailability] = useState<
        productAvailability | undefined
      >(undefined);
    const [isAvailabilityFilterOpen, setIsAvailabilityFilterOpen] = useState(false);
    const handleClickAvailabilityFilter = () => {
        setIsAvailabilityFilterOpen(!isAvailabilityFilterOpen);
        setIsCategoryFilterOpen(false);
        setIsStatusFilterOpen(false);
    };
    const handleSelectedAvailabilityChange = async (
        availability: productAvailability | undefined
    ) => {
        setPageNb(1);
        setSelectedAvailability(availability);
        setIsAvailabilityFilterOpen(false);
    };
    //? end availability
    // ? Category
    const [selectedCategory, setSelectedCategory] = useState<
        Category | undefined
      >(undefined);
    const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);

    const navigate = useNavigate();
    const [globalError,setGlobalError] = useState("");
    const handleClickCategoryFilter = () => {
        setIsCategoryFilterOpen(!isCategoryFilterOpen);
        setIsAvailabilityFilterOpen(false);
        setIsStatusFilterOpen(false);
    };
    const handleSelectedCategoryChange = async (
        category: Category | undefined
    ) => {
        setPageNb(1);
        setSelectedCategory(category);
        setIsCategoryFilterOpen(false);
    };
    //? end Category
    //? status
    enum ProductStatus {
        DISABLED = "Disabled",
        ENABLED = "Enabled",
    }
    const [selectedStatus, setSelectedStatus] = useState<
        ProductStatus | undefined
      >(undefined);
    const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
    const handleClickStatusFilter = () => {
        setIsStatusFilterOpen(!isStatusFilterOpen);
        setIsCategoryFilterOpen(false);
        setIsAvailabilityFilterOpen(false);
    };
    const handleSelectedStatusChange = async (
        status: ProductStatus | undefined
    ) => {
        setPageNb(1);
        setSelectedStatus(status);
        setIsStatusFilterOpen(false);
    };
    //? end status
  
  const [productIDFilter, setProductIdFilter] = useState<
    number | undefined
  >(undefined);
   const [searchId ,setSearchId] = useState<number|undefined>(undefined);
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProductIdFilter(searchId);
    setPageNb(1);
  };
  const incrementPageNb = () => {
    const totalPages = Math.ceil(countFilteredProducts / pageSz);
    if (pageNb < totalPages) setPageNb(pageNb + 1);
  };
  const decremnetPageNb = () => {
    if (pageNb > 1) setPageNb(pageNb - 1);
  };
    useEffect(() => {
      const fetchMyProducts = async () => {
        try{
          const response = await productService.getProductsFiltered(
            {
              productId: productIDFilter,
              available: selectedAvailability ? (selectedAvailability===productAvailability.AVAILABLE) : undefined,
              isDisabled: selectedStatus===undefined ? undefined : (selectedStatus===ProductStatus.DISABLED),
              categoryId: selectedCategory?.id,
              pageNb,
              pageSize:pageSz
            }
          );
        if(response.data?.getAllProducts){
          setProducts(response.data.getAllProducts.products);
          setCountFilteredProducts(response.data.getAllProducts.count);
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
    ,[selectedCategory,selectedAvailability,pageNb,pageSz,productAvailability.AVAILABLE,navigate,productIDFilter,selectedStatus,ProductStatus.DISABLED])
    useEffect(() => {
      const fetchCategoryProducts = async () => {
        const response = await productService.getCatgories();
        if (response.data.getAllCategories) {
          setProductCategories(response.data.getAllCategories);
        }
      }; 
      try{ 
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
    const [updatingStatusProductId, setUpdatingStatusProductId] = useState<number | undefined>(undefined);
    const changeProductStatus = async (product: Product, isDisabled: boolean) => {
            setGlobalError("");
            try{
                setUpdatingStatusProductId(product.id);
                await adminService.UpdateProductDisableStatus(product.id, isDisabled);
                setProducts([...products.map(p => p.id === product.id ? {...p, isDisabled} : p)]);
                await client.clearStore();
            }catch(e){
                const err = e as ApolloError;
                if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                    setGlobalError(err.graphQLErrors[0].message);
                }else {
                    navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
                }
            }finally{
                setUpdatingStatusProductId(undefined);
            }
        }
    const categoriesJSX = productCategories.map((category, index) => {
    return (
      <button
        key={index}
        className={`dropdown-item ${
          category?.name === selectedCategory?.name ? "active" : ""
        }`}
        onClick={() => handleSelectedCategoryChange(category!)}
      >
        <i className="fa fa-fw fa-gamepad opacity-50 me-1"></i> {category?.name}
      </button>
    )
  }) 
  const displayProducts = products.map((product, index) => {
    return (
      <tr key={index}>
        <td>
          <button
          title="product Id"
            className="fw-semibold btn btn-link p-0"
          >
            PID.{product.id}
          </button>
        </td>
        <td>
          <button
            title="product Name"
            className="fw-semibold p-0"
            style={{ border: "none", background: "none" }}
          >
            {product.name}
          </button>
        </td>
        <td className="d-none d-md-table-cell">
          <p>{product?.category?.name}</p>
        </td>
        <td className="d-none d-sm-table-cell">
          {new Date(product.createdAt).toLocaleDateString("fr-FR")}
        </td>
        <td style={{ fontSize: 18 }} className="d-none d-sm-table-cell">
          {product.quantity ? (
            <span className="badge bg-success">{productAvailability.AVAILABLE}</span>
          ) : (
            <span className="badge bg-danger">
              {productAvailability.OUT_OF_STOCK}
            </span>
          )}
        </td>
        <td className="">{product.owner?.firstName} {product.owner?.lastName}</td>
        <td className="text-end">{product.price} DH</td>
        <td className="text-end">
            <button type='button' className={`btn btn-sm ${product.isDisabled ? "btn-danger" : "btn-success"}`} onClick={async () => {changeProductStatus(product, !product.isDisabled);}}>
                <i className={`fa fa-fw ${product.id===updatingStatusProductId ? "fa-spinner fa-spin": product.isDisabled ? "fa-ban" : "fa-check"} me-1`}></i>
            </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
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
                    <button type="button" className="btn btn-sm btn-alt-secondary" onClick={handleClickAvailabilityFilter}>
                    <span>Availability ({selectedAvailability ? selectedAvailability : "All"})</span>
                    <i className="fa fa-angle-down opacity-50 ms-1"></i>
                    </button>
                    <div className={`dropdown-menu dropdown-menu-end ${isAvailabilityFilterOpen ? "show" : ""}`} >
                    <button className={`dropdown-item ${selectedAvailability===productAvailability.AVAILABLE? "active":""}`} onClick={()=>handleSelectedAvailabilityChange(productAvailability.AVAILABLE)}>
                        <i className="fa fa-fw fa-star text-warning me-1"></i> available
                    </button>
                    <button className={`dropdown-item ${selectedAvailability===productAvailability.OUT_OF_STOCK? "active":""}`} onClick={()=>handleSelectedAvailabilityChange(productAvailability.OUT_OF_STOCK)}>
                        <i className="fa fa-fw fa-exclamation-triangle text-danger me-1"></i> Out of Stock
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className={`dropdown-item ${selectedAvailability===undefined? "active":""}`} onClick={()=>handleSelectedAvailabilityChange(undefined)}>
                        <i className="far fa-fw fa-circle text-info opacity-50 me-1"></i> All
                    </button>
                    </div>
                </div>
                 <div className="dropdown d-inline-block">
                    <button type="button" className="btn btn-sm btn-alt-secondary" onClick={handleClickStatusFilter}>
                    <span>Status ({selectedStatus ? selectedStatus : "All"})</span>
                    <i className="fa fa-angle-down opacity-50 ms-1"></i>
                    </button>
                    <div className={`dropdown-menu dropdown-menu-end ${isStatusFilterOpen ? "show" : ""}`} >
                    <button className={`dropdown-item ${selectedStatus===ProductStatus.ENABLED? "active":""}`} onClick={()=>handleSelectedStatusChange(ProductStatus.ENABLED)}>
                        <i className="fa fa-fw fa-check text-success me-1"></i> {ProductStatus.ENABLED}
                    </button>
                    <button className={`dropdown-item ${selectedStatus===ProductStatus.DISABLED? "active":""}`} onClick={()=>handleSelectedStatusChange(ProductStatus.DISABLED)}>
                        <i className="fa fa-fw fa-ban text-danger me-1"></i> {ProductStatus.DISABLED}
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
                    <input type="number" className="form-control" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchId(parseInt(e.target.value))} value={searchId} placeholder="product ID.." />
                    <button title="Search" type="submit" className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              {/* <!-- END Search --> */}
            </div>
            <div className="block-content block-content-full">
             {globalError && <div className="alert alert-danger" role="alert">{globalError}</div>}
              {/* <!-- Products Table --> */}
              <table className="table table-borderless table-striped">
                <thead>
                  <tr>
                    <th style={{width:100}}>ID</th>
                    <th className="d-none d-sm-table-cell">Name</th>
                    <th className="d-none d-sm-table-cell">Category</th>
                    <th>Submitted</th>
                    <th className="d-none d-md-table-cell">Availability</th>
                    <th className="">Owner</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Status</th>
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
                  <button
                    className={`page-link ${pageNb === 1 ? "disabled" : ""}`}
                    onClick={decremnetPageNb}
                  >
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
                  <button
                    className={`page-link ${
                      pageNb === Math.ceil(countFilteredProducts / pageSz)
                        ? "disabled"
                        : ""
                    }`}
                    onClick={incrementPageNb}
                  >
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
    </div>
  )
}

export default ProductsTable

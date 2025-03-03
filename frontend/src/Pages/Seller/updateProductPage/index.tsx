import backgroundimg from "../../../assets/sellerAssets/media/photos/photo8@2x.jpg"
import { useDropzone } from "React-dropzone";

export default function AddProduct() {
    const { getRootProps, getInputProps,acceptedFiles } = useDropzone({});
    const files = acceptedFiles.map((file) => {
        if(file.type.includes("image")){
          return <img width={200} src={URL.createObjectURL(file)} style={{margin:5}} />
        }
        }
      );
  return (
    <main id="main-container">
        {/* <!-- Hero --> */}
        <div className="bg-image" style={{backgroundImage:backgroundimg}}>
          <div className="bg-black-75">
            <div className="content content-top content-full text-center">
              <div className="py-3">
                <h1 className="h2 fw-bold text-white mb-2">Dark Souls III</h1>
                <h2 className="h4 fw-normal text-white-75 mb-0">In <a className="text-primary-light link-fx" href="be_pages_ecom_products.html">video game</a> category.</h2>
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
              <a className="breadcrumb-item" href="be_pages_ecom_products.html">Products</a>
              <span className="breadcrumb-item active">Dark Souls III</span>
            </nav>
          </div>
        </div>
        {/* <!-- END Breadcrumb --> */}

        {/* <!-- Page Content --> */}
        <div className="content">
          {/* <!-- Overview --> */}
          <h2 className="content-heading">Overview</h2>
          <div className="row">
            {/* <!-- In Orders --> */}
            <div className="col-md-6 col-xl-4">
              <a className="block block-rounded block-link-shadow" href="javascript:void(0)">
                <div className="block-content block-content-full block-sticky-options">
                  <div className="block-options">
                    <div className="block-options-item">
                      <i className="fa fa-shopping-basket fa-2x text-info-light"></i>
                    </div>
                  </div>
                  <div className="py-3 text-center">
                    <div className="fs-2 fw-bold mb-0 text-info">39</div>
                    <div className="fs-sm fw-semibold text-uppercase text-muted">In Orders</div>
                  </div>
                </div>
              </a>
            </div>
            {/* <!-- END In Orders --> */}

            {/* <!-- Stock --> */}
            <div className="col-md-6 col-xl-4">
              <a className="block block-rounded block-link-shadow" href="javascript:void(0)">
                <div className="block-content block-content-full block-sticky-options">
                  <div className="block-options">
                    <div className="block-options-item">
                      <i className="fa fa-check fa-2x text-success-light"></i>
                    </div>
                  </div>
                  <div className="py-3 text-center">
                    <div className="fs-2 fw-bold mb-0 text-success">85</div>
                    <div className="fs-sm fw-semibold text-uppercase text-muted">Stock</div>
                  </div>
                </div>
              </a>
            </div>
            {/* <!-- END Stock --> */}

            {/* <!-- Delete Product --> */}
            <div className="col-xl-4">
              <a className="block block-rounded block-link-shadow" href="javascript:void(0)">
                <div className="block-content block-content-full block-sticky-options">
                  <div className="block-options">
                    <div className="block-options-item">
                      <i className="fa fa-archive fa-2x text-danger-light"></i>
                    </div>
                  </div>
                  <div className="py-3 text-center">
                    <div className="fs-2 fw-bold mb-0 text-danger">
                      <i className="fa fa-times"></i>
                    </div>
                    <div className="fs-sm fw-semibold text-uppercase text-muted">Delete Product</div>
                  </div>
                </div>
              </a>
            </div>
            {/* <!-- END Delete Product --> */}
          </div>
          {/* <!-- END Overview --> */}

          {/* <!-- Update Product --> */}
          <h2 className="content-heading">Update Product</h2>
          <div className="row">
            {/* <!-- Basic Info --> */}
            <div className="col-md-12">
              <form>
                <div className="block block-rounded">
                  <div className="block-header block-header-default">
                    <h3 className="block-title">Basic Info</h3>
                    <div className="block-options">
                      <button type="submit" className="btn btn-sm btn-alt-primary">
                        <i className="fa fa-save opacity-50 me-1"></i> Save
                      </button>
                    </div>
                  </div>
                  <div className="block-content block-content-full">
                    <div className="mb-4">
                      <label className="form-label">Product ID</label>
                      <div className="form-control-plaintext">2599</div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-name">Name</label>
                      <input type="text" className="form-control" id="ecom-product-name" name="ecom-product-name" placeholder="Product Name" value="Dark Souls III" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-category">Category</label>
                      {/* <!-- Select2 (.js-select2 class is initialized in Helpers.jqSelect2()) --> */}
                      {/* <!-- For more info and examples you can check out https://github.com/select2/select2 --> */}
                      <select className="js-select2 form-control" id="ecom-product-category" name="ecom-product-category" style={{width:"100%"}} data-placeholder="Choose one..">
                        {/* <option></option><!-- Required for data-placeholder attribute to work with Select2 plugin --> */}
                        <option value="1" selected>Video Games</option>
                        <option value="2">Electronics</option>
                        <option value="3">Mobile Phones</option>
                        <option value="4">House</option>
                        <option value="5">Hobby</option>
                        <option value="6">Auto - Moto</option>
                        <option value="7">Kids</option>
                        <option value="8">Health</option>
                        <option value="9">Fashion</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-description-short">Description</label>
                      <textarea className="form-control" id="ecom-product-description-short" name="ecom-product-description-short" placeholder="Description visible on preview.." rows={6}>Dark Souls III is an action role-playing video game developed by FromSoftware and published by Bandai Namco Entertainment for PlayStation 4, Xbox One, and Microsoft Windows.</textarea>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-stock">Stock</label>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa fa-fw fa-archive"></i>
                            </span>
                            <input type="text" className="form-control" id="ecom-product-stock" name="ecom-product-stock" placeholder="0" value="85" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-price">Price</label>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa fa-fw fa-dollar-sign"></i>
                            </span>
                            <input type="text" className="form-control" id="ecom-product-price" name="ecom-product-price" placeholder="Price in USD.." value="69,00" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Images --> */}
                    <div className="block block-rounded">
                      <div className="block-header block-header-default">
                        <h3 className="block-title">Images</h3>
                      </div>
                      <div {...getRootProps({ className: "dropzone" })}>
                          <input className="input-zone" {...getInputProps()} accept="image/*" />
                          <div className="text-center">
                              <p className="dropzone-content">
                              Drag and drop some files here, or click to select files
                              </p>
                          </div>
                          <div style={{display:"flex",alignItems:'center',justifyContent:"space-around",flexWrap:"wrap"}}>
                          {files}
                          </div>
                      </div>
                      
                    </div>
                    {/* <!-- END Images --> */}
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- END Basic Info --> */}

          </div>
          {/* <!-- END Update Product --> */}
        </div>
        {/* <!-- END Page Content --> */}
      </main>
  )
}

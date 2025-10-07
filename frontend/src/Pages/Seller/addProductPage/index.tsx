import { useEffect, useState } from "react";
import backgroundimg from "../../../assets/sellerAssets/media/photos/photo8@2x.jpg"
import { useDropzone } from "react-dropzone";
import { Category, CreateProductInput } from "../../../generated";
import { productService } from "../../../services/product";
import Select from 'react-select'
import { uploadCloudService } from "../../../services/uploadCloud";
import { Link, useNavigate } from "react-router";
import { client } from "../../../graphqlProvider"
import { ErrorCode } from "../../../constants/errors";
import { ApolloError } from "@apollo/client";
import { categoryService } from "../../../services/category";
export default function AddProduct() {
  const navigate = useNavigate();
  const [productCategories,setProductCategories] = useState<Array<Category | null>>([]);
  const [productInput,setProductInput] = useState<CreateProductInput>({
    categoryId:0,description:"",name:"",price:0,reference:"",images:[],quantity:0});
  const [createProductLoading ,setCreateProductLoading] = useState<boolean>(false);
  const [globalError,setGlobalError] = useState("");
    useEffect(() => {    

    const fetch = async () => {
      try{
        const response = await categoryService.getCatgories();
        if(response.data.getAllCategories){
          setProductCategories(response.data.getAllCategories);  
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
    fetch();
  },[navigate]);
const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
const productImages = acceptedFiles.map((image) => {
    if(image.type.includes("image")){
      return <img alt="product" width={200} src={URL.createObjectURL(image)} style={{margin:5}} />
    }
    }
  );
const categories = productCategories.map((category) => {
  return {value:category?.id as number,label:category?.name as string}
});
const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? categories[0]:null);
const handleSelectedCategoryChange = (category : {value: number | undefined,label?:string}|null)=>{
  if(category && category.value && category.label){
  setSelectedCategory({label: category.label,value:category.value});
  setProductInput({...productInput,categoryId:category.value});
  }
}
const [errors, setErrors] = useState<{ [key: string]: string }>({});
const [submitError,setSubmitError] = useState("");
  const validate = ()=>{
    const newErrors: { [key: string]: string } = {};
    if (!productInput.name) newErrors.name = "Product name is required";
    if (!productInput.description) newErrors.description = "Product description is required";
    if (!productInput.reference) newErrors.reference = "Product reference is required";
    if (!productInput.price) newErrors.price = "Positive price is required";
    if (!productInput.quantity) newErrors.quantity = "Positive quantity is required";
    if (acceptedFiles.length===0) newErrors.images = "You should at least drop one image";
    if (!selectedCategory) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitError("");
    if(validate()){
      setCreateProductLoading(true);
      try {
      const imagesUrls = await uploadCloudService.uploadImages(acceptedFiles,"images/products");
      console.log({...productInput,images:imagesUrls});
      await productService.createProduct({...productInput,images:imagesUrls});
      client.resetStore();
      navigate("/product-list")
      }catch(err){
        setSubmitError((err as Error).message);
      }
      setCreateProductLoading(false);
    }
  }
  if(globalError) return( <div className="alert alert-danger">{globalError}</div>)
  return (
    <main id="main-container">
        {/* <!-- Hero --> */}
        <div className="bg-image" style={{backgroundImage:`url(${backgroundimg})`}}>
          <div className="bg-black-75">
            <div className="content content-top content-full text-center">
              <div className="py-3">
                <h1 className="h2 fw-bold text-white mb-2">Add Product</h1>
                <h2 className="h4 fw-normal text-white-75 mb-0">Add <span className="text-primary-light link-fx">New</span> One !</h2>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END Hero --> */}

        {/* <!-- Breadcrumb --> */}
        <div className="bg-body-light border-bottom">
          <div className="content py-1 text-center">
            <nav className="breadcrumb bg-body-light py-2 mb-0">
              <Link className="breadcrumb-item" to="/seller/home">e-Commerce</Link>
              <Link className="breadcrumb-item" to="/seller/product-list">Products</Link>
              <span className="breadcrumb-item active">Add Product</span>
            </nav>
          </div>
        </div>
        {/* <!-- END Breadcrumb --> */}

        {/* <!-- Page Content --> */}
        <div className="content">

          {/* <!-- Update Product --> */}
          <h2 className="content-heading">Add Product</h2>
          {submitError && <div className="alert alert-danger">{submitError}</div>}
          <div className="row">
            {/* <!-- Basic Info --> */}
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="block block-rounded">
                  <div className="block-header block-header-default">
                    <h3 className="block-title">Basic Info</h3>
                    <div className="block-options">
                      <button type="submit" className="btn btn-sm btn-alt-primary" disabled={createProductLoading}>
                      {createProductLoading ? ( 
                          <span>saving&nbsp;&nbsp;<i className="fa fa-spinner fa-spin opacity-50 me-1"></i></span>
                        ) : (
                          <span>save&nbsp;&nbsp;<i className="fa fa-save opacity-50 me-1"></i></span>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="block-content block-content-full">
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-name">Name</label>
                      <input type="text" className="form-control" id="ecom-product-name" placeholder="Name" value={productInput.name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductInput({...productInput,name:e.target.value})} />
                      {errors.name && <p className="text-danger">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-category">Category</label>
                      <Select options={categories} value={selectedCategory} onChange={(c)=>{handleSelectedCategoryChange(c)}} />
                      {errors.category && <p className="text-danger">{errors.category}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-name">Reference</label>
                      <input type="text" className="form-control" id="ecom-product-name" placeholder="Product Reference" value={productInput.reference} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductInput({...productInput,reference:e.target.value})}/>
                      {errors.reference && <p className="text-danger">{errors.reference}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-description-short">Description</label>
                      <textarea className="form-control" id="ecom-product-description-short" placeholder="Description visible on preview.." rows={6} value={productInput.description} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setProductInput({...productInput,description:e.target.value})}/>
                      {errors.description && <p className="text-danger">{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-stock">Stock</label>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa fa-fw fa-archive"></i>
                            </span>
                            <input type="number" className="form-control" id="ecom-product-stock" placeholder="0" value={productInput.quantity} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductInput({...productInput,quantity:parseInt(e.target.value)})} />
                          </div>
                        </div>
                      </div>
                      {errors.quantity && <p className="text-danger">{errors.quantity}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-price">Price</label>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa fa-fw fa-dollar-sign"></i>
                            </span>
                            <input type="number" className="form-control" id="ecom-product-price" name="ecom-product-price" placeholder="Price in USD.." value={productInput.price} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductInput({...productInput,price:parseFloat(e.target.value)})} />
                          </div>
                        </div>
                      </div>
                      {errors.price && <p className="text-danger">{errors.price}</p>}
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
                              Drag and drop some images here, or click to select files
                              </p>
                          </div>
                          <div style={{display:"flex",alignItems:'center',justifyContent:"space-around",flexWrap:"wrap"}}>
                          {productImages}
                          </div>
                      </div>
                      {errors.images && <p className="text-danger">{errors.images}</p>}
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
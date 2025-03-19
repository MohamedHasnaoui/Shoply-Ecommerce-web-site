import { useEffect, useRef, useState } from "react";
import backgroundimg from "../../../assets/sellerAssets/media/photos/photo8@2x.jpg"
import { useDropzone } from "React-dropzone";
import { Category, Product } from "../../../generated";
import { productService } from "../../../services/product";
import Select from 'react-select'
import { uploadCloudService } from "../../../services/uploadCloud";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../../Components/Seller/Loading";
import  { BasicModal, BasicModalRef }  from "../../../Components/common/modal"; 
import { client } from "../../../graphqlProvider";


const EditProductPage = () => {
    const ModalRef = useRef<BasicModalRef>(null);
    const navigate = useNavigate();
    const {productId}  = useParams();
    const [productCategories,setProductCategories] = useState<Array<Category | null>>([]);
    const [productEdit,setProductEdit] = useState<Product | null>(null)
    const [editProductLoading ,setEditProductLoading] = useState<boolean>(false);
    useEffect(()=>{
        const fetchCateg = async () => {
            const response = await productService.getCatgories();
            if(response.data.getAllCategories){
            setProductCategories(response.data.getAllCategories);  
            }
        }
      fetchCateg();
    },[])
    useEffect(() => {
      const fetchProduct = async () => {
        const response = await productService.getProductByID(parseInt(productId!));
        if(response.data.getProduct){
            setProductEdit(response.data.getProduct);  
        }
      }

      fetchProduct()
    },[productId]);

    useEffect(()=>{
        setSelectedCategory({label:productEdit?.category.name as string,value:productEdit?.category.id as number})
    },[productEdit?.category]);

  const { getRootProps, getInputProps,acceptedFiles } = useDropzone({});
  const productNewImages = acceptedFiles.map((image,key) => {
      if(image.type.includes("image")){
        return <img key={key} width={200} src={URL.createObjectURL(image)} style={{margin:5}} />
      }
      }
    );
    interface categType {
        value:number,
        label:string
    } 
  const categories : categType [] = productCategories.map((category) => {
    return {value:category?.id as number,label:category?.name as string}
  });
  const productImages = productEdit?.images.map((url,key) => {
    return <div className="col-sm-4 col-xl-3">
        <div className="options-container">
        <img className="img-fluid options-item" key={key} src={url} style={{margin:15}} />
        <div className="options-overlay bg-black-75">
            <div className="options-overlay-content">
            <button className="btn btn-sm btn-alt-danger" onClick={()=>{setProductEdit({...productEdit,images:productEdit.images.filter((image)=>{return image!==url})})}}>
                <i className="fa fa-fw fa-times opacity-50 me-1"></i> Remove
            </button>
            </div>
        </div>
        </div>
    </div>
  })
  const [selectedCategory, setSelectedCategory] = useState<categType | null>(null);
  const handleSelectedCategoryChange = (category : {value: number | undefined,label?:string}|null)=>{
    if(category && category.value && category.label){
    setProductEdit(productEdit ? {...productEdit, category: { id: category.value,name:category.label }} : null);
    }
  }
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError,setSubmitError] = useState("");
    const validate = ()=>{
      const newErrors: { [key: string]: string } = {};
      if (!productEdit?.name) newErrors.name = "Product name is required";
      if (!productEdit?.description) newErrors.description = "Product description is required";
      if (!productEdit?.reference) newErrors.reference = "Product reference is required";
      if (!productEdit?.price) newErrors.price = "Positive price is required";
      if (!productEdit?.quantity) newErrors.quantity = "Positive quantity is required";
      if (!selectedCategory) newErrors.category = "Category is required";
      if (acceptedFiles.length===0 && productEdit?.images.length===0) newErrors.images = "You should at least have one image";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors({});
      setSubmitError("");
      if(validate() && productEdit){
        setEditProductLoading(true);
        try {
        const imagesUrls = await uploadCloudService.uploadImages(acceptedFiles,"images/products");
        const {id,name,description,price,images,quantity,reference} = productEdit;
        await productService.updateProduct({id,name,description,price,quantity,reference,categoryId:productEdit.category.id,images:imagesUrls.concat(images)})
        client.resetStore();
        navigate("/product-list")
        }catch(err){
          setSubmitError((err as Error).message);
        }
        setEditProductLoading(false);
      }
    }

     const [deleteProductLoading,setLoadingLoading] = useState<boolean>(false);
   const handleDeleteProduct = async () => {  
    try {
      setLoadingLoading(true);
      setSubmitError("");
      await productService.deleteProduct(parseInt(productId!));
      client.resetStore();
      navigate("/product-list")
    }catch(err){
      setSubmitError((err as Error).message);
    }finally{
      ModalRef.current?.closeModal();
      setLoadingLoading(false);
    }
   }
     const modalBody = 
      <div className="row flex-row justify-content-around">
        <button className="btn btn-secondary col-5" onClickCapture={ModalRef.current?.closeModal} disabled={deleteProductLoading}>Cancel</button>
        <button className="btn btn-danger col-5" onClick={handleDeleteProduct}>
        {deleteProductLoading ? ( 
            <span>Deleting&nbsp;&nbsp;<i className="fa fa-spinner fa-spin opacity-50 me-1"></i></span>
          ) : (
            <span>Delete&nbsp;&nbsp;<i className="fa fa-remove opacity-50 me-1"></i></span>
          )}
        </button>
      </div>

    if(!productEdit || !productCategories){
      return <Loading />
    } 
    return (
      <main id="main-container">
          {/* <!-- Hero --> */}
          <div className="bg-image" style={{backgroundImage:`url(${backgroundimg})`}}>
            <div className="bg-black-75">
              <div className="content content-top content-full text-center">
                <div className="py-3">
                  <h1 className="h2 fw-bold text-white mb-2">Edit Product</h1>
                  <h2 className="h4 fw-normal text-white-75 mb-0">Update <span className="text-primary-light link-fx">Your</span> Product !</h2>
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
                <Link to={"/product-list"} className="breadcrumb-item">Products</Link>
                <span className="breadcrumb-item active">Edit Product</span>
              </nav>
            </div>
          </div>
          {/* <!-- END Breadcrumb --> */}
  
          {/* <!-- Page Content --> */}
          <div className="content">
          {/* <!-- Overview --> */}
            {/* <!-- Update Product --> */}
            <h2 className="content-heading">Edit Product</h2>
            {submitError && <div className="alert alert-danger">{submitError}</div>}
            <div className="row">
              {/* <!-- Basic Info --> */}
              <div className="col-md-12">
                <form onSubmit={handleSubmit}>
                  <div className="block block-rounded">
                    <div className="block-header block-header-default">
                      <h3 className="block-title">Basic Info</h3>
                      <div className="block-options">
                        <button type="submit" className="btn btn-sm btn-alt-primary" disabled={editProductLoading || deleteProductLoading}>
                        {editProductLoading ? ( 
                            <span>saving&nbsp;&nbsp;<i className="fa fa-spinner fa-spin opacity-50 me-1"></i></span>
                          ) : (
                            <span>save&nbsp;&nbsp;<i className="fa fa-save opacity-50 me-1"></i></span>
                          )}
                        </button>
                        <button type="button" className="btn btn-sm btn-alt-danger ms-2" onClickCapture={()=>{ModalRef.current?.openModal()}} disabled={editProductLoading || deleteProductLoading}>
                        {deleteProductLoading ? ( 
                            <span>Deleting&nbsp;&nbsp;<i className="fa fa-spinner fa-spin opacity-50 me-1"></i></span>
                          ) : (
                            <span>Delete&nbsp;&nbsp;<i className="fa fa-remove opacity-50 me-1"></i></span>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="block-content block-content-full">
                      <div className="mb-4">
                        <label className="form-label" htmlFor="ecom-product-name">Name</label>
                        <input type="text" className="form-control" id="ecom-product-name" placeholder="Name" value={productEdit?.name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductEdit({...productEdit,name:e.target.value})} />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                      </div>
                      <div className="mb-4">
                        <label className="form-label" htmlFor="ecom-product-category">Category</label>
                        <Select options={categories} value={selectedCategory} onChange={(c)=>{handleSelectedCategoryChange(c)}} />
                        {errors.category && <p className="text-danger">{errors.category}</p>}
                      </div>
                      <div className="mb-4">
                        <label className="form-label" htmlFor="ecom-product-name">Reference</label>
                        <input type="text" className="form-control" id="ecom-product-name" placeholder="Product Reference" value={productEdit?.reference} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductEdit({...productEdit,reference:e.target.value})}/>
                        {errors.reference && <p className="text-danger">{errors.reference}</p>}
                      </div>
                      <div className="mb-4">
                        <label className="form-label" htmlFor="ecom-product-description-short">Description</label>
                        <textarea className="form-control" id="ecom-product-description-short" placeholder="Description visible on preview.." rows={6} value={productEdit?.description} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setProductEdit({...productEdit,description:e.target.value})}/>
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
                              <input type="number" className="form-control" id="ecom-product-stock" placeholder="0" value={productEdit.quantity} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductEdit({...productEdit,quantity:parseInt(e.target.value)})} />
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
                              <input type="number" className="form-control" id="ecom-product-price" name="ecom-product-price" placeholder="Price in USD.." value={productEdit.price} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductEdit({...productEdit,price:parseFloat(e.target.value)})} />
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
                        <div className="row g-sm items-push">
                            {productImages}
                        </div>
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input className="input-zone" {...getInputProps()} accept="image/*" />
                            <div className="text-center">
                                <p className="dropzone-content">
                                Drag and drop some images here, or click to select files
                                </p>
                            </div>
                            <div style={{display:"flex",alignItems:'center',justifyContent:"space-around",flexWrap:"wrap"}}>
                            {productNewImages}
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
          <BasicModal body={modalBody} title="Do you want really to delete this product" ref={ModalRef} />
        </main>
    )
}

export default EditProductPage

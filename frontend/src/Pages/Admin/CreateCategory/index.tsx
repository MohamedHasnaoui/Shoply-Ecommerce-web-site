import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CategoryInput } from "../../../generated";
import { uploadCloudService } from "../../../services/uploadCloud";
import { categoryService } from "../../../services/category";
import { client } from "../../../graphqlProvider";
import { Link, useNavigate } from "react-router";
import backgroundimg from "../../../assets/sellerAssets/media/photos/photo9@2x.jpg"
import { ApolloError } from "@apollo/client";
import { ErrorCode } from "../../../constants/errors";

const CreateCategory = () => {
    const [categoryInput,setCategoryInput] = useState<CategoryInput>({
        description:"",name:"",image:""});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitError,setSubmitError] = useState("");
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 1,
    multiple: false
    });   
    const [createCategoryLoading,setCreateCategoryLoading] = useState(false);
    const navigate = useNavigate();
     const validate = ()=>{
        const newErrors: { [key: string]: string } = {};
        if (!categoryInput.name) newErrors.name = "Category name is required";
        if (!categoryInput.description) newErrors.description = "Category description is required";
        if (acceptedFiles.length===0) newErrors.images = "You should drop one image";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitError("");
    if(validate()){
        setCreateCategoryLoading(true);
        try {
            const imagesUrls = await uploadCloudService.uploadImages(acceptedFiles,"images/products");
            await categoryService.createCategory({...categoryInput,image:imagesUrls[0]});
            client.resetStore();
            navigate("/admin/categories")
        }catch(e){
          const err = e as ApolloError;
          if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
              setSubmitError(err.graphQLErrors[0].message);
          }else {
              navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
          }
        }
        setCreateCategoryLoading(false);
    }
    }
    
  return (
    <main id="main-container">
        {/* <!-- Hero --> */}
        <div className="bg-image" style={{backgroundImage:`url(${backgroundimg})`}}>
          <div className="bg-black-75">
            <div className="content content-top content-full text-center">
              <div className="py-3">
                <h1 className="h2 fw-bold text-white mb-2">Add Category</h1>
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
              <Link className="breadcrumb-item" to="/admin/home">Admin</Link>
              <Link className="breadcrumb-item" to="/admin/categories">Categories</Link>
              <span className="breadcrumb-item active">Add Category</span>
            </nav>
          </div>
        </div>
        {/* <!-- END Breadcrumb --> */}

        {/* <!-- Page Content --> */}
        <div className="content">

          {/* <!-- Update Product --> */}
          <h2 className="content-heading">Add Category</h2>
          {submitError && <div className="alert alert-danger">{submitError}</div>}
          <div className="row">
            {/* <!-- Basic Info --> */}
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="block block-rounded">
                  <div className="block-header block-header-default">
                    <h3 className="block-title">Basic Info</h3>
                    <div className="block-options">
                      <button type="submit" className="btn btn-sm btn-alt-primary" disabled={createCategoryLoading}>
                      {createCategoryLoading ? ( 
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
                      <input type="text" className="form-control" id="ecom-product-name" placeholder="Name" value={categoryInput.name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCategoryInput({...categoryInput,name:e.target.value})} />
                      {errors.name && <p className="text-danger">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="ecom-product-description-short">Description</label>
                      <textarea minLength={10} maxLength={255} className="form-control" id="ecom-product-description-short" placeholder="Description visible on preview.." rows={6} value={categoryInput.description} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setCategoryInput({...categoryInput,description:e.target.value})}/>
                      {errors.description && <p className="text-danger">{errors.description}</p>}
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
                          {acceptedFiles.map((image) => {
                                    if(image.type.includes("image")){
                                    return <img alt="product" width={200} src={URL.createObjectURL(image)} style={{margin:5}} />
                                    }
                                }
                            )}
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

export default CreateCategory

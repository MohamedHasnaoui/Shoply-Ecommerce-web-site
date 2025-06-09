import { useEffect, useState } from "react"
import { Category } from "../../../generated"
import { categoryService } from "../../../services/category";
import { ApolloError } from "@apollo/client";
import { ErrorCode } from "../../../constants/errors";
import { Link, useNavigate } from "react-router";
import backgroundimg from "../../../assets/sellerAssets/media/photos/photo27@2x.jpg"
const CategoriesList = () => {
  const [categories,setCategories] = useState<Category[]>([])
  const [globalError,setGlobalError] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchCategs = async ()=>{
      try {
          const res = await categoryService.getCatgories();
          setCategories(res.data.getAllCategories);
      }catch(e){
          const err = e as ApolloError;
          if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
              setGlobalError(err.graphQLErrors[0].message);
          }else {
              navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
          }
      }
    }
    fetchCategs();
  })
  return (
    <main id="main-container">
    {/* <!-- Hero --> */}
    <div className="bg-image" style={{backgroundImage:`url(${backgroundimg})`}}>
      <div className="bg-black-75">
        <div className="content content-top content-full text-center">
          <div className="py-3">
            <h1 className="h2 fw-bold text-white mb-2">Categories</h1>
            <h2 className="h4 fw-normal text-white-75 mb-0">This categories look interesting</h2>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Breadcrumb --> */}
    <div className="bg-body-light border-bottom">
        <div className="content py-1 text-center">
        <nav className="breadcrumb bg-body-light py-2 mb-0">
            <Link className="breadcrumb-item" to="/admin">Admin</Link>
            <span className="breadcrumb-item active">Categories</span>
        </nav>
        </div>
    </div>
    {/* <!-- END Breadcrumb --> */}
    <div className="content">
      <div className="block-content block-content-full">
              {globalError && <div className="alert alert-danger" role="alert">{globalError}</div>}
              {/* <!-- Orders Table --> */}
              <table className="table table-borderless table-striped">
              <thead>
                  <tr>
                  <th style={{width: "100px"}}>ID</th>
                  <th className="d-none d-sm-table-cell">Name</th>
                  <th className="d-none d-sm-table-cell">Submitted</th>
                  <th className="d-none d-sm-table-cell">Updated</th>
                  <th className="d-none d-sm-table-cell text-end">Action</th>
                  </tr>
              </thead>
              <tbody>
                  { categories.map((categ,key)=>{
                      return (
                        <tr key={key}>
                          <td>
                            <button className="fw-semibold border-0"style={{background:"none"}}>CATEG.{categ.id}</button>
                          </td>
                          <td>
                              {categ.name}
                          </td>
                          <td className="d-none d-sm-table-cell">
                            {new Date(categ.createdAt).toLocaleDateString("fr-FR")}
                          </td>
                          <td className="d-none d-sm-table-cell">
                            {new Date(categ.updatedAt).toLocaleDateString("fr-FR")}
                          </td>
                          <td className='text-end'>
                            <Link to={`/admin/categories/edit/${categ.id}`} className="btn btn-sm btn-danger" title="Edit">
                              <i className="fa fa-fw fa-edit"></i>
                            </Link>
                          </td>
                        </tr>
                      )})}
              </tbody>
              </table>
              {/* <!-- END Categories Table --> */}
      </div>
    </div>
    </main>
  )
}

export default CategoriesList

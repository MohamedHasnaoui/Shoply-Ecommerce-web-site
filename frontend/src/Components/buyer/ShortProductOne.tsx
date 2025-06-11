import { useEffect, useState } from "react";
import ProductsSlider from "./ProductsSlider";
import { productService } from "../../services/product";
import { useNavigate } from "react-router";
import { Product } from "../../generated";
import { ErrorCode } from "../../constants/errors";
import { ApolloError } from "@apollo/client";

const ShortProductOne = () => {
  const [productsOrderRating,setOrderRating] = useState<Product[]>([]);
  const [productsOrderCreated,setOrderCreated] = useState<Product[]>([]);
  const [globalError,setGlobalError] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchProducts = async ()=>{
      try{
        const result1 = await productService.getProductsFiltered(
          {available:true,isDisabled:false,orderBy:"rating",pageSize:12,pageNb:1});
        setOrderRating(result1.data.getAllProducts.products);
        const result2 = await productService.getProductsFiltered({
          available:true,isDisabled:false,orderBy:"createdAt",pageSize:12,pageNb:1
        })
        setOrderCreated(result2.data.getAllProducts.products);
      }catch(e){
             const err = e as ApolloError;
            if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                setGlobalError(err.graphQLErrors[0].message);
            }else {
                navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
       }
      }
    }
    fetchProducts();
  },[]);
  if(globalError) return <div className="alert alret-danger">{globalError}</div>
  return (
    <div className="short-product">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-lg-6 col-sm-6">
            <div className="p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 ">
              <div className="p-16 bg-main-50 rounded-16 mb-32">
                <h6 className="underlined-line position-relative mb-0 pb-16 d-inline-block">
                  Top Selling Products
                </h6>
              </div>
              <div className="short-product-list arrow-style-two">
               <ProductsSlider products={productsOrderRating} />
              </div>
            </div>
          </div>

          <div className=" col-lg-6 col-sm-6">
            <div className="p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 ">
              <div className="p-16 bg-main-50 rounded-16 mb-32">
                <h6 className="underlined-line position-relative mb-0 pb-16 d-inline-block">
                  Top Rated Products
                </h6>
              </div>
              <div className="short-product-list arrow-style-two">
                <ProductsSlider products={productsOrderCreated} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortProductOne;

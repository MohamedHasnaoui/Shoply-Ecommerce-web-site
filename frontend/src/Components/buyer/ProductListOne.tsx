import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../generated";
import { productService } from "../../services/product";
import { ErrorCode } from "../../constants/errors";
import { ApolloError } from "@apollo/client";
import { cartItemService } from "../../services/cartItem";
import { shoppingCartService } from "../../services/shoppingCart";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { setCartItems } from "../../redux/slices/cartSlice";

const ProductListOne: React.FC = () => {
  const [products,setProducts] = useState<Product[]>([]);
  const [globalError,setGlobalError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const fetchProducts = async ()=>{
      try{
        const result = await productService.getProductsFiltered(
          {available:true,isDisabled:false,orderBy:"rating",pageSize:6,pageNb:1});
        setProducts(result.data.getAllProducts.products);
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
   const handleAddToCart = async (productId: number) => {
      try {
        await cartItemService.createCartItem({
          idProduct: productId,
          quantity: 1,
        });
        const updatedCart = await shoppingCartService.getShoppingCart();
        dispatch(setCartItems(updatedCart ?? null));
        toast.success("Produit ajouté au panier !");
      } catch (error) {
        console.error("Erreur lors de l'ajout au panier", error);
        toast.error("Erreur lors de l'ajout !");
      }
    };
  
  if(globalError) return <div className="alert alert-danger">{globalError}</div>
  return (
    <div className="product mt-24">
      <div className="container container-lg">
        <div className="row gy-4 g-12">
          {products?.map((product,key)=>{
            return (
            <div key={key} className="col-xxl-2 col-lg-3 col-sm-4 col-6">
              <div className="product-card px-8 py-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                <button
                 onClick={() => handleAddToCart(product.id)}
                  disabled={product?.quantity === 0}
                  className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16"
                >
                  Add <i className="ph ph-shopping-cart" />
                </button>
                <Link to={`product-details/${product.id}`}
                 style={{
                      backgroundImage: `url("${product?.images ? product?.images[0] : ""}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: 200,
                    }} className="rounded-8">

                </Link>
                <div className="product-card__content mt-12">
                  <div className="product-card__price mb-16">
                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                      {product.price ? (product.price+product.price*0.5).toFixed(2) : 0}
                    </span>
                    <span className="text-heading text-md fw-semibold ">
                      {product.price} DH <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                  </div>
                  <div className="flex-align gap-6">
                    <span className="text-xs fw-bold text-gray-600">{product.rating}</span>
                    <span className="text-15 fw-bold text-warning-600 d-flex">
                      <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-bold text-gray-600">({product.numberOfReviews})</span>
                  </div>
                  <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link to={`product-details/${product.id}`} className="link text-line-2">
                      {product.name}
                    </Link>
                  </h6>
                  <div className="flex-align gap-4">
                    <span className="text-main-600 text-md d-flex">
                      <i className="ph-fill ph-storefront" />
                    </span>
                    <span className="text-gray-500 text-xs">
                      By {product.owner?.firstName} {product.owner?.lastName}
                    </span>
                  </div>
                  <div className="mt-12">
                    <div
                      className="progress w-100  bg-color-three rounded-pill h-4"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-600 rounded-pill"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                      Sold: {product.totalOrders}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
          })}
          
        </div>
      </div>
    </div>
  );
};

export default ProductListOne;

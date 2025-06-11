import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Category, Product } from "../../generated";
import { categoryService } from "../../services/category";
import { cartItemService } from "../../services/cartItem";
import { shoppingCartService } from "../../services/shoppingCart";
import { setCartItems } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { productService } from "../../services/product";
import { ApolloError } from "@apollo/client";
import { ErrorCode } from "../../constants/errors";
import { useAppDispatch } from "../../redux/hooks";

const RecommendedOne: React.FC = () => {
const [categories,setCategories] = useState<Category[]>([]);
const [selectedCategory,setSelectedCategory] = useState<Category | undefined>(undefined);
useEffect(()=>{
  const fetchCategories = async ()=>{
    try{
      const response = await categoryService.getCatgories();
      const categs = response.data.getAllCategories;
        setCategories(categs);
    }catch(e){
      console.log("erreur: ",e);
    }
  }
  fetchCategories();
},[])
  const [products,setProducts] = useState<Product[]>([]);
  const [globalError,setGlobalError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const fetchProducts = async ()=>{
      try{
        const result = await productService.getProductsFiltered(
          {available:true,isDisabled:false,orderBy:"createdAt",pageSize:6,pageNb:1,categoryId:selectedCategory?.id});
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
  },[selectedCategory]);
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
    <section className="recommended">
      <div className="container container-lg">
        <div className="section-heading flex-between flex-wrap gap-16">
          <h5 className="mb-0">Most Recent Products</h5>
          <ul
            className="nav common-tab nav-pills"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${selectedCategory===undefined ? "active" : ""}`}
                  id={`pills-0-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-0`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-0`}
                  aria-selected={selectedCategory===undefined? "true" : "false"}
                  onClick={()=>{setSelectedCategory(undefined)}}
                >
                  All
                </button>
              </li>
            {categories.map((tab) => (
              <li className="nav-item" role="presentation" key={tab.id}>
                <button
                  className={`nav-link ${selectedCategory?.id===tab.id ? "active" : ""}`}
                  id={`pills-${tab.id}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-${tab.id}`}
                  aria-selected={selectedCategory?.id===tab.id ? "true" : "false"}
                  onClick={()=>{setSelectedCategory(tab)}}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-all"
            role="tabpanel"
            aria-labelledby="pills-all-tab"
            tabIndex={0}
          >
            <div className="row g-12">
              {products.map((product, index) => (
                <div className="col-xxl-2 col-lg-3 col-sm-4 col-6" key={index}>
                  <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <Link
                       to={`product-details/${product.id}`}
                      className="product-card__thumb flex-center m-0 p-0"
                    >
                     <div style={{
                      backgroundImage: `url("${product?.images ? product?.images[0] : ""}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: 200,
                    }} className="rounded-8">

                </div>
                    </Link>
                    <div className="product-card__content p-sm-2">
                      <h6 className="title text-lg fw-semibold mb-8 ">
                        <Link
                          to="/product-details"
                          className="link text-line-2"
                        >
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
                      <div className="product-card__content mt-12">
                        <div className="product-card__price mb-8">
                          <span className="text-heading text-md fw-semibold">
                            {product.price}DH{" "}
                            <span className="text-gray-500 fw-normal">
                              /Qty
                            </span>
                          </span>
                          <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                           {(product.price ? product.price+product.price*0.5:0).toFixed(2)}DH
                          </span>
                        </div>
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-600">
                            {product.rating}
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-600">
                            ({product.numberOfReviews})
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          disabled={product?.quantity === 0}
                          className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center"
                        >
                          Add To Cart <i className="ph ph-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedOne;

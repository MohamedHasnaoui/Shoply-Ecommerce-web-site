import React, { useEffect, useState } from 'react';
import { Row, Col, Carousel, Badge, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../assets//ClientAssets/sass/components/ProductDetailsPage.scss';
import { StarRatingDisplay } from '../../../Components/buyer/StarRatingDisplay';
import Loading from '../../../Components/Seller/Loading';
import { useNavigate, useParams } from 'react-router';
import { productService } from '../../../services/product';
import { Product } from '../../../generated';
import { ApolloError } from '@apollo/client';
import { ErrorCode } from '../../../constants/errors';
import ReviewTab from '../../../Components/buyer/ReviewTab';
import { shoppingCartService } from '../../../services/shoppingCart';
import { cartItemService } from '../../../services/cartItem';
import { useAppDispatch } from '../../../redux/hooks';
import { setCartItems } from "../../../redux/slices/cartSlice";
import { toast } from 'react-toastify';
/**
 * ProductDetailsPage Component - Main product details page with image carousel, 
 * product information, and interactive review system
 */
const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [globalError, setGlobalError] = useState<string>("");
  const [product,setProduct] = useState<Product | undefined>(undefined);

  const [selectedQuantity, setSelectedQuantity] = useState<number | undefined>(1);
  
  /**
   * getShortDescription - Truncates the product description to a specified length
   * @param description - Full product description
   * @param maxLength - Maximum length of the short description
   * @returns Shortened description with ellipsis if truncated
   */
  const getShortDescription = (description: string, maxLength: number = 150): string => {
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...' 
      : description;
  };
  const navigate = useNavigate();
  const fetchProduct = async () => {
      if(!id){
        setGlobalError("Product ID is not valid or missing.");
        return;
      }
      const productId = parseInt(id);
      try {
        const response = await productService.getProductDetails(productId);
        if(response.data.getProduct){
          const pd = response.data.getProduct;
          setProduct(pd);
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
  useEffect(() => {
    fetchProduct();

},[id, navigate]);

const dispatch = useAppDispatch();
 const handleAddToCart = async (productId: number) => {
    if(!selectedQuantity || selectedQuantity < 0){
      toast.error("choose a positive quantity!");
      return;
    }
    try {
      await cartItemService.createCartItem({
        idProduct: productId,
        quantity: selectedQuantity,
      });

      // ✅ Rafraîchir le panier Redux
      const updatedCart = await shoppingCartService.getShoppingCart();
      dispatch(setCartItems(updatedCart ?? null));
      navigate("/cart");
      toast.success("Produit ajouté au panier !");
    } catch (e) {
      const err = e as ApolloError;
      if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
          toast.error(err.graphQLErrors[0].message);
      }else {
          navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
      }
    }
  };
  if(globalError) return <div className="alert alert-danger m-10">{globalError}</div>
  if(!product) return <Loading />
  return (
    <div className="product-details-page border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-40 py-40 m-28">
      {/* Main Product Section */}
      <Row className="mb-5">
        {/* Left Column - Image Gallery */}
        <Col lg={6} className="mb-4 mb-lg-0">
          <Carousel className="product-carousel" controls indicators>
            {product?.images?.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 carousel-image"
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        {/* Right Column - Product Information */}
        <Col lg={6}>
          <div className="product-info">
            <h2 className="product-title mb-2">{product.name}</h2>
            
            <p className="seller-info mb-3">
              Sold by: <strong>{product?.owner?.firstName} {product?.owner?.lastName}</strong>
            </p>

            <div className="rating-section mb-3">
              <StarRatingDisplay rating={product?.rating || 0} />
              <span className="rating-text ms-2">
                ({product.numberOfReviews} reviews)
              </span>
            </div>

            <div className="price-section mb-3">
              <span className="product-price">{product?.price?.toFixed(2)} DH</span>
            </div>

            <div className="stock-section mb-3">
              {product?.quantity && product?.quantity > 0 ? (
                <Badge bg="success\" className="stock-badge">In Stock</Badge>
              ) : (
                <Badge bg="danger" className="stock-badge">Out of Stock</Badge>
              )}
            </div>

            <div className="description-section mb-4">
              <p className="short-description">
                {getShortDescription(product?.description || "No description available.")}
              </p>
            </div>

            <div className="purchase-section">
              <Row className="align-items-center">
                <Col xs={4} sm={3}>
                  <Form.Label htmlFor="quantity-select" className="mb-2">Quantity:</Form.Label>
                  <Form.Control
                    id="quantity-select"
                    type="number"
                    min="1"
                    max={product?.quantity || 0}
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                    disabled={product.quantity === 0}
                  />
                </Col>
                <Col xs={8} sm={9}>
                  <Button
                    variant="success"
                    size="lg"
                    className="add-to-cart-btn"
                    disabled={product.quantity === 0}
                    onClick={()=>{handleAddToCart(product.id)}}
                  >
                    <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                    Add to Cart
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Row>
        <Col>
          <Tabs defaultActiveKey="description" className="product-tabs mb-4">
            {/* Description Tab */}
            <Tab eventKey="description" title="Description">
              <div className="tab-content-wrapper">
                <p className="full-description">{product.description}</p>
              </div>
            </Tab>

            {/* Reviews Tab */}
             <Tab eventKey="reviews" title={`Reviews (${product.numberOfReviews})`}>
              <ReviewTab refetchProduct={fetchProduct} reviews={product.reviews || []} numberofreviews={product.numberOfReviews || 0} productId={product.id}/>
            </Tab>            
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailsPage;
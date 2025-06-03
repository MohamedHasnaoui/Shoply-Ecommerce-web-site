import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getCountdown } from "../../../helper/Countdown";
import { useParams } from "react-router-dom";
import { productService } from "../../../services/product";
import { Product } from "../../../generated";
import { setCartItems } from "../../../redux/slices/cartSlice";
import { shoppingCartService } from "../../../services/shoppingCart";
import { toast } from "react-toastify";
import { cartItemService } from "../../../services/cartItem";
import { useAppDispatch } from "../../../redux/hooks";
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ProductDetails: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getCountdown());
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>("");

  const { id } = useParams(); // l'id est une string
  const productId = Number(id); // convertir en number
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const handleAddToCart = async (productId: number) => {
    try {
      await cartItemService.createCartItem({
        idProduct: productId,
        quantity: 1,
      });

      // ✅ Rafraîchir le panier Redux
      const updatedCart = await shoppingCartService.getShoppingCart();
      dispatch(setCartItems(updatedCart ?? null));

      toast.success("Produit ajouté au panier !");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier", error);
      toast.error("Erreur lors de l'ajout !");
    }
  };
  // ⚠️ Déclarer les images AVANT de les utiliser
  const productImages: string[] = [
    "assets/images/thumbs/product-details-two-thumb1.png",
    "assets/images/thumbs/product-details-two-thumb2.png",
    "assets/images/thumbs/product-details-two-thumb3.png",
    "assets/images/thumbs/product-details-two-thumb1.png",
    "assets/images/thumbs/product-details-two-thumb2.png",
  ];

  // ✅ Ce useEffect peut maintenant accéder à productImages sans erreur
  useEffect(() => {
    setMainImage(productImages[0]); // 👍 plus d'erreur ici

    const interval = setInterval(() => {
      setTimeLeft(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Chargement du produit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.getProductByID(productId);
        setProduct(res.data.getProduct);
        console.log("Product fetched:", res);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    if (!isNaN(productId)) {
      fetchProduct();
    }
  }, [productId]);

  // ✅ Affichage du loader
  if (!product) return <div>Chargement...</div>;

  // ✅ Fonctions quantité
  const incrementQuantity = (): void => setQuantity(quantity + 1);
  const decrementQuantity = (): void =>
    setQuantity(quantity > 1 ? quantity - 1 : quantity);

  // ✅ Settings du carousel
  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  return (
    <section className="product-details py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9">
            <div className="row gy-4">
              <div className="col-xl-6">
                <div className="product-details__left">
                  <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                    <div className="">
                      <div className="product-details__thumb flex-center h-100">
                        <img
                          src={product?.images?.[0] ?? "#"}
                          alt="Main Product"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-24">
                    <div className="product-details__images-slider">
                      <Slider {...settingsThumbs}>
                        {productImages.map((image, index) => (
                          <div
                            className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
                            key={index}
                            onClick={() => setMainImage(image)}
                          >
                            <img
                              className="thum"
                              src={image}
                              alt={`Thumbnail ${index}`}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="product-details__content">
                  {/* <div className="flex-center mb-24 flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24 position-relative z-1">
                    <img
                      src="assets/images/bg/details-offer-bg.png"
                      alt=""
                      className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1"
                    />
                    <div className="flex-align gap-16">
                      <span className="text-white text-sm">Special Offer:</span>
                    </div>
                    <div className="countdown" id="countdown11">
                      <ul className="countdown-list flex-align flex-wrap">
                        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                          {timeLeft.days}
                          <span className="days" />
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                          {timeLeft.hours}
                          <span className="hours" />
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                          {timeLeft.minutes}
                          <span className="minutes" />
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                          {timeLeft.seconds}
                          <span className="seconds" />
                        </li>
                      </ul>
                    </div>
                    <span className="text-white text-xs">
                      Remains untill the end of the offer
                    </span>
                  </div> */}
                  <h5 className="mb-12">{product.name} </h5>
                  <div className="flex-align flex-wrap gap-12">
                    <div className="flex-align gap-12 flex-wrap">
                      <div className="flex-align gap-8">
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                      </div>
                      <span className="text-sm fw-medium text-neutral-600">
                        {product.rating} Star Rating
                      </span>
                      <span className="text-sm fw-medium text-gray-500">
                        (21,671)
                      </span>
                    </div>
                    <span className="text-sm fw-medium text-gray-500">|</span>
                    <span className="text-gray-900">
                      {" "}
                      <span className="text-gray-400">Reference:</span>
                      {product.reference}
                    </span>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <p className="text-gray-700">
                    Geared up and ready to roll: Get the responsive performance
                    you're looking for with an Intel processor and 64 GB eMMC
                    storage. Stay productive with compatible apps like Microsoft
                    Office, Google Workspace, and more. The Chrome OS gives you
                    a fast, simple, and secure online experience with built-in
                    virus protection.
                  </p>
                  <div className="my-32 flex-align gap-16 flex-wrap">
                    <div className="flex-align gap-8">
                      {/* <div className="flex-align gap-8 text-main-two-600">
                        <i className="ph-fill ph-seal-percent text-xl" />
                        -10%
                      </div> */}
                      <h6 className="mb-0">USD {product?.price}</h6>
                    </div>
                    {/* <div className="flex-align gap-8">
                      <span className="text-gray-700">Regular Price</span>
                      <h6 className="text-xl text-gray-400 mb-0 fw-medium">
                        USD 452.99
                      </h6>
                    </div> */}
                  </div>
                  <div className="my-32 flex-align flex-wrap gap-12">
                    <Link
                      to="#"
                      className="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                    >
                      Monthyly EMI USD 15.00
                      <i className="ph ph-caret-right" />
                    </Link>
                    <Link
                      to="#"
                      className="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                    >
                      Shipping Charge
                      <i className="ph ph-caret-right" />
                    </Link>
                    <Link
                      to="#"
                      className="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                    >
                      Security &amp; Privacy
                      <i className="ph ph-caret-right" />
                    </Link>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <div className="mt-32">
                    <h6 className="mb-16">Quick Overview</h6>
                    <div className="flex-between align-items-start flex-wrap gap-16">
                      <div>
                        <span className="text-gray-900 d-block mb-12">
                          Color:
                          <span className="fw-medium">Mineral Silver</span>
                        </span>
                        <div className="color-list flex-align gap-8">
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-info-600"
                          />
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-warning-600"
                          />
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-tertiary-600"
                          />
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-main-600"
                          />
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-900 d-block mb-12">
                          Pattern Name:
                          <span className="fw-medium">with offer</span>
                        </span>
                        <div className="flex-align gap-8 flex-wrap">
                          <Link
                            to="#"
                            className="px-12 py-8 text-sm rounded-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                          >
                            with offer{" "}
                          </Link>
                          <Link
                            to="#"
                            className="px-12 py-8 text-sm rounded-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                          >
                            12th Gen Laptop
                          </Link>
                          <Link
                            to="#"
                            className="px-12 py-8 text-sm rounded-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                          >
                            without offer
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <Link
                    to="/https://www.whatsapp.com"
                    className="btn btn-black flex-center gap-8 rounded-8 py-16"
                  >
                    <i className="ph ph-whatsapp-logo text-lg" />
                    Request More Information
                  </Link>
                  <div className="mt-32">
                    <span className="fw-medium text-gray-900">
                      100% Guarantee Safe Checkout
                    </span>
                    <div className="mt-10">
                      <img src="assets/images/thumbs/gateway-img.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="product-details__sidebar py-40 px-32 border border-gray-100 rounded-16">
              {/* <div className="mb-32">
                <label
                  htmlFor="delivery"
                  className="h6 activePage mb-8 text-heading fw-semibold d-block"
                >
                  Delivery
                </label>
                <div className="flex-align border border-gray-100 rounded-4 px-16">
                  <span className="text-xl d-flex text-main-600">
                    <i className="ph ph-map-pin" />
                  </span>
                  <select
                    defaultValue={1}
                    className="common-input border-0 px-8 rounded-4"
                    id="delivery"
                  >
                    <option value={1}>Maymansign</option>
                    <option value={1}>Khulna</option>
                    <option value={1}>Rajshahi</option>
                    <option value={1}>Rangpur</option>
                  </select>
                </div>
              </div>
              <div className="mb-32">
                <label
                  htmlFor="stock"
                  className="text-lg mb-8 text-heading fw-semibold d-block"
                >
                  Total Stock: 21
                </label>
                <span className="text-xl d-flex">
                  <i className="ph ph-location" />
                </span>
                <div className="d-flex rounded-4 overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    type="button"
                    className="quantity__minus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                  >
                    <i className="ph ph-minus" />
                  </button>
                  <input
                    type="number"
                    className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-16"
                    id="stock"
                    value={quantity}
                    readOnly
                  />
                  <button
                    onClick={incrementQuantity}
                    type="button"
                    className="quantity__plus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                  >
                    <i className="ph ph-plus" />
                  </button>
                </div>
              </div>
              <div className="mb-32">
                <div className="flex-between flex-wrap gap-8 border-bottom border-gray-100 pb-16 mb-16">
                  <span className="text-gray-500">Price</span>
                  <h6 className="text-lg mb-0">$150.00</h6>
                </div>
                <div className="flex-between flex-wrap gap-8">
                  <span className="text-gray-500">Shipping</span>
                  <h6 className="text-lg mb-0">From $10.00</h6>
                </div>
              </div> */}
              <Link
                to="/cart"
                onClick={
                  product?.quantity === 0
                    ? (e) => e.preventDefault()
                    : () => handleAddToCart(product.id)
                }
                className={`btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48${
                  product?.quantity === 0
                    ? " disabled pointer-events-none opacity-50"
                    : ""
                }`}
                aria-disabled={product?.quantity === 0}
                tabIndex={product?.quantity === 0 ? -1 : 0}
              >
                <i className="ph ph-shopping-cart-simple text-lg" />
                Add To Cart
              </Link>
              {/* <Link
                to="#"
                className="btn btn-outline-main rounded-8 py-16 fw-normal mt-16 w-100"
              >
                Buy Now
              </Link> */}
              <div className="mt-32">
                <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-14">
                  <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                    <i className="ph-fill ph-truck" />
                  </span>
                  <span className="text-sm text-neutral-600">
                    Ship from <span className="fw-semibold">MarketPro</span>{" "}
                  </span>
                </div>
                <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-0">
                  <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                    <i className="ph-fill ph-storefront" />
                  </span>
                  <span className="text-sm text-neutral-600">
                    Sold by:{" "}
                    <span className="fw-semibold">MR Distribution LLC</span>{" "}
                  </span>
                </div>
              </div>
              <div className="mt-32">
                <div className="px-32 py-16 rounded-8 border border-gray-100 flex-between gap-8">
                  <Link to="#" className="d-flex text-main-600 text-28">
                    <i className="ph-fill ph-chats-teardrop" />
                  </Link>
                  <span className="h-26 border border-gray-100" />
                  <div className="dropdown on-hover-item">
                    <button
                      className="d-flex text-main-600 text-28"
                      type="button"
                    >
                      <i className="ph-fill ph-share-network" />
                    </button>
                    <div className="on-hover-dropdown common-dropdown border-0 inset-inline-start-auto inset-inline-end-0">
                      <ul className="flex-align gap-16">
                        <li>
                          <Link
                            to="/https://www.facebook.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-facebook-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.twitter.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-twitter-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.linkedin.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-instagram-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.pinterest.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-linkedin-logo" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-80">
          <div className="product-dContent border rounded-24">
            <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
              <ul
                className="nav common-tab nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-description-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-description"
                    type="button"
                    role="tab"
                    aria-controls="pills-description"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-reviews-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-reviews"
                    type="button"
                    role="tab"
                    aria-controls="pills-reviews"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <Link
                to="#"
                className="btn bg-color-one rounded-16 flex-align gap-8 text-main-600 hover-bg-main-600 hover-text-white"
              >
                <img src="assets/images/icon/satisfaction-icon.png" alt="" />
                100% Satisfaction Guaranteed
              </Link>
            </div>
            <div className="product-dContent__box">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-description"
                  role="tabpanel"
                  aria-labelledby="pills-description-tab"
                  tabIndex={0}
                >
                  <div className="mb-40">
                    <h6 className="mb-24">Product Description</h6>
                    <p>
                      Wherever celebrations and good times happen, the LAY'S
                      brand will be there just as it has been for more than 75
                      years. With flavors almost as rich as our history, we have
                      a chip or crisp flavor guaranteed to bring a smile on your
                      face.{" "}
                    </p>
                    <p>
                      Morbi ut sapien vitae odio accumsan gravida. Morbi vitae
                      erat auctor, eleifend nunc a, lobortis neque. Praesent
                      aliquam dignissim viverra. Maecenas lacus odio, feugiat eu
                      nunc sit amet, maximus sagittis dolor. Vivamus nisi
                      sapien, elementum sit amet eros sit amet, ultricies cursus
                      ipsum. Sed consequat luctus ligula. Curabitur laoreet
                      rhoncus blandit. Aenean vel diam ut arcu pharetra
                      dignissim ut sed leo. Vivamus faucibus, ipsum in
                      vestibulum vulputate, lorem orci convallis quam, sit amet
                      consequat nulla felis pharetra lacus. Duis semper erat
                      mauris, sed egestas purus commodo vel.
                    </p>
                    <ul className="list-inside mt-32 ms-16">
                      <li className="text-gray-400 mb-4">
                        8.0 oz. bag of LAY'S Classic Potato Chips
                      </li>
                      <li className="text-gray-400 mb-4">
                        Tasty LAY's potato chips are a great snack
                      </li>
                      <li className="text-gray-400 mb-4">
                        Includes three ingredients: potatoes, oil, and salt
                      </li>
                      <li className="text-gray-400 mb-4">
                        Gluten free product
                      </li>
                    </ul>
                    <ul className="mt-32">
                      <li className="text-gray-400 mb-4">Made in USA</li>
                      <li className="text-gray-400 mb-4">Ready To Eat.</li>
                    </ul>
                  </div>
                  <div className="mb-40">
                    <h6 className="mb-24">Product Specifications</h6>
                    <ul className="mt-32">
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Product Type:
                          <span className="text-gray-500">
                            {" "}
                            Chips &amp; Dips
                          </span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Product Name:
                          <span className="text-gray-500">
                            {" "}
                            Potato Chips Classic{" "}
                          </span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Brand:
                          <span className="text-gray-500"> Lay's</span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          FSA Eligible:
                          <span className="text-gray-500"> No</span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Size/Count:
                          <span className="text-gray-500"> 8.0oz</span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Item Code:
                          <span className="text-gray-500"> 331539</span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Ingredients:
                          <span className="text-gray-500">
                            {" "}
                            Potatoes, Vegetable Oil, and Salt.
                          </span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-40">
                    <h6 className="mb-24">Nutrition Facts</h6>
                    <ul className="mt-32">
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Total Fat 10g 13%
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Saturated Fat 1.5g 7%
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Cholesterol 0mg 0%
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Sodium 170mg 7%
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Potassium 350mg 6%
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-0">
                    <h6 className="mb-24">More Details</h6>
                    <ul className="mt-32">
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          Lunarlon midsole delivers ultra-plush responsiveness
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          Encapsulated Air-Sole heel unit for lightweight
                          cushioning
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          Colour Shown: Ale Brown/Black/Goldtone/Ale Brown
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          Style: 805899-202
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-reviews"
                  role="tabpanel"
                  aria-labelledby="pills-reviews-tab"
                  tabIndex={0}
                >
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <h6 className="mb-24">Product Description</h6>
                      <div className="d-flex align-items-start gap-24 pb-44 border-bottom border-gray-100 mb-44">
                        <img
                          src="assets/images/thumbs/comment-img1.png"
                          alt=""
                          className="w-52 h-52 object-fit-cover rounded-circle flex-shrink-0"
                        />
                        <div className="flex-grow-1">
                          <div className="flex-between align-items-start gap-8 ">
                            <div className="">
                              <h6 className="mb-12 text-md">Nicolas cage</h6>
                              <div className="flex-align gap-8">
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                            </div>
                            <span className="text-gray-800 text-xs">
                              3 Days ago
                            </span>
                          </div>
                          <h6 className="mb-14 text-md mt-24">
                            Greate Product
                          </h6>
                          <p className="text-gray-700">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour
                          </p>
                          <div className="flex-align gap-20 mt-44">
                            <button className="flex-align gap-12 text-gray-700 hover-text-main-600">
                              <i className="ph-bold ph-thumbs-up" />
                              Like
                            </button>
                            <Link
                              to="#comment-form"
                              className="flex-align gap-12 text-gray-700 hover-text-main-600"
                            >
                              <i className="ph-bold ph-arrow-bend-up-left" />
                              Replay
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-24">
                        <img
                          src="assets/images/thumbs/comment-img1.png"
                          alt=""
                          className="w-52 h-52 object-fit-cover rounded-circle flex-shrink-0"
                        />
                        <div className="flex-grow-1">
                          <div className="flex-between align-items-start gap-8 ">
                            <div className="">
                              <h6 className="mb-12 text-md">Nicolas cage</h6>
                              <div className="flex-align gap-8">
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                            </div>
                            <span className="text-gray-800 text-xs">
                              3 Days ago
                            </span>
                          </div>
                          <h6 className="mb-14 text-md mt-24">
                            Greate Product
                          </h6>
                          <p className="text-gray-700">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour
                          </p>
                          <div className="flex-align gap-20 mt-44">
                            <button className="flex-align gap-12 text-gray-700 hover-text-main-600">
                              <i className="ph-bold ph-thumbs-up" />
                              Like
                            </button>
                            <Link
                              to="#comment-form"
                              className="flex-align gap-12 text-gray-700 hover-text-main-600"
                            >
                              <i className="ph-bold ph-arrow-bend-up-left" />
                              Replay
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="mt-56">
                        <div className="">
                          <h6 className="mb-24">Write a Review</h6>
                          <span className="text-heading mb-8">
                            What is it like to Product?
                          </span>
                          <div className="flex-align gap-8">
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                          </div>
                        </div>
                        <div className="mt-32">
                          <form action="#">
                            <div className="mb-32">
                              <label
                                htmlFor="title"
                                className="text-neutral-600 mb-8"
                              >
                                Review Title
                              </label>
                              <input
                                type="text"
                                className="common-input rounded-8"
                                id="title"
                                placeholder="Great Products"
                              />
                            </div>
                            <div className="mb-32">
                              <label
                                htmlFor="desc"
                                className="text-neutral-600 mb-8"
                              >
                                Review Content
                              </label>
                              <textarea
                                className="common-input rounded-8"
                                id="desc"
                                defaultValue={
                                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                                }
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-main rounded-pill mt-48"
                            >
                              Submit Review
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ms-xxl-5">
                        <h6 className="mb-24">Customers Feedback</h6>
                        <div className="d-flex flex-wrap gap-44">
                          <div className="border border-gray-100 rounded-8 px-40 py-52 flex-center flex-column flex-shrink-0 text-center">
                            <h2 className="mb-6 text-main-600">4.8</h2>
                            <div className="flex-center gap-8">
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                            </div>
                            <span className="mt-16 text-gray-500">
                              Average Product Rating
                            </span>
                          </div>
                          <div className="border border-gray-100 rounded-8 px-24 py-40 flex-grow-1">
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                5
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={70}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "70%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                124
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                4
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={50}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "50%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                52
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                3
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
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
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                12
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                2
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={20}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "20%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                5
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-0">
                              <span className="text-gray-900 flex-shrink-0">
                                1
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={5}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "5%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                2
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

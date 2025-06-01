import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import ReactSlider from "react-slider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Product } from "../../../generated";
import { useCategory } from "../../../helpers/useCategory";
import { productService } from "../../../services/product";
import { cartItemService } from "../../../services/cartItem";
import { useAppDispatch } from "../../../redux/hooks";
import { setCartItems } from "../../../redux/slices/cartSlice";
import { shoppingCartService } from "../../../services/shoppingCart";

const ShopSection = () => {
  //Add to Cart Code
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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

  const [grid, setGrid] = useState<boolean>(false);

  const [active, setActive] = useState<boolean>(false);
  const sidebarController = () => {
    setActive(!active);
  };
  const [products, setProducts] = useState<Product[]>([]);
  const {
    selectedCategory,
    productNameFilter,
    totalPage,
    setProductNameFilter,
    setSelectedCategory,
    setTotalPage,
  } = useCategory();

  enum productStatus {
    AVAILABLE = "Available",
    OUT_OF_STOCK = "Out of Stock",
  }
  const [selectedStatus, setSelectedStatus] = useState<
    productStatus | undefined
  >(undefined);
  // Removed redundant state declaration for productNameFilter and setProductNameFilter
  const [pageNb, setPageNb] = useState<number>(2);
  const [pageSz, setPageSz] = useState<number>(1);
  const [sortedBy, setSortedBy] = useState<string>("");

  const [countFilteredProducts, setCountFilteredProducts] = useState(0);
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await productService.getProductsFiltered({
          name: productNameFilter,
          available: selectedStatus
            ? selectedStatus === productStatus.AVAILABLE
            : undefined,
          categoryId: selectedCategory?.id,
          pageNb: pageNb,
          pageSize: pageSz,
          orderBy: sortedBy,
        });
        console.log("Rating:", sortedBy);
        console.log("🟢 Réponse API complète :", response);
        console.log(
          "🟢 Produits retournés :",
          response?.data?.getAllProducts?.products
        );

        setProducts(response?.data?.getAllProducts?.products as Array<Product>);
        console.log("Count:", response.data.getAllProducts.count);
        console.log(" page Number:", pageNb);
        // setPageNb(1);
        setCountFilteredProducts(response.data.getAllProducts.count);
      } catch (error) {
        console.error("❌ Erreur API :", error);
      }
    };

    fetchMyProducts();
  }, [
    selectedCategory,
    selectedStatus,
    pageNb,
    pageSz,
    productStatus,
    productNameFilter,
    sortedBy,
  ]);
  //setTotalPage(Math.ceil(countFilteredProducts / pageSz));
  useEffect(() => {
    console.log("Total page:", totalPage);

    setTotalPage(Math.ceil(countFilteredProducts / pageSz));
  }, [
    selectedCategory,
    totalPage,
    setTotalPage,
    countFilteredProducts,
    pageSz,
  ]);
  useEffect(() => {
    setPageNb(1);
  }, [selectedCategory, selectedStatus, productNameFilter]);
  const incrementPageNb = () => {
    console.log("Total page:", totalPage);
    if (pageNb <= totalPage) setPageNb(pageNb + 1);
    console.log("pageNb+:", pageNb);
  };
  const decremnetPageNb = () => {
    if (pageNb > 1) setPageNb(pageNb - 1);
    console.log("pageNb-:", pageNb);
  };

  const displayProducts = products.map((product, index) => {
    return (
      <div
        key={product.id ?? index}
        className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
      >
        <Link
          to="/product-details-two"
          className="product-card__thumb w-full h-full object-contain flex-center rounded-8 bg-gray-50"
        >
          <img
            src={product?.images?.[0] ?? "default-image-url.jpg"}
            alt=""
            className="w-full h-full object-contain"
          />
          <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
            Best Sale
          </span>
        </Link>

        <div className="product-card__content mt-16">
          <h6 className="title text-lg fw-semibold mt-12 mb-8">
            <Link
              to="/product-details-two"
              className="link text-line-2"
              tabIndex={0}
            >
              {product?.name}
            </Link>
          </h6>
          <div className="flex-align mb-20 mt-16 gap-6">
            <span className="text-xs fw-medium text-gray-500">
              {product?.rating}
            </span>
            <span className="text-15 fw-medium text-warning-600 d-flex">
              <i className="ph-fill ph-star" />
            </span>
            <span className="text-xs fw-medium text-gray-500">(17k)</span>
          </div>
          <div className="mt-8">
            <div
              className="progress w-100 bg-color-three rounded-pill h-4"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow={35}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="progress-bar bg-main-two-600 rounded-pill"
                style={{ width: "35%" }}
              />
            </div>
            <span className="text-gray-900 text-xs fw-medium mt-8">
              Sold: 18/35
            </span>
          </div>
          <div className="product-card__price my-20">
            <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
              $28.99
            </span>
            <span className="text-heading text-md fw-semibold ">
              {product?.price}{" "}
              <span className="text-gray-500 fw-normal">/Qty</span>{" "}
            </span>
          </div>
          {/* <Link
            to="/cart"
            className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
            tabIndex={0}
          >
            Add To Cart <i className="ph ph-shopping-cart" />
          </Link> */}
          <div
            onClick={() => handleAddToCart(product.id)}
            className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
            role="button"
            tabIndex={0}
          >
            Add To Cart <i className="ph ph-shopping-cart" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className="shop py-80">
      <ToastContainer />
      <div className={`side-overlay ${active && "show"}`}></div>
      <div className="container container-lg">
        <div className="row">
          {/* Sidebar Start */}
          <div className="col-lg-3">
            <div className={`shop-sidebar ${active && "active"}`}>
              <button
                title="button"
                onClick={sidebarController}
                type="button"
                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
              >
                <i className="ph ph-x" />
              </button>
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Product Category
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Mobile &amp; Accessories (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Laptop (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Electronics (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Smart Watch (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Storage (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Portable Devices (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Action Camera (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Smart Gadget (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Monitor (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Smart TV (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Camera (12)
                    </Link>
                  </li>
                  <li className="mb-24">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Monitor Stand (12)
                    </Link>
                  </li>
                  <li className="mb-0">
                    <Link
                      to="/product-details-two"
                      className="text-gray-900 hover-text-main-600"
                    >
                      Headphone (12)
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Filter by Price
                </h6>
                <div className="custom--range">
                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[0, 100]}
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => {
                      const { key, ...restProps } = props;
                      return (
                        <div {...restProps} key={state.index}>
                          {state.valueNow}
                        </div>
                      );
                    }}
                    pearling
                    minDistance={10}
                  />

                  <br />
                  <br />
                  <div className="flex-between flex-wrap-reverse gap-8 mt-24 ">
                    <button
                      type="button"
                      title="button"
                      className="btn btn-main h-40 flex-align"
                    >
                      Filter{" "}
                    </button>
                  </div>
                </div>
              </div>

              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Filter by Rating
                </h6>
                <div className="flex-align gap-8 position-relative mb-20">
                  <label
                    className="position-absolute w-100 h-100 cursor-pointer"
                    htmlFor="rating5"
                  >
                    {" "}
                  </label>
                  <div className="common-check common-radio mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="rating5"
                    />
                  </div>
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
                  <span className="text-gray-900 flex-shrink-0">124</span>
                </div>
                <div className="flex-align gap-8 position-relative mb-20">
                  <label
                    className="position-absolute w-100 h-100 cursor-pointer"
                    htmlFor="rating4"
                  >
                    {" "}
                  </label>
                  <div className="common-check common-radio mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="rating4"
                    />
                  </div>
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
                  <span className="text-gray-900 flex-shrink-0">52</span>
                </div>
                <div className="flex-align gap-8 position-relative mb-20">
                  <label
                    className="position-absolute w-100 h-100 cursor-pointer"
                    htmlFor="rating3"
                  >
                    {" "}
                  </label>
                  <div className="common-check common-radio mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="rating3"
                    />
                  </div>
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
                  <span className="text-gray-900 flex-shrink-0">12</span>
                </div>
                <div className="flex-align gap-8 position-relative mb-20">
                  <label
                    className="position-absolute w-100 h-100 cursor-pointer"
                    htmlFor="rating2"
                  >
                    {" "}
                  </label>
                  <div className="common-check common-radio mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="rating2"
                    />
                  </div>
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
                  <span className="text-gray-900 flex-shrink-0">5</span>
                </div>
                <div className="flex-align gap-8 position-relative mb-0">
                  <label
                    className="position-absolute w-100 h-100 cursor-pointer"
                    htmlFor="rating1"
                  >
                    {" "}
                  </label>
                  <div className="common-check common-radio mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="rating1"
                    />
                  </div>
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
                  <span className="text-gray-900 flex-shrink-0">2</span>
                </div>
              </div>
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Filter by Color
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  <li className="mb-24">
                    <div className="form-check common-check common-radio checked-black">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="color1"
                      />
                      <label className="form-check-label" htmlFor="color1">
                        Black(12)
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio checked-primary">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="color2"
                      />
                      <label className="form-check-label" htmlFor="color2">
                        Blue (12)
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio checked-gray">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="color3"
                      />
                      <label className="form-check-label" htmlFor="color3">
                        Gray (12)
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio checked-success">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="color4"
                      />
                      <label className="form-check-label" htmlFor="color4">
                        Green (12)
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio checked-danger">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="color5"
                      />
                      <label className="form-check-label" htmlFor="color5">
                        Red (12)
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio checked-white">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="color6"
                      />
                      <label className="form-check-label" htmlFor="color6">
                        White (12)
                      </label>
                    </div>
                  </li>
                  <li className="mb-0">
                    <div className="form-check common-check common-radio checked-purple">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="color7"
                      />
                      <label className="form-check-label" htmlFor="color7">
                        Purple (12)
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Filter by Brand
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  <li className="mb-24">
                    <div className="form-check common-check common-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="brand1"
                      />
                      <label className="form-check-label" htmlFor="brand1">
                        Apple
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="brand2"
                      />
                      <label className="form-check-label" htmlFor="brand2">
                        Samsung
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="brand3"
                      />
                      <label className="form-check-label" htmlFor="brand3">
                        Microsoft
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="brand4"
                      />
                      <label className="form-check-label" htmlFor="brand4">
                        Apple
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="brand5"
                      />
                      <label className="form-check-label" htmlFor="brand5">
                        HP
                      </label>
                    </div>
                  </li>
                  <li className="mb-24">
                    <div className="form-check common-check common-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="DELL"
                      />
                      <label className="form-check-label" htmlFor="DELL">
                        DELL
                      </label>
                    </div>
                  </li>
                  <li className="mb-0">
                    <div className="form-check common-check common-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id="Redmi"
                      />
                      <label className="form-check-label" htmlFor="Redmi">
                        Redmi
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="shop-sidebar__box rounded-8">
                <img src="assets/images/thumbs/advertise-img1.png" alt="" />
              </div>
            </div>
          </div>
          {/* Sidebar End */}
          {/* Content Start */}
          <div className="col-lg-9">
            {/* Top Start */}
            <div className="flex-between gap-16 flex-wrap mb-40 ">
              <span className="text-gray-900">Showing 1-20 of 85 result</span>
              <div className="position-relative flex-align gap-16 flex-wrap">
                <div className="list-grid-btns flex-align gap-16">
                  <button
                    onClick={() => setGrid(true)}
                    type="button"
                    title="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                      grid === true && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph-bold ph-list-dashes" />
                  </button>
                  <button
                    onClick={() => setGrid(false)}
                    type="button"
                    title="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                      grid === false && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph ph-squares-four" />
                  </button>
                </div>
                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                  <label
                    htmlFor="sorting"
                    className="text-inherit flex-shrink-0"
                  >
                    Sort by:{" "}
                  </label>
                  <select
                    defaultValue="createdAt_DESC"
                    onChange={(e) => setSortedBy(e.target.value)}
                    className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                    id="sorting"
                  >
                    <option value="rating">Popular</option>
                    <option value="createdAt_DESC">Latest</option>
                    <option value="createdAt_ASC">Oldest</option>
                    <option value="price_ASC">Cheaper</option>
                    <option value="price_DESC">Most Expensive</option>
                  </select>
                </div>

                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                  <label
                    htmlFor="sorting"
                    className="text-inherit flex-shrink-0"
                  >
                    Slice by:{" "}
                  </label>
                  <select
                    defaultValue={pageSz}
                    onChange={(e) => setPageSz(Number(e.target.value))}
                    className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                    id="sorting"
                  >
                    <option value={4}>4</option>
                    <option value={2}>2</option>
                    <option value={6}>6</option>
                  </select>
                </div>
                <button
                  onClick={sidebarController}
                  type="button"
                  title="button"
                  className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                >
                  <i className="ph-bold ph-funnel" />
                </button>
              </div>
            </div>
            {/* Top End */}
            <div className={`list-grid-wrapper ${grid && "list-view"}`}>
              {displayProducts}
            </div>
            {/* Pagination Start */}
            <div className="pagination flex-center flex-wrap gap-16">
              <button
                title="Previous"
                onClick={decremnetPageNb}
                className="page-item"
                disabled={pageNb === 1}
              >
                <div
                  className={`page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium border ${
                    pageNb === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "text-neutral-600 border-gray-100"
                  }`}
                >
                  <i className="ph-bold ph-arrow-left" />
                </div>
              </button>

              {/* Affichage des pages dynamiques */}
              {Array.from({ length: totalPage }, (_, index) => (
                <button
                  title="button"
                  key={index}
                  className={`page-item ${
                    pageNb === index + 1 ? "active" : ""
                  }`}
                >
                  <div
                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                    onClick={() => {
                      console.log("Page index:", index);

                      setPageNb(index + 1);
                    }}
                  >
                    {index + 1}
                  </div>
                </button>
              ))}

              <button
                title="Next"
                onClick={incrementPageNb}
                className="page-item"
                disabled={pageNb === totalPage}
              >
                <div
                  className={`page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium border ${
                    pageNb === totalPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "text-neutral-600 border-gray-100"
                  }`}
                >
                  <i className="ph-bold ph-arrow-right" />
                </div>
              </button>
            </div>
            {/* Pagination End */}
          </div>
          {/* Content End */}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;

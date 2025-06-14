import { useEffect, useState } from "react";
import { useCategory } from "../../helpers/useCategory";
import $ from "jquery";
import select2 from "select2";
import { Category } from "../../generated";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutAction } from "../../redux/slices/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router";
import { clearCart } from "../../redux/slices/cartSlice";
import { clearWishlist } from "../../redux/slices/wishlistSlice/wishlistSlice";
import logo from "../../assets/ClientAssets/images/logo/shoply-logo.svg";
import { categoryService } from "../../services/category";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ApolloError } from "@apollo/client";
import { toast } from "react-toastify";

const actionDispatch = (dispatch: Dispatch) => ({
  logoutAction: () => {
    dispatch(logoutAction());
    dispatch(clearCart());
    dispatch(clearWishlist());
  },
});

const Header = () => {
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const totalWishlistItems = useAppSelector(
    (state) => state.wishlist.totalWishlistItems
  );
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const [productCategories, setProductCategories] = useState<
    Array<Category | null>
  >([]);

  const { logoutAction } = actionDispatch(useAppDispatch());
  const navigate = useNavigate();
  //const user = useSelector((state: RootState) => state.auth.currentUser);
  const logout = async () => {
    logoutAction();
    navigate("/login");
  };

  const {
    selectedCategory,
    setSelectedCategory,
    productNameFilter,
    setProductNameFilter,
  } = useCategory();

  const [searchString, setSearchString] = useState<string>("");

  const [categoryName, setCategoryName] = useState<string>("All Categories");
  const handleCategoryClick = (category: Category | undefined) => {
    setActiveIndexCat(-1);
    setSelectedCategory(category);
    setCategoryName(category?.name ?? "All Categories");
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProductNameFilter(searchString);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await categoryService.getCatgories();
        if (response.data.getAllCategories) {
          setProductCategories(response.data.getAllCategories);
        }
      } catch (error) {
        const err = error as ApolloError;
        const gqlErrors = err.graphQLErrors;

        if (gqlErrors && gqlErrors.length > 0) {
          const code = gqlErrors[0].extensions?.code;
          const message = gqlErrors[0].message;

          switch (code) {
            case "UNAUTHENTICATED":
            case "NOT_AUTHORIZED":
            case "NOT_FOUND":
            case "BAD_USER_INPUT":
            case "CART_NOT_FOUND":
            case "INTERNAL_SERVER_ERROR":
              toast.error(message); // Affiche le message défini côté backend
              break;
            default:
              toast.error("Unknown Error.");
          }
        } else {
          toast.error("Server Error.");
        }
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory, productNameFilter]);

  /////////////////////
  const [scroll, setScroll] = useState(false);
  window.onscroll = () => {
    if (window.pageYOffset < 150) {
      setScroll(false);
    } else if (window.pageYOffset > 150) {
      setScroll(true);
    }
    return () => (window.onscroll = null);
  };
  useEffect(() => {
    select2($);
    const selectElement = $(".js-example-basic-single"); // Select element
    selectElement.select2(); // Initialize Select2

    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy"); // Cleanup on unmount
      }
    };
  }, []);
  // Set the default language
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  // Set the default currency
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleMenuClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Search control support
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };

  // category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState(-1);
  const handleCategoryIndexClick = (index: number) => {
    setActiveIndexCat(activeIndexCat === index ? -1 : index);
  };
  // if (!user) return <Navigate to={"/login"} />;

  return (
    <>
      <div className="overlay" />
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      {/* ==================== Search Box Start Here ==================== */}
      {currentUser && (
        <form
          onSubmit={handleSearchSubmit}
          action="#"
          className={`search-box  ${activeSearch && "active"}`}
        >
          <button
            title="button"
            type="submit"
            className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
          >
            <i className="ph ph-x" />
          </button>

          <div className="container">
            <div className="position-relative">
              <input
                type="text"
                className="form-control py-16 px-24 text-xl rounded-pill pe-64"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchString(e.target.value)
                }
                value={searchString}
                placeholder="Search for a product"
              />
              <button
                type="submit"
                title="button"
                className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
              >
                <i className="ph ph-magnifying-glass" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ==================== Search Box End Here ==================== */}
      {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          menuActive && "active"
        }`}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(-1);
          }}
          type="button"
          className="close-button"
        >
          <i className="ph ph-x" />{" "}
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="mobile-menu__menu">
            {/* Nav Menu Start */}
            <ul className="nav-menu flex-align nav-menu--mobile">
              {/* Home Menu */}
              <li
                onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 0 ? "d-block" : ""
                }`}
              >
                <a href="#" className="nav-menu__a">
                  Home
                </a>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 0 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      to={"/"}
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Home One
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <a
                      href="/index-two"
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Home Two
                    </a>
                  </li>
                </ul>
              </li>

              {/* Shop Menu */}
              <li
                onClick={() => handleMenuClick(1)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 1 ? "d-block" : ""
                }`}
              >
                <Link to={"/shop"} className="nav-menu__a">
                  Shop
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 1 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      to={"/shop"}
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Shop
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <a
                      href="/product-details"
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Shop Details
                    </a>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <a
                      href="/product-details-two"
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Shop Details Two
                    </a>
                  </li>
                </ul>
              </li>

              {/* Pages Menu */}
              <li
                onClick={() => handleMenuClick(2)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 2 ? "d-block" : ""
                }`}
              >
                <a href="#" className="nav-menu__a">
                  Pages
                </a>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 2 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      to="/cart"
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Cart
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      to="/checkout"
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Checkout{" "}
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      to="/account"
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Account
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Blog Menu */}
              <li
                onClick={() => handleMenuClick(3)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 3 ? "d-block" : ""
                }`}
              >
                <a href="#" className="nav-menu__a">
                  Blog
                </a>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 3 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <a
                      href="/blog"
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Blog
                    </a>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <a
                      href="/blog-details"
                      className="common-dropdown__a nav-submenu__a hover-bg-neutral-100"
                      onClick={() => setActiveIndex(-1)}
                    >
                      {" "}
                      Blog Details
                    </a>
                  </li>
                </ul>
              </li>

              {/* Contact Us Menu */}
              <li className="nav-menu__item">
                <a
                  href="/contact"
                  className="nav-menu__a"
                  onClick={() => setActiveIndex(-1)}
                >
                  Contact Us
                </a>
              </li>
            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
      {/* ======================= Middle Top Start ========================= */}
      <div className="header-top bg-main-600 flex-between">
        <div className="container container-lg">
          <div className="flex-between flex-wrap gap-8">
            <ul className="flex-align flex-wrap d-none d-md-flex">
              <li className="border-right-item">
                <a
                  href="#"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  Become A Seller
                </a>
              </li>
              <li className="border-right-item">
                <a
                  href="/about-us"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  About us
                </a>
              </li>
              <li className="border-right-item">
                <a
                  href="#"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  Free Delivery
                </a>
              </li>
              <li className="border-right-item">
                <a
                  href="#"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  Returns Policy
                </a>
              </li>
            </ul>
            <ul className="header-top__right flex-align flex-wrap">
              <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                <a href="#" className="text-white text-sm py-8">
                  Help Center
                </a>
                <ul className="on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                  <li className="nav-submenu__item">
                    <a
                      href="#"
                      className="nav-submenu__a hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                    >
                      <span className="text-sm d-flex">
                        <i className="ph ph-headset" />
                      </span>
                      Call Center
                    </a>
                  </li>
                  <li className="nav-submenu__item">
                    <a
                      href="#"
                      className="nav-submenu__a hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                    >
                      <span className="text-sm d-flex">
                        <i className="ph ph-chat-circle-dots" />
                      </span>
                      Live Chat
                    </a>
                  </li>
                </ul>
              </li>
              <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                {/* Display the selected language here */}
                <a href="#" className="selected-text text-white text-sm py-8">
                  {selectedLanguage}
                </a>
                <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleLanguageChange("English")}
                    >
                      <img
                        src="assets/images/thumbs/flag1.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      English
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleLanguageChange("Japan")}
                    >
                      <img
                        src="assets/images/thumbs/flag2.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      Japan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleLanguageChange("French")}
                    >
                      <img
                        src="assets/images/thumbs/flag3.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      French
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleLanguageChange("Germany")}
                    >
                      <img
                        src="assets/images/thumbs/flag4.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      Germany
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleLanguageChange("Bangladesh")}
                    >
                      <img
                        src="assets/images/thumbs/flag6.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      Bangladesh
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleLanguageChange("South Korea")}
                    >
                      <img
                        src="assets/images/thumbs/flag5.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      South Korea
                    </a>
                  </li>
                </ul>
              </li>
              <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                {/* Display the selected currency */}
                <a href="#" className="selected-text text-white text-sm py-8">
                  {selectedCurrency}
                </a>
                <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleCurrencyChange("USD")}
                    >
                      <img
                        src="assets/images/thumbs/flag1.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      USD
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleCurrencyChange("Yen")}
                    >
                      <img
                        src="assets/images/thumbs/flag2.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      Yen
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleCurrencyChange("Franc")}
                    >
                      <img
                        src="assets/images/thumbs/flag3.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      Franc
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleCurrencyChange("EURO")}
                    >
                      <img
                        src="assets/images/thumbs/flag4.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      EURO
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleCurrencyChange("BDT")}
                    >
                      <img
                        src="assets/images/thumbs/flag6.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      BDT
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleCurrencyChange("WON")}
                    >
                      <img
                        src="assets/images/thumbs/flag5.png"
                        alt=""
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      WON
                    </a>
                  </li>
                </ul>
              </li>
              {currentUser && (
                <li className="border-right-item">
                  <a
                    href="/account"
                    className="text-white text-sm py-8 flex-align gap-6"
                  >
                    <span className="icon text-md d-flex">
                      {" "}
                      <i className="ph ph-user-circle" />{" "}
                    </span>
                    <span className="hover-text-decoration-underline">
                      My Account
                    </span>
                  </a>
                </li>
              )}
              <li className="border-right-item">
                {currentUser ? (
                  <button
                    onClick={logout}
                    className="text-white hover-text-decoration-underline"
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    href="/login"
                    className="text-white hover-text-decoration-underline"
                  >
                    Login
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ======================= Middle Top End ========================= */}
      {/* ======================= Middle Header Start ========================= */}
      <header className="header-middle bg-color-one border-bottom border-gray-100">
        <div className="container container-lg">
          <nav className="header-inner flex-between">
            {/* Logo Start */}
            <div className="logo">
              <Link to={"/"} className="a">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            {/* Logo End  */}
            {/* form location Start */}
            <div className="flex-align flex-wrap form-location-wrapper ">
              <div className="search-category d-flex h-48 select-border-end-0 radius-end-2 search-form d-sm-flex d-none">
                {currentUser && (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="search-form__wrapper position-relative"
                  >
                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchString(e.target.value)
                      }
                      value={searchString}
                      type="text"
                      className="search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44"
                      placeholder="Search for a product or brand"
                    />
                    <button
                      type="submit"
                      title="button"
                      className="w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
                    >
                      <i className="ph ph-magnifying-glass" />
                    </button>
                  </form>
                )}
              </div>
            </div>
            {/* form location start */}
            {/* Header Middle Right start */}
            <div className="header-right flex-align d-lg-block d-none">
              <div className="flex-align flex-wrap gap-12">
                <button
                  type="button"
                  title="button"
                  className="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
                >
                  <span className="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                    <i className="ph ph-magnifying-glass" />
                  </span>
                </button>
                {currentUser && (
                  <Link to="/wishlist" className="flex-align gap-4 item-hover">
                    <span className="text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-heart" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4">
                        {totalWishlistItems}
                      </span>
                    </span>
                    <span className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                      Wishlist
                    </span>
                  </Link>
                )}
                {currentUser && (
                  <Link to="/cart" className="flex-align gap-4 item-hover">
                    <span className="text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-shopping-cart-simple" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4">
                        {totalItems}
                      </span>
                    </span>
                    <span className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                      Cart
                    </span>
                  </Link>
                )}
              </div>
            </div>
            {/* Header Middle Right End  */}
          </nav>
        </div>
      </header>
      {/* ======================= Middle Header End ========================= */}
      {/* ==================== Header Start Here ==================== */}
      <header
        className={`header bg-white border-bottom border-gray-100 ${
          scroll && "fixed-header"
        }`}
      >
        <div className="container container-lg">
          <nav className="header-inner d-flex justify-content-between gap-8">
            <div className="flex-align menu-category-wrapper">
              {/* Category Dropdown Start */}
              <div className="category on-hover-item">
                <button
                  onClick={handleCategoryToggle}
                  type="button"
                  className="category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-heading"
                >
                  <span className="icon text-2xl d-xs-flex d-none">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">{categoryName}</span>
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div
                  className={`responsive-dropdown cat on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper ${
                    activeCategory && "active"
                  }`}
                >
                  <button
                    onClick={() => {
                      handleCategoryToggle();
                      setActiveIndexCat(-1);
                    }}
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    {" "}
                    <i className="ph ph-x" />{" "}
                  </button>
                  {/* Logo Start */}
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/" className="a">
                      <img src={logo} alt="Logo" />
                    </Link>
                  </div>
                  {/* Logo End */}
                  <ul className="scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto">
                    <li
                      onClick={() => {
                        handleCategoryIndexClick(1);
                        handleCategoryToggle();
                      }}
                      className={`has-submenus-submenu ${
                        activeIndexCat === 1 ? "active" : ""
                      }`}
                    >
                      <a
                        onClick={() => handleCategoryClick(undefined)}
                        className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                        href="#"
                      >
                        <span className="text-xl d-flex">
                          <i className="ph ph-carrot" />
                        </span>
                        <span>All Categories</span>
                        <span className="icon text-md d-flex ms-auto">
                          <i className="ph ph-caret-right" />
                        </span>
                      </a>
                    </li>

                    {productCategories.map((category, index) => {
                      return (
                        <li
                          onClick={() => {
                            handleCategoryIndexClick(index);
                            handleCategoryToggle();
                          }}
                          className={`has-submenus-submenu ${
                            activeIndexCat === index ? "active" : ""
                          }`}
                          key={index}
                        >
                          <a
                            onClick={() =>
                              handleCategoryClick(category ?? undefined)
                            }
                            className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                            href="#"
                          >
                            <span className="text-xl d-flex">
                              <i className="ph ph-carrot" />
                            </span>
                            <span key={category?.id}>{category?.name}</span>
                            <span className="icon text-md d-flex ms-auto">
                              <i className="ph ph-caret-right" />
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* Category Dropdown End  */}
              {/* Menu Start  */}
              <div className="header-menu d-lg-block d-none">
                {/* Nav Menu Start */}
                <ul className="nav-menu flex-align ">
                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/" className="nav-menu__link">
                      Home
                    </Link>
                    {/* <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                      <li className="common-dropdown__item nav-submenu__item">
                        <a
                          href="/"
                          // className={`common-dropdown__link nav-submenu__link hover-bg-neutral-100 `}
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                        >
                          Home One
                        </a>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <a
                          href="/index-two"
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                        >
                          {" "}
                          Home Two
                        </a>
                      </li>
                    </ul> */}
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link to={"/shop"} className="nav-menu__link">
                      Shop
                    </Link>
                    {/* <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                      <li className="common-dropdown__item nav-submenu__item">
                        <a
                          href="/shop"
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                        >
                          {" "}
                          Shop
                        </a>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <a
                          href="/product-details"
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                        >
                          {" "}
                          Shop Details
                        </a>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <a
                          href="/product-details-two"
                          className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                        >
                          {" "}
                          Shop Details Two
                        </a>
                      </li>
                    </ul> */}
                  </li>
                  {currentUser && (
                    <li className="on-hover-item nav-menu__item has-submenu">
                      <a href="#" className="nav-menu__link">
                        Pages
                      </a>
                      <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                        <li className="common-dropdown__item nav-submenu__item">
                          <Link
                            to="/cart"
                            className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                          >
                            {" "}
                            Cart
                          </Link>
                        </li>
                        <li className="common-dropdown__item nav-submenu__item">
                          <Link
                            to="/wishlist"
                            className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                          >
                            {" "}
                            Wishlist{" "}
                          </Link>
                        </li>
                        <li className="common-dropdown__item nav-submenu__item">
                          <Link
                            to="/myOrders"
                            className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                          >
                            {" "}
                            My Orders{" "}
                          </Link>
                        </li>
                        <li className="common-dropdown__item nav-submenu__item">
                          <Link
                            to="/account"
                            className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                          >
                            {" "}
                            Account
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}

                  <li className="nav-menu__item">
                    <Link
                      to="/contact"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
                {/* Nav Menu End */}
              </div>
              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              <a
                href="tel:01234567890"
                className="bg-main-600 text-white p-12 h-100 hover-bg-main-800 flex-align gap-8 text-lg d-lg-flex d-none"
              >
                <div className="d-flex text-32">
                  <i className="ph ph-phone-call" />
                </div>
                01- 234 567 890
              </a>
              <div className="me-16 d-lg-none d-block">
                <div className="flex-align flex-wrap gap-12">
                  <button
                    onClick={handleSearchToggle}
                    type="button"
                    title="button"
                    className="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
                  >
                    <span className="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                      <i className="ph ph-magnifying-glass" />
                    </span>
                  </button>
                  <Link to="/cart" className="flex-align gap-4 item-hover">
                    <span className="text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-heart" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4">
                        {totalWishlistItems}
                      </span>
                    </span>
                    <span className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                      Wishlist
                    </span>
                  </Link>
                  <Link to="/cart" className="flex-align gap-4 item-hover">
                    <span className="text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-shopping-cart-simple" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4">
                        {totalItems}
                      </span>
                    </span>
                    <span className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                      Cart
                    </span>
                  </Link>
                </div>
              </div>
              <button
                onClick={handleMenuToggle}
                type="button"
                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
              >
                {" "}
                <i className="ph ph-list" />{" "}
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
    </>
  );
};

export default Header;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Category, Product } from "../../../generated";
import { useCategory } from "../../../helpers/useCategory";
import { productService } from "../../../services/product";
import { cartItemService } from "../../../services/cartItem";
import { useAppDispatch } from "../../../redux/hooks";
import { setCartItems } from "../../../redux/slices/cartSlice";
import { setWishlist } from "../../../redux/slices/wishlistSlice/wishlistSlice";
import { shoppingCartService } from "../../../services/shoppingCart";
import { wishListService } from "../../../services/wishlist";
import { ApolloError } from "@apollo/client";
import { categoryService } from "../../../services/category";
import Preloader from "../../../helper/Preloader";
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

  const [priceRange, setPriceRange] = useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);

  const [minPriceInput, setMinPriceInput] = useState<string>(""); // string pour input
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");
  const [isAllPrices, setIsAllPrices] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);

  const [grid, setGrid] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const sidebarController = () => {
    setActive(!active);
  };

  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [wishlistProductIds, setWishlistProductIds] = useState<number[]>([]);

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
  const [productCategories, setProductCategories] = useState<
    Array<Category> | undefined
  >(undefined);

  // États pour la pagination et l'affichage
  const [pageNb, setPageNb] = useState<number>(1); // Page courante
  const [pageSz, setPageSz] = useState<number>(6); // Nombre de produits par page (côté serveur)
  const [productsPerRow, setProductsPerRow] = useState<number>(3); // Produits par ligne dans la grille
  const [sortedBy, setSortedBy] = useState<string>("");
  const [countFilteredProducts, setCountFilteredProducts] = useState(0);

  const resetFilters = () => {
    setPriceRange([0, 100]);
    setRating(0);
    setSelectedCategory(undefined);
    setProductNameFilter("");
    setSelectedStatus(undefined);
    setSortedBy("");
    setPageNb(1); // on revient à la première page
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const response = await categoryService.getCatgories();
      if (response.data.getAllCategories) {
        setProductCategories(response.data.getAllCategories);
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const handleCategoryClick = (category: Category | undefined) => {
    setSelectedCategory(category);
    setActiveCategoryId(
      category && category.id !== undefined ? category.id : null
    );

    console.log(`Category selected: ${category?.name}`);
  };
  useEffect(() => {
    const initializeWishlist = async () => {
      try {
        const response = await wishListService.getWishList();
        console.log("🟢 Wishlist initialisée:", response?.products);

        const wishlistedIds = (
          response?.products?.map((p) => p?.id) ?? []
        ).filter((id): id is number => typeof id === "number");

        setWishlistProductIds(wishlistedIds);
        dispatch(setWishlist(response ?? null));
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la wishlist:", error);
        // En cas d'erreur, initialiser avec un tableau vide
        setWishlistProductIds([]);
      }
    };

    initializeWishlist();
  }, []);
  const toggleWishlist = async (productId: number) => {
    try {
      // Récupérer la wishlist actuelle une seule fois au début
      const responseW = await wishListService.getWishList();
      console.log("🟢 Wishlist Products:", responseW?.products);

      const wishlistedIds = (
        responseW?.products?.map((p) => p?.id) ?? []
      ).filter((id): id is number => typeof id === "number");

      // Vérifier si le produit est déjà dans la wishlist
      if (wishlistedIds.includes(productId)) {
        // Retirer le produit de la wishlist
        await wishListService.deleteProductFromWishList(productId);
        setWishlistProductIds((prev) => prev.filter((id) => id !== productId));
        toast.success("Produit retiré de la wishlist");
      } else {
        // Ajouter le produit à la wishlist
        await wishListService.addProductToWishList(productId);
        setWishlistProductIds((prev) => [...prev, productId]);
        toast.success("Produit ajouté à la wishlist");
      }

      // Récupérer la wishlist mise à jour et mettre à jour le store
      const updatedWishlist = await wishListService.getWishList();
      dispatch(setWishlist(updatedWishlist ?? null));
    } catch (e) {
      console.error("Erreur lors de la modification de la wishlist :", e);

      const err = e as ApolloError;
      const graphErr = err.graphQLErrors?.[0];

      if (graphErr?.extensions?.code === "UNAUTHORIZED") {
        toast.error("Veuillez vous connecter pour utiliser la wishlist.");
      } else if (graphErr?.extensions?.code === "BAD_USER_INPUT") {
        toast.error(graphErr.message);
      } else {
        toast.error(
          "Une erreur est survenue lors de la modification de la wishlist."
        );
        // Optionnel: navigation vers une page d'erreur
        // navigate(`/Error/${graphErr?.extensions?.code}/${graphErr?.message}`);
      }
    }
  };

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
          minPrice: isAllPrices ? undefined : priceRange[0],
          maxPrice: isAllPrices ? undefined : priceRange[1],
          minRating: rating,
          pageSize: pageSz,
          orderBy: sortedBy,
        });

        console.log("🟢 Réponse API complète :", response);
        console.log(
          "🟢 Produits retournés :",
          response?.data?.getAllProducts?.products
        );

        setProducts(response?.data?.getAllProducts?.products as Array);
        setCountFilteredProducts(response.data.getAllProducts.count);

        console.log("Count:", response.data.getAllProducts.count);
        console.log("Page Number:", pageNb);
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
    productNameFilter,
    sortedBy,
    priceRange,
    rating,
    isAllPrices,
  ]);
  // Calculer le nombre total de pages
  useEffect(() => {
    setTotalPage(Math.ceil(countFilteredProducts / pageSz));
  }, [countFilteredProducts, pageSz, setTotalPage]);

  // Remettre à la page 1 quand on change les filtres
  useEffect(() => {
    setPageNb(1);
  }, [selectedCategory, selectedStatus, productNameFilter, rating, priceRange]);

  const incrementPageNb = () => {
    if (pageNb < totalPage) {
      setPageNb(pageNb + 1);
    }
  };

  const decrementPageNb = () => {
    if (pageNb > 1) {
      setPageNb(pageNb - 1);
    }
  };

  const ratingsData = [
    { id: 5, progress: 70 },
    { id: 4, progress: 50 },
    { id: 3, progress: 35 },
    { id: 2, progress: 20 },
    { id: 1, progress: 5 },
    { id: undefined, pogress: 0 },
  ];

  // Rendu des produits (pas de pagination côté client, les produits viennent déjà paginés du serveur)
  const displayProducts = products?.map((product, index) => {
    return (
      <div
        key={product.id ?? index}
        className={`product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 ${
          grid ? "col-12" : `col-lg-${12 / productsPerRow} col-md-6 col-sm-12`
        }`}
        style={grid ? {} : { flexBasis: `${100 / productsPerRow}%` }}
      >
        <span
          onClick={() => toggleWishlist(product.id)}
          className="position-absolute rounded-circle d-flex align-items-center justify-content-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 z-10"
          style={{
            top: "10px",
            right: "10px",
            width: "32px",
            height: "32px",
            backgroundColor: "white",
            border: wishlistProductIds.includes(product.id)
              ? "2px solid #dc2626"
              : "2px solid #e5e7eb",
            fontSize: "16px",
          }}
        >
          <span
            style={{
              color: wishlistProductIds.includes(product.id)
                ? "#dc2626"
                : "#9ca3af",
              fontWeight: wishlistProductIds.includes(product.id)
                ? "bold"
                : "normal",
            }}
          >
            {wishlistProductIds.includes(product.id) ? "★" : "☆"}
          </span>
        </span>

        <Link
          to={`/product-details/${product.id}`}
          className="product-card__thumb w-full h-full object-contain flex-center rounded-8 bg-gray-50"
         
        >
        <div  style={{
            backgroundImage: `url("${product?.images ? product.images[0] : ""}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }} className="w-100 h-100"></div>
          <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
            Best Sale
          </span>
        </Link>

        <div className="product-card__content mt-16">
          <h6 className="title text-lg fw-semibold mt-12 mb-8">
            <Link
              to={`/product-details/${product.id}`}
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
            <span className="text-xs fw-medium text-gray-500">({product.numberOfReviews})</span>
          </div>

          <div
            className={`mb-12 fw-semibold ${
              (product?.quantity ?? 0) > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {(product?.quantity ?? 0) > 0
              ? productStatus.AVAILABLE
              : productStatus.OUT_OF_STOCK}
            <span className="text-gray-500 fw-normal">
              /Qty:{product?.quantity}
            </span>
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
          </div>

          <div className="product-card__price my-20">
            <span className="text-heading text-md fw-semibold ">
              ${product?.price}{" "}
            </span>
          </div>

          <button
            onClick={() => handleAddToCart(product.id)}
            disabled={product?.quantity === 0}
            className={`product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium ${
              product.quantity === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            tabIndex={0}
          >
            Add To Cart <i className="ph ph-shopping-cart" />
          </button>
        </div>
      </div>
    );
  });

  // Calculer les indices pour l'affichage "Showing X-Y of Z results"
  const startIndex =
    countFilteredProducts === 0 ? 0 : (pageNb - 1) * pageSz + 1;
  const endIndex =
    countFilteredProducts === 0
      ? 0
      : Math.min(pageNb * pageSz, countFilteredProducts);
    
  if(!products || !productCategories) return <Preloader />
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
              <button
                onClick={resetFilters}
                className="btn btn-secondary mb-10 "
              >
                Reset Filter
              </button>
              {/* Categories */}
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Product Category
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  <li
                    className="mb-24 cursor-pointer"
                    onClick={() => handleCategoryClick(undefined)}
                  >
                    <div className="text-gray-900 hover:text-main-600">All</div>
                  </li>
                  {productCategories
                    .filter(
                      (category): category is Category => category !== null
                    )
                    .sort(
                      (a, b) => (b.productCount ?? 0) - (a.productCount ?? 0)
                    )
                    .map((category) => (
                      <li
                        key={category.id}
                        className="mb-24 cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                        style={{
                          opacity: activeCategoryId === category.id ? 0.5 : 1, // Change opacity on click
                        }}
                      >
                        <div className="text-gray-900 hover:text-main-600">
                          {category.name} ({category.productCount})
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Price Filter */}
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Filter by Price
                </h6>

                <div className="space-y-4">
                  <label>
                    <input
                      type="checkbox"
                      checked={isAllPrices}
                      onChange={() => setIsAllPrices(!isAllPrices)}
                    />
                    <span className="ml-2">All Products</span>
                  </label>

                  {!isAllPrices && (
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Min Price"
                        value={minPriceInput}
                        onChange={(e) => setMinPriceInput(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                      />
                      <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPriceInput}
                        onChange={(e) => setMaxPriceInput(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          if (isAllPrices) {
                            setPriceRange([undefined, undefined]);
                          } else {
                            const min = minPriceInput
                              ? parseFloat(minPriceInput)
                              : undefined;
                            const max = maxPriceInput
                              ? parseFloat(maxPriceInput)
                              : undefined;
                            setPriceRange([min, max]);
                          }
                        }}
                        className="btn btn-main h-40 mt-2"
                      >
                        Filter
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Filter by Rating
                </h6>
                {ratingsData.map((ratingItem) => (
                  <div
                    key={ratingItem.id}
                    className={`flex-align gap-8 position-relative mb-${
                      ratingItem.id === undefined ? "0" : "20"
                    }`}
                  >
                    <label
                      className="position-absolute w-100 h-100 cursor-pointer"
                      htmlFor={`rating${ratingItem.id}`}
                    ></label>

                    <div className="common-check common-radio mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={`rating${ratingItem.id}`}
                        onClick={() => setRating(ratingItem.id)}
                      />
                    </div>

                    <div
                      className="progress w-100 bg-gray-100 rounded-pill h-8"
                      role="progressbar"
                      aria-valuenow={ratingItem.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-600 rounded-pill"
                        style={{ width: `${ratingItem.progress}%` }}
                      />
                    </div>

                    <div className="flex-align gap-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs fw-medium d-flex ${
                            i < ratingItem.id
                              ? "text-warning-600"
                              : "text-gray-400"
                          }`}
                        >
                          <i className="ph-fill ph-star" />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="shop-sidebar__box rounded-8">
                <img src="assets/images/thumbs/advertise-img1.png" alt="" />
              </div>
            </div>
          </div>
          {/* Sidebar End */}

          {/* Content Start */}
          <div className="col-lg-9">
            {/* Top Controls */}
            <div className="flex-between gap-16 flex-wrap mb-40">
              <span className="text-gray-900">
                Showing {startIndex}-{endIndex} of {countFilteredProducts}{" "}
                results
              </span>
              <div className="position-relative flex-align gap-16 flex-wrap">
                {/* List/Grid Toggle */}
                <div className="list-grid-btns flex-align gap-16">
                  <button
                    onClick={() => setGrid(true)}
                    type="button"
                    title="List View"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                      grid === true && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph-bold ph-list-dashes" />
                  </button>
                  <button
                    onClick={() => setGrid(false)}
                    type="button"
                    title="Grid View"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                      grid === false && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph ph-squares-four" />
                  </button>
                </div>

                {/* Sort By */}
                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                  <label
                    htmlFor="sorting"
                    className="text-inherit flex-shrink-0"
                  >
                    Sort by:
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

                {/* Products per page */}
                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                  <label
                    htmlFor="pageSize"
                    className="text-inherit flex-shrink-0"
                  >
                    Per page:
                  </label>
                  <select
                    value={pageSz}
                    onChange={(e) => setPageSz(Number(e.target.value))}
                    className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                    id="pageSize"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                  </select>
                </div>

                {/* Products per row (seulement en mode grille) */}
                {!grid && (
                  <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                    <label
                      htmlFor="perRow"
                      className="text-inherit flex-shrink-0"
                    >
                      Per row:
                    </label>
                    <select
                      value={productsPerRow}
                      onChange={(e) =>
                        setProductsPerRow(Number(e.target.value))
                      }
                      className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                      id="perRow"
                    >
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={sidebarController}
                  type="button"
                  title="Filter"
                  className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                >
                  <i className="ph-bold ph-funnel" />
                </button>
              </div>
            </div>

            {/* Products Display */}
            <div
              className={`list-grid-wrapper ${grid && "list-view"}`}
              style={{
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Liste des produits */}
              <div
                className={grid ? "" : "row"}
                style={{ flexGrow: 1, padding: "8px" }}
              >
                {displayProducts}
              </div>

              {/* Pagination - Toujours en bas */}
              <div
                className="pagination flex-center flex-wrap gap-16 mt-40"
                style={{
                  clear: "both",
                  marginTop: "40px",
                  // Pas besoin de position: absolute ici
                }}
              >
                {/* Tes boutons de pagination ici */}
                <button
                  title="Previous"
                  onClick={decrementPageNb}
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

                {Array.from({ length: totalPage }, (_, index) => (
                  <button
                    title={`Page ${index + 1}`}
                    key={index}
                    className={`page-item ${
                      pageNb === index + 1 ? "active" : ""
                    }`}
                    onClick={() => setPageNb(index + 1)}
                  >
                    <div
                      className={`page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium border border-gray-100 ${
                        pageNb === index + 1
                          ? "bg-main-600 text-white border-main-600"
                          : "text-neutral-600"
                      }`}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;

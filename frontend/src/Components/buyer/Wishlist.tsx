import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Category, Product } from "../../generated";
import { useCategory } from "../../helpers/useCategory";
import { productService } from "../../services/product";
import { cartItemService } from "../../services/cartItem";
import { useAppDispatch } from "../../redux/hooks";
import { setCartItems } from "../../redux/slices/cartSlice";
import { shoppingCartService } from "../../services/shoppingCart";
import { wishListService } from "../../services/wishlist";
import { setWishlist } from "../../redux/slices/wishlistSlice/wishlistSlice";
import { ApolloError } from "@apollo/client";
import { categoryService } from "../../services/category";

const Wishlist = () => {
  const dispatch = useAppDispatch();

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

  const [grid, setGrid] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const sidebarController = () => {
    setActive(!active);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [allWishlistProducts, setAllWishlistProducts] = useState<Product[]>([]);

  // Variables de filtrage
  const {
    selectedCategory,
    productNameFilter,
    totalPage,
    setProductNameFilter,
    setSelectedCategory,
    setTotalPage,
  } = useCategory();

  // États pour les filtres
  const [filters, setFilters] = useState({
    categoryId: undefined as number | undefined,
    name: "",
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    minRating: undefined as number | undefined,
    available: undefined as boolean | undefined,
  });

  enum productStatus {
    AVAILABLE = "Available",
    OUT_OF_STOCK = "Out of Stock",
  }

  const toggleWishlist = async (productId: number) => {
    try {
      await wishListService.deleteProductFromWishList(productId);
      // Supprimer le produit de la liste affichée
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setAllWishlistProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      toast.success("Produit retiré de la wishlist !");
      const response = await wishListService.getWishList();
      dispatch(setWishlist(response ?? null));
    } catch (error) {
      console.error("Erreur lors de la modification de la wishlist :", error);
      toast.error("Erreur lors de la suppression !");
    }
  };

  const [productCategories, setProductCategories] = useState<
    Array<Category | null>
  >([]);

  // États pour la pagination et l'affichage
  const [pageNb, setPageNb] = useState<number>(1);
  const [pageSz, setPageSz] = useState<number>(6);
  const [productsPerRow, setProductsPerRow] = useState<number>(3);
  const [sortedBy, setSortedBy] = useState<string>("createdAt_DESC");
  const [countFilteredProducts, setCountFilteredProducts] = useState(0);

  // Fonction pour appliquer les filtres
  const applyFilters = async () => {
    try {
      if (hasActiveFilters()) {
        // Utiliser la requête filtrée si des filtres sont actifs
        const filteredProducts = await wishListService.getFilteredWishList(
          filters
        );
        const validProducts = (filteredProducts ?? []).filter(
          (p): p is Product => p !== null
        );
        setProducts(validProducts);
        setCountFilteredProducts(validProducts.length);
      } else {
        // Sinon, afficher tous les produits de la wishlist
        setProducts(allWishlistProducts);
        setCountFilteredProducts(allWishlistProducts.length);
      }
    } catch (error) {
      console.error("Erreur lors de l'application des filtres :", error);
      toast.error("Erreur lors du filtrage des produits.");
    }
  };

  // Vérifier s'il y a des filtres actifs
  const hasActiveFilters = () => {
    return (
      filters.categoryId !== undefined ||
      filters.name !== "" ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      filters.minRating !== undefined ||
      filters.available !== undefined
    );
  };

  // Charger les catégories
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
  }, []);

  // Synchroniser les filtres du header global avec le local
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categoryId: selectedCategory?.id ?? undefined,
      name: productNameFilter,
    }));
  }, [selectedCategory, productNameFilter]);

  // Charger la wishlist initiale
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await wishListService.getWishList();
        if (!response?.products) {
          toast.error("wishlist empty.");
        }
        console.log("🟢 Wishlist Products:", response?.products);
        const filteredProducts = (response?.products ?? []).filter(
          (p): p is Product => p !== null
        );

        setAllWishlistProducts(filteredProducts);
        setProducts(filteredProducts);
        setCountFilteredProducts(filteredProducts.length);

        dispatch(setWishlist(response ?? null));
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

    fetchWishlistProducts();
  }, [dispatch]);

  // Appliquer les filtres quand ils changent
  useEffect(() => {
    applyFilters();
  }, [filters, allWishlistProducts]);

  // Calculer le nombre total de pages
  useEffect(() => {
    setTotalPage(Math.ceil(countFilteredProducts / pageSz));
  }, [countFilteredProducts, pageSz, setTotalPage]);

  // Remettre à la page 1 quand on change les filtres
  useEffect(() => {
    setPageNb(1);
  }, [filters]);

  // Tri des produits
  const sortProducts = (products: Product[], sortBy: string) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "price_ASC":
          return (a.price || 0) - (b.price || 0);
        case "price_DESC":
          return (b.price || 0) - (a.price || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "createdAt_ASC":
          return a.id - b.id; // Simple approximation
        case "createdAt_DESC":
        default:
          return b.id - a.id; // Simple approximation
      }
    });
  };

  // Produits triés pour l'affichage
  const sortedProducts = sortProducts(products, sortedBy);

  // Pagination côté client
  const startIndex = (pageNb - 1) * pageSz;
  const endIndex = startIndex + pageSz;
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

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

  // Rendu des produits
  const displayProducts = displayedProducts.map((product, index) => {
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
            border: "2px solid #dc2626",
            fontSize: "16px",
          }}
        >
          <span style={{ color: "#dc2626", fontWeight: "bold" }}>★</span>
        </span>

        <Link
          to={`/product-details/${product.id}`}
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
            <span className="text-xs fw-medium text-gray-500">(17k)</span>
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
  const currentStartIndex = countFilteredProducts === 0 ? 0 : startIndex + 1;
  const currentEndIndex =
    countFilteredProducts === 0 ? 0 : Math.min(endIndex, countFilteredProducts);

  return (
    <section className="shop py-80">
      <ToastContainer />

      {/* Filtres */}
      <div className="filters-section mb-40 p-20 bg-gray-50 rounded-8">
        <h5 className="mb-20">Filtrer les produits</h5>
        <div className="row">
          {/* Filtre par prix minimum */}
          <div className="col-md-2 mb-16">
            <label className="form-label">Prix min</label>
            <input
              type="number"
              className="form-control"
              placeholder="0"
              value={filters.minPrice || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            />
          </div>

          {/* Filtre par prix maximum */}
          <div className="col-md-2 mb-16">
            <label className="form-label">Prix max</label>
            <input
              type="number"
              className="form-control"
              placeholder="1000"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            />
          </div>

          {/* Filtre par disponibilité */}
          {/* <div className="col-md-2 mb-16">
            <label className="form-label">Disponibilité</label>
            <select
              className="form-control"
              value={
                filters.available === undefined
                  ? ""
                  : filters.available.toString()
              }
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  available:
                    e.target.value === ""
                      ? undefined
                      : e.target.value === "true",
                }))
              }
            >
              <option value="">Tous</option>
              <option value="true">Disponible</option>
              <option value="false">Rupture de stock</option>
            </select>
          </div> */}
        </div>

        {/* Bouton pour réinitialiser les filtres */}
        <button
          className="btn btn-secondary"
          onClick={() =>
            setFilters({
              categoryId: undefined,
              name: "",
              minPrice: undefined,
              maxPrice: undefined,
              minRating: undefined,
              available: undefined,
            })
          }
        >
          Réinitialiser les filtres
        </button>
      </div>

      {/* Top Controls */}
      <div className="flex-between p-20 gap-16 flex-wrap mb-40">
        <span className="text-gray-900">
          Showing {currentStartIndex}-{currentEndIndex} of{" "}
          {countFilteredProducts} results
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
            <label htmlFor="sorting" className="text-inherit flex-shrink-0">
              Sort by:
            </label>
            <select
              value={sortedBy}
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
            <label htmlFor="pageSize" className="text-inherit flex-shrink-0">
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
              <label htmlFor="perRow" className="text-inherit flex-shrink-0">
                Per row:
              </label>
              <select
                value={productsPerRow}
                onChange={(e) => setProductsPerRow(Number(e.target.value))}
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
        className={` p-20 list-grid-wrapper ${grid && "list-view"}`}
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
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent:
              displayedProducts.length === 0 ? "center" : "flex-start",
            alignItems:
              displayedProducts.length === 0 ? "center" : "flex-start",
            flexWrap: "wrap",
          }}
        >
          {displayedProducts.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>Products Not Found .</p>
            </div>
          ) : (
            displayProducts
          )}
        </div>

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="pagination flex-center flex-wrap gap-16 mt-40">
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
                className={`page-item ${pageNb === index + 1 ? "active" : ""}`}
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
        )}
      </div>
    </section>
  );
};

export default Wishlist;

import React from "react";
import { Link } from "react-router-dom";

const RecommendedOne: React.FC = () => {
  return (
    <section className="recommended">
      <div className="container container-lg">
        <div className="section-heading flex-between flex-wrap gap-16">
          <h5 className="mb-0">Recommended for you</h5>
          <ul
            className="nav common-tab nav-pills"
            id="pills-tab"
            role="tablist"
          >
            {[
              { id: "all", label: "All", active: true },
              { id: "grocery", label: "Grocery" },
              { id: "fruits", label: "Fruits" },
              { id: "juices", label: "Juices" },
              { id: "vegetables", label: "Vegetables" },
              { id: "snacks", label: "Snacks" },
              { id: "organic", label: "Organic Foods" },
            ].map((tab) => (
              <li className="nav-item" role="presentation" key={tab.id}>
                <button
                  className={`nav-link ${tab.active ? "active" : ""}`}
                  id={`pills-${tab.id}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-${tab.id}`}
                  aria-selected={tab.active ? "true" : "false"}
                >
                  {tab.label}
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
              {[...Array(6)].map((_, index) => (
                <div className="col-xxl-2 col-lg-3 col-sm-4 col-6" key={index}>
                  <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <Link
                      to="/product-details"
                      className="product-card__thumb flex-center"
                    >
                      <img
                        src={`assets/images/thumbs/product-img${index + 7}.png`}
                        alt=""
                      />
                    </Link>
                    <div className="product-card__content p-sm-2">
                      <h6 className="title text-lg fw-semibold mt-12 mb-8">
                        <Link
                          to="/product-details"
                          className="link text-line-2"
                        >
                          Product Title {index + 1}
                        </Link>
                      </h6>
                      <div className="flex-align gap-4">
                        <span className="text-main-600 text-md d-flex">
                          <i className="ph-fill ph-storefront" />
                        </span>
                        <span className="text-gray-500 text-xs">
                          By Lucky Supermarket
                        </span>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="product-card__price mb-8">
                          <span className="text-heading text-md fw-semibold">
                            $14.99{" "}
                            <span className="text-gray-500 fw-normal">
                              /Qty
                            </span>
                          </span>
                          <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                            $28.99
                          </span>
                        </div>
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-600">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-600">
                            (17k)
                          </span>
                        </div>
                        <Link
                          to="/cart"
                          className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center"
                        >
                          Add To Cart <i className="ph ph-shopping-cart" />
                        </Link>
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

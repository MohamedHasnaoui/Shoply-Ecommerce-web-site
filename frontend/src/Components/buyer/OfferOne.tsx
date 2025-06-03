import React from "react";
import { Link } from "react-router-dom";

const OfferOne: React.FC = () => {
  return (
    <section className="offer pt-80 pb-80">
      <div className="container container-lg">
        <div className="row gy-4">
          {/* Première carte d'offre */}
          <div className="col-sm-6">
            <div className="offer-card position-relative rounded-16 bg-main-600 overflow-hidden p-16 flex-align gap-16 flex-wrap z-1">
              <img
                src="assets/images/shape/offer-shape.png"
                alt="Offer Shape"
                className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
              />
              <div className="offer-card__thumb d-lg-block d-none">
                <img src="assets/images/thumbs/offer-img1.png" alt="Offer" />
              </div>
              <div className="py-xl-4">
                <div className="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle">
                  <img
                    src="assets/images/thumbs/offer-logo.png"
                    alt="Offer Logo"
                  />
                </div>
                <h4 className="text-white mb-8">$5 off your first order</h4>
                <div className="flex-align gap-8">
                  <span className="text-sm text-white">Delivery by 6:15am</span>
                  <span className="text-sm text-main-two-600">
                    expired Aug 5
                  </span>
                </div>
                <Link
                  to="/shop"
                  className="mt-16 btn bg-white hover-text-white hover-bg-main-800 text-heading fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                  tabIndex={0}
                >
                  Shop Now
                  <span className="icon text-xl d-flex">
                    <i className="ph ph-arrow-right" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Deuxième carte d'offre */}
          <div className="col-sm-6">
            <div className="offer-card position-relative rounded-16 bg-main-600 overflow-hidden p-16 flex-align gap-16 flex-wrap z-1">
              <img
                src="assets/images/shape/offer-shape.png"
                alt="Offer Shape"
                className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
              />
              <div className="offer-card__thumb d-lg-block d-none">
                <img src="assets/images/thumbs/offer-img2.png" alt="Offer" />
              </div>
              <div className="py-xl-4">
                <div className="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle">
                  <img
                    src="assets/images/thumbs/offer-logo.png"
                    alt="Offer Logo"
                  />
                </div>
                <h4 className="text-white mb-8">$5 off your first order</h4>
                <div className="flex-align gap-8">
                  <span className="text-sm text-white">Delivery by 6:15am</span>
                  <span className="text-sm text-main-two-600">
                    expired Aug 5
                  </span>
                </div>
                <Link
                  to="/shop"
                  className="mt-16 btn bg-white hover-text-white hover-bg-main-800 text-heading fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                  tabIndex={0}
                >
                  Shop Now
                  <span className="icon text-xl d-flex">
                    <i className="ph ph-arrow-right" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferOne;

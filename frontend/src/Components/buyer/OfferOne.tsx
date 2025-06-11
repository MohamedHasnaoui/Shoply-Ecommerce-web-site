import React from "react";
import { Link } from "react-router-dom";
import offerShape from "../../assets/ClientAssets/images/shape/offer-shape.png"
const OfferOne: React.FC = () => {
  return (
    <section className="offer pt-80 pb-80">
      <div className="container container-lg">
        <div className="row gy-4">
          {/* Première carte d'offre */}
          <div className="col-sm-6">
            <div className="offer-card position-relative rounded-16 bg-main-600 overflow-hidden p-16 flex-align gap-16 flex-wrap z-1">
              <img
                src={offerShape}
                alt="Offer Shape"
                className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
              />
              <div className="offer-card__thumb d-lg-block d-none">
                <img className="rounded-8" src="https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=320"alt="Offer" />
              </div>
              <div className="py-xl-4">
                <div className="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/821/821066.png"
                    alt="offer logo"
                  />
                </div>
                <h4 className="text-white mb-8">A special welcome gift<br></br> is waiting inside</h4>
                <div className="flex-align gap-8">
                  <span className="text-sm text-white">Get Started</span>
                  <span className="text-sm text-main-two-600">
                    NOW
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
                src={offerShape}
                alt="Offer Shape"
                className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
              />
              <div className="offer-card__thumb d-lg-block d-none">
                <img className="rounded-8" src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=320" alt="Offer" />
              </div>
              <div className="py-xl-4">
                <div className="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2438/2438139.png"
                    alt="Offer Logo"
                  />
                </div>
                <h4 className="text-white mb-8">Exclusive drops<br></br> and tech deals inside.</h4>
                <div className="flex-align gap-8">
                  <span className="text-sm text-white"> Gear Up</span>
                  <span className="text-sm text-main-two-600">
                    NOW
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

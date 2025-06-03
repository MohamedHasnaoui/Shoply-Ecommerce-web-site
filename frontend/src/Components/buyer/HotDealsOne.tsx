import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getCountdown } from "../../helper/Countdown";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

const SampleNextArrow = memo<ArrowProps>(({ className, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-right" />
    </button>
  );
});

const SamplePrevArrow = memo<ArrowProps>(({ className, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-left" />
    </button>
  );
});

SampleNextArrow.displayName = "SampleNextArrow";
SamplePrevArrow.displayName = "SamplePrevArrow";

const HotDealsOne: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="hot-deals pt-80">
      <div className="container container-lg">
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">Hot Deals Todays</h5>
            <div className="flex-align mr-point gap-16">
              <Link
                to="/shop"
                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                View All Deals
              </Link>
            </div>
          </div>
        </div>
        <div className="row g-12">
          <div className="col-md-4">
            <div className="hot-deals position-relative rounded-16 bg-main-600 overflow-hidden p-28 z-1 text-center">
              <img
                src="assets/images/shape/offer-shape.png"
                alt=""
                className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
              />
              <div className="hot-deals__thumb">
                <img src="assets/images/thumbs/hot-deals-img.png" alt="" />
              </div>
              <div className="py-xl-4">
                <h4 className="text-white mb-8">Fresh Vegetables</h4>
                <div className="countdown my-32" id="countdown4">
                  <ul className="countdown-list flex-center flex-wrap">
                    <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white">
                      <span className="days" />
                      {timeLeft.days} Days
                    </li>
                    <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white">
                      <span className="hours" />
                      {timeLeft.hours} Hours
                    </li>
                    <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white">
                      <span className="minutes" />
                      {timeLeft.minutes} Min
                    </li>
                    <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white">
                      <span className="seconds" />
                      {timeLeft.seconds} Sec
                    </li>
                  </ul>
                </div>
                <Link
                  to="/shop"
                  className="mt-16 btn btn-main-two fw-medium d-inline-flex align-items-center rounded-pill gap-8"
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
          <div className="col-md-8">
            <div className="hot-deals-slider arrow-style-two">
              <Slider {...settings}>
                <div>
                  <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">
                      Sale 50%
                    </span>
                    <Link
                      to="/product-details"
                      className="product-card__thumb flex-center"
                    >
                      <img src="assets/images/thumbs/product-img8.png" alt="" />
                    </Link>
                    <div className="product-card__content p-sm-2">
                      <h6 className="title text-lg fw-semibold mt-12 mb-8">
                        <Link
                          to="/product-details"
                          className="link text-line-2"
                        >
                          Marcel's Modern Pantry Almond Unsweetened
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
                          <span className="text-heading text-md fw-semibold ">
                            $14.99{" "}
                            <span className="text-gray-500 fw-normal">
                              /Qty
                            </span>{" "}
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
                <div>
                  <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">
                      Sale 50%
                    </span>
                    <Link
                      to="/product-details"
                      className="product-card__thumb flex-center"
                    >
                      <img src="assets/images/thumbs/product-img9.png" alt="" />
                    </Link>
                    <div className="product-card__content p-sm-2">
                      <h6 className="title text-lg fw-semibold mt-12 mb-8">
                        <Link
                          to="/product-details"
                          className="link text-line-2"
                        >
                          O Organics Milk, Whole, Vitamin D
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
                          <span className="text-heading text-md fw-semibold ">
                            $14.99{" "}
                            <span className="text-gray-500 fw-normal">
                              /Qty
                            </span>{" "}
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
                <div>
                  <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <span className="product-card__badge bg-info-600 px-8 py-4 text-sm text-white">
                      Best Sale
                    </span>
                    <Link
                      to="/product-details"
                      className="product-card__thumb flex-center"
                    >
                      <img
                        src="assets/images/thumbs/product-img10.png"
                        alt=""
                      />
                    </Link>
                    <div className="product-card__content p-sm-2">
                      <h6 className="title text-lg fw-semibold mt-12 mb-8">
                        <Link
                          to="/product-details"
                          className="link text-line-2"
                        >
                          Whole Grains and Seeds Organic Bread
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
                          <span className="text-heading text-md fw-semibold ">
                            $14.99{" "}
                            <span className="text-gray-500 fw-normal">
                              /Qty
                            </span>{" "}
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
                <div>
                  <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <span className="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white">
                      New
                    </span>
                    <Link
                      to="/product-details"
                      className="product-card__thumb flex-center"
                    >
                      <img
                        src="assets/images/thumbs/product-img18.png"
                        alt=""
                      />
                    </Link>
                    <div className="product-card__content p-sm-2">
                      <h6 className="title text-lg fw-semibold mt-12 mb-8">
                        <Link
                          to="/product-details"
                          className="link text-line-2"
                        >
                          Tropicana 100% Juice, Orange, No Pulp
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
                          <span className="text-heading text-md fw-semibold ">
                            $14.99{" "}
                            <span className="text-gray-500 fw-normal">
                              /Qty
                            </span>{" "}
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
                <div>
                  <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <span className="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">
                      Sale 50%
                    </span>
                    <Link
                      to="/product-details"
                      className="product-card__thumb flex-center"
                    >
                      <img src="assets/images/thumbs/product-img9.png" alt="" />
                    </Link>
                    <div className="product-card__content p-sm-2">
                      <h6 className="title text-lg fw-semibold mt-12 mb-8">
                        <Link
                          to="/product-details"
                          className="link text-line-2"
                        >
                          O Organics Milk, Whole, Vitamin D
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
                          <span className="text-heading text-md fw-semibold ">
                            $14.99{" "}
                            <span className="text-gray-500 fw-normal">
                              /Qty
                            </span>{" "}
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
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotDealsOne;

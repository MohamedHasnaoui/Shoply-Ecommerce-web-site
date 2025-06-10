import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import ArrowProps from "react-slick";

const ShortProductOne = () => {
  const SampleNextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-right" />
      </button>
    );
  };

  const SamplePrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-left" />
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="short-product">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-lg-6 col-sm-6">
            <div className="p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 ">
              <div className="p-16 bg-main-50 rounded-16 mb-32">
                <h6 className="underlined-line position-relative mb-0 pb-16 d-inline-block">
                  Top Selling Products
                </h6>
              </div>
              <div className="short-product-list arrow-style-two">
                <Slider {...settings}>
                  <div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img5.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img6.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img7.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img8.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img5.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img6.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img7.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img8.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>

          <div className=" col-lg-6 col-sm-6">
            <div className="p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 ">
              <div className="p-16 bg-main-50 rounded-16 mb-32">
                <h6 className="underlined-line position-relative mb-0 pb-16 d-inline-block">
                  Top Rated Products
                </h6>
              </div>
              <div className="short-product-list arrow-style-two">
                <Slider {...settings}>
                  <div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img3.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img7.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img1.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img8.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img1.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img7.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16 mb-40">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img3.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-align gap-16">
                      <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                        <Link to="/product-details" className="link">
                          <img
                            src="assets/images/thumbs/short-product-img8.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-card__content mt-12">
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-500">
                            4.8
                          </span>
                          <span className="text-15 fw-bold text-warning-600 d-flex">
                            <i className="ph-fill ph-star" />
                          </span>
                          <span className="text-xs fw-bold text-gray-500">
                            (17k)
                          </span>
                        </div>
                        <h6 className="title text-lg fw-semibold mt-8 mb-8">
                          <Link
                            to="/product-details"
                            className="link text-line-1"
                          >
                            Taylor Farms Broccoli Florets Vegetables
                          </Link>
                        </h6>
                        <div className="product-card__price flex-align gap-8">
                          <span className="text-heading text-md fw-semibold d-block">
                            $1500.00
                          </span>
                          <span className="text-gray-400 text-md fw-semibold d-block">
                            $1500.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortProductOne;

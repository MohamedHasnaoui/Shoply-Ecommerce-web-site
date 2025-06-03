import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
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
      className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-left" />
    </button>
  );
};

const FeatureOne: React.FC = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 10,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1699, settings: { slidesToShow: 9 } },
      { breakpoint: 1599, settings: { slidesToShow: 8 } },
      { breakpoint: 1399, settings: { slidesToShow: 6 } },
      { breakpoint: 992, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 575, settings: { slidesToShow: 3 } },
      { breakpoint: 424, settings: { slidesToShow: 2 } },
      { breakpoint: 359, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="feature" id="featureSection">
      <div className="container container-lg">
        <div className="position-relative arrow-center">
          <div className="flex-align">
            <button
              type="button"
              id="feature-item-wrapper-prev"
              className="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
            >
              <i className="ph ph-caret-left" />
            </button>
            <button
              type="button"
              id="feature-item-wrapper-next"
              className="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
            >
              <i className="ph ph-caret-right" />
            </button>
          </div>
          <div className="feature-item-wrapper">
            <Slider {...settings}>
              {[
                { img: "feature-img1.png", label: "Vegetables" },
                { img: "feature-img2.png", label: "Fish & Meats" },
                { img: "feature-img3.png", label: "Desserts" },
                { img: "feature-img4.png", label: "Drinks & Juice" },
                { img: "feature-img5.png", label: "Animals Food" },
                { img: "feature-img6.png", label: "Fresh Fruits" },
                { img: "feature-img7.png", label: "Yummy Candy" },
                { img: "feature-img2.png", label: "Fish & Meats" },
                { img: "feature-img8.png", label: "Dairy & Eggs" },
                { img: "feature-img9.png", label: "Snacks" },
                { img: "feature-img10.png", label: "Frozen Foods" },
              ].map((item, index) => (
                <div className="feature-item text-center" key={index}>
                  <div className="feature-item__thumb rounded-circle">
                    <Link to="/shop" className="w-100 h-100 flex-center">
                      <img
                        src={`assets/images/thumbs/${item.img}`}
                        alt={item.label}
                      />
                    </Link>
                  </div>
                  <div className="feature-item__content mt-16">
                    <h6 className="text-lg mb-8">
                      <Link to="/shop" className="text-inherit">
                        {item.label}
                      </Link>
                    </h6>
                    <span className="text-sm text-gray-400">125+ Products</span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;

import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { getCountdown } from "../../helper/Countdown";

interface ArrowProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SampleNextArrow = memo(function SampleNextArrow(props: ArrowProps) {
  const { className, onClick } = props;
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

const SamplePrevArrow = memo(function SamplePrevArrow(props: ArrowProps) {
  const { className, onClick } = props;
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

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const FlashSalesOne: React.FC = () => {
  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flash-sales pt-80">
      <div className="container container-lg">
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">Flash Sales Today</h5>
            <div className="flex-align gap-16 mr-point">
              <Link
                to="/shop"
                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                View All Deals
              </Link>
            </div>
          </div>
        </div>
        <div className="flash-sales__slider arrow-style-two">
          <Slider {...settings}>
            {[1, 2, 3].map((id) => (
              <div key={id}>
                <div className="flash-sales-item rounded-16 overflow-hidden z-1 position-relative flex-align flex-0 justify-content-between gap-8">
                  <img
                    src={`assets/images/bg/flash-sale-bg${id}.png`}
                    alt=""
                    className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1 flash-sales-item__bg"
                  />
                  <div className="flash-sales-item__thumb d-sm-block d-none">
                    <img
                      src={`assets/images/thumbs/flash-sale-img${id}.png`}
                      alt=""
                    />
                  </div>
                  <div className="flash-sales-item__content ms-sm-auto">
                    <h6 className="text-32 mb-20">
                      {id === 1 ? "Fresh Vegetables" : "Daily Snacks"}
                    </h6>
                    <div className="countdown" id={`countdown${id}`}>
                      <ul className="countdown-list flex-align flex-wrap">
                        <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium">
                          <span className="days" />
                          {timeLeft.days} Days
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium">
                          <span className="hours" />
                          {timeLeft.hours} Hours
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium">
                          <span className="minutes" />
                          {timeLeft.minutes} Min
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium">
                          <span className="seconds" />
                          {timeLeft.seconds} Sec
                        </li>
                      </ul>
                    </div>
                    <Link
                      to="/shop"
                      className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
                    >
                      Shop Now
                      <span className="icon text-xl d-flex">
                        <i className="ph ph-arrow-right" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FlashSalesOne;

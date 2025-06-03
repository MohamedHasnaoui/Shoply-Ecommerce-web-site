import React from "react";
import { Link } from "react-router-dom";

const PromotionalOne: React.FC = () => {
  return (
    <section className="promotional-banner pt-80">
      <div className="container container-lg">
        <div className="row gy-4">
          {[
            {
              img: "assets/images/thumbs/promotional-banner-img1.png",
              title: "Everyday Fresh Meat",
            },
            {
              img: "assets/images/thumbs/promotional-banner-img2.png",
              title: "Daily Fresh Vegetables",
            },
            {
              img: "assets/images/thumbs/promotional-banner-img3.png",
              title: "Everyday Fresh Milk",
            },
            {
              img: "assets/images/thumbs/promotional-banner-img4.png",
              title: "Everyday Fresh Fruits",
            },
          ].map((item, index) => (
            <div key={index} className="col-xl-3 col-sm-6 col-xs-6">
              <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
                <img
                  src={item.img}
                  alt={item.title}
                  className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
                />
                <div className="promotional-banner-item__content">
                  <h6 className="promotional-banner-item__title text-32">
                    {item.title}
                  </h6>
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
        </div>
      </div>
    </section>
  );
};

export default PromotionalOne;

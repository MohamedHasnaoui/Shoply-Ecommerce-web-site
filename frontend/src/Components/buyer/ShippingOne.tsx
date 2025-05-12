import React from "react";

const ShippingOne = () => {
  return (
    <section className="shipping mb-24" id="shipping">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-car-profile" />
              </span>
              <div className="">
                <h6 className="mb-0">Free Shipping</h6>
                <span className="text-sm text-heading">
                  Free shipping all over the US
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-hand-heart" />
              </span>
              <div className="">
                <h6 className="mb-0"> 100% Satisfaction</h6>
                <span className="text-sm text-heading">
                  Free shipping all over the US
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-credit-card" />
              </span>
              <div className="">
                <h6 className="mb-0"> Secure Payments</h6>
                <span className="text-sm text-heading">
                  Free shipping all over the US
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-chats" />
              </span>
              <div className="">
                <h6 className="mb-0"> 24/7 Support</h6>
                <span className="text-sm text-heading">
                  Free shipping all over the US
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingOne;

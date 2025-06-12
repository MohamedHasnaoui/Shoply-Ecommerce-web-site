import { Link } from "react-router";
import logo from "../../assets/ClientAssets/images/logo/shoply-logo.svg"
const FooterTwo = () => {
  return (
    <footer className="footer py-80">
      <div className="container container-lg">
        <div className="footer-item-two-wrapper d-flex align-items-start flex-wrap">
          {/* === Main Info Block: This is already descriptive and perfect. === */}
          <div className="footer-item max-w-275">
            <div className="footer-item__logo">
              <Link to="/">
                <img src={logo} alt="Shoply Logo" />
              </Link>
            </div>
            <p className="mb-24">
              Shoply is your premier destination for computer components, custom gaming PCs, and other IT-related products.
            </p>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                <i className="ph-fill ph-phone-call" />
              </span>
              <span className="text-md text-gray-900">
                +1-800-555-0199
              </span>
            </div>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                <i className="ph-fill ph-envelope" />
              </span>
              <span className="text-md text-gray-900">
                support@shoply.com
              </span>
            </div>
          </div>

          {/* === Core Navigation & Products === */}
          <div className="footer-item">
            <h6 className="footer-item__title">Explore Shoply</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                 {/* This is a primary navigation link, so we keep it */}
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  All Products
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/cart" className="text-gray-600 hover-text-main-600">
                  Shopping Cart
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/wishlist" className="text-gray-600 hover-text-main-600">
                  Your Wishlist
                </Link>
              </li>
              <li className="mb-16">
                 <p className="text-gray-600">
                    Discover daily deals and special offers on top-rated tech.
                 </p>
              </li>
            </ul>
          </div>

          {/* === Customer Support Information === */}
          <div className="footer-item">
            <h6 className="footer-item__title">Customer Support</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <p className="text-gray-600">Our Help Center is available 24/7 for any questions.</p>
              </li>
              <li className="mb-16">
                <p className="text-gray-600">Track your order status in real-time from your account page.</p>
              </li>
              <li className="mb-16">
                <p className="text-gray-600">We offer a 30-day return policy on most unopened items.</p>
              </li>
              <li className="">
                <p className="text-gray-600">Gift cards and vouchers can be redeemed at checkout.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;


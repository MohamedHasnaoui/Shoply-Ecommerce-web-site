import React from "react";
import Preloader from "../../../helper/Preloader";
import ColorInit from "../../../helper/ColorInit";
import HeaderTwo from "../../../Components/buyer/HeaderTwo";
import Breadcrumb from "../../../Components/buyer/Breadcrumb";
import FooterTwo from "../../../Components/buyer/FooterTwo";
import BottomFooter from "../../../Components/buyer/BottomFooter";
import CartSection from "../../../Components/buyer/CartSection";
import ShippingOne from "../../../Components/buyer/ShippingOne";
import ScrollToTop from "react-scroll-to-top";
import BannerOne from "../../../Components/buyer/BannerOne";
import FeatureOne from "../../../Components/buyer/FeatureOne";
import PromotionalOne from "../../../Components/buyer/PromotionalOne";
import FlashSalesOne from "../../../Components/buyer/FlashSalesOne";
import ProductListOne from "../../../Components/buyer/ProductListOne";
import OfferOne from "../../../Components/buyer/OfferOne";
import HotDealsOne from "../../../Components/buyer/HotDealsOne";
import TopVendorsOne from "../../../Components/buyer/TopVendorsOne";
import BestSellsOne from "../../../Components/buyer/BestSellsOne";
import RecommendedOne from "../../../Components/buyer/RecommendedOne";
import DeliveryOne from "../../../Components/buyer/DeliveryOne";
import ShortProductOne from "../../../Components/buyer/ShortProductOne";
import BrandOne from "../../../Components/buyer/BrandOne";

const HomePage = () => {
  return (
    <>
      <Preloader />
      <ScrollToTop smooth color="#008000" />
      <ColorInit color={false} />
      <BannerOne />
      <FeatureOne />
      <PromotionalOne />
      <FlashSalesOne />
      <ProductListOne />
      <OfferOne />
      <RecommendedOne />

      <HotDealsOne />
      <TopVendorsOne />
      <BestSellsOne />
      <DeliveryOne />
      <ShortProductOne />
      <BrandOne />
    </>
  );
};

export default HomePage;

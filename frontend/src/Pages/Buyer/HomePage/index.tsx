import Preloader from "../../../helper/Preloader";
import ColorInit from "../../../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import BannerOne from "../../../Components/buyer/BannerOne";
import FeatureOne from "../../../Components/buyer/FeatureOne";
import ProductListOne from "../../../Components/buyer/ProductListOne";
import OfferOne from "../../../Components/buyer/OfferOne";
import RecommendedOne from "../../../Components/buyer/RecommendedOne";
import ShortProductOne from "../../../Components/buyer/ShortProductOne";

const HomePage = () => {
  return (
    <>
      <Preloader />
      <ScrollToTop smooth color="#008000" />
      <ColorInit color={false} />
      <BannerOne />
      <FeatureOne />
      <ProductListOne />
      <OfferOne />
      <RecommendedOne />
      <ShortProductOne />
    </>
  );
};

export default HomePage;

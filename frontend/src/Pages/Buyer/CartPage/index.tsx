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

const CartPage: React.FC = () => {
  return (
    <>
      {/* Initialisation des couleurs */}
      {/* <ColorInit color={true} /> */}

      {/* Scroll to top */}
      {/* <ScrollToTop smooth color="#FA6400" /> */}

      {/* Préchargement */}
      {/* <Preloader /> */}

      {/* En-tête */}
      {/* <HeaderTwo category="cart" /> */}

      {/* Fil d’Ariane */}
      {/* <Breadcrumb title="Cart" /> */}

      {/* Section du panier */}
      <CartSection />

      {/* Infos livraison */}
      <ShippingOne />

      {/* Pied de page */}
      <FooterTwo />
      <BottomFooter />
    </>
  );
};

export default CartPage;

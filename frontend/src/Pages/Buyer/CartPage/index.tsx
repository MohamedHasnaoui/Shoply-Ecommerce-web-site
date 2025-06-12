import React from "react";
import CartSection from "../../../Components/buyer/CartSection";
import ShippingOne from "../../../Components/buyer/ShippingOne";
import Preloader from "../../../helper/Preloader";

const CartPage: React.FC = () => {
  return (
    <>
      {/* Initialisation des couleurs */}
      {/* <ColorInit color={true} /> */}

      {/* Scroll to top */}
      {/* <ScrollToTop smooth color="#FA6400" /> */}

      {/* Préchargement */}
      <Preloader />

      {/* En-tête */}
      {/* <HeaderTwo category="cart" /> */}

      {/* Fil d’Ariane */}
      {/* <Breadcrumb title="Cart" /> */}

      {/* Section du panier */}
      <CartSection />

      {/* Infos livraison */}
      <ShippingOne />
    </>
  );
};

export default CartPage;

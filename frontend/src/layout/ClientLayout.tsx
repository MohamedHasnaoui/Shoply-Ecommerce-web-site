import Header from "../Components/buyer/Header";
import { Outlet } from "react-router";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "select2/dist/css/select2.min.css";
import bootstrapStyles from "../assets/ClientAssets/css/bootstrap.min.css?inline"; // Vite/Webpack-specific syntax
import mainScopedSCSS from "../assets/ClientAssets/sass/main.scoped.scss?inline";
import mainScopedCSS from "../assets/ClientAssets/css/main.scoped.css?inline";
import jqueryUICSS from "../assets/ClientAssets/css/jquery-ui.scoped.css?inline";

import { CategoryProvider, CartProvider } from "../helpers/CategoryProvider";
import FooterTwo from "../Components/buyer/FooterTwo";
import BottomFooter from "../Components/buyer/BottomFooter";

export default function ClientLayout() {
  return (
    <>
      <style>{bootstrapStyles}</style>
      <style>{mainScopedSCSS}</style>
      <style>{mainScopedCSS}</style>
      <style>{jqueryUICSS}</style>

      {/* <CategoryContext.Provider
        value={{ selectedCategory, setSelectedCategory }}
      > */}
      <CategoryProvider>
        <Header />
        <Outlet />
        {/* Pied de page */}
        <FooterTwo />
        <BottomFooter />
      </CategoryProvider>

      {/* </CategoryContext.Provider> */}
    </>
  );
}

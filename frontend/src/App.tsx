import { Routes, Route, Navigate } from "react-router";
import Login from "./Pages/Common/LoginPage";
import ClientLayout from "./layout/ClientLayout";
import Register from "./Pages/Common/RegisterPage";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import OTPVerification from "./Pages/Common/OTPVerificationPage";
import SellerLayout from "./layout/SellerLayout";
import ProductListPage from "./Pages/Seller/productListPage";
import AddProduct from "./Pages/Seller/addProductPage";
import EditProductPage from "./Pages/Seller/editProductPage";
import OrdersSellerPage from "./Pages/Seller/ordersPage";
import SellerHomePage from "./Pages/Seller/SellerHomePage";
import CustomerInfoPage from "./Pages/Seller/customerInfoPage";
import ErrorPage from "./Pages/Common/errorPage";
import { ErrorCode } from "./constants/errors";
import ShopSection from "./Pages/Buyer/ProductsList";
import CartPage from "./Pages/Buyer/CartPage";
import PaymentSuccess from "./Components/buyer/PaymentSuccess";
import ProtectedPaymentRoute from "./Components/common/ProtectedPaymentRoute";
import Wishlist from "./Components/buyer/Wishlist";
import BannerOne from "./Components/buyer/BannerOne";
import HomePage from "./Pages/Buyer/HomePage";
import ProductDetails from "./Pages/Buyer/ProductDetails";
import AdminLayout from "./layout/AdminLayout";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/seller" element={<SellerLayout />}>
            <Route path="home" element={<SellerHomePage />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route
              path="edit-product/:productId"
              element={<EditProductPage />}
            />
            <Route path="product-list" element={<ProductListPage />} />
            <Route path="orders" element={<OrdersSellerPage />} />
            <Route path="customer/:customerId" element={<CustomerInfoPage />} />
          </Route>
          <Route path='/admin' element={<AdminLayout />} >
              <Route path='users' element={<AdminHomePage/>} />
          </Route>
          <Route element={<ClientLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<OTPVerification />} />
            <Route path="/products-list" element={<ShopSection />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />

            <Route path="/" element={<HomePage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route
              path="/payment-success"
              element={
                <ProtectedPaymentRoute>
                  <PaymentSuccess />
                </ProtectedPaymentRoute>
              }
            />
          </Route>
        </Route>

        <Route path="Error/:errorCode/:message" element={<ErrorPage />} />
        <Route path="Error/:errorCode" element={<ErrorPage />} />
        <Route
          path="*"
          element={<Navigate to={`/Error/${ErrorCode.NOT_FOUND}`} />}
        />
      </Routes>
    </>
  );
}

export default App;

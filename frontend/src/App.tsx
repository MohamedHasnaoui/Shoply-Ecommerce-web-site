import { Routes, Route, Navigate } from "react-router";
import { Suspense, lazy } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { ErrorCode } from "./constants/errors";
// Layouts et routes protégées (pas lazy si petits ou essentiels)
import ProtectedRoute from "./Components/common/ProtectedRoute";
import ProtectedPaymentRoute from "./Components/common/ProtectedPaymentRoute";
import SellerLayout from "./layout/SellerLayout";
import AdminLayout from "./layout/AdminLayout";
import ClientLayout from "./layout/ClientLayout";
import PublicRoute from "./Components/common/PublicRoute";
import Preloader from "./helper/Preloader";
import UpdateProfile from "./Pages/Common/UpdateProfile";
const Login = lazy(() => import("./Pages/Common/LoginPage"));
const AboutUs = lazy(() => import("./Pages/Common/AboutUsPage"));
const Register = lazy(() => import("./Pages/Common/RegisterPage"));
const OTPVerification = lazy(
  () => import("./Pages/Common/OTPVerificationPage")
);
const ProductListPage = lazy(() => import("./Pages/Seller/productListPage"));
const AddProduct = lazy(() => import("./Pages/Seller/addProductPage"));
const EditProductPage = lazy(() => import("./Pages/Seller/editProductPage"));
const OrdersSellerPage = lazy(() => import("./Pages/Seller/ordersPage"));
const SellerHomePage = lazy(() => import("./Pages/Seller/SellerHomePage"));
const CustomerInfoPage = lazy(() => import("./Pages/Seller/customerInfoPage"));
const ErrorPage = lazy(() => import("./Pages/Common/errorPage"));
const ShopSection = lazy(() => import("./Pages/Buyer/Shop"));
const CartPage = lazy(() => import("./Pages/Buyer/CartPage"));
const PaymentSuccess = lazy(() => import("./Components/buyer/PaymentSuccess"));
const Wishlist = lazy(() => import("./Components/buyer/Wishlist"));
const HomePage = lazy(() => import("./Pages/Buyer/HomePage"));
const ProductDetails = lazy(() => import("./Pages/Buyer/ProductDetails"));
const AdminHomePage = lazy(() => import("./Pages/Admin/AdminHomePage"));
const ManageUsersAndProducts = lazy(
  () => import("./Pages/Admin/ManageUsersAndProducts")
);
const OrdersPage = lazy(() => import("./Pages/Buyer/OrdersPage"));
const CategoriesList = lazy(() => import("./Pages/Admin/CategoriesList"));
const CreateCategory = lazy(() => import("./Pages/Admin/CreateCategory"));
const EditCategory = lazy(() => import("./Pages/Admin/EditCategory"));

const ResetPasswordRequest = lazy(
  () => import("./Pages/Common/ResetPasswordRequest")
);
const ResetPassword = lazy(() => import("./Pages/Common/ResetPassword"));
function App() {
  return (
    <>
      <Suspense fallback={<Preloader />}>
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
              <Route
                path="customer/:customerId"
                element={<CustomerInfoPage />}
              />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="" element={<AdminHomePage />} />
              <Route
                path="manageUsersAndProducts"
                element={<ManageUsersAndProducts />}
              />
              <Route path="categories" element={<CategoriesList />} />
              <Route path="categories/add" element={<CreateCategory />} />
              <Route
                path="categories/edit/:categId"
                element={<EditCategory />}
              />
            </Route>
          </Route>
          <Route element={<ClientLayout />}>
            <Route element={<PublicRoute />}>
              <Route path="/about-us" element={<AboutUs />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<OTPVerification />} />
              <Route path="/resetpassword" element={<ResetPasswordRequest />} />
              <Route
                path="/resetpassword/:userId/:token"
                element={<ResetPassword />}
              />
            </Route>
            <Route path="/shop" element={<ShopSection />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<UpdateProfile />} />

              <Route path="/myOrders" element={<OrdersPage />} />
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
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;

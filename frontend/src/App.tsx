import { Routes, Route } from "react-router";
import Login from "./Pages/Common/LoginPage";
import ClientLayout from "./layout/ClientLayout";
import Register from "./Pages/Common/RegisterPage";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import OTPVerification from "./Pages/Common/OTPVerificationPage";
import SellerLayout from "./layout/SellerLayout";
import AddProduct from "./Pages/Seller/addProductPage";
function App() {
  return (
    <>
      <Routes>
        <Route element={<SellerLayout />}>
          <Route path="/seller" element={<AddProduct />} />
        </Route>
        <Route element={<ClientLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<OTPVerification />} />
          <Route element={<ProtectedRoute />}>
            {/* ! protected routes here */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

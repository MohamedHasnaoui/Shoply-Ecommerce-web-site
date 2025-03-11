import {Routes,Route}from 'react-router'
import Login from "./Pages/Common/LoginPage"
import ClientLayout from "./layout/ClientLayout"
import Register from "./Pages/Common/RegisterPage"
import ProtectedRoute from './Components/common/ProtectedRoute'
import OTPVerification from './Pages/Common/OTPVerificationPage'
import SellerLayout from './layout/SellerLayout'
import ProductListPage from './Pages/Seller/productListPage'
import AddProduct from './Pages/Seller/addProductPage'
function App() {

  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<SellerLayout />} >
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/seller' element={<ProductListPage />} />
        </Route>
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
  )
}

export default App

import {Routes,Route}from 'react-router'
import Login from "./Pages/LoginPage"
import ClientLayout from "./layout/ClientLayout"
import Register from "./Pages/RegisterPage"
import ProtectedRoute from './Components/common/ProtectedRoute'
import OTPVerification from './Pages/OTPVerificationPage'
import SellerLayout from './layout/SellerLayout'
function App() {

  return (
    <>
    <Routes>
      <Route element={<SellerLayout />} path='/' />
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

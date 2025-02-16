import {Routes,Route}from 'react-router'
import Login from "./Pages/LoginPage"
import ClientLayout from "./layout/ClientLayout"
import Register from "./Pages/RegisterPage"
import ProtectedRoute from './Components/ProtectedRoute'
import OTPVerification from './Pages/OTPVerificationPage'

function App() {

  return (
    <>
    <Routes>
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

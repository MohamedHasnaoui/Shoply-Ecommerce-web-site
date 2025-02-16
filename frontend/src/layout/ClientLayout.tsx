import Header from '../Components/Header'
import {Outlet} from 'react-router'
export default function ClientLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

import { useEffect, useState } from "react"
import Header from '../Components/admin/Header'
import Sidebar from "../Components/admin/Sidebar"
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Role } from "../generated";

export default function AdminLayout() {
    const [readyCSS,setReadyCSS] = useState(false);
    const user = useSelector((state:RootState)=>state.auth.currentUser);
    useEffect(() => {
        // Dynamically import the CSS file
        import('../assets/sellerAssets/css/codebase.css')
          .then(() => {
            setReadyCSS(true);
          })
    
        return () => {
          const links = document.querySelectorAll('link[href*="codebase.css"]');
          links.forEach((link) => link.remove());
        };
      }, []); 
    const [isSidebarOpen,setIsSidebarOpen] = useState(false)
    const [isQuickAccessOpen,setIsQuickAccessOpen] = useState(false)
    const changeSidebarState = ()=> setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = ()=> setIsSidebarOpen(false);
    const openQuickAccess = () => setIsQuickAccessOpen(true);
    if(!user || user.role != Role.Admin) return <Navigate to='/login' /> //! unothorized
    return ( readyCSS &&
    <>
    <div id="page-container" className={`enable-page-overlay side-scroll page-header-modern main-content-boxed ${isQuickAccessOpen? "side-overlay-o":""}  ${isSidebarOpen? "sidebar-o sidebar-o-xs":""}`}>
        <Sidebar closeSidebar={closeSidebar} />
        <Header openQuickAccess={openQuickAccess} toggleSideBar={changeSidebarState} />
        <Outlet />
    </div>
    </>
  )
}

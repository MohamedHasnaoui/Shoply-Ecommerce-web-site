import { useEffect, useState } from "react"
import Header from '../Components/Seller/Header'
import Sidebar from "../Components/Seller/Sidebar"
import QuickAccess from "../Components/Seller/QuickAccess";
import { Outlet } from "react-router";

export default function SellerLayout() {
    const [readyCSS,setReadyCSS] = useState(false);
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
    const [isSidebarOpen,setIsSidebarOpen] = useState(true)
    const [isQuickAccessOpen,setIsQuickAccessOpen] = useState(true)
    const changeSidebarState = ()=> setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = ()=> setIsSidebarOpen(false);
    const openQuickAccess = () => setIsQuickAccessOpen(true);
    const closeQuickAccess = () => setIsQuickAccessOpen(false);
    return ( readyCSS &&
    <>
    <div id="page-container" className={`enable-page-overlay side-scroll page-header-modern main-content-boxed ${isQuickAccessOpen? "side-overlay-o":""}  ${isSidebarOpen? "sidebar-o sidebar-o-xs":""}`}>
        <QuickAccess closeQuickAccess={closeQuickAccess} />
        <Header openQuickAccess={openQuickAccess} toggleSideBar={changeSidebarState} />
        <Sidebar closeSidebar={closeSidebar} />
        <Outlet />
    </div>
    </>
  )
}

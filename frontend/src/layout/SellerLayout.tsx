import { useEffect, useState } from "react"
import Header from '../Components/Seller/Header'
import Sidebar from "../Components/Seller/Sidebar"

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
    const changeSidebarState = ()=> setIsSidebarOpen(!isSidebarOpen);
    return ( readyCSS &&
    <>
    <div id="page-container" className={`enable-page-overlay side-scroll page-header-modern main-content-boxed ${isSidebarOpen? "sidebar-o":""}`}>
        <Header toggleSideBar={changeSidebarState} />
        <Sidebar />
    </div>
    </>
  )
}

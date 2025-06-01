import avatar15 from "../../../assets/sellerAssets/media/avatars/avatar15.jpg" 
import SimpleBar from "simplebar-react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import ShortStatistics from "./shortStatistics";
import EditProfile from "./EditProfile";
interface propsType  {
    closeQuickAccess: ()=>void;
}
 
export default function QuickAccess(props:propsType) {
  const user = useSelector((state:RootState)=>state.auth.currentUser);
  return (
    <SimpleBar id="side-overlay">
        {/* <!-- Side Header --> */}
        <div className="content-header">
          {/* <!-- User Avatar --> */}
          <button type="button" className="img-link me-2 btn" title="Image Profile">
            <img className="img-avatar img-avatar32" src={user?.profileImg || avatar15} alt="" />
          </button>
          {/* <!-- END User Avatar --> */}

          {/* <!-- User Info --> */}
          <button type="button" className="link-fx text-body-color-dark fw-semibold fs-sm btn" title="Name">
            {user?.firstName ? user.firstName.charAt(0).toUpperCase() +". "+ (user.lastName ? user.lastName : '') : ''}
          </button>
          {/* <!-- END User Info --> */}

          {/* <!-- Close Side Overlay --> */}
          {/* <!-- Layout API, functionality initialized in Template._uiApiLayout() --> */}
          <button type="button" className="btn btn-sm btn-alt-danger ms-auto" title="Close" onClick={() => { props.closeQuickAccess() }}>
            <i className="fa fa-fw fa-times"></i>
          </button>
          {/* <!-- END Close Side Overlay --> */}
        </div>
        {/* <!-- END Side Header --> */}

        {/* <!-- Side Content --> */}
        <div className="content-side">
          {/* <!-- Search --> */}
          <div className="block pull-t pull-x">
            <div className="block-content block-content-full block-content-sm bg-body-light">
              <form action="be_pages_generic_search.html" method="POST">
                <div className="input-group">
                  <input type="text" className="form-control" id="side-overlay-search" name="side-overlay-search" placeholder="Search.." />
                  <button type="submit" className="btn btn-secondary" title="Search">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- END Search --> */}

          {/* <!-- Mini Stats --> */}
          <ShortStatistics /> 
          {/* <!-- END Mini Stats --> */}
 

          {/* <!-- Profile --> */}
          <EditProfile />
          {/* <!-- END Profile --> */} 
        </div>
        {/* <!-- END Side Content --> */}
      </SimpleBar>
  )
}

import { useEffect, useState } from 'react'
import { Role, User } from '../../generated';
import { userService } from '../../services/user/userService';
import { ApolloError } from '@apollo/client';
import { ErrorCode } from '../../constants/errors';
import { useNavigate } from 'react-router';
import { adminService } from '../../services/admin';
import { client } from '../../graphqlProvider';

const UsersTable = () => {
    const navigate = useNavigate();
    const [pageNb,setPageNb] = useState(1);
    const [pageSize,setPageSize] = useState(10);  
    const [countFilteredUsers,setCountFilteredUsers] = useState(0);
    const [users,setUsers] = useState<User[]>([]);
    const [updatingBlockedUserId, setUpdatingBlockedUserId] = useState<number | undefined>(undefined);
    const [isRoleFilterOpen, setIsRoleFilterOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);
    const [isblocked,setIsBlocked] = useState<boolean | undefined>(undefined);
    const [userId,setUserId] = useState<number | undefined>(undefined);
    const [globalError,setGlobalError] = useState<string>("");
    useEffect(()=>{
        const fetchUsers = async () => {
            const response = await userService.getUsers({pageNb,pageSize,role:selectedRole,isBlocked:isblocked,id:userId});
            if(response.data.getUsers){
                setUsers(response.data.getUsers.users);
                setCountFilteredUsers(response.data.getUsers.totalCount);
            }
        };
        try {
            fetchUsers();
        }catch(e){
             const err = e as ApolloError;
            if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                setGlobalError(err.graphQLErrors[0].message);
            }else {
                navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
            }
        }
    },[selectedRole,isblocked,pageNb,pageSize,userId,navigate]);
    const handleRoleFilterToggle = ()=>{
        setIsRoleFilterOpen(!isRoleFilterOpen);
        setIsStatusFilterOpen(false);
    }
    const handleRoleFilterChange = (role:Role | undefined)=>{
        setSelectedRole(role);
        setIsRoleFilterOpen(false);
    }
    const incrementPageNb = ()=>{
    const totalPages = Math.ceil((countFilteredUsers)/pageSize);
        if(pageNb < totalPages) setPageNb(pageNb+1);
    } 
    const decremnetPageNb = () => {
        if(pageNb > 1) setPageNb(pageNb-1);
    }
    const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
    const handleStatusFilterToggle = ()=>{
        setIsStatusFilterOpen(!isStatusFilterOpen);
        setIsRoleFilterOpen(false);
    }
    const handleStatusFilterChange = (status:boolean | undefined)=>{
        setIsBlocked(status);
        setIsStatusFilterOpen(false);
    }
    const [searchId, setSearchId] = useState<number | undefined>(undefined);
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUserId(searchId);
        setPageNb(1);
    };
    const changeUserStatus = async (user: User, isBlocked: boolean) => {
        setGlobalError("");
        try{
            setUpdatingBlockedUserId(user.id);
           await adminService.UpdateUserBlockStatus(user.id, isBlocked);
           setUsers([...users.map(u => u.id === user.id ? {...u, isBlocked} : u)]);
           await client.clearStore();
        }catch(e){
            const err = e as ApolloError;
            if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                setGlobalError(err.graphQLErrors[0].message);
            }else {
                navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
            }
        }finally{
            setUpdatingBlockedUserId(undefined);
        }
    }
  return (
    <div>
    <div className="content-heading d-flex justify-content-between align-items-center">
        <span>
            Users <small>({countFilteredUsers})</small>
        </span>
        <div className='d-flex'>
            <div className="space-x-1">
                <div className="dropdown d-inline-block">
                <button type="button" className="btn btn-sm btn-alt-secondary" onClick={handleStatusFilterToggle}>
                    <span>Status ({isblocked!==undefined ? isblocked ? "Blocked" : "Not Blocked" : "All"})</span>
                    <i className="fa fa-angle-down ms-1 opacity-50"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-end ${isStatusFilterOpen? "show":""}`} >
                  <button type="button" className={`dropdown-item ${isblocked === true ? "active" : ""}`} onClick={() => handleStatusFilterChange(true)}>
                    <i className="fa fa-fw fa-ban opacity-50 me-1"></i> Blocked
                 </button>
                    <button type="button" className={`dropdown-item ${isblocked === false ? "active" : ""}`} onClick={() => handleStatusFilterChange(false)}>
                        <i className="fa fa-fw fa-check-circle opacity-50 me-1"></i> Not Blocked
                    </button>


                    <div className="dropdown-divider"></div>
                    <button type="button" className={`dropdown-item ${isblocked===undefined? "active" : ""}`} onClick={()=>handleStatusFilterChange(undefined)}>
                        <i className="fa fa-fw fa-users opacity-50 me-1"></i> All Users
                    </button>
                </div>
            </div>
            </div>
            <div className="space-x-1">
                <div className="dropdown d-inline-block">
                <button type="button" className="btn btn-sm btn-alt-secondary" onClick={handleRoleFilterToggle}>
                    <span>Role ({selectedRole ? selectedRole : "All Users"})</span>
                    <i className="fa fa-angle-down ms-1 opacity-50"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-end ${isRoleFilterOpen? "show":""}`} >
                    <button type="button" className={`dropdown-item ${selectedRole===Role.Buyer ? "active" : ""}`} onClick={()=>handleRoleFilterChange(Role.Buyer)}>
                        <i className="fa fa-fw fa-shopping-cart opacity-50 me-1"></i> Buyer
                    </button>
                    <button type="button" className={`dropdown-item ${selectedRole===Role.Seller ? "active" : ""}`} onClick={()=>handleRoleFilterChange(Role.Seller)}>
                        <i className="fa fa-fw fa-store opacity-50 me-1"></i> Seller
                    </button>

                    <div className="dropdown-divider"></div>
                    <button type="button" className={`dropdown-item ${selectedRole===undefined? "active" : ""}`} onClick={()=>handleRoleFilterChange(undefined)}>
                        <i className="fa fa-fw fa-users opacity-50 me-1"></i> All Users
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
    <div className="block block-rounded">
    <div className="block-content bg-body-light">
            {/* <!-- Search --> */}
            <form onSubmit={handleSearchSubmit}>
            <div className="mb-4">
                <div className="input-group">
                <input type="number" className="form-control" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchId(parseInt(e.target.value))} value={searchId} placeholder="User Id.." />
                <button title="Search" type="submit" className="btn btn-primary">
                    <i className="fa fa-search"></i>
                </button>
                </div>
            </div>
            </form>
            {/* <!-- END Search --> */}
            </div>
    <div className="block-content block-content-full">
        {globalError && <div className="alert alert-danger" role="alert">{globalError}</div>}
        {/* <!-- Orders Table --> */}
        <table className="table table-borderless table-striped">
        <thead>
            <tr>
            <th style={{width: "100px"}}>ID</th>
            <th className="d-none d-sm-table-cell">Name</th>
            <th className="d-none d-sm-table-cell">Role</th>
            <th className="d-none d-sm-table-cell">Email</th>
            <th className="d-none d-sm-table-cell">Phone Number</th>
            <th className="d-none d-sm-table-cell text-end">Status</th>
            </tr>
        </thead>
        <tbody>
            { users?.map((user,key)=>{
                return (
                  <tr key={key}>
                    <td>
                      <button className="fw-semibold border-0"style={{background:"none"}}>USER.{user.id}</button>
                    </td>
                    <td>
                        {user.firstName} {user.lastName}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {user.role === Role.Buyer ? "Buyer" : user.role === Role.Seller ? "Seller" : "Admin"}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {user.email}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {user.phoneNumber}
                    </td>
                    <td className='text-end'>
                      <button type='button' className={`btn btn-sm ${user.isBlocked ? "btn-danger" : "btn-success"}`} onClick={async () => {changeUserStatus(user, !user.isBlocked);}}>
                        <i className={`fa fa-fw ${user.id===updatingBlockedUserId ? "fa-spinner fa-spin": user.isBlocked ? "fa-lock" : "fa-lock-open"} me-1`}></i>
                      </button>
                    </td>
                  </tr>
                )})}
        </tbody>
        </table>
        {/* <!-- END Orders Table --> */}

        {/* <!-- Navigation --> */}
        <nav aria-label="Orders navigation">
        <ul className="pagination justify-content-end mb-0">
                <li className="page-item">
                  <button
                    className={`page-link ${pageNb === 1 ? "disabled" : ""}`}
                    onClick={decremnetPageNb}
                  >
                    <span aria-hidden="true">
                      <i className="fa fa-angle-left"></i>
                    </span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                <li className="page-item active">
                  <button className="page-link">{pageNb}</button>
                </li>
                <li className="page-item">
                  <button
                    className={`page-link ${
                      pageNb === Math.ceil(countFilteredUsers / pageSize)
                        ? "disabled"
                        : ""
                    }`}
                    onClick={incrementPageNb}
                  >
                    <span aria-hidden="true">
                      <i className="fa fa-angle-right"></i>
                    </span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
        </nav>
        {/* <!-- END Navigation --> */}
    </div>
    </div>
    </div>
  )
}

export default UsersTable

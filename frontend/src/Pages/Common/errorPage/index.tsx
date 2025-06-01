import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router'
import Loading from '../../../Components/Seller/Loading'
import { ErrorCode } from '../../../constants/errors';
import { NotFound } from '../../../Components/common/Errors/NotFound';
import InternalServerError from '../../../Components/common/Errors/InternalServerError';
import Unauthorized from '../../../Components/common/Errors/Unauthorized';

const ErrorPage = () => {
  const [readyCSS,setReadyCSS] = useState(false);
    useEffect(() => {
        // Dynamically import the CSS file
        import('../../../assets/sellerAssets/css/codebase.css')
          .then(() => {
            setReadyCSS(true);
          })
    
        return () => {
          const links = document.querySelectorAll('link[href*="codebase.css"]');
          links.forEach((link) => link.remove());
        };
      }, []); 
  const { errorCode, message } = useParams()
  if(!readyCSS){
    return <Loading />
  }
  if(errorCode === ErrorCode.UNAUTHENTICATED){
    return <Navigate to={"/login"} />
  }
  if(errorCode === ErrorCode.NOT_FOUND){
    return <NotFound />
  } 
  if(errorCode === ErrorCode.NOT_AUTHORIZED){
    return <Unauthorized message={message}/>
  }
  return <InternalServerError message={message}/>
}

export default ErrorPage

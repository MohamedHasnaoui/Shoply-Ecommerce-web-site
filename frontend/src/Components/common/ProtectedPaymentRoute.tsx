import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { paymentService } from "../../services/payment";
import Loading from "../Seller/Loading";

const ProtectedPaymentRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [isValid, setIsValid] = useState<null | boolean>(null);

  useEffect(() => {
    const verify = async () => {
      if (!sessionId) {
        setIsValid(false);
        return;
      }
      try {
        const valid = await paymentService.verifyPayment(sessionId);
        setIsValid(!!valid);
      } catch (e) {
        setIsValid(false);
      }
    };
    verify();
  }, [sessionId]);

  if (isValid === null) return <Loading />;

  return isValid ? <>{children}</> : <Navigate to="/cart" />;
};

export default ProtectedPaymentRoute;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { paymentService } from "../../services/payment";
import { useDispatch } from "react-redux";
import {
  resetPayment,
  verifyPayment,
} from "../../redux/slices/payment/paymentSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  const [message, setMessage] = useState(
    "Vérification du paiement en cours..."
  );

  useEffect(() => {
    const checkPayment = async () => {
      if (!sessionId) {
        setMessage("Session de paiement invalide. Veuillez réessayer.");
        setTimeout(() => navigate("/cart"), 3000);
        return;
      }

      try {
        const isSuccess = await paymentService.verifyPayment(sessionId);
        if (isSuccess) {
          dispatch(verifyPayment());
          setMessage("Paiement confirmé ! Merci pour votre commande.");
          toast.success(
            "Un email de confirmation du paiement vous a été envoyé."
          );
          dispatch(resetPayment());
          setTimeout(() => navigate("/cart"), 3000);
        } else {
          setMessage("Paiement non confirmé. Veuillez réessayer.");
          dispatch(resetPayment());
          setTimeout(() => navigate("/cart"), 3000);
        }
      } catch (error) {
        toast.error("Erreur de vérification ");
        setMessage("Une erreur est survenue lors de la vérification.");
        setTimeout(() => navigate("/cart"), 3000);
      }
    };

    checkPayment();
  }, [sessionId, dispatch, navigate]);

  return (
    <div className="text-center py-40">
      <h2>{message}</h2>
      <ToastContainer />
    </div>
  );
};

export default PaymentSuccess;

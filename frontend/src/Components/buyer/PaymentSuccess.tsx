import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { paymentService } from "../../services/payment";
import { useDispatch } from "react-redux";
import { verifyPayment } from "../../redux/slices/payment/paymentSlice";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    if (!sessionId) {
      alert("Session de paiement invalide. Veuillez réessayer.");
      navigate("/cart");
      return;
    }

    paymentService
      .verifyPayment(sessionId)
      .then((payment) => {
        if (payment?.isSuccess) {
          dispatch(verifyPayment({ status: "failed" }));
          alert("Paiement confirmé ! Merci pour votre commande.");
          navigate("/cart");
        } else {
          alert("Paiement non confirmé. Veuillez réessayer.");
          navigate("/cart");
        }
      })
      .catch((error) => {
        console.error("Erreur de vérification :", error);
        alert("Une erreur est survenue lors de la vérification.");
        navigate("/cart");
      });
  }, [sessionId, dispatch, navigate]);

  return (
    <div className="text-center py-40">
      <h2>Vérification du paiement en cours...</h2>
    </div>
  );
};

export default PaymentSuccess;

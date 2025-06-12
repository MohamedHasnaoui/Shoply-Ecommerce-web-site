import { useEffect, useState } from "react";
import plcaeholder from "../assets/ClientAssets/images/icon/preloader.gif";
const Preloader: React.FC = () => {
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
    }, 500);

    return () => clearTimeout(timer); // Bonne pratique : nettoyage du timer
  }, []);

  return (
    <>
      {active ? (
        <div
          className="preloader"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {" "}
          <img src={plcaeholder} alt="Loading..." />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Preloader;

import { useEffect, useState } from "react";
import plcaeholder from "../assets/ClientAssets/images/icon/preloader.gif"
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
        <div className="preloader">
          <img src={plcaeholder} alt="Loading..." />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Preloader;

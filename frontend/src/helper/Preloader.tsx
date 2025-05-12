import { useEffect, useState } from "react";

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
          <img src="assets/images/icon/preloader.gif" alt="Loading..." />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Preloader;

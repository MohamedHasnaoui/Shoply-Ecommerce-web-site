import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

const Animation = () => {
  useEffect(() => {
    Aos.init({
      offset: 0,
      easing: "ease",
      once: true,
      duration: 1200,
    });
  }, []);

  return (
    <>
      <ScrollToTop smooth color="#E8092E" />
    </>
  );
};

export default Animation;

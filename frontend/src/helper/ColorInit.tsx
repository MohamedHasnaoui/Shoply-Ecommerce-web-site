import { useEffect } from "react";

interface ColorInitProps {
  color: boolean;
}

const ColorInit: React.FC<ColorInitProps> = ({ color }) => {
  useEffect(() => {
    if (color) {
      document.documentElement.classList.add("color-two");
    } else {
      document.documentElement.classList.remove("color-two");
    }
  }, [color]);

  return null;
};

export default ColorInit;

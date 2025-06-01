import React from "react";

interface QuantityControlProps {
  value: number;
  onChange: (newQuantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  value,
  onChange,
}) => {
  const incrementQuantity = () => onChange(value + 1);
  const decrementQuantity = () => onChange(value > 1 ? value - 1 : value);

  return (
    <div className="d-flex rounded-4 overflow-hidden">
      <button
        type="button"
        onClick={decrementQuantity}
        title="Decrease quantity"
        className="quantity__minus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
      >
        <i className="ph ph-minus" />
      </button>
      <input
        type="number"
        className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-4"
        value={value}
        min={1}
        readOnly
      />
      <button
        type="button"
        title="Increase quantity"
        onClick={incrementQuantity}
        className="quantity__plus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
      >
        <i className="ph ph-plus" />
      </button>
    </div>
  );
};

export default QuantityControl;

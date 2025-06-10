import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useCategory } from "../../helpers/useCategory";
import { Category } from "../../generated";
import { productService } from "../../services/product";
interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-right" />
    </button>
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-left" />
    </button>
  );
};

const FeatureOne: React.FC = () => {
  const { selectedCategory, setSelectedCategory, productNameFilter } =
    useCategory();

  const [productCategories, setProductCategories] = useState<
    Array<Category | null>
  >([]);
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category | undefined) => {
    setSelectedCategory(category);
    navigate("/products-list");
    alert(`Category selected: ${category?.name}`);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const response = await productService.getCatgories();
      if (response.data.getAllCategories) {
        setProductCategories(response.data.getAllCategories);
      }
    };
    fetchCategoryProducts();
  }, [selectedCategory, productNameFilter]);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 10,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1699, settings: { slidesToShow: 9 } },
      { breakpoint: 1599, settings: { slidesToShow: 8 } },
      { breakpoint: 1399, settings: { slidesToShow: 6 } },
      { breakpoint: 992, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 575, settings: { slidesToShow: 3 } },
      { breakpoint: 424, settings: { slidesToShow: 2 } },
      { breakpoint: 359, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="feature" id="featureSection">
      <div className="container container-lg">
        <div className="position-relative arrow-center">
          <div className="flex-align">
            <button
              type="button"
              id="feature-item-wrapper-prev"
              className="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
            >
              <i className="ph ph-caret-left" />
            </button>
            <button
              type="button"
              id="feature-item-wrapper-next"
              className="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
            >
              <i className="ph ph-caret-right" />
            </button>
          </div>
          <div className="feature-item-wrapper">
            <Slider {...settings}>
              {productCategories.map((item, index) => (
                <div className="feature-item text-center" key={index}>
                  <div className="feature-item__thumb rounded-circle">
                    <Link
                      onClick={() => handleCategoryClick(category ?? undefined)}
                      to="/products-list"
                      className="w-100 h-100 flex-center"
                    >
                      <img src={item?.image ?? ""} alt={item?.name ?? ""} />
                    </Link>
                  </div>
                  <div className="feature-item__content mt-16">
                    <h6 className="text-lg mb-8">
                      <Link
                        onClick={() => handleCategoryClick(item ?? undefined)}
                        to="/products-list"
                        className="text-inherit"
                      >
                        {item?.name}
                      </Link>
                    </h6>
                    <span className="text-sm text-gray-400">
                      {item?.productCount} Products
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import Slider from 'react-slick';
import ArrowProps from "react-slick";
import { Product } from '../../generated';

interface PropsType{
    products:Product[];
}
const ProductsSlider = (props:PropsType) => {
    const SampleNextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
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
        className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-left" />
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          arrows: true,
        },
      },
    ],
  };
  const [products2D,setProducts2D] = useState<Product[][]>([])
  
  useEffect(()=>{
    const p2d :Product[][]=[];
    let p :Product[]=[];
    let index = 1;
    while(index<=props.products.length){
        p.push(props.products[index-1]);
        if(index%4===0){
            p2d.push([...p]);
            p=[];
        }
        index++;
    }
     p2d.push(p);
    console.log("p2d",p2d);
    setProducts2D(p2d);
  },[props.products])
  return (
     <Slider {...settings}>
        {products2D.map((productArr,key)=>{
          if(productArr.length)
            return (
                <div key={key}>
                    {productArr.map((product,key)=>{
                        return (
                            <div key={key} className="flex-align gap-16 mb-40">
                                <div
                                 style={{
                                        backgroundImage: `url("${product?.images ? product?.images[0] : ""}")`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                       }}
                                className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                                <Link
                                    to={`product-details/${product.id}`}
                                    className="link"
                                   
                                >
                                </Link>
                                </div>
                                <div className="product-card__content mt-12">
                                <div className="flex-align gap-6">
                                    <span className="text-xs fw-bold text-gray-500">
                                    {product.rating}
                                    </span>
                                    <span className="text-15 fw-bold text-warning-600 d-flex">
                                    <i className="ph-fill ph-star" />
                                    </span>
                                    <span className="text-xs fw-bold text-gray-500">
                                    {product.numberOfReviews}
                                    </span>
                                </div>
                                <h6 className="title text-lg fw-semibold mt-8 mb-8">
                                    <Link
                                    to={`product-details/${product.id}`}
                                    className="link text-line-1"
                                    >
                                    {product.name}
                                    </Link>
                                </h6>
                                <div className="product-card__price flex-align gap-8">
                                    <span className="text-heading text-md fw-semibold d-block">
                                    {product.price} DH
                                    </span>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        })}
    </Slider>
  )
}

export default ProductsSlider

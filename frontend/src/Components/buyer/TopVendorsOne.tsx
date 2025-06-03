import React from "react";
import { Link } from "react-router-dom";

interface VendorCardProps {
  logoSrc: string;
  title: string;
  deliveryTime: string;
  offerText: string;
  productImages: string[];
}

const VendorCard: React.FC<VendorCardProps> = ({
  logoSrc,
  title,
  deliveryTime,
  offerText,
  productImages,
}) => (
  <div className="col-xxl-3 col-lg-4 col-sm-6">
    <div className="vendor-card text-center px-16 pb-24">
      <div className="">
        <img
          src={logoSrc}
          alt={`${title} logo`}
          className="vendor-card__logo m-12"
        />
        <h6 className="title mt-32">{title}</h6>
        <span className="text-heading text-sm d-block">{deliveryTime}</span>
        <Link
          to="/shop"
          className="btn btn-main-two rounded-pill py-6 px-16 text-12 mt-8"
        >
          {offerText}
        </Link>
      </div>
      <div className="vendor-card__list mt-22 flex-center flex-wrap gap-8">
        {productImages.map((imageSrc: string, index: number) => (
          <div
            key={index}
            className="vendor-card__item bg-white rounded-circle flex-center"
          >
            <img src={imageSrc} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface Vendor {
  id: number;
  logoSrc: string;
  title: string;
  deliveryTime: string;
  offerText: string;
  productImages: string[];
}

const TopVendorsOne: React.FC = () => {
  const vendors: Vendor[] = [
    {
      id: 1,
      logoSrc: "assets/images/thumbs/vendor-logo1.png",
      title: "Organic Market",
      deliveryTime: "Delivery by 6:15am",
      offerText: "$5 off Snack & Candy",
      productImages: [
        "assets/images/thumbs/vendor-img1.png",
        "assets/images/thumbs/vendor-img2.png",
        "assets/images/thumbs/vendor-img3.png",
        "assets/images/thumbs/vendor-img4.png",
        "assets/images/thumbs/vendor-img5.png",
      ],
    },
    {
      id: 2,
      logoSrc: "assets/images/thumbs/vendor-logo2.png",
      title: "Safeway",
      deliveryTime: "Delivery by 6:15am",
      offerText: "$5 off Snack & Candy",
      productImages: [
        "assets/images/thumbs/vendor-img1.png",
        "assets/images/thumbs/vendor-img2.png",
        "assets/images/thumbs/vendor-img3.png",
        "assets/images/thumbs/vendor-img4.png",
        "assets/images/thumbs/vendor-img5.png",
      ],
    },
    {
      id: 3,
      logoSrc: "assets/images/thumbs/vendor-logo3.png",
      title: "Food Max",
      deliveryTime: "Delivery by 6:15am",
      offerText: "$5 off Snack & Candy",
      productImages: [
        "assets/images/thumbs/vendor-img1.png",
        "assets/images/thumbs/vendor-img2.png",
        "assets/images/thumbs/vendor-img3.png",
        "assets/images/thumbs/vendor-img4.png",
        "assets/images/thumbs/vendor-img5.png",
      ],
    },
    {
      id: 4,
      logoSrc: "assets/images/thumbs/vendor-logo4.png",
      title: "HRmart",
      deliveryTime: "Delivery by 6:15am",
      offerText: "$5 off Snack & Candy",
      productImages: [
        "assets/images/thumbs/vendor-img1.png",
        "assets/images/thumbs/vendor-img2.png",
        "assets/images/thumbs/vendor-img3.png",
        "assets/images/thumbs/vendor-img4.png",
        "assets/images/thumbs/vendor-img5.png",
      ],
    },
    {
      id: 5,
      logoSrc: "assets/images/thumbs/vendor-logo5.png",
      title: "Lucky Supermarket",
      deliveryTime: "Delivery by 6:15am",
      offerText: "$5 off Snack & Candy",
      productImages: [
        "assets/images/thumbs/vendor-img1.png",
        "assets/images/thumbs/vendor-img2.png",
        "assets/images/thumbs/vendor-img3.png",
        "assets/images/thumbs/vendor-img4.png",
        "assets/images/thumbs/vendor-img5.png",
      ],
    },
    {
      id: 6,
      logoSrc: "assets/images/thumbs/vendor-logo6.png",
      title: "Arico Farmer",
      deliveryTime: "Delivery by 6:15am",
      offerText: "$5 off Snack & Candy",
      productImages: [
        "assets/images/thumbs/vendor-img1.png",
        "assets/images/thumbs/vendor-img2.png",
        "assets/images/thumbs/vendor-img3.png",
        "assets/images/thumbs/vendor-img4.png",
        "assets/images/thumbs/vendor-img5.png",
      ],
    },
    {
      id: 7,
      logoSrc: "assets/images/thumbs/vendor-logo7.png",
      title: "Farmer Market",
      deliveryTime: "Delivery by 6:15am",
      offerText: "$5 off Snack & Candy",
      productImages: [
        "assets/images/thumbs/vendor-img1.png",
        "assets/images/thumbs/vendor-img2.png",
        "assets/images/thumbs/vendor-img3.png",
        "assets/images/thumbs/vendor-img4.png",
        "assets/images/thumbs/vendor-img5.png",
      ],
    },
    {
      id: 8,
      logoSrc: "assets/images/thumbs/vendor-logo8.png",
      title: "Foodsco",
      deliveryTime: "Delivery by 6:15am",
      offerText: "$5 off Snack & Candy",
      productImages: [
        "assets/images/thumbs/vendor-img1.png",
        "assets/images/thumbs/vendor-img2.png",
        "assets/images/thumbs/vendor-img3.png",
        "assets/images/thumbs/vendor-img4.png",
        "assets/images/thumbs/vendor-img5.png",
      ],
    },
  ];

  return (
    <section className="top-vendors py-80">
      <div className="container container-lg">
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">Weekly Top Vendors</h5>
            <Link
              to="/shop"
              className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
            >
              All Vendors
            </Link>
          </div>
        </div>
        <div className="row gy-4 vendor-card-wrapper">
          {vendors.map((vendor: Vendor) => (
            <VendorCard
              key={vendor.id}
              logoSrc={vendor.logoSrc}
              title={vendor.title}
              deliveryTime={vendor.deliveryTime}
              offerText={vendor.offerText}
              productImages={vendor.productImages}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVendorsOne;

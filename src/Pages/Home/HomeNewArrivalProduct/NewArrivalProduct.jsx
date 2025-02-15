import { useState } from "react";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight } from "@mui/icons-material";


// Import Product Images
import img1 from "../../../assets/LW1DTWS_030722_1.webp";
import img2 from "../../../assets/LW2ELES_069005_1.webp";
import img3 from "../../../assets/LW3IKTS_0001_1.webp";
import img4 from "../../../assets/LW3ILMS_069005_1.webp";

// Import Color Images (example swatches)
import colorimg1 from "../../../assets/payment/0001.webp";
import colorimg2 from "../../../assets/payment/33454.webp";
import colorimg3 from "../../../assets/payment/35955.webp";
import colorimg4 from "../../../assets/payment/68872.webp";
import colorimg5 from "../../../assets/payment/69005.webp";
import colorimg6 from "../../../assets/payment/69401.webp";
import { useNavigate } from "react-router-dom";


// Sample Products with Color Variations & Color Images
const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: "$24.99",
    image: img1,
    colors: [
      "#000", "#FF5733", "#1E90FF", "#32CD32", "#8B4513",
      "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"
    ],
    // Example: reuse the same color swatches or assign different ones
    colorImages: [
      colorimg1, colorimg2, colorimg3, colorimg4, colorimg5,
      colorimg6, colorimg1, colorimg2, colorimg3, colorimg4
    ]
  },

  {
    id: 2,
    name: "Elegant Dress",
    price: "$49.99",
    image: img2,
    colors: [
      "#8A2BE2", "#FFD700", "#DC143C", "#00FFFF", "#4B0082",
      "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"
    ],
    colorImages: [
      colorimg2, colorimg3, colorimg4, colorimg5, colorimg6,
      colorimg2, colorimg3, colorimg4, colorimg5, colorimg6
    ]
  },

  {
    id: 3,
    name: "Stylish Sneakers",
    price: "$79.99",
    image: img3,
    colors: [
      "#228B22", "#FF1493", "#FFA500", "#7FFF00", "#FF4500",
      "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"
    ],
    colorImages: [
      colorimg3, colorimg4, colorimg5, colorimg6, colorimg1,
      colorimg3, colorimg4, colorimg5, colorimg6, colorimg1
    ]
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: "$59.99",
    image: img4,
    colors: [
      "#808080", "#4682B4", "#A52A2A", "#FF6347", "#FFFF00",
      "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"
    ],
    colorImages: [
      colorimg4, colorimg5, colorimg6, colorimg1, colorimg2,
      colorimg4, colorimg5, colorimg6, colorimg1, colorimg2
    ]
  },
  // ... add more products if needed
];

const NextArrow = ({ onClick }) => (
  <button className="arrow next" onClick={onClick}>
    <ArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="arrow prev" onClick={onClick}>
    <ArrowLeft />
  </button>
);

// Custom Arrows for the Color Slider
const CustomNextArrow = ({ onClick }) => (
  <button className="custom-arrow next" onClick={onClick}>
    <ArrowForwardIos />
  </button>
);

const CustomPrevArrow = ({ onClick }) => (
  <button className="custom-arrow prev" onClick={onClick}>
    <ArrowBackIos />
  </button>
);

const NewArrivalProduct = () => {
  // Use an object to store the selected color index per product.
  // Default to index 0 if not set.
  const [activeColor, setActiveColor] = useState({});
  const navigateUrl = useNavigate()

  // Settings for Main Product Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // Settings for the Color Slider
  const colorSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };


  const navigateLink = () => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
    navigateUrl("/product-details");
  }

  return (
    <section className="arrival-section">
      <h1>What’s new this week.</h1>
      <div className="bar"></div>

      <div className="slider-container">
        <Slider {...settings}>
          {products.map((product) => {
            // Get the selected color index; default to 0.
            const selectedColorIndex = activeColor[product.id] ?? 0;
            return (
              <div key={product.id} className="product-card">
                {/* Product Image */}
                <div className="image-container" onClick={navigateLink}>
                  <img src={product.image} alt={product.name} />
                </div>

                {/* Color Slider – placed below the image */}
                <div className="colors">

                  <Slider {...colorSettings}>
                    {product.colorImages.map((colorImg, index) => (
                      <div key={index} className="color-slide">
                        <img
                          src={colorImg}
                          alt={`Color option ${index}`}
                          className={`color ${selectedColorIndex === index ? "active" : ""}`}
                          onClick={() =>
                            setActiveColor({ ...activeColor, [product.id]: index })
                          }
                        />
                      </div>
                    ))}
                  </Slider>

                </div>

                {/* Product Details */}
                <div className="details">
                  <h3>
                    {product.name}
                  </h3>
                  <span className="span">
                    <p className="price">{product.price}</p>
                  </span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="button-div">
        <button className="button">SHOP {"WHAT'S"} NEW</button>
      </div>
    </section>
  );
};

export default NewArrivalProduct;

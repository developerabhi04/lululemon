import { useState } from "react";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Link } from "@mui/material";

// Import Images (Ensure these files exist)
import img1 from "../../../assets/LW1DTWS_030722_1.webp";
import img2 from "../../../assets/LW2ELES_069005_1.webp";
import img3 from "../../../assets/LW3IKTS_0001_1.webp";
import img4 from "../../../assets/LW3ILMS_069005_1.webp";

// Sample Products with Color Variations
const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: "$24.99",
    image: img1,
    colors: ["#000", "#FF5733", "#1E90FF", "#32CD32", "#8B4513", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
  },
  {
    id: 2,
    name: "Elegant Dress",
    price: "$49.99",
    image: img2,
    colors: ["#8A2BE2", "#FFD700", "#DC143C", "#00FFFF", "#4B0082", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
  },
  {
    id: 3,
    name: "Stylish Sneakers",
    price: "$79.99",
    image: img3,
    colors: ["#228B22", "#FF1493", "#FFA500", "#7FFF00", "#FF4500", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: "$59.99",
    image: img4,
    colors: ["#808080", "#4682B4", "#A52A2A", "#FF6347", "#FFFF00", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: "$59.99",
    image: img3,
    colors: ["#808080", "#4682B4", "#A52A2A", "#FF6347", "#FFFF00", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: "$59.99",
    image: img2,
    colors: ["#808080", "#4682B4", "#A52A2A", "#FF6347", "#FFFF00", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
  },
  {
    id: 7,
    name: "Denim Jacket",
    price: "$59.99",
    image: img1,
    colors: ["#808080", "#4682B4", "#A52A2A", "#FF6347", "#FFFF00", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
  },
  
];

// Custom Arrow Components for Main Product Slider
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
  const [activeColor, setActiveColor] = useState({});

  // Settings for Product Slider
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

  return (
    <section className="arrival-section">
      <h1>What’s new this week.</h1>
      <div className="bar"></div>

      <div className="slider-container">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="product-card">

              {/* Image with Hover Effect */}
              <div className="image-container">
                <img src={product.image} alt={product.name} />

                {/* Color Slider */}
                <div className="colors">
                  <Slider
                    dots={false}
                    infinite={true}
                    speed={300}
                    slidesToShow={7}
                    slidesToScroll={1}
                    // arrows={true}
                    nextArrow={<CustomNextArrow />}  // Custom right arrow
                    prevArrow={<CustomPrevArrow />}  // Custom left arrow
                  >
                    {product.colors.map((color, index) => (
                      <div key={index} className="color-slide">
                        <span
                          className={`color ${activeColor[product.id] === color ? "active" : ""}`}
                          style={{ background: color }}
                          onClick={() => setActiveColor({ ...activeColor, [product.id]: color })}
                        ></span>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>

              {/* Product Name and Price */}
              <div className="details">
                <h3>
                  <Link to="/product-detail" className="link">
                    {product.name}
                  </Link>
                </h3>
                <span className="span">
                  <p className="price">{product.price}</p>
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="button-div">
        <button className="button"> SHOP {"WHAT'S"} NEW</button>
      </div>
    </section>
  );
};

export default NewArrivalProduct;

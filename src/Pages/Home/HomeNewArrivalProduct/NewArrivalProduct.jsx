import { useState } from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import img1 from "../../../assets/LW1DTWS_030722_1.webp";
import img2 from "../../../assets/LW1DTWS_030722_1.webp";
import img3 from "../../../assets/LW1DTWS_030722_1.webp";
import img4 from "../../../assets/LW1DTWS_030722_1.webp";

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: "$24.99",
    image: img1,
    colors: ["#000", "#FF5733", "#1E90FF"],
  },
  {
    id: 2,
    name: "Elegant Dress",
    price: "$49.99",
    image: img2,
    colors: ["#8A2BE2", "#FFD700", "#DC143C"],
  },
  {
    id: 3,
    name: "Stylish Sneakers",
    price: "$79.99",
    image: img3,
    colors: ["#228B22", "#FF1493", "#FFA500"],
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: "$59.99",
    image: img4,
    colors: ["#808080", "#4682B4", "#A52A2A"],
  }
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

const NewArrivalProduct = () => {
  const [activeColor, setActiveColor] = useState({});

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
              <div className="image-container">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="details">
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <div className="colors">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className={`color ${activeColor[product.id] === color ? "active" : ""}`}
                      style={{ background: color }}
                      onClick={() => setActiveColor({ ...activeColor, [product.id]: color })}
                    ></span>
                  ))}
                </div>
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

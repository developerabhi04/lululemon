import { useState, useEffect } from "react";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivalProducts } from "../../../redux/slices/productSlices"; // Import the thunk
import { useNavigate } from "react-router-dom";

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
  const [hoveredImage, setHoveredImage] = useState({});
  const navigateUrl = useNavigate();

  const dispatch = useDispatch();
  const { products, loading, error, selectedColor } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchNewArrivalProducts(selectedColor)); // Fetch new arrival products on component mount
  }, [dispatch, selectedColor]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // Settings for Color Slider
  const colorSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const navigateLink = (id) => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
    navigateUrl(`/product-details/${id}`); // Navigate to product details page with ID
  };



  return (
    <section className="arrival-section">
      <h1>What’s new this week.</h1>
      <div className="bar"></div>

      <div className="slider-container">
        <Slider {...settings}>

          {products.map((product) => (
            <div key={product._id} className="product-card">
              {/* Product Image */}
              <div className="image-container"
                onClick={() => navigateLink(product._id)}
                onMouseEnter={() => setHoveredImage((prev) => ({ ...prev, [product._id]: product.photos[1]?.url || product.photos[0]?.url, }))}
                onMouseLeave={() => setHoveredImage((prev) => ({ ...prev, [product._id]: null }))}
              >
                <img src={hoveredImage[product._id] || product.photos[0]?.url} alt={product.name} />
              </div>

              {/* Color Slider */}
              <div className="colors">
                <Slider {...colorSettings}>
                  {product.colors.map((color, index) => (
                    <div key={index} className="color-slide">
                      <img src={color.url}
                        alt={`Color ${index}`}
                        className="color"
                        onMouseEnter={() => setHoveredImage((prev) => ({...prev,[product._id]: color.url,}))}
                        onMouseLeave={() => setHoveredImage((prev) => ({...prev, [product._id]: product.photos[1]?.url || product.photos[0]?.url,})) }
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Product Details */}
              <div className="details">
                <h3>{product.name}</h3>
                <span className="span">
                  <p className="price">${product.price.toFixed(2)}</p>
                </span>
              </div>
            </div>
          ))}

        </Slider>
      </div>

      <div className="button-div">
        <button className="button">SHOP {"WHAT'S"} NEW</button>
      </div>
    </section>
  );
};

export default NewArrivalProduct;

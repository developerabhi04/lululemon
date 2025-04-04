import { useState, useEffect } from "react";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivalProducts } from "../../../redux/slices/productSlices";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error, selectedColor } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchNewArrivalProducts(selectedColor));
  }, [dispatch, selectedColor]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Main slider settings for products
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

  // Settings for the inner color slider
  const colorSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  // Modified navigateLink now accepts an image parameter and passes it as a query parameter.
  const navigateLink = (id, image) => {
    window.scrollTo(0, 0);
    navigate(`/product-details/${id}?selectedImage=${encodeURIComponent(image)}`);
  };

  // When a color is hovered, store both the image and (optionally) its color name.
  const handleColorHover = (productId, imageUrl) => {
    setHoveredImage((prev) => ({
      ...prev,
      [productId]: imageUrl,
    }));
  };


  const HandleUrl = () => {
    navigate("/products")
  }

  return (
    <section className="arrival-section">
      <h1>What’s new this week.</h1>
      <div className="bar"></div>
      <div className="slider-container">
        <Slider {...settings}>
          {products.map((product) => {
            // Use the first image from the first color variant as default.
            const firstColorImage =
              product.colors && product.colors.length > 0 &&
                product.colors[0].photos && product.colors[0].photos.length > 0
                ? product.colors[0].photos[0].url
                : "https://via.placeholder.com/50";
            return (
              <div key={product._id} className="product-card">
                {/* Product Image */}
                <div
                  className="image-container"
                  onClick={() =>
                    navigateLink(
                      product._id,
                      hoveredImage[product._id] || firstColorImage
                    )
                  }
                >
                  <img
                    src={hoveredImage[product._id] || firstColorImage}
                    alt={product.name}
                  />
                </div>
                {/* Color Slider */}
                {product.colors?.length > 0 && (
                  <div className="colors">
                    <Slider {...colorSettings}>
                      {product.colors
                        .filter((color) => color.photos && color.photos.length > 0)
                        .map((color, index) => (
                          <div key={index} className="color-slide">
                            <img
                              src={color.photos[0].url}
                              alt={`Color option ${index}`}
                              className="color"
                              onMouseEnter={() =>
                                handleColorHover(product._id, color.photos[0].url)
                              }
                            />
                          </div>
                        ))}
                    </Slider>
                  </div>
                )}
                {/* Product Details */}
                <div className="details">
                  <h3>{product.name}</h3>
                  <span className="span">
                    <p className="price">${product.price.toFixed(2)}</p>
                  </span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="button-div">
        <button className="button" onClick={HandleUrl}>SHOP {"WHAT'S"} NEW</button>
      </div>
    </section>
  );
};

export default NewArrivalProduct;

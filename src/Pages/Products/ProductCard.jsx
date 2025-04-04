import { FavoriteBorder, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

// Custom Arrow Components for the color slider
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

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    // Use the first image from the first color variant as the default image.
    const defaultImage =
        product.colors?.[0]?.photos?.[0]?.url || "https://via.placeholder.com/50";
    const [hoveredImage, setHoveredImage] = useState(defaultImage);

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

    // Navigate to the product details page
    const navigateToProduct = () => {
        window.scrollTo(0, 0);
        navigate(`/product-details/${product._id}`);
    };

    return (
        <div className="product-card">
            <div className="wishlist">
                <FavoriteBorder />
            </div>

            {/* Main product image with hover effect */}
            <div
                className="product-image"
                onClick={navigateToProduct}
                onMouseEnter={() => {
                    // Use the second image from the first color variant if available, else default.
                    const secondImage = product.colors?.[0]?.photos?.[1]?.url;
                    setHoveredImage(secondImage || defaultImage);
                }}
                onMouseLeave={() => setHoveredImage(defaultImage)}
            >
                <img src={hoveredImage} alt={product.name} />
            </div>

            {/* Color variants slider */}
            {product.colors?.length > 0 && (
                <div className="colors">
                    <Slider {...colorSettings}>
                        {product.colors.map((color, index) => (
                            <div key={index} className="color-slide">
                                <img
                                    src={
                                        color.photos && color.photos.length > 0
                                            ? color.photos[0].url
                                            : "https://via.placeholder.com/30"
                                    }
                                    alt={color.colorName || `Color ${index + 1}`}
                                    className="color"
                                    onMouseEnter={() =>
                                        setHoveredImage(
                                            color.photos && color.photos.length > 0
                                                ? color.photos[0].url
                                                : defaultImage
                                        )
                                    }
                                    onMouseLeave={() => setHoveredImage(defaultImage)}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {/* Product details */}
            <div className="product-details">
                <h4>{product.name}</h4>
                <span className="span">
                    <p className="price">${product.price?.toFixed(2)}</p>
                </span>
            </div>
        </div>
    );
};

export default ProductCard;

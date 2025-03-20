import { FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNewArrivalProducts } from "../../redux/slices/productSlices";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";



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

const ProductCard = () => {
    const navigateUrl = useNavigate()
    const dispatch = useDispatch();

    const [hoveredImage, setHoveredImage] = useState({});

    // Settings for Main Product Slider

    const { products, loading, error, selectedColor } = useSelector((state) => state.products);





    useEffect(() => {
        dispatch(fetchNewArrivalProducts(selectedColor)); // Fetch new arrival products on component mount
    }, [dispatch, selectedColor]);
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


    const navigateLink = (id) => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
        navigateUrl(`/product-details/${id}`);
    }

    return (
        <>
            <div className="products-grid">

                {products.map((product) => (
                    <div className="product-card" key={product._id}>

                        {/* Wishlist Button */}
                        <div className="wishlist">
                            <FavoriteBorder />
                        </div>

                        {/* Product Image */}
                        <div className="product-image" onClick={() => navigateLink(product._id)}
                            onMouseEnter={() => setHoveredImage((prev) => ({ ...prev, [product._id]: product.photos[1]?.url || product.photos[0]?.url, }))}
                            onMouseLeave={() => setHoveredImage((prev) => ({ ...prev, [product._id]: null }))}
                        >
                            <img src={hoveredImage[product._id] || product.photos[0]?.url} alt={product.name} />
                        </div>

                        {/* Color Slider – placed below the image */}
                        <div className="colors">

                            <Slider {...colorSettings}>
                                {product.colors.map((color, index) => (
                                    <div key={index} className="color-slide">
                                        <img src={color.url}
                                            alt={`Color option ${index}`}
                                            className="color"
                                            onMouseEnter={() => setHoveredImage((prev) => ({ ...prev, [product._id]: color.url, }))}
                                            onMouseLeave={() => setHoveredImage((prev) => ({ ...prev, [product._id]: product.photos[1]?.url || product.photos[0]?.url, }))}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {/* Product Details */}
                        <div className="product-details">
                            <h4>
                                {product.name}
                            </h4>
                            <span className="span">
                                <p className="price">${product.price.toFixed(2)}</p>
                            </span>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default ProductCard
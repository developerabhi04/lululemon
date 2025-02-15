import { useState } from "react";
// import colour1 from "../../assets/LW1DTWS_030722_1.webp";
// import colour2 from "../../assets/LW1DTWS_030722_1.webp";
// import colour3 from "../../assets/LW1DTWS_030722_1.webp";
// import colour4 from "../../assets/LW1DTWS_030722_1.webp";
import Slider from "react-slick";
import Category from "../Home/Category/Category";
import { Add, ArrowBackIos, ArrowForwardIos,  Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";




// Import Product Images
import img1 from "../../assets/LW1DTWS_030722_1.webp";
import img2 from "../../assets/LW2ELES_069005_1.webp";
import img3 from "../../assets/LW3IKTS_0001_1.webp";
import img4 from "../../assets/LW3ILMS_069005_1.webp";

// Import Color Images (example swatches)
import colorimg1 from "../../assets/payment/0001.webp";
import colorimg2 from "../../assets/payment/33454.webp";
import colorimg3 from "../../assets/payment/35955.webp";
import colorimg4 from "../../assets/payment/68872.webp";
import colorimg5 from "../../assets/payment/69005.webp";
import colorimg6 from "../../assets/payment/69401.webp";

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

const Products = () => {
    // Use an object to store the selected color index per product.
    // Default to index 0 if not set.
    const [activeColor, setActiveColor] = useState({});
    const navigateUrl = useNavigate()

    // Settings for Main Product Slider
   

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


    const [filters, setFilters] = useState({
        category: false,
        sizeAlphabet: false,
        sizeNumber: false,
        color: false,
        price: false,
    });

    const toggleFilter = (filter) => {
        setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
    };


    return (
        <section className="products-section">
            <Category showHeading={false} showBar={false} />

            <div className="container">
                {/* Filter Sidebar */}
                <aside className="filter-sidebar">
                    <h2>Filters</h2>

                    {/* Category Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilter("category")}>
                            Category {filters.category ? <Remove /> : <Add />}
                        </h3>
                        {filters.category && (
                            <ul className="filter-options">
                                <label>
                                    <input type="checkbox" value="Shirt" /> Shirt
                                </label>
                                <label>
                                    <input type="checkbox" value="Jeans" /> Jeans
                                </label>
                                <label>
                                    <input type="checkbox" value="Jackets" /> Jackets
                                </label>
                                <label>
                                    <input type="checkbox" value="Shoes" /> Shoes
                                </label>
                                <label>
                                    <input type="checkbox" value="Accessories" /> Accessories
                                </label>
                            </ul>
                        )}
                    </div>

                    {/* Alphabet Size Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilter("sizeAlphabet")}>
                            Size {filters.sizeAlphabet ? <Remove /> : <Add />}
                        </h3>
                        {filters.sizeAlphabet && (
                            <div className="filter-options sizes">
                                <label>
                                    <input type="checkbox" value="S" /> S
                                </label>
                                <label>
                                    <input type="checkbox" value="M" /> M
                                </label>
                                <label>
                                    <input type="checkbox" value="L" /> L
                                </label>
                                <label>
                                    <input type="checkbox" value="XL" /> XL
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Number Size Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilter("sizeNumber")}>
                            Inseam Size {filters.sizeNumber ? <Remove /> : <Add />}
                        </h3>
                        {filters.sizeNumber && (
                            <div className="filter-options sizes">
                                <label>
                                    <input type="checkbox" value="28" /> 28
                                </label>
                                <label>
                                    <input type="checkbox" value="30" /> 30
                                </label>
                                <label>
                                    <input type="checkbox" value="32" /> 32
                                </label>
                                <label>
                                    <input type="checkbox" value="34" /> 34
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Color Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilter("color")}>
                            Color {filters.color ? <Remove /> : <Add />}
                        </h3>
                        {filters.color && (
                            <div className="filter-options colors">
                                <label>
                                    <input type="checkbox" value="Black" />
                                    <span
                                        className="color-box"
                                        style={{ backgroundColor: "#000" }}
                                    ></span>{" "}
                                    Black
                                </label>
                                <label>
                                    <input type="checkbox" value="Red" />
                                    <span
                                        className="color-box"
                                        style={{ backgroundColor: "#FF5733" }}
                                    ></span>{" "}
                                    Red
                                </label>
                                <label>
                                    <input type="checkbox" value="Blue" />
                                    <span
                                        className="color-box"
                                        style={{ backgroundColor: "#1E90FF" }}
                                    ></span>{" "}
                                    Blue
                                </label>
                                <label>
                                    <input type="checkbox" value="Green" />
                                    <span
                                        className="color-box"
                                        style={{ backgroundColor: "#32CD32" }}
                                    ></span>{" "}
                                    Green
                                </label>
                            </div>
                        )}
                    </div>


                    {/* Price Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilter("price")}>
                            Price {filters.price ? <Remove /> : <Add />}
                        </h3>
                        {filters.price && (
                            <div className="price-range">
                                <input type="range" min="0" max="1000" />
                                <div className="price-values">
                                    <span>$0</span>
                                    <span>$1000</span>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Products and Sort */}
                <div className="products-section-main">

                    {/* Sorting */}
                    <div className="sort-bar">

                        <h3>All Items</h3>
                        <label>Sort by:</label>
                        <select>
                            <option>Featured</option>
                            <option>New Arrivals</option>
                            <option>Top Rated</option>
                            <option>Price: High to Low</option>
                            <option>Price: Low to High</option>
                        </select>
                    </div>

                    {/* Products Grid */}
                    <div className="products-grid">
                        <>
                            {products.map((product) => {
                                // Get the selected color index; default to 0.
                                const selectedColorIndex = activeColor[product.id] ?? 0;
                                return (
                                    <div className="product-card" key={product.id}>
                                        {/* Product Image */}
                                        <div className="product-image" onClick={navigateLink}>
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
                                        <div className="product-details">
                                            <h4>
                                                {product.name}
                                            </h4>
                                            <span className="span">
                                                <p className="price">{product.price}</p>
                                            </span>
                                        </div>
                                    </div>
                                );

                            })}
                        </>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;

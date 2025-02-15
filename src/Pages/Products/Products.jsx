import { useState } from "react";
import colour1 from "../../assets/LW1DTWS_030722_1.webp";
import colour2 from "../../assets/LW1DTWS_030722_1.webp";
import colour3 from "../../assets/LW1DTWS_030722_1.webp";
import colour4 from "../../assets/LW1DTWS_030722_1.webp";
import Category from "../Home/Category/Category";
import { Add, Remove } from "@mui/icons-material";
import {  useNavigate } from "react-router-dom";



const Products = () => {
    const navigateUrl = useNavigate()

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
    




    const navigateLink = () => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
        navigateUrl("/product-details");
    }

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
                        {[colour1, colour2, colour3, colour4].map((img, idx) => (
                            <div key={idx} className="product-card">
                                
                                <div className="product-image" onClick={navigateLink}>
                                        <img src={img} alt="Product" />
                                    </div>
                                

                                <div className="product-details">
                                    <h4>Product Title</h4>
                                    <p>${49.99}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;

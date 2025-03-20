import { useState } from "react";
// import colour1 from "../../assets/LW1DTWS_030722_1.webp";
// import colour2 from "../../assets/LW1DTWS_030722_1.webp";
// import colour3 from "../../assets/LW1DTWS_030722_1.webp";
// import colour4 from "../../assets/LW1DTWS_030722_1.webp";

import Category from "../Home/Category/Category";
import { Add, Remove } from "@mui/icons-material";


import ProductCard from "./ProductCard";





const Products = () => {
  
    const [filters, setFilters] = useState({
        category: true,
        sizeAlphabet: true,
        sizeNumber: true,
        color: true,
        price: true,
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

                    <ProductCard />
                </div>
            </div>
        </section>
    );
};

export default Products;

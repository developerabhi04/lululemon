import product1 from "../../assets/LW1DTWS_030722_1.webp";
import product2 from "../../assets/LW1DTWS_030722_1.webp";
import product3 from "../../assets/LW1DTWS_030722_1.webp";
import product4 from "../../assets/LW1DTWS_030722_1.webp";


const Products = () => {
    return (
        <section className="products-section">
            <div className="container">
                {/* Filter Sidebar */}
                <aside className="filter-sidebar">
                    <h2>Filters</h2>
                    <div className="filter-group">
                        <h3>Color</h3>
                        <div className="filter-options colors">
                            {/* Sample color swatches */}
                            <span className="filter-option" style={{ backgroundColor: "#000" }}></span>
                            <span className="filter-option" style={{ backgroundColor: "#FF5733" }}></span>
                            <span className="filter-option" style={{ backgroundColor: "#1E90FF" }}></span>
                            <span className="filter-option" style={{ backgroundColor: "#32CD32" }}></span>
                            <span className="filter-option" style={{ backgroundColor: "#8B4513" }}></span>
                        </div>
                    </div>
                    <div className="filter-group">
                        <h3>Size</h3>
                        <div className="filter-options sizes">
                            <label className="filter-option">
                                <input type="checkbox" name="size" value="S" />
                                <span>S</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" name="size" value="M" />
                                <span>M</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" name="size" value="L" />
                                <span>L</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" name="size" value="XL" />
                                <span>XL</span>
                            </label>
                        </div>
                    </div>
                    <div className="filter-group">
                        <h3>Category</h3>
                        <ul className="filter-options category">
                            <li>Shirt</li>
                            <li>Jeans</li>
                            <li>Jackets</li>
                            <li>Shoes</li>
                            <li>Accessories</li>
                        </ul>
                    </div>
                    <div className="filter-group">
                        <h3>Price</h3>
                        <div className="price-range">
                            <input type="range" min="0" max="1000" />
                            <div className="price-values">
                                <span>$0</span>
                                <span>$1000</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="products-grid">
                    {/* Sample Product Card */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src={product1} alt="Product" />
                        </div>
                        <div className="product-details">
                            <h4>Product Title</h4>
                            <p>$49.99</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">
                            <img src={product2} alt="Product" />
                        </div>
                        <div className="product-details">
                            <h4>Product Title</h4>
                            <p>$59.99</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">
                            <img src={product3} alt="Product" />
                        </div>
                        <div className="product-details">
                            <h4>Product Title</h4>
                            <p>$39.99</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <div className="product-image">
                            <img src={product4} alt="Product" />
                        </div>
                        <div className="product-details">
                            <h4>Product Title</h4>
                            <p>$29.99</p>
                        </div>
                    </div>
                    {/* Repeat product cards as needed */}
                </div>
            </div>
        </section>
    );
};

export default Products;

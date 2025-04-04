import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlices";
import { fetchCategories } from "../../redux/slices/categorySlices";
import { useSearchParams } from "react-router-dom";

const Products = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    // Initialize filters with keyword and category from the URL
    const initialFilters = {
        keyword: searchParams.get("keyword") || "",
        category: searchParams.get("category") ? [searchParams.get("category")] : [],
        size: [],
        seamSize: [],
        color: [],
        priceRange: [0, 1000],
        sort: "",
    };

    const [filters, setFilters] = useState(initialFilters);

    const { products, loading: prodLoading } = useSelector((state) => state.products);
    const { categories, loading: catLoading } = useSelector((state) => state.categories);

    // UI toggles for filter groups (collapse/expand)
    const [filterUI, setFilterUI] = useState({
        category: true,
        sizeAlphabet: true,
        sizeNumber: false,
        color: false,
        price: false,
    });

    // Fetch products whenever filters change
    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    // Fetch categories for filters and lookup
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Toggle UI collapse/expand for filter groups
    const toggleFilterUI = (filter) => {
        setFilterUI((prev) => ({ ...prev, [filter]: !prev[filter] }));
    };

    // Generic handler for checkbox changes (multi-select filters)
    const handleCheckboxChange = (e, filterKey) => {
        const { value, checked } = e.target;
        setFilters((prev) => {
            let updated = prev[filterKey] || [];
            if (checked) {
                updated = [...updated, value];
            } else {
                updated = updated.filter((item) => item !== value);
            }
            return { ...prev, [filterKey]: updated };
        });
    };

    // Handler for price range slider changes
    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], value] }));
    };

    // Handler for sort selection changes
    const handleSortChange = (e) => {
        setFilters((prev) => ({ ...prev, sort: e.target.value }));
    };

    return (
        <section className="products-section">
            <div className="container">
                {/* Filter Sidebar */}
                <aside className="filter-sidebar">
                    <h2>Filters</h2>

                    {/* Category Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilterUI("category")}>
                            Category {filterUI.category ? <Remove /> : <Add />}
                        </h3>
                        {filterUI.category && (
                            <ul className="filter-options">
                                {catLoading ? (
                                    <p>Loading categories...</p>
                                ) : (
                                    categories.map((cat) => (
                                        <label key={cat._id}>
                                            <input
                                                type="checkbox"
                                                value={cat._id}
                                                onChange={(e) => handleCheckboxChange(e, "category")}
                                                // Check if this category is already selected
                                                checked={filters.category.includes(cat._id)}
                                            />{" "}
                                            {cat.name}
                                        </label>
                                    ))
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Size Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilterUI("sizeAlphabet")}>
                            Size {filterUI.sizeAlphabet ? <Remove /> : <Add />}
                        </h3>
                        {filterUI.sizeAlphabet && (
                            <div className="filter-options sizes">
                                {["S", "M", "L", "XL"].map((size) => (
                                    <label key={size}>
                                        <input
                                            type="checkbox"
                                            value={size}
                                            onChange={(e) => handleCheckboxChange(e, "size")}
                                            checked={filters.size.includes(size)}
                                        />{" "}
                                        {size}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Inseam Size Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilterUI("sizeNumber")}>
                            Inseam Size {filterUI.sizeNumber ? <Remove /> : <Add />}
                        </h3>
                        {filterUI.sizeNumber && (
                            <div className="filter-options sizes">
                                {["28", "30", "32", "34"].map((inseam) => (
                                    <label key={inseam}>
                                        <input
                                            type="checkbox"
                                            value={inseam}
                                            onChange={(e) => handleCheckboxChange(e, "seamSize")}
                                            checked={filters.seamSize.includes(inseam)}
                                        />{" "}
                                        {inseam}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Color Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilterUI("color")}>
                            Color {filterUI.color ? <Remove /> : <Add />}
                        </h3>
                        {filterUI.color && (
                            <div className="filter-options colors">
                                {[
                                    { name: "Black", code: "#000" },
                                    { name: "Red", code: "#FF5733" },
                                    { name: "Blue", code: "#1E90FF" },
                                    { name: "Green", code: "#32CD32" },
                                ].map((col) => (
                                    <label key={col.name}>
                                        <input
                                            type="checkbox"
                                            value={col.name}
                                            onChange={(e) => handleCheckboxChange(e, "color")}
                                            checked={filters.color.includes(col.name)}
                                        />
                                        <span
                                            className="color-box"
                                            style={{ backgroundColor: col.code }}
                                        ></span>{" "}
                                        {col.name}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Filter */}
                    <div className="filter-group">
                        <h3 onClick={() => toggleFilterUI("price")}>
                            Price {filterUI.price ? <Remove /> : <Add />}
                        </h3>
                        {filterUI.price && (
                            <div className="price-range">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={filters.priceRange[1]}
                                    onChange={handlePriceChange}
                                />
                                <div className="price-values">
                                    <span>${filters.priceRange[0]}</span>
                                    <span>${filters.priceRange[1]}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Products and Sort */}
                <div className="products-section-main">
                    <div className="sort-bar">
                        <h3>All Items</h3>
                        <label>Sort by:</label>
                        <select onChange={handleSortChange} value={filters.sort}>
                            <option value="">Featured</option>
                            <option value="createdAt">New Arrivals</option>
                            <option value="averageRating">Top Rated</option>
                            <option value="-price">Price: High to Low</option>
                            <option value="price">Price: Low to High</option>
                        </select>
                    </div>

                    <div className="products-grid">
                        {prodLoading ? (
                            <p>Loading products...</p>
                        ) : products.length === 0 ? (
                            <p>No products found</p>
                        ) : (
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;

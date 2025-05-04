import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AddShoppingCart,
  Clear,
  Face,
  Favorite,
  Login,
  Logout,
  Person,
  PersonAdd,
  Search,
  ShoppingBag,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyInfo } from "../../redux/slices/companyDetailsSlices";
import logo from "../../assets/Fem-Cartel-Wording-1400x352.png";
import womenImage from "../../assets/0106_SP25_MarketingMoment_Dreamknit_Womens.webp";
import accessoriesImage from "../../assets/0106_SP25_MarketingMoment_Accessories.webp";
import shoesImage from "../../assets/0106_SP25_MarketingMoment_ACTVCLUB.webp";
import { fetchLiveSearchProducts } from "../../redux/slices/productSlices";
import { logout } from "../../redux/slices/userSlices";
import TopNav from "./TopNav";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems = [] } = useSelector((state) => state.shopCart);
  const { companys } = useSelector((state) => state.company);
  const { liveSearchResults, searchLoading } = useSelector(
    (state) => state.products
  );

  // Local state for search and suggestions
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedSuggestions, setDisplayedSuggestions] = useState([]);

  // Other Header UI states
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showTopNav, setShowTopNav] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const profileDropdownRef = useRef(null);
  const searchRef = useRef(null);
  let hoverTimeout = null;

  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  // Whenever live search results update, update the local displayed suggestions
  useEffect(() => {
    setDisplayedSuggestions(liveSearchResults);
  }, [liveSearchResults]);

  // Dropdown data for nav items
  const dropdownItems = {
    women: {
      featured: ["New Arrivals", "Best Sellers", "Sale", "Shop All"],
      tops: [
        "Tanks",
        "Sports Bras",
        "Short Sleeve Tops",
        "Long Sleeve Tops",
        "Hoodies & Sweatshirts",
        "Shirt Jackets",
        "Outerwear",
      ],
      bottoms: [
        "Leggings",
        "Joggers & Sweatpants",
        "Pants & Trousers",
        "Shorts & Skirts",
        "Dresses & Jumpsuits",
        "Shop All Bottoms",
      ],
      // shopByActivity: ["Training", "Running", "Swim", "Yoga", "Travel", "Tennis & Golf"],
      image: womenImage,
    },
    shoes: {
      items: [
        "Cross Training Shoes",
        "Running Shoes",
        "Slides",
        "Sneakers",
        "Trail Running Shoes",
        "Workout Shoes",
      ],
      image: shoesImage,
    },
    accessories: {
      product: [
        "Bags",
        "Hats",
        "Sunglasses",
        "Belts",
        "Jewelry",
        "Scarves",
        "Watches",
        "Other Accessories",
      ],
      image: accessoriesImage,
    },
  };

  // Hide top nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTopNav(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (category) => {
    clearTimeout(hoverTimeout);
    setHoveredItem(category);
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setDropdownVisible(false);
      setHoveredItem(null);
    }, 200);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible((prev) => !prev);
  };

  // Close profile dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce live search: dispatch live search thunk after delay when searchQuery changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        dispatch(fetchLiveSearchProducts(searchQuery.trim()));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, dispatch]);

  // Close the search bar if user clicks outside the search container
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSearch);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideSearch);
  }, []);

  // Handle search submission (navigates to full search results page)
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  // Navigate to product detail on suggestion click
  const handleSuggestionClick = (product) => {
    navigate(`/product/${product._id}`);
    setShowSearch(false);
    setSearchQuery("");
  };

  // Remove one suggestion from the list
  const removeSuggestion = (id, e) => {
    // Prevent suggestion click event propagation
    e.stopPropagation();
    setDisplayedSuggestions((prev) =>
      prev.filter((product) => product._id !== id)
    );
  };

  return (
    <header>
      <TopNav showTopNav={showTopNav} companys={companys} />

      <div className="Header">
        <div className="Header-container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Middle Navigation Menu */}
          <div className="middle">
            <ul className="nav-list">
              <li
                className="nav-item"
                onMouseEnter={() => handleMouseEnter("women")}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/products">Women</Link>
              </li>
              <li
                className="nav-item"
                onMouseEnter={() => handleMouseEnter("accessories")}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/products">Accessories</Link>
              </li>
              <li
                className="nav-item"
                onMouseEnter={() => handleMouseEnter("shoes")}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/products">Shoes</Link>
              </li>
              <li className="nav-item">
                <Link to="/products">We Made Too Much</Link>
              </li>

              <li className="nav-item active">
                <Link to="/products" className="active">
                  Valentine's Day
                </Link>
              </li>
            </ul>
          </div>

          {/* Icon Section */}
          <div className="icon-section">
            {showSearch ? (
              <div className="search-bar" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit();
                  }}
                />
                <button onClick={handleSearchSubmit}>
                  <Search />
                </button>
                <button
                  className="close-btn"
                  onClick={() => setShowSearch(false)}
                >
                  <Clear />
                </button>
                {((displayedSuggestions && displayedSuggestions.length > 0) ||
                  searchLoading) && (
                  <div className="search-suggestions">
                    {searchLoading && (
                      <div className="search-loading">Searching...</div>
                    )}
                    {!searchLoading &&
                      displayedSuggestions.map((product) => (
                        <div
                          key={product._id}
                          className="suggestion-item"
                          onClick={() => handleSuggestionClick(product)}
                        >
                          {product.image && (
                            <img
                              src={product.image.url || product.image}
                              alt={product.name}
                            />
                          )}
                          <span>{product.name}</span>
                          <button
                            className="delete-suggestion-btn"
                            onClick={(e) => removeSuggestion(product._id, e)}
                          >
                            <Clear fontSize="6px" />
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="search-icon" onClick={() => setShowSearch(true)}>
                <Search />
              </div>
            )}

            {/* Profile Dropdown */}
            <div
              className="profile-dropdown-container"
              ref={profileDropdownRef}
            >
              <div className="icon-link" onClick={toggleProfileDropdown}>
                <Person />
              </div>
              {profileDropdownVisible && (
                <div className="profile-dropdown">
                  <ul>
                    {user ? (
                      <>
                        <li>
                          <Link to="/profile">
                            <Face /> Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders">
                            <ShoppingBag /> Order
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/sign-in">
                            <Login /> Sign In
                          </Link>
                        </li>
                        <li>
                          <Link to="/sign-up">
                            <PersonAdd /> Sign Up
                          </Link>
                        </li>
                      </>
                    )}
                    {user && (
                      <li>
                        <button onClick={() => dispatch(logout())}>
                          <Logout /> Logout
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="icon-link">
              <Favorite />
              <span className="counts">{wishlistItems.length}</span>
            </Link>
            <Link to="/cart" className="icon-link">
              <AddShoppingCart />
              <span className="count">{cartItems.length}</span>
            </Link>
          </div>
        </div>

        {dropdownVisible && hoveredItem && (
          <Dropdown
            items={dropdownItems[hoveredItem]}
            category={hoveredItem}
            onMouseEnter={() => handleMouseEnter(hoveredItem)}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </div>
    </header>
  );
};

const Dropdown = ({ items, category, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="full-width-dropdown open"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="dropdown-content">
        <div className="dropdown-sections">
          {Object.entries(items).map(([section, values]) =>
            section !== "image" ? (
              <div className="dropdown-section" key={section}>
                <h4>{section.replace(/([A-Z])/g, " $1").trim()}</h4>
                <ul>
                  {values.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={`/${category}/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>
        {items.image && (
          <div className="dropdown-image">
            <img src={items.image} alt={`${category} section`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  AddShoppingCart,
  Face,
  Facebook,
  Favorite,
  Instagram,
  Login,
  Logout,
  Mail,
  Person,
  PersonAdd,
  Phone,
  Search,
  ShoppingBag,
  X,
  YouTube,
} from "@mui/icons-material";
import logo from "../../assets/Fem-Cartel-Wording-1400x352.png";
import womenImage from "../../assets/0106_SP25_MarketingMoment_Dreamknit_Womens.webp";
import accessoriesImage from "../../assets/0106_SP25_MarketingMoment_Accessories.webp";
import shoesImage from "../../assets/0106_SP25_MarketingMoment_ACTVCLUB.webp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlices";


const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);


  const [hoveredItem, setHoveredItem] = useState(null);
  const [showTopNav, setShowTopNav] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const profileDropdownRef = useRef(null);
  let hoverTimeout = null;


  // Dropdown data for individual nav items
  const dropdownItems = {
    women: {
      featured: [
        "New Arrivals",
        "Best Sellers",
        "Matching Sets",
        "DreamKnit™ Collection",
        "Vuori BlissBlend™ Collection",
        "Livvy Dunne's Favorites",
        "New to Vuori?",
        "Sale",
        "Shop All",
      ],
      tops: [
        "Tanks",
        "Sports Bras",
        "Short Sleeve Tops",
        "Long Sleeve Tops",
        "Hoodies & Sweatshirts",
        "Shirt Jackets",
        "Outerwear",
        "Shop All Tops",
      ],
      bottoms: [
        "Leggings",
        "Joggers & Sweatpants",
        "Pants & Trousers",
        "Shorts & Skirts",
        "Dresses & Jumpsuits",
        "Shop All Bottoms",
      ],
      shopByActivity: [
        "Training",
        "Running",
        "Swim",
        "Yoga",
        "Travel",
        "Tennis & Golf",
      ],
      image: womenImage,
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
  };

  // Scroll event listener to hide top nav on scroll
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
    }, 200); // Delay to prevent accidental hiding
  };


  // const toggleProfileDropdown = () => {
  //   setProfileDropdownVisible(!profileDropdownVisible);
  // };


  const toggleProfileDropdown = () => {
    setProfileDropdownVisible((prev) => !prev);
  };


  // Close dropdown if clicked outside
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


  return (
    <header>
      {showTopNav && (
        <nav className="wapper-header">
          <div className="nav">
            <div className="nav-div">
              <ul className="nav-ul">
                <li className="nav-li">
                  <Phone />
                  <span className="nav-span">(+193) 889-4399</span>
                </li>
                <li className="nav-li">
                  <Mail />
                  <span className="nav-span">demo@email.com</span>
                </li>
              </ul>
            </div>
            <div className="social-div">
              <ul className="social-media">
                <li className="link">
                  <Facebook />
                </li>
                <li className="link">
                  <Instagram />
                </li>
                <li className="link">
                  <X />
                </li>
                <li className="link">
                  <YouTube />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <div className="Header">
        <div className="Header-container">
          <div className="logo">
            <Link to={`/`}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="middle">
            <ul className="nav-list">

              <li className="nav-item" onMouseEnter={() => handleMouseEnter("women")} onMouseLeave={handleMouseLeave}>
                <Link to={"/products"}>Women</Link>
              </li>

              <li className="nav-item" onMouseEnter={() => handleMouseEnter("accessories")} onMouseLeave={handleMouseLeave}>
                <Link to={"/products"}>Accessories</Link>
              </li>

              <li className="nav-item" onMouseEnter={() => handleMouseEnter("shoes")} onMouseLeave={handleMouseLeave}>
                <Link to={"/products"}>Shoes</Link>
              </li>

              <li className="nav-item">
                <Link to={"/products"}>We Made Too Much</Link>
              </li>

              <li className="nav-item active">
                <Link to={"/products"} className="active">{"Valentine's Day"}</Link>
              </li>

            </ul>
          </div>

          {/* icon-section */}
          <div className="icon-section">
            <Link className="icon-link">
              <input type="text" placeholder="Search" name="search" />
              <span className="ddd">
                <Search />
              </span>
            </Link>

            {/* Person Icon with Dropdown */}
            <div className="profile-dropdown-container" ref={profileDropdownRef}>
              <div className="icon-link" onClick={toggleProfileDropdown}>
                <Person />
              </div>
              {profileDropdownVisible && (
                <div className="profile-dropdown">
                  <ul>
                    {user && (
                      <>
                        <li>
                          <Link to="/profile">
                            <Face />Profile
                          </Link>
                        </li>

                        <li>
                          <Link to="/orders">
                            <ShoppingBag /> Order
                          </Link>
                        </li>
                      </>
                    )}

                    {/* ✅ Show Sign In and Sign Up only when user is NOT logged in */}
                    {!user && (
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

                    {/* ✅ Show Logout only when user is logged in */}
                    {user && (
                      <li>
                        <Link onClick={() => dispatch(logout())}>
                          <Logout /> Logout
                        </Link>
                      </li>
                    )}

                  </ul>
                </div>
              )}
            </div>

            {/* person icon */}
            {/* <Link to="/sign-in" className="icon-link">
              <Person />
            </Link> */}

            <Link to="/wishlist" className="icon-link">
              <Favorite />
            </Link>

            <Link to="/cart" className="icon-link">
              <AddShoppingCart />
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
                        to={`/${category}/${item.toLowerCase().replace(/\s+/g, "-")}`}
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
